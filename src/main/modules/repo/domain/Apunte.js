define(['repo/domain/Ficha'], function (Ficha) {
  'use strict';

  function Apunte(data) {
    Apunte.Null.call(this);
    for (var key in this)
      if (!!data && !!data[key])
        this[key] = data[key];
  }

  Apunte.Null = function () {
    this.numero = 0;
    this.total = '';
    this.ficha = new Ficha.Null();
  };

  Apunte.prototype.esUnGasto = function () {
    return this.total < 0;
  };

  Apunte.prototype.esUnIngreso = function () {
    return this.total > 0;
  };

  return Apunte;
});