define(['repo/domain/Ficha'], function (Ficha) {
  'use strict';

  function Sequence(start) {
    return {
      next: function() {
        return ++start;
      }
    };
  }


  return function (fichas) {
    fichas = !!fichas ? fichas : [];

    var sequences = {
      numero: new Sequence(0)
    };

    function all() {
      return fichas;
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
      fichas.push(ficha);
      return fichas;
    }

    function remove(ficha) {
      fichas.splice(fichas.indexOf(ficha), 1);
      return all();
    }

    function withNumero(numero) {
      var candidatas = fichas.filter(function (ficha) {
        return ficha.numero == numero;
      });
      return candidatas[0];
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