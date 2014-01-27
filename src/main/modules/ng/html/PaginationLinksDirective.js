define([], function () {
  'use strict';
  function getBoundaries(current, total, links) {
    var delta = Math.floor(links / 2);
    if (current + delta >= total)
      return { lower: Math.max(0, total - links), upper: total };
    if (0 > current - delta)
      return { lower: 0, upper: Math.min(total, links) };
    return { lower: current - delta, upper: current + links - delta };
  }

  return function PaginationLinksDirective() {
    return {
      restrict: 'E',
      scope: {
        pagination: '='
      },
      replace: true,
      template: '<div>' +
          '<ul class="pagination" ng-show="pagination.total">' +
          '<li><a ng-click="pagination.previous()"><span class="glyphicon glyphicon-chevron-left"></span></a></li>' +
          '<li ng-repeat="link in links" ng-class="{active: pagination.at(link.page)}"><a ng-click="pagination.page(link.page)" ng-bind="link.number"></a></li>' +
          '<li><a ng-click="pagination.next()"><span class="glyphicon glyphicon-chevron-right"></span></a></li>' +
          '</ul>' +
          '<p class="text-info">Mostrando {{pagination.showing()}} elementos de un total de {{pagination.itemCount}}</p>' +
          '</div>',
      controller: function ($scope) {
        if (!$scope.pagination)
          throw new ReferenceError("Missing pagination object for pagination component");

        $scope.links = [];

        function refresh() {
          $scope.links = [];
          var boundaries = getBoundaries($scope.pagination.current, $scope.pagination.total, $scope.pagination.numberOfLinks);
          for (var current = boundaries.lower; current < boundaries.upper; current++) {
            $scope.links.push({
              page: current,
              number: current + 1
            });
          }
        }

        $scope.$watch('pagination', refresh, true);
      }
    };
  };
});