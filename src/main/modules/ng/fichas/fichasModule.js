define(['angular', 'ng/fichas/ListaController', 'angular-route'], function (angular, ListaController) {
  var name = 'fichas';

  return function (appAdapter) {
    angular
        .module(name, ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
          $routeProvider.when('/fichas', {
            templateUrl: 'modules/ng/fichas/lista.html',
            controller: ListaController(appAdapter)
          });
        }]);
    return name;
  };
});