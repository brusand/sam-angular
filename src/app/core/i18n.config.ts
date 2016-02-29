
import {LOCALE} from './locale.constant';

require('../../assets/locales/locale.default.json');
require('../../assets/locales/locale.en.json');
require('../../assets/locales/locale.fr.json');

/* @ngInject */
export function configI18n($translateProvider: any) {
  $translateProvider.useStaticFilesLoader(<ng.translate.IStaticFilesLoaderOptions>{
      prefix: 'assets/locales/locale.',
      suffix: '.json'
    });
  $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
  $translateProvider.registerAvailableLanguageKeys([LOCALE.en, LOCALE.fr], {
    'en-*': LOCALE.en,
    'fr-*': LOCALE.fr
  });
  $translateProvider.determinePreferredLanguage();
  $translateProvider.fallbackLanguage(['default', LOCALE.en]);
  $translateProvider.useCookieStorage();
}
