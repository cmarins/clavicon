define(['angular', 'ng/navBar/NavBarModule', 'ng/fichas/fichasModule', 'ng/apuntes/ApuntesModule'], function (angular, NavBar, Fichas, Apuntes) {
  var appName = 'web';

  function WebApi($rootScope, $location) {
    function transition(target) {
      setTimeout(function () {
        $rootScope.$apply(function () {
          $location.path(target);
        });
      }, 0);
    }

    function notify(type, message) {
      setTimeout(function () {
        $rootScope.$apply(function () {
          $rootScope.$broadcast('notify', [type, message]);
        });
      }, 0);
    }

    function show(data) {
      setTimeout(function () {
        $rootScope.$apply(function () {
          $rootScope.$broadcast('data', [data]);
        });
      }, 0);
    }

    return {
      transition: transition,
      notify: notify,
      show: show
    };
  }

  function WebFactory() {
    var webApp = angular
        .module(appName, [NavBar(), Fichas(), Apuntes()])
        .config(['$routeProvider', function ($routeProvider) {
          $routeProvider.otherwise({redirectTo: '/fichas'})
        }]);

    return {
      bootstrap: function (appApi, element) {
        webApp
            .constant('appApi', appApi)
            .run(['$rootScope', '$location', 'appApi', function ($rootScope, $location, appApi) {
              appApi.setWebApi(WebApi($rootScope, $location));
            }]);
        angular.bootstrap(element, [appName]);
      }
    };
  }

  return WebFactory;
});