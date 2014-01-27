define([], function () {
  'use strict';

  function Ficha(data) {
    Ficha.Null.call(this);
    for (var key in this)
      if (!!data && !!data[key])
        this[key] = data[key];
  }

  Ficha.Null = function () {
    this.numero = 0;
    this.nombre = '';
    this.nif = '';
    this.emails = [];
    this.telefonos = [];
    this.direccion = '';
    this.localidad = '';
    this.codigo_postal = '';
    this.provincia = '';
    this.pais = '';
  };

  Ficha.prototype = Ficha.Null.prototype;

  return Ficha;
});