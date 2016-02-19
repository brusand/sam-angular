import {AuthService} from './auth.service';
import {HOME_ROUTE} from '../home/home.route';
import {LOGIN_ROUTE} from '../login/login.route';
import {LOG_OUT_EVENT} from '../live-objects/auth.service';

/* @ngInject */
export function runRoutes($rootScope: ng.IRootScopeService, $state: ng.ui.IStateService, auth: AuthService) {
  $rootScope.$on('$stateChangeError', () => {
    auth.isLoggedIn() ? $state.go(HOME_ROUTE.stateName) : $state.go(LOGIN_ROUTE.stateName);
  });
  $rootScope.$on(LOG_OUT_EVENT, () => $state.go(LOGIN_ROUTE.stateName));
}
