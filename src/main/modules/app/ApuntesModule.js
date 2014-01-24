define([], function () {
  'use strict';

  function ApuntesApp() {
    var webApi;

    function setWebApi(_webApi) {
      webApi = _webApi;
    }

    function transitionToListado() {
      webApi.transitionAndShow('/apuntes', []);
    }

    return {
      name: 'apuntes',
      useCases: {
        irAListado: 'apuntes.irAListado'
      },
      setWebApi: setWebApi,
      init: transitionToListado,
      irAListado: transitionToListado
    };
  }

  return ApuntesApp;
});