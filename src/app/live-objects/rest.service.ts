import path from '../common/utils/path';
import {HttpService} from '../common/services/http/http';

export class RestProvider implements ng.IServiceProvider {

  public baseUrl: string;

  constructor() {
    this.baseUrl = 'api/v0';
  }


  /* @ngInject */
  public $get($q: ng.IQService, cmnHttp: HttpService) {
    return new RestService($q, cmnHttp, this.baseUrl);
  }

}

export class RestService {

  private uri: any;

  constructor(private $q: ng.IQService, private cmnHttp: HttpService, private baseUrl: string) {
    this.uri = {};
    this.uri.auth = () => this.defaultUri('auth');
    this.uri.apiKeys = () => this.defaultUri('apiKeys');
    this.uri.apiKey = (apiKeyId: string) => cmnHttp.withId(this.uri.apiKeys())(apiKeyId);
    this.uri.users = () => this.defaultUri('users');
    this.uri.user = (userId: string) => cmnHttp.withId(this.uri.users())(userId);
    this.uri.me = () => this.uri.user('me');
    this.uri.tenants = () => this.defaultUri('tenants');
    this.uri.tenant = (tenantId: string) => cmnHttp.withId(this.uri.tenants())(tenantId);
    this.uri.devices = () => this.defaultUri('lora');
    this.uri.device = (deviceId: string) => cmnHttp.withId(this.uri.devices())(deviceId);
  }

  public auth(email: string, password: string) {
      $q.value( ); //creer une promesse a partir d une valeur 
    return this.cmnHttp.post(this.uri.auth(), {email, password}, {params: {cookie: true}});
  }

  public getMe() {
    return this.cmnHttp.get(this.uri.me());
  }

  public getTenant(tenantId: string) {
    return this.cmnHttp.get(this.uri.tenant(tenantId));
  }

  public deleteApiKey(apiKeyId: string) {
    return this.cmnHttp.delete(this.uri.apiKey(apiKeyId));
  }

  public defaultUri(uri: string): string {
    return path(this.baseUrl, uri);
  }

  public getLoraDevices(page: number = 0, size: number = 10): ng.IPromise<any> {
    return this.cmnHttp.get(this.uri.devices(), {
      params: {page, size}
    }).then((result: any) => result.data, this.$q.reject);
  }

  public deleteDevice(devEui: string): ng.IPromise<any> {
    return this.cmnHttp.delete(this.uri.device(devEui)).then((result: any) => result.data, this.$q.reject);
  }

}
