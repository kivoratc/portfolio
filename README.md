# Kivora TC · Portfolio

Portfolio de la marca Kivora TC: inicio, lista de proyectos con buscador y filtros, detalle de cada proyecto y una página sobre mí.

Está hecho con HTML, CSS y JavaScript puro, sin dependencias ni proceso de compilación.

## Estructura

```
index.html          Inicio: portada y proyectos destacados
proyectos.html      Lista de proyectos: buscador, filtros y paginación
proyecto.html       Detalle de un proyecto (se llena desde los datos)
sobre-mi.html       Sobre mí y redes sociales
404.html            Página no encontrada
css/                Estilos, un archivo por componente o sección
  tokens.css        Colores, tipografía, espaciado y forma (sistema de diseño)
js/
  datos.js          Lista de proyectos: aquí se agregan o editan
  tarjeta.js        Construye las tarjetas de proyecto
  inicio.js         Muestra los destacados en el inicio
  proyectos.js      Buscador, filtros y paginación
  detalle.js        Detalle, galería y visor de imágenes
  progreso.js       Barra de progreso de lectura
assets/             Logos y imágenes de los proyectos
```

## Ver el sitio en tu computadora

Abre `index.html` con doble clic. No hace falta un servidor.

## Agregar un proyecto

Edita `js/datos.js` y copia un objeto de la lista:

| Campo | Qué es |
|---|---|
| `id` | Único y sin espacios. Va en la URL: `proyecto.html?id=...` |
| `titulo`, `categoria`, `anio` | Datos que aparecen en la tarjeta y en el detalle |
| `resumen` | Texto corto de la tarjeta |
| `descripcion` | Texto del detalle |
| `tecnologias` | Lista de etiquetas |
| `enlaces` | Lista de `{ nombre, link }`. Los de `link` vacío no se muestran |
| `destacado` | `true` lo muestra en el inicio (máximo 3). Si es `false`, solo aparece en Proyectos |
| `cover` | Ruta de la imagen de portada. Vacía, no se muestra |
| `galeria` | Lista de rutas de imágenes. Al hacer clic se abre un visor. Vacía, no se muestra |

Las imágenes van en `assets/proyectos/<id>/`, por ejemplo:

```js
cover: "assets/proyectos/mi-proyecto/cover.jpg",
galeria: [
  "assets/proyectos/mi-proyecto/1.jpg",
  "assets/proyectos/mi-proyecto/2.jpg",
],
```

Para cambiar cuántos proyectos caben por página, edita `POR_PAGINA` en `js/proyectos.js`.

## Colores y tipografía

Todos los valores están en `css/tokens.css`. Cambiar un token actualiza todo el sitio, en tema claro y oscuro. El tema sigue la preferencia del sistema operativo.

Las fuentes son Lilita One para títulos, Outfit para el texto y Caveat solo para el nombre de la marca.

## Publicar en GitHub Pages

1. Sube la carpeta a un repositorio de GitHub.
2. En el repositorio, entra a **Settings → Pages**.
3. En **Source**, elige la rama principal y la carpeta raíz (`/`).
4. Guarda. El sitio queda en `https://<usuario>.github.io/<repositorio>/`.

Los enlaces son relativos, así que funcionan tanto en la raíz como en una subcarpeta.

## Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE).
