define([], function () {
  'use strict';

  function ListaController($scope) {
    $scope.apuntes = [];
  }

  ListaController.$inject = ['$scope'];
  return ListaController;
});