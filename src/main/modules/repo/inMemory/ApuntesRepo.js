define(['repo/domain/Apunte'], function (Apunte) {
  'use strict';

  function Sequence(start) {
    return {
      next: function () {
        return ++start;
      }
    };
  }

  return function (config, apuntes) {
    apuntes = !!apuntes ? apuntes : [];

    var sequences = {
      numero: new Sequence(0)
    };

    function all() {
      return apuntes;
    }

    function page(number) {
      return {
        apuntes: apuntes.slice((number - 1) * config.itemsPerPage, number * config.itemsPerPage),
        total: apuntes.length
      };
    }

    function create(data) {
      return new Apunte(data);
    }

    function exists(apunte) {
      return apuntes.some(function (candidate) {
        return candidate.numero == apunte.numero;
      });
    }

    function insert(apunte) {
      apuntes.push(apunte);
    }

    function replace(apunte) {
      apuntes = apuntes.filter(function (candidate) {
        return candidate.numero != apunte.numero;
      });
      apuntes.push(apunte);
    }

    function persist(apunte) {
      if (!exists(apunte))
        insert(apunte);
      else
        replace(apunte);
      return apuntes;
    }

    function remove(apunte) {
      apuntes.splice(apuntes.indexOf(apunte), 1);
      return all();
    }

    function withNumero(numero) {
      var candidates = apuntes.filter(function (apunte) {
        return apunte.numero == numero;
      });
      return candidates[0];
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