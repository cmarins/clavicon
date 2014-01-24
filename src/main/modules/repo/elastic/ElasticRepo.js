define(['repo/elastic/FichasRepo'], function (FichasRepo) {
  'use strict';

  return function () {
    return {
      fichas: FichasRepo()
    };
  };
});