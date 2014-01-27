define(['elasticsearch', 'Q', 'repo/domain/Ficha'], function (elasticsearch, Q, Ficha) {
  'use strict';

  var type = 'ficha',
      id_secuencia_numero_ficha = 'numero_ficha';

  // TODO Extraer a su propio repo
  function Sequence(client, config) {
    return {
      next: function () {
        return client
            .index({
              index: config.elastic.index,
              type: 'secuencia',
              id: id_secuencia_numero_ficha,
              body: {}
            })
            .then(function (result) {
              return result._version;
            });
      }
    };
  }

  return function (config) {
    function connect() {
      var client = new elasticsearch.Client({
        host: config.elastic.host,
        apiVersion: config.elastic.apiVersion,
        log: config.elastic.log
      });
      client.ping({
        requestTimeout: 1000
      }, function (error) {
        if (error)
          throw new Error('El cluster de ElasticSearch está caído');
      });
      return client;
    }

    var client = connect(),
        sequences = {
          numero: new Sequence(client, config)
        };

    function all() {
      return client
          .search({
            index: config.elastic.index,
            type: type,
            _source: true,
            size: 50000,
            sort: ['numero']
          })
          .then(function (result) {
            return result.hits.hits.map(function (hit) {
              var ficha = new Ficha(hit._source);
              ficha.id = hit._id;
              return ficha;
            });
          });
    }

    function page(number) {
      return client
          .search({
            index: config.elastic.index,
            type: type,
            _source: true,
            from: (number - 1) * config.itemsPerPage,
            size: config.itemsPerPage,
            sort: ['numero']
          })
          .then(function (result) {
            return {
              fichas: result.hits.hits.map(function (hit) {
                var ficha = new Ficha(hit._source);
                ficha.id = hit._id;
                return ficha;
              }),
              total: result.hits.total
            };
          });
    }

    function create(data) {
      return new Ficha(data);
    }

    function exists(ficha) {
      var d = Q.defer();
      if (!ficha.id)
        d.reject(ficha);
      else
        client
            .exists({
              index: config.elastic.index,
              type: type,
              id: ficha.id
            }, function (err, exists) {
              if (exists)
                d.resolve(ficha);
              else
                d.reject(ficha);
            });
      return d.promise;
    }

    function update(ficha) {
      return client.index({
        index: config.elastic.index,
        type: type,
        id: ficha.id,
        refresh: true,
        body: ficha
      });
    }

    function insert(ficha) {
      return client.index({
        index: config.elastic.index,
        type: type,
        refresh: true,
        body: ficha
      });
    }

    function persist(ficha) {
      return exists(ficha).then(update, insert).then(all);
    }

    function remove(ficha) {
      return client.delete({
        index: config.elastic.index,
        type: type,
        id: ficha.id,
        refresh: true
      });
    }

    function withNumero(numero) {

      return client
          .search({
            index: config.elastic.index,
            type: type,
            body: {
              query: {
                filtered: {
                  query: {match_all: {}},
                  filter: {term: {numero: numero}}
                }
              },
              size: 1
            }
          })
          .then(function (result) {
            if (result.hits.hits.length === 0)
              return null;
            var ficha = new Ficha(result.hits.hits[0]._source);
            ficha.id = result.hits.hits[0]._id;
            return ficha;
          });
    }

    return {
      all: all,
      page: page,
      create: create,
      persist: persist,
      remove: remove,
      withNumero: withNumero,
      sequences: sequences
    };
  };
});