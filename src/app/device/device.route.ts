import {DefaultRoute} from '../common/utils/default-route';
import {CUSTOMER_ROUTE} from '../core/core.route';
import {AuthProvider} from '../core/auth.service';
import {DeviceListProvider} from './device-list.service';

export const DEVICES_ROUTE = new DefaultRoute('devices', CUSTOMER_ROUTE.path);

/* @ngInject */
export function routeDevice($stateProvider: ng.ui.IStateProvider, authProvider: AuthProvider,
                            deviceListProvider: DeviceListProvider) {
  $stateProvider.state(DEVICES_ROUTE.buildState({
    template: '<lora-device-list></lora-device-list>',
    resolve: {
      logIn: authProvider.authResolve,
      deviceList: deviceListProvider.deviceListResolve
    }
  }));
}
