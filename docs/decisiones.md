# Decisiones del proyecto

## Paleta y organización

Se aplicó la paleta indicada: crema para el fondo, azul marino para jerarquía y acciones principales, terracota como acento y blanco en tarjetas/campos. El terracota oscuro se usa para texto pequeño porque ofrece mejor contraste que el tono base sobre fondos claros. La página ordena el recorrido como presentación → catálogo → beneficios → proceso → preguntas → solicitud.

## Adaptación a una landing

No se recibieron enlaces operativos de Figma/Wix ni capturas. Por ello, no fue posible comparar pantallas previas y se interpretó la especificación como una landing de secciones ancladas. El catálogo responsive pasa de tres a dos y una columna según el espacio disponible.

## Detalle mediante diálogo

Los seis productos comparten un único elemento `dialog`. JavaScript carga sus datos al abrirlo. Se utiliza el comportamiento nativo para atrapar el foco, cerrar con Escape y devolver el foco al control que lo abrió. También hay dos botones visibles para cerrar y desplazamiento interno cuando el contenido excede la pantalla.

## Formulario estático frente a Wix

En lugar de enviar datos a Wix o a un servicio externo, el formulario se procesa solo con JavaScript. Se valida en el navegador, calcula un total demostrativo y genera una referencia temporal `DH-SIM`. No se solicitan datos personales, no se hacen peticiones de red y no se usa almacenamiento persistente.

## Accesibilidad aplicada

Se incluyeron regiones semánticas, un solo `h1`, enlace para saltar al contenido, etiquetas visibles, mensajes asociados con `aria-describedby`, foco visible, estados `aria-pressed` y `aria-expanded`, avisos dinámicos, navegación por teclado, controles de al menos 44 px y compatibilidad con `prefers-reduced-motion`. Esto no sustituye pruebas con lectores de pantalla y usuarios reales.

## Uso de IA y revisión del estudiante

La IA ayudó a estructurar, redactar e implementar el sitio, sus ilustraciones, validaciones y documentación. Como estudiante debo poder explicar y revisar:

- La estructura semántica y la jerarquía de encabezados.
- El funcionamiento de Grid/Flexbox y los puntos de quiebre.
- La combinación de filtros y búsqueda normalizada.
- La carga de datos en el diálogo y la gestión del foco.
- Las reglas de validación, el cálculo del total y el carácter temporal de la simulación.
- Los textos legales/educativos y las fuentes de imágenes antes de cualquier uso real.

## Guía breve para la exposición

1. **Necesidad:** pasar de un prototipo y una herramienta visual a un sitio estático controlado mediante código.
2. **Recorrido:** explorar, filtrar, revisar detalles, elegir producto, validar datos y consultar el resumen.
3. **HTML/CSS/JavaScript:** HTML organiza y da significado; CSS crea la identidad y adaptación; JavaScript añade filtros, diálogo y simulación.
4. **Responsive:** tres columnas en escritorio, dos en tablet y una en móvil; navegación desplegable bajo 980 px.
5. **Validación:** el formulario conserva valores, explica cada error y enfoca el primer campo inválido.
6. **Límites:** no es una tienda ni procesa datos, pagos o pedidos reales.
7. **Publicación:** los archivos estáticos se versionan en GitHub y se sirven desde GitHub Pages.
