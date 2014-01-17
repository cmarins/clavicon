define([], function () {
  function newFicha() {
    return {
      emails: [],
      telefonos: []
    };
  }

  function ListaController($scope, $location, appApi) {
    function create() {
      appApi.execute(appApi.useCases.fichas.crear, $scope.ficha);
      $scope.ficha = newFicha();
    }

    function remove(ficha) {
      appApi.execute(appApi.useCases.fichas.borrar, ficha);
    }


    function add(coleccion, elemento) {
      if ($scope.ficha[coleccion].indexOf(elemento) == -1)
        $scope.ficha[coleccion].push(elemento);
    }

    function remove(coleccion, elemento) {
      $scope.ficha[coleccion].splice($scope.ficha[coleccion].indexOf(elemento), 1);
    }

    $scope.ficha = newFicha();
    $scope.fichas = [];

    $scope.addEmail = function () {
      add('emails', $scope.email);
      $scope.email = '';
    };
    $scope.addTelefono = function () {
      add('telefonos', $scope.telefono);
      $scope.telefono = '';
    };
    $scope.removeEmail = function (email) {
      remove('emails', email);
    };
    $scope.removeTelefono = function (telefono) {
      remove('telefonos', telefono  );
    };
    $scope.create = create;

    $scope.$on('data', function (event, args) {
      $scope.fichas = args[0];
    });
  }

  ListaController.$inject = ['$scope', '$location', 'appApi'];
  return ListaController;
});