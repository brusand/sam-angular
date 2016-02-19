import {StorageService} from '../common/services/storage/storage';
import {RestService} from './rest.service';

export const LOG_IN_EVENT = 'logIn';
export const LOG_OUT_EVENT = 'logOut';

export class AuthService {
  private authInfoId: string = 'authInfo';
  private authInfo: any;
  private loggedIn = false;
  private userInfo: any;
  private tenantInfo: any;
  private logOutPromise: ng.IPromise<any>;

  constructor(protected $rootScope: ng.IRootScopeService,
              protected $q: ng.IQService,
              protected $timeout: ng.ITimeoutService,
              protected loRest: RestService,
              protected cmnStorage: StorageService) {

  }

  public activate(): ng.IPromise<any> {
    var deferred: ng.IDeferred<any> = this.$q.defer();
    if (!this.loadAuthInfo()) {
      deferred.reject(true);
    } else {
      this.loadUserInfo().then(deferred.resolve, deferred.reject).catch(this.logOut);
    }
    return deferred.promise;
  }

  public logIn(email: string, password: string): ng.IPromise<any> {
    return this.loRest.auth(email, password)
      .then((res: any) => {
        this.setAuthInfo(res.data);
        this.cmnStorage.setData(this.authInfoId, res.data);
      });
  }

  public logOut(expired?: boolean): void {
    if (this.loggedIn) {
      if (!expired && !this.admin()) {
        this.loRest.deleteApiKey(this.apiKeyId());
      }
      this.loggedIn = false;
      this.userInfo = undefined;
      this.tenantInfo = undefined;
    }
    if (!this.admin()) {
      this.$timeout.cancel(this.logOutPromise);
    }
    this.cmnStorage.removeData(this.authInfoId);
    this.onLogOut(expired);
  }

  public delayLogOut(): void {
    if (angular.isDefined(this.authInfo) && !this.admin()) {
      if (angular.isDefined(this.logOutPromise)) {
        this.$timeout.cancel(this.logOutPromise);
      }
      this.logOutPromise = this.$timeout(() => this.logOut(true), this.ttl(), false);
    }
  }

  public isInitialized(): boolean {
    return angular.isDefined(this.authInfo);
  }

  public isLoggedIn(): boolean {
    return this.isInitialized() && this.loggedIn;
  }

  public tenantId(): string {
    this.ifInitialized();
    return this.authInfo.apiKey.tenantId;
  }

  public userId(): string {
    this.ifInitialized();
    return this.authInfo.apiKey.userId;
  }

  public admin(): string {
    this.ifInitialized();
    return this.authInfo.admin;
  }

  public user(): any {
    this.ifLoggedIn();
    return this.userInfo;
  }

  public tenant(): any {
    this.ifLoggedIn();
    return this.tenantInfo;
  }

  public roles(): any {
    this.ifInitialized();
    var bRoles = {};
    angular.forEach(this.authInfo.apiKey.roles, (role: string) => bRoles[role] = true);
    return bRoles;
  }

  private loadAuthInfo(): any {
    if (angular.isUndefined(this.authInfo)) {
      var localAuthInfo = this.cmnStorage.getData(this.authInfoId);
      if (angular.isDefined(localAuthInfo)) {
        this.setAuthInfo(localAuthInfo);
      }
    }
    return this.authInfo;
  }

  private setAuthInfo(newAuthInfo: any): void {
    this.authInfo = newAuthInfo;
    this.delayLogOut();
  }

  private loadUserInfo(): ng.IPromise<any> {
    var deferred = this.$q.defer();

    if (this.loggedIn) {
      deferred.resolve(this.loggedIn);
      return deferred.promise;
    } else if (!this.admin()) {
      this.$q.all({
          tenant: this.loRest.getTenant(this.tenantId()),
          user: this.loRest.getMe()
        })
        .then((res: any) => {
          this.loggedIn = true;
          this.userInfo = res.user.data;
          this.tenantInfo = res.tenant.data;
          deferred.resolve(this.loggedIn);
        }, deferred.reject);
      return deferred.promise.then(() => this.onLogIn);
    } else {
      this.loggedIn = true;
      deferred.resolve(this.loggedIn);
      return deferred.promise.then(() => this.onLogIn);
    }
  }

  private onLogOut(expired: boolean): void {
    this.$rootScope.$emit(LOG_OUT_EVENT, expired);
  }

  private onLogIn(): void {
    this.$rootScope.$emit(LOG_IN_EVENT);
  }

  private ifInitialized(): void {
    if (!this.isInitialized()) {
      throw new Error('auth service not initialized');
    }
  }

  private ifLoggedIn(): void {
    if (!this.isLoggedIn()) {
      throw new Error('no user logged in');
    }
  }

  private apiKeyId() {
    this.ifInitialized();
    return this.authInfo.apiKey.id;
  }

  private ttl(): number {
    this.ifInitialized();
    return this.authInfo.apiKey.sessionTTL;
  }
}

export class AuthProvider implements ng.IServiceProvider {

  /* @ngInject */
  public $get($rootScope: ng.IRootScopeService,
              $q: ng.IQService,
              $timeout: ng.ITimeoutService,
              loRest: RestService,
              cmnStorage: StorageService): AuthService {

    return new AuthService($rootScope, $q, $timeout, loRest, cmnStorage);

  }

  public getAuthResolve() {
    return {
      logIn: authResolve
    };

    /* @ngInject */
    function authResolve(loAuth: AuthService) {
      return loAuth.activate();
    }
  }
}
