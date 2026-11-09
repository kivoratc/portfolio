// Proyectos del portfolio. Para agregar uno, copia un objeto y cambia sus datos.
// id: único y sin espacios, se usa en la URL (proyecto.html?id=...).
// destacado: true lo muestra en el inicio (máximo 3). Sin destacar, solo aparece en Proyectos.
// enlaces: lista de { nombre, link }. Los que tengan link vacío no se muestran.
// cover: imagen que aparece debajo del título. Vacía, no se muestra.
// galeria: lista de imágenes entre la descripción y las tecnologías. Vacía, no se muestra.

window.PROYECTOS = [
  {
    id: "sistema-de-diseno",
    titulo: "Sistema de diseño",
    categoria: "Identidad",
    anio: 2026,
    destacado: false,
    resumen: "Color, tipografía, componentes y voz de Kivora TC en un solo lugar.",
    descripcion:
      "Documentación del sistema de diseño de Kivora TC: marca, color, tipografía, componentes, plataformas y tono de voz. Cada pieza usa los mismos tokens, así que cambian juntas.",
    tecnologias: ["Tokens CSS", "Documentación"],
    enlaces: [
      { nombre: "Ver sistema de diseño", link: "https://kivoratc.github.io/sistema_de_diseno/" },
    ],
    cover: "assets/proyectos/sistema-de-diseno/cover.png",
    galeria: ["assets/proyectos/sistema-de-diseno/galeria/01-marca.png",
      "assets/proyectos/sistema-de-diseno/galeria/02-color.png",
      "assets/proyectos/sistema-de-diseno/galeria/03-tipografía.png",
      "assets/proyectos/sistema-de-diseno/galeria/04-componentes.png",
      "assets/proyectos/sistema-de-diseno/galeria/05-plataformas.png",
      "assets/proyectos/sistema-de-diseno/galeria/06-voz.png"
    ],
  },
];
