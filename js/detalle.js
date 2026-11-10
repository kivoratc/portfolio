(function () {
  const id = new URLSearchParams(window.location.search).get("id");
  const proyecto = window.PROYECTOS.find(function (p) { return p.id === id; });

  const detalle = document.querySelector("#detalle");
  const noEncontrado = document.querySelector("#no-encontrado");

  const visor = document.querySelector("#visor");
  const visorImagen = document.querySelector("#visor-imagen");
  const visorContador = document.querySelector("#visor-contador");
  const visorControles = document.querySelector("#visor-controles");

  let imagenesGaleria = [];
  let tituloProyecto = "";
  let indiceActual = 0;

  function mostrarImagen() {
    visorImagen.src = imagenesGaleria[indiceActual];
    visorImagen.alt = tituloProyecto + ", imagen " + (indiceActual + 1);
    visorContador.textContent = (indiceActual + 1) + " de " + imagenesGaleria.length;
  }

  function moverImagen(paso) {
    const total = imagenesGaleria.length;
    indiceActual = (indiceActual + paso + total) % total;
    mostrarImagen();
  }

  function abrirVisor(indice) {
    indiceActual = indice;
    mostrarImagen();
    document.documentElement.classList.add("visor-abierto");
    visor.showModal();
  }

  function pintarCover(p) {
    const cover = document.querySelector("#cover");
    cover.hidden = !p.cover;
    if (p.cover) {
      cover.src = p.cover;
      cover.alt = p.titulo;
    }
  }

  function pintarGaleria(p) {
    const seccion = document.querySelector("#galeria");
    const lista = document.querySelector("#galeria-lista");

    imagenesGaleria = p.galeria || [];
    tituloProyecto = p.titulo;
    seccion.hidden = imagenesGaleria.length === 0;
    visorControles.hidden = imagenesGaleria.length < 2;

    lista.replaceChildren(
      ...imagenesGaleria.map(function (ruta, indice) {
        const item = document.createElement("li");

        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "galeria-boton";
        boton.setAttribute("aria-label", "Ver imagen " + (indice + 1) + " de " + imagenesGaleria.length);
        boton.addEventListener("click", function () { abrirVisor(indice); });

        const imagen = document.createElement("img");
        imagen.src = ruta;
        imagen.alt = p.titulo + ", imagen " + (indice + 1);
        imagen.loading = "lazy";

        boton.append(imagen);
        item.append(boton);
        return item;
      }),
    );
  }

  function pintarTecnologias(p) {
    const tecnologias = document.querySelector("#tecnologias");
    tecnologias.replaceChildren(
      ...p.tecnologias.map(function (tecnologia) {
        const item = document.createElement("li");
        item.textContent = tecnologia;
        return item;
      }),
    );
  }

  function pintarEnlaces(p) {
    const contenedor = document.querySelector("#enlaces");
    const validos = (p.enlaces || []).filter(function (e) { return e.link; });

    contenedor.replaceChildren(
      ...validos.map(function (enlace, indice) {
        const a = document.createElement("a");
        a.className = indice === 0 ? "boton boton--primario" : "boton";
        a.href = enlace.link;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = enlace.nombre || "Ver proyecto";
        return a;
      }),
    );
    contenedor.hidden = validos.length === 0;
  }

  function pintarDetalle(p) {
    document.title = p.titulo + " · Kivora TC";

    document.querySelector("#titulo").textContent = p.titulo;
    document.querySelector("#categoria").textContent = p.categoria;
    document.querySelector("#anio").textContent = p.anio;
    window.Tarjeta.escribirConNombre(document.querySelector("#resumen"), p.resumen);
    window.Tarjeta.escribirConNombre(document.querySelector("#descripcion"), p.descripcion);

    pintarCover(p);
    pintarGaleria(p);
    pintarTecnologias(p);
    pintarEnlaces(p);
  }

  // Controles del visor: botones, clic en el fondo y flechas del teclado
  document.querySelector("#visor-anterior").addEventListener("click", function () { moverImagen(-1); });
  document.querySelector("#visor-siguiente").addEventListener("click", function () { moverImagen(1); });
  document.querySelector("#visor-cerrar").addEventListener("click", function () { visor.close(); });

  // Al cerrar el visor, la página de atrás vuelve a poder desplazarse
  visor.addEventListener("close", function () {
    document.documentElement.classList.remove("visor-abierto");
  });

  visor.addEventListener("click", function (evento) {
    if (evento.target === visor) {
      visor.close();
    }
  });

  visor.addEventListener("keydown", function (evento) {
    if (evento.key === "ArrowLeft") moverImagen(-1);
    if (evento.key === "ArrowRight") moverImagen(1);
  });

  if (proyecto) {
    pintarDetalle(proyecto);
  } else {
    detalle.hidden = true;
    noEncontrado.hidden = false;
    document.title = "Proyecto no encontrado · Kivora TC";
  }
})();
