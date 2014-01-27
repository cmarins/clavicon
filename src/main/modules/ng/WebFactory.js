define(['angular', 'ng/WebApi', 'ng/navBar/NavBarModule', 'ng/fichas/fichasModule', 'ng/apuntes/ApuntesModule'], function (angular, WebApi, NavBar, Fichas, Apuntes) {
  'use strict';

  var appName = 'web';

  function WebFactory() {
    var webApp = angular.module(appName, [NavBar(), Fichas(), Apuntes()]),
        api;

    function bootstrap(appApi, element) {
      webApp
          .constant('appApi', appApi)
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
  }

  return WebFactory;
});