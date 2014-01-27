define([], function () {
  'use strict';

  function EditarController($scope, appApi) {
    function guardar() {
      if (!!$scope.ficha.numero)
        appApi.execute(appApi.useCases.fichas.guardar, $scope.ficha);
      else
        appApi.execute(appApi.useCases.fichas.crear, $scope.ficha);
    }

    function cancelar() {
      appApi.execute(appApi.useCases.fichas.irAListado);
    }

    $scope.ficha = {};

    $scope.guardar = guardar;
    $scope.cancelar = cancelar;

    $scope.$on('data', function (event, args) {
      $scope.ficha = args[0];
    });
  }

  EditarController.$inject = ['$scope', 'appApi'];
  return EditarController;
});