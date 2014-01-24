define(['app/AppFactory', 'repo/repoFactory'], function (AppFactory, repoFactory) {
  function TestWeb() {
    var view, data;

    function factory() {
      return {
        bootstrap: function (appApi) {
          appApi.setWebApi(webApi());

        }
      };
    }

    function webApi() {
      return {
        transitionAndShow: function (_view, _data) {
          view = _view;
          data = _data;
        }
      };
    }

    return {
      reset: function () {
        view = null;
        data = null;
      },
      factory: factory,
      status: function () {
        return {
          view: view,
          data: data
        };
      }
    };
  }

  describe("El módulo de Fichas", function () {
    var app, web, ficha = {nombre: 'Cocotero'};

    beforeEach(function () {
      web = TestWeb();
      app = AppFactory(repoFactory.inMemory([]), web.factory);
      app.bootstrap();
      setTimeout(web.reset, 0);
    });

    describe("Permite crear fichas nuevas", function () {
      iit("Transiciona a la vista de listado tras crear una ficha y la lista contiene la lista creada", function () {
        runs(function () {
          app.api.execute(app.api.useCases.fichas.crear, ficha);
        });
        waitsFor(function () {
          return web.status().view;
        });
        runs(function () {
          expect(web.status().view).toBe("/fichas");
          expect(web.status().data.length).toBe(1);
          expect(web.status().data[0].nombre).toBe(ficha.nombre);
        });
      });
      it("Asigna un número consecutivo a cada ficha creada para identificarla", function () {
        runs(function () {
          app.api.execute(app.api.useCases.fichas.crear, ficha);
        });
        waitsFor(function () {
          return web.status().view;
        });
        runs(function () {
          expect(web.status().data[0].numero).toBe(1);
        });
      })
    });
  });
});