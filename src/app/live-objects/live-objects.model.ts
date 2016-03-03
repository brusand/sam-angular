export class LomSamModel {
  private authInfoId: string = 'authInfo';
  private authInfo: any;
  private loggedIn = false;
  private userInfo: any;
  private tenantInfo: any;
  private logOutPromise: ng.IPromise<any>;

  constructor(public state) {

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
