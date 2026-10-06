# Dulce Horno

Sitio web estático y responsive para **Dulce Horno**, una panadería y pastelería artesanal ficticia creada como Proyecto 4 (Unidad 4) de un curso. Permite explorar seis productos, filtrar el catálogo, consultar detalles y completar una solicitud simulada en el navegador.

> Proyecto exclusivamente educativo. No representa un negocio real, no vende productos, no recibe pagos y no guarda solicitudes.

## Objetivo y alcance

El objetivo es convertir las propuestas previas de las Unidades 1 (Figma) y 2 (Wix) en una landing page desarrollada con código. El recorrido principal permite comparar productos y precios demostrativos, consultar ingredientes/alérgenos ficticios y obtener un resumen de solicitud.

Incluye HTML5 semántico, diseño responsive, filtros combinables, búsqueda sin distinción de mayúsculas o tildes, diálogo de detalle, menú móvil, validación accesible y confirmación calculada. No incluye tienda, pagos, inventario, reservas, reparto, autenticación, base de datos ni envío de formularios.

## Tecnologías

- HTML5 semántico
- CSS3 (Grid, Flexbox y media queries)
- JavaScript sin frameworks ni dependencias
- Git y GitHub Pages
- Ilustraciones SVG locales creadas para el proyecto

## Estructura

```text
.
├── index.html
├── css/styles.css
├── js/main.js
├── assets/
│   ├── icons/favicon.svg
│   └── images/*.svg
├── docs/
│   ├── decisiones.md
│   ├── fuentes-imagenes.md
│   └── pruebas.md
└── README.md
```

## Ejecutar localmente

No requiere instalación ni compilación. Abre `index.html` directamente o sirve la carpeta con la extensión Live Server de Visual Studio Code. Para evitar diferencias entre navegadores, se recomienda Live Server.

## Editar el contenido

- **Productos y textos visibles:** tarjetas en `index.html` y datos del diálogo/resumen en `js/main.js`. Si se cambia un producto, hay que mantener ambos lugares sincronizados.
- **Colores:** variables al comienzo de `css/styles.css`.
- **Imágenes:** archivos de `assets/images/`; conserva las proporciones o ajusta `width`, `height` y texto alternativo en el HTML.
- **Filtros:** las categorías de los botones y atributos `data-category` deben coincidir.

## Cómo funciona la simulación

El formulario valida producto, cantidad entera y una fecha no anterior al día local del navegador. Si los datos son válidos, JavaScript calcula un total referencial y crea un código temporal con prefijo `DH-SIM`. La información vive solo en la página actual: no se transmite por red, no se almacena y se pierde al recargar.

## Repositorio y publicación

- Repositorio: se añadirá tras crear el repositorio público.
- Sitio: se añadirá tras confirmar el despliegue de GitHub Pages.

Para actualizar el sitio después de publicarlo:

1. Edita y prueba los archivos.
2. Crea un commit descriptivo.
3. Envía el commit a la rama `main`.
4. GitHub Pages volverá a desplegar el sitio automáticamente.

## Limitaciones y pruebas pendientes

- No se proporcionaron enlaces válidos de Figma/Wix ni capturas, por lo que la implementación sigue la especificación escrita.
- Las imágenes son ilustraciones referenciales, no fotografías de productos reales.
- Las pruebas realizadas son técnicas; quedan pendientes pruebas con personas y tecnologías de asistencia reales.
- La accesibilidad requiere revisión humana continua y no se declara cumplimiento total por pruebas automáticas.

Consulta [docs/pruebas.md](docs/pruebas.md) para los resultados y [docs/decisiones.md](docs/decisiones.md) para las decisiones y la guía de exposición.
