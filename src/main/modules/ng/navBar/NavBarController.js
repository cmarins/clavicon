define([], function () {
  'use strict';

  function NavBarController($scope, appApi) {
    $scope.fichas = function () {
      $scope.active = 'fichas';
      appApi.execute(appApi.useCases.fichas.irAListado);
    };

    $scope.apuntes = function () {
      $scope.active = 'apuntes';
      appApi.execute(appApi.useCases.apuntes.irAListado);
    };

    $scope.isActive = function (page) {
      return page == $scope.active;
    };

    $scope.active = 'fichas';
  }

  NavBarController.$inject = ['$scope', 'appApi'];
  return NavBarController;
});

