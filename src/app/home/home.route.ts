import {DefaultRoute} from '../common/utils/default-route';
import {CUSTOMER_ROUTE} from '../core/core.route';
import {AuthProvider} from '../core/auth.service';

export const HOME_ROUTE = new DefaultRoute('home', CUSTOMER_ROUTE.path);

const HOME_TPL = require('./home.tpl.html');

/* @ngInject */
export function routeHome($stateProvider: ng.ui.IStateProvider, authProvider: AuthProvider) {
    $stateProvider.state(HOME_ROUTE.buildState({
      template: HOME_TPL,
      resolve: authProvider.getAuthResolve()
    }));
}
