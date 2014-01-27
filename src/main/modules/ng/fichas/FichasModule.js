define(['angular',
  'ng/fichas/FiltroFicha',
  'ng/fichas/ListaController',
  'ng/fichas/EditarController',
  'ng/fichas/FichasFormDirective',
  'angular-route'], function (angular, FiltroFicha, ListaController, EditarController, FichasFormDirective) {
  'use strict';

  var moduleName = 'fichas';

  return function () {
    angular
        .module(moduleName, ['ngRoute', 'html'])
        .filter('filtroFicha', FiltroFicha)
        .directive('fichasForm', FichasFormDirective)
        .config(['$routeProvider', function ($routeProvider) {
          $routeProvider.when('/fichas', {
            templateUrl: 'modules/ng/fichas/lista.html',
            controller: ListaController
          });

          $routeProvider.when('/fichas/crear', {
            templateUrl: 'modules/ng/fichas/crear.html',
            controller: EditarController
          });

          $routeProvider.when('/fichas/:numero', {
            templateUrl: 'modules/ng/fichas/editar.html',
            controller: EditarController
          });
        }]);
    return moduleName;
  };
});