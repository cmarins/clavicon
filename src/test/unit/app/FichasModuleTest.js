define(['TestWebAdapter', 'app/AppFactory', 'repo/RepoFactory', 'repo/domain/Ficha'], function (TestWebAdapter, AppFactory, RepoFactory, Ficha) {

  describe("El módulo de Fichas", function () {
    var app, web, repo;

    describe("Permite ver las fichas existentes", function () {
      var fichasPorPagina = 10, fichas;
      beforeEach(function () {
        fichas = [];
        for (var i = 1; i <= 100; i++)
          fichas.push(new Ficha({numero: i}));
        web = TestWebAdapter();
        repo = RepoFactory({itemsPerPage: fichasPorPagina}).inMemory(fichas);
        app = AppFactory(repo, web.factory);
      });

      it("Por defecto se ven las primeras X fichas", function () {
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
          expect(web.status().data.fichas[0]).toBe(fichas[0]);
          expect(web.status().data.fichas[9]).toBe(fichas[9]);
          expect(web.status().data.total).toBe(fichas.length);
        });
      });

      it("Permite cambiar a otra página", function () {
        var pagina = 2;
        runs(function () {
          app.bootstrap();
          app.api.execute(app.api.useCases.fichas.cambiarPagina, pagina);
        });
        waitsFor(function () {
          return web.status().data;
        });
        runs(function () {
          expect(web.status().data.fichas[0]).toBe(fichas[10]);
          expect(web.status().data.fichas[9]).toBe(fichas[19]);
        });
      });
    });

    describe("Permite crear fichas nuevas", function () {

      beforeEach(function () {
        web = TestWebAdapter();
        repo = RepoFactory({itemsPerPage: 10}).inMemory([]);
        app = AppFactory(repo, web.factory);
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

      it("Asigna un número a la ficha, la guarda y te manda al listado de fichas con la nueva ficha", function () {
        var ficha = new Ficha({nombre: 'Cocotero'});
        runs(function () {
          app.bootstrap();
          app.api.execute(app.api.useCases.fichas.crear, ficha);
        });
        waitsFor(function () {
          return web.status().view;
        });
        runs(function () {
          expect(repo.fichas.all().length).toBe(1);
          expect(web.status().view).toBe("/fichas");
          expect(web.status().data.total).toBe(1);
          expect(web.status().data.fichas).toEqual(repo.fichas.all());
        });
      });
    });

    describe("Permite cambiar una ficha existente", function () {
      var ficha;

      beforeEach(function () {
        ficha = new Ficha({numero: 42, nombre: 'Cocotero'});
        web = TestWebAdapter();
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
        web = TestWebAdapter();
        repo = RepoFactory({itemsPerPage: 10}).inMemory([ficha]);
        app = AppFactory(repo, web.factory);
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
          expect(repo.fichas.all().length).toBe(0);
          expect(web.status().view).toBe('/fichas');
          expect(web.status().data.total).toBe(0);
        });
      });
    });
  });
});