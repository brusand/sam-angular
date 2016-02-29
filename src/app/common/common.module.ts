export const COMMON_MODULE_NAME = 'common';

import {COMMON_LOADING_MODULE} from './components/loading/loading';
import {COMMON_I18N_SELECT_MODULE} from './components/i18n/select/select';
import {COMMON_STORAGE_MODULE} from './services/storage/storage';
import {COMMON_HTTP_MODULE} from './services/http/http';

export const COMMON_MODULE: ng.IModule = angular.module(COMMON_MODULE_NAME, [
  COMMON_LOADING_MODULE.name,
  COMMON_STORAGE_MODULE.name,
  COMMON_HTTP_MODULE.name,
  COMMON_I18N_SELECT_MODULE.name
]);
