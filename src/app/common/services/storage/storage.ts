import {COMMON_MODULE_NAME} from '../../common.module';
import moduleName from '../../utils/module-name';

const COMMON_STORAGE_MODULE_NAME: string = moduleName(COMMON_MODULE_NAME, 'storage');

export class StorageService {

  /* @ngInject */
  constructor(private $window: ng.IWindowService, $log: ng.ILogService) {
    $log.debug('Storage Service');
  }

  public setData(key: string, value: any) {
    if (angular.isUndefined(value) || angular.isUndefined(key)) {
      return;
    }
    if (angular.isObject(value)) {
      this.$window.localStorage[key] = JSON.stringify(value);
    } else {
      this.$window.localStorage[key] = value;
    }
  }

  public getData(key: string) {
    if (angular.isUndefined(key)) {
      return;
    }
    let value = this.$window.localStorage[key];
    if (angular.isUndefined(value)) {
      return;
    }
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }

  public removeData(key: string) {
    if (angular.isUndefined(key)) {
      return;
    }
    delete this.$window.localStorage[key];
  }
}

export const COMMON_STORAGE_MODULE: ng.IModule = angular.module(COMMON_STORAGE_MODULE_NAME, [])
  .service('cmnStorage', StorageService);
