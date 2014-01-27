define(['angular', 'ng/html/Pagination', 'ng/html/PaginationLinksDirective'], function (angular, Pagination, PaginationLinksDirective) {
  'use strict';

  var moduleName = 'html';

  return function () {
    angular
        .module(moduleName, [])
        .factory('Pagination', Pagination)
        .directive('paginationLinks', PaginationLinksDirective);


    return moduleName;
  };
});