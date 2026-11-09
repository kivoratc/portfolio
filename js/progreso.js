// Barra de progreso de lectura: refleja cuánto de la página ya se recorrió.
(function () {
  const barra = document.querySelector("#progreso");
  if (!barra) {
    return;
  }

  function actualizar() {
    const recorrible = document.documentElement.scrollHeight - window.innerHeight;
    const avance = recorrible > 0 ? window.scrollY / recorrible : 0;
    const limitado = Math.min(Math.max(avance, 0), 1);
    barra.style.transform = "scaleX(" + limitado + ")";
  }

  window.addEventListener("scroll", actualizar, { passive: true });
  window.addEventListener("resize", actualizar);
  actualizar();
})();
