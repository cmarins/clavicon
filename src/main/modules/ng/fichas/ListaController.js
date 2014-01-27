define([], function () {
  'use strict';

  function ListaController($scope, appApi) {
    function borrar(ficha) {
      appApi.execute(appApi.useCases.fichas.borrar, ficha);
    }

    function irACrear() {
      appApi.execute(appApi.useCases.fichas.irACrear);
    }

    function irAEditar(ficha) {
      appApi.execute(appApi.useCases.fichas.irAEditar, ficha);
    }

    $scope.fichas = [];

    $scope.borrar = borrar;
    $scope.irACrear = irACrear;
    $scope.irAEditar = irAEditar;

    $scope.$on('data', function (event, args) {
      $scope.fichas = args[0];
    });
  }

  ListaController.$inject = ['$scope', 'appApi'];
  return ListaController;
});