import {COMMON_MODULE_NAME} from '../../common.module';
import moduleName from '../../utils/module-name';

const COMMON_LOADING_MODULE_NAME: string = moduleName(COMMON_MODULE_NAME, 'loading');

export const COMMON_LOADING_MODULE: ng.IModule = angular.module(COMMON_LOADING_MODULE_NAME, [])
  .directive('cmnLoading', loadingDirective);

/* @ngInject */
function loadingDirective(): ng.IDirective {
  return {
    restrict: 'A',
    scope: {
      cmnLoading: '='
    },
    link: postLink
  };
}


function postLink(scope: ng.IScope, element: ng.IAugmentedJQuery, attr: ILoadingAttributes) {
  let iconClass: string = attr.icon;
  let loadingIconClass: string = attr['loading-icon']  || 'fa-spinner fa-spin';
  let iconElement: ng.IAugmentedJQuery = angular.element(`<i class="fa"></i>`);
  element.prepend(`&nbsp;`);
  element.prepend(iconElement);

  scope.$watch('cmnLoading', function (value: string) {
    let loading = !!value;
    if (loading) {
      iconElement.removeClass(iconClass);
      iconElement.addClass(loadingIconClass);
    } else {
      iconElement.removeClass(loadingIconClass);
      iconElement.addClass(iconClass);
    }
  });
}

interface ILoadingAttributes extends ng.IAttributes {
  icon: string;
  'loading-icon': string;
  'cnm-loading': string;
}
