(function () {
  // Cuántos proyectos se muestran por página
  const POR_PAGINA = 3;

  const proyectos = window.PROYECTOS;
  const crearItem = window.Tarjeta.crearItem;
  const filtros = { texto: "", categoria: null };
  let paginaActual = 1;

  const lista = document.querySelector("#lista-proyectos");
  const contador = document.querySelector("#contador");
  const vacio = document.querySelector("#vacio");
  const paginacion = document.querySelector("#paginacion");

  function coincide(proyecto) {
    const busqueda = filtros.texto.trim().toLowerCase();
    const contenido = [proyecto.titulo, proyecto.resumen].concat(proyecto.tecnologias)
      .join(" ")
      .toLowerCase();

    return (
      (busqueda === "" || contenido.includes(busqueda)) &&
      (filtros.categoria === null || proyecto.categoria === filtros.categoria)
    );
  }

  function crearBoton(texto, clase, destino, actual) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = clase;
    boton.textContent = texto;
    boton.disabled = destino === null;
    if (actual) {
      boton.setAttribute("aria-current", "page");
    }
    boton.addEventListener("click", function () {
      irAPagina(destino);
    });
    return boton;
  }

  function pintarPaginacion(total) {
    paginacion.hidden = total <= 1;

    const botones = [
      crearBoton("Anterior", "boton", paginaActual > 1 ? paginaActual - 1 : null, false),
    ];
    for (let numero = 1; numero <= total; numero++) {
      botones.push(crearBoton(String(numero), "pagina", numero, numero === paginaActual));
    }
    botones.push(
      crearBoton("Siguiente", "boton", paginaActual < total ? paginaActual + 1 : null, false),
    );

    paginacion.replaceChildren(...botones);
  }

  function pintar() {
    const resultado = proyectos.filter(coincide);
    const totalPaginas = Math.max(1, Math.ceil(resultado.length / POR_PAGINA));
    paginaActual = Math.min(paginaActual, totalPaginas);

    const inicio = (paginaActual - 1) * POR_PAGINA;
    lista.replaceChildren(...resultado.slice(inicio, inicio + POR_PAGINA).map(crearItem));
    vacio.hidden = resultado.length > 0;

    const etiqueta = resultado.length === 1 ? "proyecto" : "proyectos";
    contador.textContent = resultado.length + " " + etiqueta;
    pintarPaginacion(totalPaginas);
  }

  function irAPagina(numero) {
    paginaActual = numero;
    pintar();

    // El botón de la página activa se vuelve a crear; se le devuelve el foco
    const actual = paginacion.querySelector('[aria-current="page"]');
    if (actual) {
      actual.focus();
    }
    contador.scrollIntoView({ block: "start" });
  }

  function crearBotonFiltro(texto, valor, grupo) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "filtro";
    boton.textContent = texto;
    boton.setAttribute("aria-pressed", String(filtros.categoria === valor));

    boton.addEventListener("click", function () {
      filtros.categoria = valor;
      paginaActual = 1;
      grupo.querySelectorAll(".filtro").forEach(function (otro) {
        otro.setAttribute("aria-pressed", String(otro === boton));
      });
      pintar();
    });

    return boton;
  }

  function montarCategorias() {
    const grupo = document.getElementById("filtro-categoria");
    const categorias = [...new Set(proyectos.map(function (p) { return p.categoria; }))];
    const opciones = [null].concat(categorias);
    grupo.replaceChildren(
      ...opciones.map(function (valor) {
        return crearBotonFiltro(valor === null ? "Todos" : valor, valor, grupo);
      }),
    );
  }

  montarCategorias();

  document.querySelector("#buscar").addEventListener("input", function (evento) {
    filtros.texto = evento.target.value;
    paginaActual = 1;
    pintar();
  });

  pintar();
})();
