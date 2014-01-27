define([], function () {
  'use strict';

  function FichasFormDirective() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: 'modules/ng/fichas/_form.html',
      scope: {
        ficha: '='
      },
      controller: ['$scope', function($scope) {
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
        $scope.execIfEnterPressed = execIfEnterPressed;
      }]
    };
  }

  return FichasFormDirective;
});