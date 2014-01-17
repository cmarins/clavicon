define([], function () {
  function NavBarController($scope, $location) {
    $scope.fichas = function () {
      $scope.active = 'fichas';
      $location.path('/fichas');
    };

    $scope.apuntes = function () {
      $scope.active = 'apuntes';
      $location.path('/apuntes');
    };

    $scope.isActive = function(page) {
      return page == $scope.active;
    };

    $scope.active = 'fichas';
  }

  NavBarController.$inject = ['$scope', '$location'];
  return NavBarController;
});

