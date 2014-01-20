define(['angular', 'ng/navBar/NavBarModule', 'ng/fichas/fichasModule', 'ng/apuntes/ApuntesModule'], function (angular, NavBar, Fichas, Apuntes) {
  var appName = 'web';
  var n = 0;

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

    function transitionAndShow(target, data) {
      setTimeout(function () {
        var eventDeregistration = $rootScope.$on('$routeChangeSuccess', function (event, route) {
          if (!!route && route.$$route.originalPath == target) {
            show(data);
            eventDeregistration();
          }
        });
      }, 0);
      transition('/');
      transition(target);
    }

    return {
      transition: transition,
      transitionAndShow: transitionAndShow,
      notify: notify,
      show: show
    };
  }

  function WebFactory() {
    var webApp = angular
        .module(appName, [NavBar(), Fichas(), Apuntes()]);

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