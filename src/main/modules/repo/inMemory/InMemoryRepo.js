define(['repo/inMemory/FichasRepo'], function (FichasRepo) {
  'use strict';

  return function (config) {
    return function (data) {
      return {
        fichas: FichasRepo(config, data)
      };
    };
  };
});