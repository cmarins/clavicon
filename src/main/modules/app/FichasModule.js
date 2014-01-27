define(['Q'], function (Q) {
  'use strict';

  function FichasApp(repo) {
    var webApi;

    function setWebApi(_webApi) {
      webApi = _webApi;
    }

    function transitionToListado() {
      Q.when(repo.fichas.all(), function (fichas) {
        webApi.transitionAndShow('/fichas', fichas);
      });
    }

    function transitionToCrear() {
      webApi.transitionAndShow('/fichas/crear', repo.fichas.create({}));
    }

    function transitionToEditar(numeroFicha) {
      Q.when(repo.fichas.withNumero(numeroFicha), function (ficha) {
        webApi.transitionAndShow('/fichas/' + numeroFicha, ficha);
      });
    }

    function crear(data) {
      var ficha = repo.fichas.create(data);
      Q
          .when(repo.fichas.sequences.numero.next(), function (numero) {
            ficha.numero = numero;
            return ficha;
          })
          .then(function (a) {
            return repo.fichas.persist(a);
          })
          .then(transitionToListado);
    }

    function borrar(ficha) {
      Q.when(repo.fichas.remove(ficha))
          .then(transitionToListado);
    }

    return {
      name: 'fichas',
      useCases: {
        irAListado: 'fichas.irAListado',
        irACrear: 'fichas.irACrear',
        irAEditar: 'fichas.irAEditar',
        crear: 'fichas.crear',
        cancelarCrear: 'fichas.cancelarCrear',
        borrar: 'fichas.borrar'
      },
      setWebApi: setWebApi,
      init: transitionToListado,
      irAListado: transitionToListado,
      irACrear: transitionToCrear,
      irAEditar: transitionToEditar,
      crear: crear,
      cancelarCrear: transitionToListado,
      borrar: borrar
    };
  }

  return FichasApp;
});