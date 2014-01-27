define([], function () {
  'use strict';

  function ListaController($scope, appApi, Pagination) {
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
    $scope.pagination = Pagination.create(10, 5);

    $scope.borrar = borrar;
    $scope.irACrear = irACrear;
    $scope.irAEditar = irAEditar;

    $scope.$on('data', function (event, args) {
      $scope.fichas = args[0];
      $scope.pagination.totalItems(args[0].length);
    });
  }

  ListaController.$inject = ['$scope', 'appApi', 'Pagination'];
  return ListaController;
});