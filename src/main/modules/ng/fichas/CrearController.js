define([], function () {
  'use strict';

  function ListaController($scope, appApi) {
    function crear() {
      appApi.execute(appApi.useCases.fichas.crear, $scope.ficha);
    }

    function addEmail() {
      if ($scope.ficha.emails.indexOf($scope.email) == -1)
        $scope.ficha.emails.push($scope.email);
      $scope.email = '';
    }

    function addTelefono() {
      if ($scope.ficha.telefonos.indexOf($scope.telefono) == -1)
        $scope.ficha.telefonos.push($scope.telefono);
      $scope.telefono = '';
    }

    function removeEmail(email) {
      $scope.ficha.emails.splice($scope.ficha.emails.indexOf(email), 1);
    }

    function removeTelefono(telefono) {
      $scope.ficha.telefonos.splice($scope.ficha.telefonos.indexOf(telefono), 1);
    }

    function cancelar() {
      appApi.execute(appApi.useCases.fichas.cancelarCrear);
    }

    function execIfEnterPressed(callback, $event) {
      if ($event.keyCode == 13) {
        $event.preventDefault();
        $scope[callback].call(null);
      }
    }

    $scope.addEmail = addEmail;
    $scope.addTelefono = addTelefono;
    $scope.removeEmail = removeEmail;
    $scope.removeTelefono = removeTelefono;
    $scope.crear = crear;
    $scope.cancelar = cancelar;
    $scope.execIfEnterPressed = execIfEnterPressed;

    $scope.ficha = {};
    $scope.$on('data', function (event, args) {
      $scope.ficha = args[0];
    });
  }

  ListaController.$inject = ['$scope', 'appApi'];
  return ListaController;
});