define(['repo/domain/Ficha'], function (Ficha) {
  return function (fichas) {
    fichas = !!fichas ? fichas : [];

    function all() {
      return fichas;
    }

    function create(nombre) {
      return Ficha(nombre);
    }

    function persist(ficha) {
      fichas.push(ficha);
      return fichas;
    }

    function remove(ficha) {
      fichas.splice(fichas.indexOf(ficha), 1);
      return all();
    }

    return {
      all: all,
      create: create,
      persist: persist,
      remove: remove
    };
  }
});