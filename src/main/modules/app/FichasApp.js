define(['Q'], function (Q) {

  function FichasApp(repo) {
    var webApi;

    function setWebApi(_webApi) {
      webApi = _webApi;
    }

    function transitionToListado() {
      Q.when(repo.fichas.all())
          .then(function (fichas) {
            webApi.transitionAndShow('/fichas', fichas);
          });
    }

    function transitionToCrear() {
      webApi.transitionAndShow('/fichas/crear', repo.fichas.create({}));
    }

    function crear(ficha) {
      Q.when(repo.fichas.persist(repo.fichas.create(ficha)))
          .then(transitionToListado);
    }

    function borrar(ficha) {
      Q.when(repo.fichas.remove(ficha))
          .then(transitionToListado);
    }

    return {
      setWebApi: setWebApi,
      useCases: {
        irAListado: 'fichas.irAListado',
        irACrear: 'fichas.irACrear',
        crear: 'fichas.crear',
        cancelarCrear: 'fichas.cancelarCrear',
        borrar: 'fichas.borrar'
      },
      init: transitionToListado,
      irAListado: transitionToListado,
      irACrear: transitionToCrear,
      crear: crear,
      cancelarCrear: transitionToListado,
      borrar: borrar
    };
  }

  return FichasApp;
});