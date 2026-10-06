# Pruebas técnicas

Fecha de revisión: 6 de octubre de 2026.

Las comprobaciones se realizaron sobre la versión local servida por HTTP en un navegador Chromium integrado. Estas pruebas son técnicas: no equivalen a pruebas con usuarios ni certifican cumplimiento total de accesibilidad.

| # | Comprobación | Resultado | Evidencia / observación |
|---|---|---|---|
| 1 | Se muestran seis productos | Aprobada | Se contaron 6 tarjetas visibles al cargar y después de restablecer. |
| 2 | Panes 2, Tortas 1, Postres 3 | Aprobada | Conteos observados: 2, 1 y 3. |
| 3 | Búsqueda y categoría combinadas | Aprobada | `Postres` + `limon` (sin tilde) dejó visible solo Pie de limón. |
| 4 | Búsqueda sin coincidencias | Aprobada | `xyz-sin-coincidencias` mostró el mensaje y el botón esperados. |
| 5 | Restablecer catálogo | Aprobada | Limpió la búsqueda, activó `Todos` y recuperó 6 tarjetas. |
| 6 | Detalle correcto | Aprobada | Pan de masa madre mostró nombre, precio e información de alérgenos correspondiente. Escape cerró el diálogo y devolvió el foco. |
| 7 | Solicitar selecciona producto | Aprobada | Desde tarjeta seleccionó masa madre; desde el diálogo seleccionó alfajor y conservó cantidad/fecha existentes. |
| 8 | Menú móvil | Aprobada | A 390 px abrió/cerró, actualizó `aria-expanded` y se cerró al navegar. |
| 9 | Validaciones | Aprobada | Se comprobaron campos vacíos, cantidad decimal y fecha 05/10/2026 anterior al día de prueba. Los mensajes coincidieron con la especificación. |
| 10 | Conservación de datos | Aprobada | Producto y cantidad permanecieron tras el error de fecha; producto y fecha permanecieron tras cantidad decimal. |
| 11 | Resumen y referencia | Aprobada | Se mostró referencia `DH-SIM-20261006-####`, producto, cantidad, fecha y precios. |
| 12 | Cálculo total | Aprobada | Masa madre (S/ 12.00) × 2 produjo S/ 24.00. |
| 13 | Acciones posteriores | Aprobada | `Crear otra solicitud` restableció el formulario; `Volver al catálogo` es un enlace anclado válido. |
| 14 | Recorrido con teclado | Aprobada con alcance técnico | Controles nativos accesibles por teclado; Escape cierra el diálogo y el foco vuelve al botón que lo abrió. Falta prueba con usuarios/lector de pantalla. |
| 15 | Sin desbordamiento (320/390/768/1440 px) | Aprobada | En los cuatro anchos `scrollWidth` no superó `clientWidth`. Se corrigió el ancho mínimo tras la primera revisión. |
| 16 | Carga bajo ruta del repositorio | Pendiente de publicación | Se comprobará en la URL final de GitHub Pages. Todas las rutas del proyecto son relativas. |

## Comprobaciones adicionales

- Sintaxis de `js/main.js`: válida mediante `node --check`.
- Consola del navegador: sin errores ni advertencias durante el recorrido probado.
- Enlaces internos y recursos locales: sin destinos faltantes.
- SVG: los ocho archivos se analizaron como XML sin errores.
- Estructura: un solo `h1`, seis tarjetas y cero patrones de credenciales detectados.
- Contraste calculado de combinaciones principales: texto/cema 13.04:1, azul/crema 11.23:1, blanco/azul 12.19:1 y terracota oscuro/blanco 6.20:1.
- No se ejecutó Lighthouse porque no estaba disponible en el entorno. La revisión se apoyó en interacción real, inspección visual, consola y comprobaciones estáticas.

## Pruebas pendientes con personas

- Medir si el recorrido principal se completa en menos de cinco minutos.
- Probar con lectores de pantalla y distintos navegadores/dispositivos reales.
- Revisar la comprensión de los avisos sobre simulación y datos ficticios.
