define(['repo/domain/Ficha'], function (Ficha) {
  var secuencias = {
    numero: 0
  };

  return function (fichas) {
    fichas = !!fichas ? fichas : [];

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
      if (!ficha.numero)
        ficha.numero = ++secuencias.numero
      fichas.push(ficha);
      return fichas;
    }

    function remove(ficha) {
      fichas.splice(fichas.indexOf(ficha), 1);
      return all();
    }

    return {
      all: all,
      create: create,
      persist: persist,
      remove: remove
    };
  }
});