import {AuthService} from '../core/auth.service';

/* @ngInject */
export function requestInterceptor($q: ng.IQService, $log: ng.ILogService, $injector: any) {
  return {
    request: (config: ng.IRequestConfig) => {
      let auth: AuthService = $injector.get('auth');
      auth.delayLogOut();
      return config;
    },
    responseError: (rejection: any) => {
      let auth: AuthService = $injector.get('auth');
      if (rejection !== null && (rejection.status === 401)) {
        auth.logOut(true);
      } else {
        let err = {
          code: 'DEFAULT',
          message: 'unknown error'
        };
        if (typeof rejection.data === 'object') {
          err = rejection.data;
        }
        $log.debug('error', err);
      }
      return $q.reject(rejection);
    }
  };
}
