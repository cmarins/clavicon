define([], function () {
  return function () {
    function all() {
      return [];
    }

    function create(nombre) {
      return {};
    }

    function persist(ficha) {
      return {};
    }

    function remove(ficha) {
      return [];
    }

    return {
      all: all,
      create: create,
      persist: persist,
      remove: remove
    };
  }
});