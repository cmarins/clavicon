define(['angular', 'ng/fichas/FiltroFicha', 'ng/fichas/ListaController', 'ng/fichas/CrearController', 'angular-route'], function (angular, FiltroFicha, ListaController, CrearController) {
  'use strict';

  var name = 'fichas';

  return function () {
    angular
        .module(name, ['ngRoute'])
        .filter('filtroFicha', FiltroFicha)
        .config(['$routeProvider', function ($routeProvider) {
          $routeProvider.when('/fichas', {
            templateUrl: 'modules/ng/fichas/lista.html',
            controller: ListaController
          });

          $routeProvider.when('/fichas/crear', {
            templateUrl: 'modules/ng/fichas/crear.html',
            controller: CrearController
          });
        }]);
    return name;
  };
});