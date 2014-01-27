define([], function () {
  'use strict';

  function WebApi($rootScope, $location) {
    function transition(target) {
      setTimeout(function () {
        $rootScope.$apply(function () {
          $location.path(target);
        });
      }, 0);
    }

    function notify(type, message) {
      setTimeout(function () {
        $rootScope.$apply(function () {
          $rootScope.$broadcast('notify', [type, message]);
        });
      }, 0);
    }

    function show(data) {
      setTimeout(function () {
        $rootScope.$apply(function () {
          $rootScope.$broadcast('data', [data]);
        });
      }, 0);
    }

    function transitionAndShow(target, data) {
      setTimeout(function () {
        var eventDeregistration = $rootScope.$on('$routeChangeSuccess', function (event, route) {
          if (!!route && route.regexp.test(target)) {
            show(data);
            eventDeregistration();
          }
        });
      }, 0);
      transition('/');
      transition(target);
    }

    return {
      transition: transition,
      transitionAndShow: transitionAndShow,
      notify: notify,
      show: show
    };
  }

  return WebApi;
});