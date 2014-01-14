(function (require) {
  "use strict";
  require.config({
    paths: {
      'angular': '../../../bower_components/angular/angular',
      'angular-route': '../../../bower_components/angular-route/angular-route',
      'Q': '../../../bower_components/q/q'
    },
    shim: {
      'angular': { deps: [], exports: 'angular' },
      'angular-route': {deps: ['angular']}
    }
  });

  require(["app/app", "ng/web"], function (App, web) {
    App(web).bootstrap(document);
  });
}(require));