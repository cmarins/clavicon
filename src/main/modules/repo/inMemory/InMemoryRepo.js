define(['repo/inMemory/FichasRepo', 'repo/inMemory/ApuntesRepo'], function (FichasRepo, ApuntesRepo) {
  'use strict';

  return function (config) {
    return function (data) {
      return {
        fichas: FichasRepo(config, data),
        apuntes: ApuntesRepo(config, data)
      };
    };
  };
});