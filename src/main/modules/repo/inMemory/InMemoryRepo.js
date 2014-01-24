define(['repo/inMemory/FichasRepo'], function (FichasRepo) {
  'use strict';

  return function (data) {

    return {
      fichas: FichasRepo(data)
    };
  };
});