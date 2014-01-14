define(['angular', 'ng/apuntes/ListaController', 'angular-route'], function (angular, ListaController) {
  var name = 'apuntes';

  return function () {
    angular
        .module(name, ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
          $routeProvider.when('/apuntes', {
            templateUrl: 'modules/ng/apuntes/lista.html',
            controller: ListaController
          });
        }]);
    return name;
  };
});