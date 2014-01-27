(function (window, require) {
  "use strict";
  var allTestFiles, TEST_REGEXP;

  allTestFiles = [];
  TEST_REGEXP = /Test\.js$/;

  Object.keys(window.__karma__.files).forEach(function (file) {
    if (TEST_REGEXP.test(file)) {
      allTestFiles.push(file);
    }
  });

//	allTestFiles.push("app");
//	allTestFiles.push("mocks");
//	allTestFiles.push("angular-route");

  require({
    // "/base" is the URL from where karma is serving project files
    baseUrl: '/base/src/main/modules',
    paths: {
      'Q': '/base/bower_components/q/q',
      'elasticsearch': '/base/non_bower_components/elasticsearch-js/elasticsearch'
    },
    shim: {
      'elasticsearch': {exports: 'elasticsearch'}
    }
  }, allTestFiles, function () {
    window.__karma__.start();
  }, function (err) {
    var failedModules = err.requireModules;
    console.log("err", err);

    if (failedModules && failedModules[0]) {
      throw new Error("Module couldn't be loaded: " + failedModules);
    } else {
      throw new Error("Unkown error:" + err);
    }
  });
}(window, require));