define(['app/FichasApp', 'app/ApuntesApp'], function (FichasApp, ApuntesApp) {

  function AppApi(modules) {
    var useCases = {};
    Object.keys(modules).forEach(function(module) {
      useCases[module] = modules[module].useCases;
    });

    function setWebApi(webApi) {
      Object.keys(modules).forEach(function (module) {
        modules[module].setWebApi(webApi);
      });
      modules.fichas.init();
    }

    return {
      setWebApi: setWebApi,
      execute: function (useCase, params) {
        var match = useCase.match(/^(.+?)\.(.+?)$/),
            module = match[1],
            useCase = match[2];
        modules[module][useCase].call(null, params)
      },
      useCases: useCases
    };
  }

  function AppFactory(repo, webFactory) {
    var web = webFactory();
    var modules = {};
    modules.fichas = FichasApp(repo);
    modules.apuntes = ApuntesApp(repo);

    return {
      bootstrap: function (element) {
        web.bootstrap(AppApi(modules), element);
      }
    }
  }

  return AppFactory;
});