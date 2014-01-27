define(['angular', 'ng/apuntes/ListaController', 'angular-route'], function (angular, ListaController) {
  'use strict';

  var moduleName = 'apuntes';

  return function () {
    angular
        .module(moduleName, ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
          $routeProvider.when('/apuntes', {
            templateUrl: 'modules/ng/apuntes/lista.html',
            controller: ListaController
          });
        }]);
    return moduleName;
  };
});