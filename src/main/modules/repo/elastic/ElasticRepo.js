define(['repo/elastic/FichasRepo'], function (FichasRepo) {
  'use strict';

  return function (config) {
    return function () {
      return {
        fichas: FichasRepo(config)
      };
    };
  };
});