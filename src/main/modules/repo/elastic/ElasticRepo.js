define(['repo/elastic/FichasRepo'], function (FichasRepo) {
  return function () {
    return {
      fichas: FichasRepo()
    };
  };
});