import moduleName from '../common/utils/module-name';
import {APP_CONFIGURATION} from '../app.config';
import {CORE_MODULE} from '../core/core.module';

import {routeDevice} from './device.route';
import {DeviceListProvider} from './device-list.service';
import {DeviceListComponent} from './device-list.component';

const DEVICE_MODULE_NAME: string = moduleName(APP_CONFIGURATION.id, 'device');

export const DEVICE_MODULE: ng.IModule = angular.module(DEVICE_MODULE_NAME, [
  CORE_MODULE.name
]);

DEVICE_MODULE.config(routeDevice);
DEVICE_MODULE.provider('deviceList', DeviceListProvider);
DEVICE_MODULE.directive('loraDeviceList', DeviceListComponent);
