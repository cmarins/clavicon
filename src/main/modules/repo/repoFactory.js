define(['repo/inMemory/InMemoryRepo', 'repo/elastic/ElasticRepo'], function (InMemoryRepo, ElasticRepo) {
  'use strict';

  return {
    inMemory: InMemoryRepo, // tendría que ser inMemory: require('repo/inMemory/InMemoryRepo')
    elastic: ElasticRepo // tendría que ser inMemory: require('repo/elastic/ElasticRepo')
  };
});