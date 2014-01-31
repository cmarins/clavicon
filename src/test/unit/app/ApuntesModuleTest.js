define(['TestWebAdapter', 'app/AppFactory', 'repo/RepoFactory', 'repo/domain/Apunte'], function (TestWebAdapter, AppFactory, RepoFactory, Apunte) {
  describe("El módulo de Apuntes", function () {
    var app, web, repo;

    describe("Permite ver los apuntes existentes", function () {
      xit("Por defecto se ven los primeros X apuntes", function () {
      });

      xit("Permite cambiar a otra página", function () {
      });
    });

    describe("Permite crear apuntes nuevos", function () {
      beforeEach(function () {
        web = TestWebAdapter();
        repo = RepoFactory({itemsPerPage: 10}).inMemory([]);
        app = AppFactory(repo, web.factory);
      });

      it("prepara una apunte vacía y te manda a crearla", function () {
        runs(function () {
          app.bootstrap();
          app.api.execute(app.api.useCases.apuntes.irACrear);
        });
        waitsFor(function () {
          return web.status().view;

        });
        runs(function () {
          expect(web.status().view).toBe('/apuntes/crear');
          expect(web.status().data.numero).toBe(0);
        });
      });

      it("Asigna un número al apunte, lo guarda y te manda al listado de apuntes con el nuevo apunte", function () {
        var apunte = repo.apuntes.create({cantidad: 42});
        runs(function () {
          app.bootstrap();
          app.api.execute(app.api.useCases.apuntes.crear, apunte);
        });
        waitsFor(function () {
          return web.status().view;
        });
        runs(function () {
          expect(repo.apuntes.all().length).toBe(1);
          expect(web.status().view).toBe("/apuntes");
          expect(web.status().data.total).toBe(1);
          expect(web.status().data.apuntes).toEqual(repo.apuntes.all());
        });
      });

      xit("Asina un número a la apunte, la guarda y te manda al listado de fichas con la nueva apunte", function () {
      });
    });

    describe("Permite cambiar una ficha existente", function () {
      xit("obtiene la ficha y te manda a su edición", function () {
      });

      xit("Guarda los cambios en la ficha y te manda al listado con la ficha modificada", function () {
      });
    });

    describe("Permite borrar una ficha existente", function () {
      xit("borra la ficha y te manda al listado y la ficha ya no está", function () {
      });
    });
  });
});