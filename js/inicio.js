// Inicio muestra solo los proyectos destacados (máximo 3). Si no hay ninguno, la sección se oculta.
(function () {
  const seccion = document.querySelector("#seccion-destacados");
  const destacados = window.PROYECTOS.filter(function (p) { return p.destacado; }).slice(0, 3);

  seccion.hidden = destacados.length === 0;
  document.querySelector("#destacados").replaceChildren(...destacados.map(window.Tarjeta.crearItem));
})();
