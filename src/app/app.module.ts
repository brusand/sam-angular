import {APP_CONFIGURATION} from './app.config';
import {CORE_MODULE} from './core/core.module';
import {HOME_MODULE} from './home/home.module';
import {LOGIN_MODULE} from './login/login.module';
import {COMMON_MODULE} from './common/common.module';
import {LIVE_OBJECTS_MODULE} from './live-objects/live-objects.module';
import {DEVICE_MODULE} from './device/device.module';
import {TABLE_MODULE} from './table/table.module';
import {SAM_MODULE} from './sam/sam.module';

export const APP_MODULE: ng.IModule =  angular.module(APP_CONFIGURATION.id, [
  'ngMessages',
  'ngCookies',
  'ngSanitize',
  'ui.bootstrap',
  'ui.router',
  'pascalprecht.translate',
  'smart-table',

  COMMON_MODULE.name,
  CORE_MODULE.name,
  HOME_MODULE.name,
  DEVICE_MODULE.name,
  LOGIN_MODULE.name,
  LIVE_OBJECTS_MODULE.name,
  TABLE_MODULE.name,
  SAM_MODULE.name
]);
