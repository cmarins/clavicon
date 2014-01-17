define(['angular', 'ng/navBar/NavBarController'], function (angular, NavBarController) {

  return function () {
    var moduleName = 'navBar';

    angular
        .module(moduleName, [])
        .controller('NavBarController', NavBarController);

    return moduleName;
  };
});