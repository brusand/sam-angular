import moduleName from '../common/utils/module-name';
import {APP_CONFIGURATION} from '../app.config';

import {routeCore} from './core.route';
import {configI18n} from './i18n.config';
import {configHttp} from './http.config';
import {AuthProvider} from './auth.service';
import {ModelProvider} from './model.service';
import {runRoutes} from './route.config';
import {requestInterceptor} from './request-interceptor.service';

const CORE_MODULE_NAME: string = moduleName(APP_CONFIGURATION.id, 'core');

export const CORE_MODULE: ng.IModule = angular.module(CORE_MODULE_NAME, [
]);

CORE_MODULE.config(routeCore);
CORE_MODULE.config(configI18n);
CORE_MODULE.config(configHttp);
CORE_MODULE.run(runRoutes);
CORE_MODULE.provider('auth', AuthProvider);
CORE_MODULE.provider('model', ModelProvider);
CORE_MODULE.factory('requestInterceptor', requestInterceptor);
