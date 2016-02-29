import {AuthProvider} from './auth.service';
import {RestProvider} from './rest.service';

const LIVE_OBJECTS_MODULE_NAME: string = 'liveObjects';

export const LIVE_OBJECTS_MODULE: ng.IModule = angular.module(LIVE_OBJECTS_MODULE_NAME, []);

LIVE_OBJECTS_MODULE.provider('loAuth', AuthProvider);
LIVE_OBJECTS_MODULE.provider('loRest', RestProvider);

