define([], function () {
  'use strict';

  function onAllModules(modules, doSomething) {
    Object.keys(modules).forEach(function (moduleName) {
      doSomething.call(null, modules[moduleName]);
    });
  }

  function harvestUseCases(modules) {
    var useCases = {};
    onAllModules(modules, function (module) {
      useCases[module.name] = module.useCases;
    });
    return useCases;
  }

  function AppApi(modules) {
    function setWebApi(webApi) {
      onAllModules(modules, function (module) {
        module.setWebApi(webApi);
      });
      modules.fichas.init();
    }

    var useCases = harvestUseCases(modules);

    return {
      setWebApi: setWebApi,
      execute: function (operation, params) {
        var match = operation.match(/^(.+?)\.(.+?)$/),
            module = match[1],
            useCase = match[2];
        modules[module][useCase].call(null, params);
      },
      useCases: useCases
    };
  }

  return AppApi;
});