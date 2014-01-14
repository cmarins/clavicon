define(['fichas/fichasModule'], function (fichas) {

  function App() {
    var webAdapter;

    function setWebAdapter(_webAdapter) {
      webAdapter = _webAdapter;
      transitionToFichas();
    }

    function transitionToFichas() {
      fichas.repo.all()
          .then(function (fichas) {
            webAdapter.transition('/fichas');
            webAdapter.show(fichas);
          })
    }

    function crearFicha(nombre) {
      fichas.repo.persist(fichas.repo.create(nombre))
          .then(transitionToFichas);
    }

    function borrarFicha(ficha) {
      fichas.repo.remove(ficha)
          .then(transitionToFichas)
    }

    return {
      setWebAdapter: setWebAdapter,
      crearFicha: crearFicha,
      borrarFicha: borrarFicha
    };
  }

  return function (webFactory) {
    var web = webFactory(App());

    return {
      bootstrap: function (element) {
        web.bootstrap(element);
      }
    }
  }
});