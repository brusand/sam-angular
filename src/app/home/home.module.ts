import moduleName from '../common/utils/module-name';
import {APP_CONFIGURATION} from '../app.config';
import {CORE_MODULE} from '../core/core.module';

import {routeHome} from './home.route';

const HOME_MODULE_NAME: string = moduleName(APP_CONFIGURATION.id, 'home');

export const HOME_MODULE: ng.IModule = angular.module(HOME_MODULE_NAME, [
  CORE_MODULE.name
]);

HOME_MODULE.config(routeHome);
