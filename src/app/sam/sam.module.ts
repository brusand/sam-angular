import {SamAction} from './sam.action';
import {SamModel} from './sam.model';
import {SamState} from './sam.state';
import {SamView} from './sam.view';


const SAM_MODULE_NAME: string = moduleName(APP_CONFIGURATION.id, 'sam');

export const SAM_MODULE: ng.IModule = angular.module(SAM_MODULE_NAME, []);

SAM_MODULE.provider('samActionProvider', samActionProvider);
SAM_MODULE.provider('samModelProvider', samModelProvider);
SAM_MODULE.provider('samStateProvider', samStateProvider);
SAM_MODULE.provider('samViewProvider', samViewProvider);