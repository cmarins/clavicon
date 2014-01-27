define(['Q'], function (Q) {
  'use strict';

  function FichasApp(repo) {
    var webApi;

    function setWebApi(_webApi) {
      webApi = _webApi;
    }

    function transitionToListado() {
      Q.when(repo.fichas.page(1), function (fichas) {
        webApi.transitionAndShow('/fichas', fichas);
      });
    }

    function transitionToCrear() {
      webApi.transitionAndShow('/fichas/crear', repo.fichas.create({}));
    }

    function transitionToEditar(ficha) {
      webApi.transitionAndShow('/fichas/' + ficha.numero, ficha);
    }

    function cambiarPagina(page) {
      Q.when(repo.fichas.page(page), webApi.show);
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

    function guardar(ficha) {
      Q.when(repo.fichas.persist(ficha))
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
        guardar: 'fichas.guardar',
        borrar: 'fichas.borrar',
        cambiarPagina: 'fichas.cambiarPagina'
      },
      setWebApi: setWebApi,
      init: transitionToListado,
      irAListado: transitionToListado,
      irACrear: transitionToCrear,
      irAEditar: transitionToEditar,
      crear: crear,
      guardar: guardar,
      borrar: borrar,
      cambiarPagina: cambiarPagina
    };
  }

  return FichasApp;
});