define(['app/AppFactory', 'repo/repoFactory', 'repo/domain/Ficha'], function (AppFactory, repoFactory, Ficha) {
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
    var app, web;

    describe("Permite crear fichas nuevas", function () {
      var ficha = new Ficha({nombre: 'Cocotero'});
      beforeEach(function () {
        web = TestWeb();
        app = AppFactory(repoFactory.inMemory([]), web.factory);
      });

      it("prepara una ficha vacía y te manda a crearla", function () {
        runs(function () {
          app.bootstrap();
          app.api.execute(app.api.useCases.fichas.irACrear);
        });
        waitsFor(function () {
          return web.status().view;
        });
        runs(function () {
          expect(web.status().view).toBe('/fichas/crear');
          expect(web.status().data.numero).toBe(0);
        });
      });

      it("Asina un número a la ficha, la guarda y te manda al listado de fichas con la nueva ficha")
      runs(function () {
        app.bootstrap();
        app.api.execute(app.api.useCases.fichas.crear, ficha);
      });
      waitsFor(function () {
        return web.status().view;
      });
      runs(function () {
        expect(web.status().view).toBe("/fichas");
        expect(web.status().data.length).toBe(1);
        expect(web.status().data[0].numero).toBe(1);
        expect(web.status().data[0].nombre).toBe(ficha.nombre);
      });
    });

  });

  describe("Permite cambiar una ficha existente", function () {
    var ficha;

    beforeEach(function () {
      ficha = new Ficha({numero: 42, nombre: 'Cocotero'});
      web = TestWeb();
      /**
       * Copio la ficha para que no hagamos el lelo modificando la misma referencia en memoria,
       * lo que provocaría un falso positivo
       **/
      app = AppFactory(repoFactory.inMemory([new Ficha(ficha)]), web.factory);
    });

    it("obtiene la ficha y te manda a su edición", function () {
      runs(function () {
        app.bootstrap();
        app.api.execute(app.api.useCases.fichas.irAEditar, ficha);
      });
      waitsFor(function () {
        return web.status().view;
      });
      runs(function () {
        expect(web.status().view).toBe('/fichas/42');
        expect(web.status().data).toEqual(ficha);
      });
    });

    it("Guarda los cambios en la ficha y te manda al listado con la ficha modificada", function() {
      runs(function () {
        app.bootstrap();
        ficha.nombre = 'Chuchu Blabla';
        app.api.execute(app.api.useCases.fichas.guardar, ficha);
      });
      waitsFor(function () {
        return web.status().view;
      });
      runs(function () {
        expect(web.status().view).toBe('/fichas');
        expect(web.status().data.length).toBe(1);
        expect(web.status().data[0].numero).toBe(ficha.numero);
        expect(web.status().data[0].nombre).toBe(ficha.nombre);
      });
    });
  });
});