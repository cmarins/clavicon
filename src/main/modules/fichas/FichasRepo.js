define(['Q', 'fichas/Ficha'], function (Q, Ficha) {
  return function (fichas) {
    fichas = !!fichas ? fichas : [];

    function all() {
      return Q.when(fichas);
    }

    function create(nombre) {
      return Ficha(nombre);
    }

    function persist(ficha) {
      fichas.push(ficha);
      return Q.when(ficha);
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