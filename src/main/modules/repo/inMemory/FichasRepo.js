define(['repo/domain/Ficha'], function (Ficha) {
  'use strict';

  function Sequence(start) {
    return {
      next: function () {
        return ++start;
      }
    };
  }

  return function (config, fichas) {
    fichas = !!fichas ? fichas : [];

    var sequences = {
      numero: new Sequence(0)
    };

    function all() {
      return fichas;
    }

    function page(number) {
      return fichas.slice((number - 1) * config.itemsPerPage, number * config.itemsPerPage);
    }

    function create(data) {
      return new Ficha(data);
    }

    function exists(ficha) {
      return fichas.some(function (candidate) {
        return candidate.numero == ficha.numero;
      });
    }

    function insert(ficha) {
      fichas.push(ficha);
    }

    function replace(ficha) {
      fichas = fichas.filter(function (candidate) {
        return candidate.numero != ficha.numero;
      });
      fichas.push(ficha);
    }

    function persist(ficha) {
      if (!exists(ficha))
        insert(ficha);
      else
        replace(ficha);
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
      page: page,
      create: create,
      persist: persist,
      remove: remove,
      withNumero: withNumero,
      sequences: sequences
    };
  };
});