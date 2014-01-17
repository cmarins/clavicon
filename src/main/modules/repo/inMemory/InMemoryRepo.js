define(['repo/inMemory/FichasRepo'], function (FichasRepo) {
  return function () {
    return {
      fichas: FichasRepo()
    };
  };
});