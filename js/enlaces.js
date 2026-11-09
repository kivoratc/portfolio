// Los enlaces a otros sitios (redes, enlaces de proyectos, etc.) se abren en una pestaña nueva.
// Los enlaces dentro del portfolio, y los de la misma página (#...), se abren normal.
(function () {
  function esExterno(destino) {
    try {
      const url = new URL(destino, window.location.href);
      return url.origin !== window.location.origin;
    } catch (error) {
      return false;
    }
  }

  function abrirSiEsExterno(enlace) {
    const destino = enlace.getAttribute("href");
    if (!destino || destino.startsWith("#") || destino.startsWith("mailto:")) {
      return;
    }
    if (esExterno(destino)) {
      enlace.target = "_blank";
      enlace.rel = "noopener noreferrer";
    }
  }

  function revisarNodo(nodo) {
    if (nodo.nodeType !== Node.ELEMENT_NODE) {
      return;
    }
    if (nodo.matches("a[href]")) {
      abrirSiEsExterno(nodo);
    }
    nodo.querySelectorAll("a[href]").forEach(abrirSiEsExterno);
  }

  document.addEventListener("DOMContentLoaded", function () {
    revisarNodo(document.body);

    // Las tarjetas y las páginas de la lista se crean después; se revisan al aparecer
    const observador = new MutationObserver(function (cambios) {
      cambios.forEach(function (cambio) {
        cambio.addedNodes.forEach(revisarNodo);
      });
    });
    observador.observe(document.body, { childList: true, subtree: true });
  });
})();
