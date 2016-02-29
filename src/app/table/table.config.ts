

const PAGINATION_TPL = require('./pagination.tpl.html');


/* @ngInject */
export function configTable($templateCache: ng.ITemplateCacheService) {
  $templateCache.put('table/pagination.tpl.html', PAGINATION_TPL);
}
