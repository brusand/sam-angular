import {AuthService as LOAuthService} from '../live-objects/auth.service';
import {RestService} from '../live-objects/rest.service';
import {StorageService} from '../common/services/storage/storage';
import {HOME_ROUTE} from '../home/home.route';

export class AuthService extends LOAuthService {


  constructor($rootScope: angular.IRootScopeService,
              $q: angular.IQService,
              $timeout: angular.ITimeoutService,
              private $state: ng.ui.IStateService,
              loRest: RestService,
              cmnStorage: StorageService) {
    super($rootScope, $q, $timeout, loRest, cmnStorage);
  }

  public logIn(email: string, password: string): angular.IPromise<any> {
    return super.logIn(email, password).then( () => this.$state.go(HOME_ROUTE.stateName), this.$q.reject );
  }
}

export class AuthProvider implements ng.IServiceProvider {

  /* @ngInject */
  public $get($rootScope: ng.IRootScopeService,
              $q: ng.IQService,
              $timeout: ng.ITimeoutService,
              $state: ng.ui.IStateService,
              loRest: RestService,
              cmnStorage: StorageService): AuthService {

    return new AuthService($rootScope, $q, $timeout, $state, loRest, cmnStorage);

  }

  public getAuthResolve() {
    return {
      logIn: this.authResolve
    };
  }

  /* @ngInject */
  public authResolve(auth: AuthService) {
    return auth.activate();
  }
}

