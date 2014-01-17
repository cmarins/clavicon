define(['angular', 'ng/fichas/ListaController', 'angular-route'], function (angular, ListaController) {
  var name = 'fichas';

  return function () {
    angular
        .module(name, ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
          $routeProvider.when('/fichas', {
            templateUrl: 'modules/ng/fichas/lista.html',
            controller: ListaController
          });
        }]);
    return name;
  };
});