define(['app/AppApi', 'app/FichasModule', 'app/ApuntesModule'], function (AppApi, FichasModule, ApuntesModule) {
  'use strict';

  function AppFactory(repo, webFactory) {
    var web = webFactory(),
        modules = {
          fichas: FichasModule(repo),
          apuntes: ApuntesModule(repo)
        },
        api = AppApi(modules);

    return {
      api: api,
      bootstrap: function (element) {
        web.bootstrap(api, element);
      }
    };
  }

  return AppFactory;
});