define(['angular', 'ng/fichas/fichasModule', 'ng/apuntes/ApuntesModule'], function (angular, Fichas, Apuntes) {
  var appName = 'web';

  return function (appAdapter) {
    angular.module(appName, [Fichas(appAdapter), Apuntes()])
        .config(['$routeProvider', function ($routeProvider) {
          $routeProvider.otherwise({redirectTo: '/fichas'})
        }])
        .run(['$rootScope', '$location', function ($rootScope, $location) {
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
                $rootScope.$broadcast('notify.type', [message]);
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

          appAdapter.setWebAdapter({
            transition: transition,
            notify: notify,
            show: show
          });
        }]);

    return {
      bootstrap: function (element) {
        angular.bootstrap(element, [appName]);
      }
    };
  }
});