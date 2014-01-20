(function (require) {
  "use strict";
  require.config({
    paths: {
      'angular': '../../../bower_components/angular/angular',
      'angular-route': '../../../bower_components/angular-route/angular-route',
      'Q': '../../../bower_components/q/q',
      'elasticsearch': '../../../non_bower_components/elasticsearch-js/elasticsearch'
    },
    shim: {
      'angular': {deps: [], exports: 'angular'},
      'angular-route': {deps: ['angular']},
      'elasticsearch': {exports: 'elasticsearch'}
    }
  });

  require(["app/AppFactory", "repo/repoFactory", "ng/WebFactory"], function (AppFactory, repoFactory, WebFactory) {
    var repo = repoFactory.elastic();
    AppFactory(repo, WebFactory).bootstrap(document);
  });
}(require));