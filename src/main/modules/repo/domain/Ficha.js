define([], function () {
  function Ficha() {
    return {
      numero: arguments[0] | 0,
      nombre: arguments[1] | '',
      nif: arguments[2] | '',
      emails: [],
      telefonos: [],
      direccion: arguments[3] | '',
      localidad: arguments[4] | '',
      codigo_postal: arguments[5] | '',
      provincia: arguments[6] | '',
      pais: arguments[7] | ''
    };
  }

  return Ficha;
});