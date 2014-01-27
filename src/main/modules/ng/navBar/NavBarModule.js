define(['angular', 'ng/navBar/NavBarController'], function (angular, NavBarController) {
  'use strict';
  var moduleName = 'navBar';

  return function () {
    angular
        .module(moduleName, [])
        .controller('NavBarController', NavBarController);

    return moduleName;
  };
});