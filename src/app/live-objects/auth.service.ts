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

}
