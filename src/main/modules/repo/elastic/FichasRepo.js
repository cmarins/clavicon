define(['elasticsearch', 'Q', 'repo/domain/Ficha'], function (elasticsearch, Q, Ficha) {
  'use strict';

  var id_secuencia_numero_ficha = 'numero_ficha';

  function connect() {
    var client = new elasticsearch.Client({
      host: 'localhost:9200',
      log: 'warning',
      apiVersion: '1.0'
    });
    client.ping({
      requestTimeout: 1000
    }, function (error) {
      if (error)
        throw new Error('El cluster de ElasticSearch está caído');
    });
    return client;
  }

  function Sequence(client) {
    return {
      next: function () {
        return client
            .index({
              index: 'clavicon',
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

  return function () {
    var client = connect(),
        sequences = {
          numero: new Sequence(client)
        };

    function all() {
      return client
          .search({
            index: 'clavicon',
            type: 'ficha',
            _source: true,
            size: 50000,
            sort:['numero']
          })
          .then(function (result) {
            return result.hits.hits.map(function (hit) {
              var ficha = new Ficha(hit._source);
              ficha.id = hit._id;
              return ficha;
            });
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
              index: 'clavicon',
              type: 'ficha',
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
        index: 'clavicon',
        type: 'ficha',
        id: ficha.id,
        refresh: true,
        body: ficha
      });
    }

    function insert(ficha) {
      return client.index({
        index: 'clavicon',
        type: 'ficha',
        refresh: true,
        body: ficha
      });
    }

    function persist(ficha) {
      return exists(ficha).then(update, insert).then(all);
    }

    function remove(ficha) {
      return client.delete({
        index: 'clavicon',
        type: 'ficha',
        id: ficha.id,
        refresh: true
      });
    }

    function withNumero(numero) {
      return client
          .search({
            index: 'clavicon',
            type: 'ficha',
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
      create: create,
      persist: persist,
      remove: remove,
      withNumero: withNumero,
      sequences: sequences
    };
  };
});