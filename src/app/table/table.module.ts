import moduleName from '../common/utils/module-name';
import {APP_CONFIGURATION} from '../app.config';
import {CORE_MODULE} from '../core/core.module';
import {configTable} from './table.config';

const LOGIN_MODULE_NAME: string = moduleName(APP_CONFIGURATION.id, 'table');

export const TABLE_MODULE: ng.IModule = angular.module(LOGIN_MODULE_NAME, [
  CORE_MODULE.name
]);

TABLE_MODULE.run(configTable);
