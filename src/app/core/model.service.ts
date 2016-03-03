import {ModelService as LOModelService} from '../live-objects/model.service';
import {RestService} from '../live-objects/rest.service';
import {StorageService} from '../common/services/storage/storage';


export class ModelService extends LOModelService {
  constructor($rootScope: angular.IRootScopeService,
              $q: angular.IQService,
              $timeout: angular.ITimeoutService,
              loRest: RestService,
              cmnStorage: StorageService) {
    super($rootScope, $q, $timeout, loRest, cmnStorage);
  }

  public present(data) {
    super.present(data);
  }
}

export class ModelProvider implements ng.IServiceProvider {

  /* @ngInject */
  public $get($rootScope: ng.IRootScopeService,
              $q: ng.IQService,
              $timeout: ng.ITimeoutService,
              $state: ng.ui.IStateService,
              loRest: RestService,
              cmnStorage: StorageService): ModelService {

    return new ModelService($rootScope, $q, $timeout, $state, loRest, cmnStorage);
}

