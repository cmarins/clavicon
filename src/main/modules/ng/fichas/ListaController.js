define([], function () {
  function ListaController($scope, appApi) {
    function borrar(ficha) {
      appApi.execute(appApi.useCases.fichas.borrar, ficha);
    }

    function irACrear() {
      appApi.execute(appApi.useCases.fichas.irACrear);
    }

    $scope.fichas = [];

    $scope.borrar = borrar;
    $scope.irACrear = irACrear;

    $scope.$on('data', function (event, args) {
      console.log("Recibida lista de fichas", args[0]);
      $scope.fichas = args[0];
    });
  }

  ListaController.$inject = ['$scope', 'appApi'];
  return ListaController;
});