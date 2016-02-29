import {COMMON_MODULE_NAME} from '../../../common.module';
import moduleName from '../../../utils/module-name';

const COMMON_I18N_SELECT_MODULE_NAME: string = moduleName(COMMON_MODULE_NAME, 'i18n.select');

export const COMMON_I18N_SELECT_MODULE: ng.IModule = angular.module(COMMON_I18N_SELECT_MODULE_NAME, [])
  .directive('cmnI18nSelect', i18nSelectDirective);

/* @ngInject */
function i18nSelectDirective(): ng.IDirective {
  return {
    replace: true,
    template: `<li uib-dropdown>
    <a href uib-dropdown-toggle><span translate="{{i18n.current.labelId}}"></span> <span class="caret"></span></a>
    <ul uib-dropdown-menu>
      <li ng-repeat="locale in i18n.locales track by locale.key">
        <a href ng-click="i18n.change(locale)" translate="{{locale.labelId}}"></a>
      </li>
    </ul>
    </li>`,
    scope: {},
    controllerAs: 'i18n',
    bindToController: {
      current: '=',
      locales: '='
    },
    controller: I18nSelectController
  };
}

/* @ngInject */
class I18nSelectController {

  private current: any;

  constructor(private $translate: ng.translate.ITranslateService) {
  }

  public change(locale: any) {
    this.current = locale;
    this.$translate.use(locale.key);
  }
}
