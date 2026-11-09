// Construye la tarjeta de un proyecto. Usa textContent para no insertar HTML de datos externos.

window.Tarjeta = (function () {
  // Escribe un texto y pone "Kivora TC" en Caveat donde aparezca
  function escribirConNombre(elemento, texto) {
    elemento.replaceChildren();
    texto.split("Kivora TC").forEach(function (parte, indice) {
      if (indice > 0) {
        const nombre = document.createElement("span");
        nombre.className = "nombre-marca";
        nombre.append("Kivora ");
        const tc = document.createElement("span");
        tc.className = "marca-tc";
        tc.textContent = "TC";
        nombre.append(tc);
        elemento.append(nombre);
      }
      elemento.append(parte);
    });
  }

  function crearTarjeta(proyecto) {
    const enlace = document.createElement("a");
    enlace.className = "tarjeta";
    enlace.href = "proyecto.html?id=" + encodeURIComponent(proyecto.id);

    const titulo = document.createElement("h3");
    titulo.textContent = proyecto.titulo;

    const meta = document.createElement("p");
    meta.className = "tarjeta-meta";
    meta.textContent = proyecto.categoria + " · " + proyecto.anio;

    const resumen = document.createElement("p");
    resumen.className = "tarjeta-resumen";
    escribirConNombre(resumen, proyecto.resumen);

    enlace.append(titulo, meta, resumen);
    return enlace;
  }

  function crearItem(proyecto) {
    const item = document.createElement("li");
    item.append(crearTarjeta(proyecto));
    return item;
  }

  return { crearItem: crearItem, escribirConNombre: escribirConNombre };
})();
