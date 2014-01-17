define(['Q'], function (Q) {

  function AppApi(repo) {
    var webApi, useCases;

    function setWebApi(_webApi) {
      webApi = _webApi;
    }

    function transitionToFichas() {
      Q.when(repo.fichas.all())
          .then(function (fichas) {
            webApi.transition('/fichas');
            webApi.show(fichas);
          })
    }

    function crearFicha(request) {
      var ficha = repo.fichas.create(request.nombre);
      Q.when(repo.fichas.persist(ficha))
          .then(transitionToFichas);
    }

    function borrarFicha(ficha) {
      Q.when(repo.fichas.remove(ficha))
          .then(transitionToFichas)
    }

    useCases = {
      fichas: {
        crear: crearFicha,
        borrar: borrarFicha
      }
    };

    return {
      setWebApi: setWebApi,
      execute: function (useCase, params) {
        var match = useCase.match(/^(.+?)\.(.+?)$/);
        useCases[match[1]][match[2]].call(null, params)
      },
      useCases: {
        fichas: {
          crear: 'fichas.crear',
          borrar: 'fichas.borrar'
        }
      }
    };
  }

  function AppFactory(repo, webFactory) {
    var web = webFactory();

    return {
      bootstrap: function (element) {
        web.bootstrap(AppApi(repo), element);
      }
    }
  }

  return AppFactory;
});