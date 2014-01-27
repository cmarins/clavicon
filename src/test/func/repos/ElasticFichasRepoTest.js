define(['repo/elastic/FichasRepo'], function (FichasRepo) {
  describe("El repositorio de Fichas de ElasticSearch", function () {
    var repo, ficha;

    beforeEach(function () {
      repo = FichasRepo();
      ficha = repo.create({});
      ficha.numero = -1234;
      ficha.nombre = "Ficha de test";
    });

    it("Sabe obtener una ficha por su número", function () {
      var sameFicha;
      runs(function () {
        repo.persist(ficha).then(function () {
          repo.withNumero(-1234).then(function (_ficha) {
            sameFicha = _ficha;
          });
        });
      });
      waitsFor(function () {
        return sameFicha;
      });
      runs(function () {
        expect(sameFicha.nombre).toBe(ficha.nombre);
      });
      runs(function () {
        repo.remove(sameFicha).then(function () {
          repo.withNumero(-1234).then(function (ficha) {
            sameFicha = ficha;
          });
        })
      });
      waitsFor(function () {
        return sameFicha == null;
      });
    });
  });
});