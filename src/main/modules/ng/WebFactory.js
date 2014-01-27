define(['angular', 'ng/WebApi', 'ng/navBar/NavBarModule', 'ng/html/HtmlModule', 'ng/fichas/FichasModule', 'ng/apuntes/ApuntesModule'], function (angular, WebApi, NavBar, Html, Fichas, Apuntes) {
  'use strict';

  var appName = 'web';

  return function (config) {
    return function WebFactory() {
      var webApp = angular.module(appName, [NavBar(), Html(), Fichas(), Apuntes()]),
          api;

      function bootstrap(appApi, element) {
        webApp
            .constant('appApi', appApi)
            .constant('config', config)
            .run(['$rootScope', '$location', 'appApi', function ($rootScope, $location, appApi) {
              api = WebApi($rootScope, $location);
              appApi.setWebApi(api);
            }]);
        angular.bootstrap(element, [appName]);
      }

      return {
        api: api,
        bootstrap: bootstrap
      };
    };
  };
});