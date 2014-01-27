define(['app/AppFactory', 'repo/RepoFactory', 'repo/domain/Ficha'], function (AppFactory, RepoFactory, Ficha) {
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
        show: function (_data) {
          data = _data;
        },
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

    describe("Permite ver las fichas existentes", function () {
      var fichasPorPagina = 10, fichas;
      beforeEach(function () {
        fichas = [];
        for (var i = 1; i <= 100; i++)
          fichas.push(new Ficha({numero: i}));
        web = TestWeb();
        app = AppFactory(RepoFactory({itemsPerPage: fichasPorPagina}).inMemory(fichas), web.factory);
      });

      it("Por defecto se ven las primeras X fichas", function () {
        var pagina = 2;
        runs(function () {
          app.bootstrap();
          app.api.execute(app.api.useCases.fichas.cambiarPagina, pagina);
        });
        waitsFor(function () {
          return web.status().data;
        });
        runs(function () {
          // Los números de las fichas de este test son consecutivos del 1 al 100
          // pagina 2 => [11..20]
          expect(web.status().data.fichas[0].numero).toBe((pagina - 1) * fichasPorPagina + 1);
          expect(web.status().data.fichas[9].numero).toBe(pagina * fichasPorPagina);
        });
      });

      it("Permite cambiar a otra página", function () {
        runs(function () {
          app.bootstrap();
          app.api.execute(app.api.useCases.fichas.irAListado);
        });
        waitsFor(function () {
          return web.status().view;
        });
        runs(function () {
          expect(web.status().view).toBe('/fichas');
          expect(web.status().data.fichas.length).toBe(fichasPorPagina);
          expect(web.status().data.total).toBe(fichas.length);
        });
      });
    });

    describe("Permite crear fichas nuevas", function () {
      var ficha = new Ficha({nombre: 'Cocotero'});
      beforeEach(function () {
        web = TestWeb();
        app = AppFactory(RepoFactory({itemsPerPage: 10}).inMemory([]), web.factory);
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
        expect(web.status().data.total).toBe(1);
        expect(web.status().data.fichas[0].numero).toBe(1);
        expect(web.status().data.fichas[0].nombre).toBe(ficha.nombre);
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
      app = AppFactory(RepoFactory({itemsPerPage: 10}).inMemory([new Ficha(ficha)]), web.factory);
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

    it("Guarda los cambios en la ficha y te manda al listado con la ficha modificada", function () {
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
        expect(web.status().data.total).toBe(1);
        expect(web.status().data.fichas[0].numero).toBe(ficha.numero);
        expect(web.status().data.fichas[0].nombre).toBe(ficha.nombre);
      });
    });
  });

  describe("Permite borrar una ficha existente", function () {
    var ficha;

    beforeEach(function () {
      ficha = new Ficha({numero: 42, nombre: 'Cocotero'});
      web = TestWeb();
      app = AppFactory(RepoFactory({itemsPerPage: 10}).inMemory([ficha]), web.factory);
    });

    it("borra la ficha y te manda al listado y la ficha ya no está", function () {
      runs(function () {
        app.bootstrap();
        app.api.execute(app.api.useCases.fichas.borrar, ficha);
      });
      waitsFor(function () {
        return web.status().view;
      });
      runs(function () {
        expect(web.status().view).toBe('/fichas');
        expect(web.status().data.total).toBe(0);
      });
    });
  });
});