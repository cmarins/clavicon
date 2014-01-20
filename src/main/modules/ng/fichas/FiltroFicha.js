define([], function () {

  function oneContainsTheOther(one, theOther) {
    return one.toString().toLocaleLowerCase().indexOf(theOther.toString().toLocaleLowerCase()) != -1;
  }

  return function () {
    return function (fichas, filtro) {
      if (!filtro) {
        return fichas;
      }

      return fichas.filter(function (ficha) {
        return ['nombre', 'nif', 'direccion', 'localidad', 'codigo_postal', 'provincia', 'pais']
            .some(function (campo) {
              return oneContainsTheOther(ficha[campo], filtro);
            })
            || ['emails', 'telefonos']
            .some(function (campo) {
              return ficha[campo].some(function (valor) {
                return oneContainsTheOther(valor, filtro);
              });
            });
      });


    };
  }
});