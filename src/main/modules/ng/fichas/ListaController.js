define([], function () {
  return function (appAdapter) {
    function ListaController($scope, $location) {
      function crear() {
        appAdapter.crearFicha($scope.nombre);
        $scope.nombre = "";
      }

      function borrar(ficha) {
        appAdapter.borrarFicha(ficha);
      }

      $scope.fichas = [];

      $scope.crear = crear;
      $scope.borrar = borrar;

      $scope.$on('data', function (event, args) {
        $scope.fichas = args[0];
      });
    }

    ListaController.$inject = ['$scope', '$location'];
    return ListaController;
  };
});