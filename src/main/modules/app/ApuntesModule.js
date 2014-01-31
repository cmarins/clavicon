define(['Q'], function (Q) {
  'use strict';

  function ApuntesApp(repo) {
    var webApi;

    function setWebApi(_webApi) {
      webApi = _webApi;
    }

    function transitionToListado() {
      Q.when(repo.apuntes.page(1), function (apuntes) {
        webApi.transitionAndShow('/apuntes', apuntes);
      });
    }

    function transitionToCrear() {
      webApi.transitionAndShow('/apuntes/crear', repo.apuntes.create({}));
    }

    function crear(data) {
      var apunte = repo.apuntes.create(data);
      Q
          .when(repo.apuntes.sequences.numero.next(), function (numero) {
            apunte.numero = numero;
            return apunte;
          })
          .then(function (apunteConNumero) {
            return repo.apuntes.persist(apunteConNumero);
          })
          .then(transitionToListado);
    }

    return {
      name: 'apuntes',
      useCases: {
        irAListado: 'apuntes.irAListado',
        irACrear: 'apuntes.irACrear',
        crear: 'apuntes.crear'
      },
      setWebApi: setWebApi,
      init: transitionToListado,
      irAListado: transitionToListado,
      irACrear: transitionToCrear,
      crear: crear
    };
  }

  return ApuntesApp;
});