define([], function () {
  function ListaController($scope, $location, appApi) {
    function crear() {
      appApi.execute(appApi.useCases.fichas.crear, $scope.ficha);
      $scope.ficha = {
        nombre: ''
      };
    }

    function borrar(ficha) {
      appApi.execute(appApi.useCases.fichas.borrar, ficha);
    }

    $scope.ficha = {
      nombre: ''
    };
    $scope.fichas = [];

    $scope.crear = crear;
    $scope.borrar = borrar;

    $scope.$on('data', function (event, args) {
      $scope.fichas = args[0];
    });
  }

  ListaController.$inject = ['$scope', '$location', 'appApi'];
  return ListaController;
});