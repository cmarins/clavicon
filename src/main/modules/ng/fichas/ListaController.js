define([], function () {
  'use strict';

  function ListaController($scope, config, appApi, Pagination) {
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
    $scope.pagination = Pagination.create(config.itemsPerPage, 5);

    $scope.borrar = borrar;
    $scope.irACrear = irACrear;
    $scope.irAEditar = irAEditar;

    $scope.$watch('pagination.current', function (currentPage, lastPage) {
      if (currentPage != lastPage)
        appApi.execute(appApi.useCases.fichas.cambiarPagina, currentPage + 1);
    });

    $scope.$on('data', function (event, args) {
      $scope.fichas = args[0].fichas;
      $scope.pagination.totalItems(args[0].total);
    });
  }

  ListaController.$inject = ['$scope', 'config', 'appApi', 'Pagination'];
  return ListaController;
});