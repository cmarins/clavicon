define(['Q'], function (Q) {

  function ApuntesApp(repo) {
    var webApi;

    function setWebApi(_webApi) {
      webApi = _webApi;
    }

    function transitionToListado() {
      webApi.transitionAndShow('/apuntes', []);
    }

    return {
      setWebApi: setWebApi,
      useCases: {
        irAListado: 'apuntes.irAListado'
      },
      init: transitionToListado,
      irAListado: transitionToListado
    };
  }

  return ApuntesApp;
});