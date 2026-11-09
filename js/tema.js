// Tema claro y oscuro. Por defecto sigue el sistema operativo; el botón permite elegir uno.
// Se carga en el <head> para que la página no cambie de color al mostrarse.
(function () {
  const raiz = document.documentElement;
  const clave = "kivora-tema";
  const sistema = window.matchMedia("(prefers-color-scheme: dark)");

  function eleccionGuardada() {
    try {
      return localStorage.getItem(clave);
    } catch (error) {
      return null;
    }
  }

  function guardarEleccion(valor) {
    try {
      localStorage.setItem(clave, valor);
    } catch (error) {
      // Sin almacenamiento disponible, la elección dura solo en esta página
    }
  }

  function esOscuro() {
    const eleccion = eleccionGuardada();
    if (eleccion === "oscuro") return true;
    if (eleccion === "claro") return false;
    return sistema.matches;
  }

  // Los logos son <picture> con dos fuentes: se elige la versión según el tema real
  function actualizarLogos() {
    const oscuro = esOscuro();
    document.querySelectorAll("picture source").forEach(function (fuente) {
      fuente.media = oscuro ? "all" : "not all";
    });
  }

  function aplicarTema() {
    raiz.dataset.theme = esOscuro() ? "dark" : "light";
    actualizarLogos();
  }

  function textoDelBoton(boton) {
    boton.textContent = esOscuro() ? "Modo claro" : "Modo oscuro";
    boton.setAttribute("aria-label", esOscuro() ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
  }

  // Se aplica antes de pintar la página, para evitar parpadeos
  aplicarTema();

  document.addEventListener("DOMContentLoaded", function () {
    actualizarLogos();

    const boton = document.querySelector("#cambiar-tema");
    if (!boton) {
      return;
    }

    textoDelBoton(boton);
    boton.addEventListener("click", function () {
      guardarEleccion(esOscuro() ? "claro" : "oscuro");
      aplicarTema();
      textoDelBoton(boton);
    });

    // Si no hay elección guardada, el tema sigue al sistema cuando cambia
    sistema.addEventListener("change", function () {
      if (eleccionGuardada() === null) {
        aplicarTema();
        textoDelBoton(boton);
      }
    });
  });
})();
