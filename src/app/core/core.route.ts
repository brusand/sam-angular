import {Route} from '../common/utils/route';

export const BASE_ROUTE = new Route('lora');
export const APP_ROUTE = new Route('app', BASE_ROUTE.path);
export const CUSTOMER_ROUTE = new Route('customer', APP_ROUTE.path);

const BASE_TPL = require('../layouts/base.tpl.html');
const TOP_MENU_TPL = require('../layouts/top-menu.tpl.html');
const APP_TPL = require('../layouts/app.tpl.html');
const CUSTOMER_MENU_TPL = require('../layouts/customer-menu.tpl.html');

/* @ngInject */
export function routeCore($stateProvider: ng.ui.IStateProvider) {
  $stateProvider.state(BASE_ROUTE.buildState({
    abstract: true,
    template: BASE_TPL
  }));
  $stateProvider.state(APP_ROUTE.buildState({
    abstract: true,
    views: {
      'top-menu': {
        template: TOP_MENU_TPL
      },
      '': {
        template: APP_TPL
      }
    }
  }));
  $stateProvider.state(CUSTOMER_ROUTE.buildState({
    abstract: true,
    views: {
      'left-menu': {
        template: CUSTOMER_MENU_TPL
      },
      '': {
        template: '<div ui-view></div>'
      }
    }
  }));
}
