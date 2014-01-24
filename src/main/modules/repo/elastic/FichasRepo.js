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
            _source: true
          })
          .then(function (result) {
            return result.hits.hits.map(function (hit) {
              var ficha = hit._source;
              ficha.id = hit._id;
              return ficha;
            });
          });
    }

    // TODO Extraer a una factoría en Ficha
    function create(data) {
      var ficha = Ficha();
      ficha.nombre = data.nombre;
      ficha.nif = data.nif;
      ficha.emails = data.emails || [];
      ficha.telefonos = data.telefonos || [];
      ficha.direccion = data.direccion;
      ficha.localidad = data.localidad;
      ficha.codigo_postal = data.codigo_postal;
      ficha.provincia = data.provincia;
      ficha.pais = data.pais;
      return  ficha;
    }

    function persist(ficha) {
      return client
          .index({
            index: 'clavicon',
            type: 'ficha',
            body: ficha,
            refresh: true
          })
          .then(all);
    }

    function remove(ficha) {
      return client.delete({
        index: 'clavicon',
        type: 'ficha',
        id: ficha.id,
        refresh: true
      });
    }

    return {
      all: all,
      create: create,
      persist: persist,
      remove: remove,
      sequences: sequences
    };
  };
});