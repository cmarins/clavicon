define(['repo/inMemory/InMemoryRepo', 'repo/elastic/ElasticRepo'], function (InMemoryRepo, ElasticRepo) {
  'use strict';

  return function (config) {
    return {
      inMemory: InMemoryRepo(config), // tendría que ser inMemory: require('repo/inMemory/InMemoryRepo')
      elastic: ElasticRepo(config) // tendría que ser inMemory: require('repo/elastic/ElasticRepo')
    };
  };
});