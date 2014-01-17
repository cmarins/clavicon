define(['repo/inMemory/InMemoryRepo', 'repo/elastic/ElasticRepo'], function (InMemoryRepo, ElasticRepo) {
  return {
    inMemory: InMemoryRepo,
    elastic: ElasticRepo
  };
});