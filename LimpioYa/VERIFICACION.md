# Verificación del prototipo

Fecha: 30 de septiembre de 2026 (America/Bogota).

## Comprobaciones realizadas

- `npm run build`: TypeScript estricto y compilación Vite aprobados después de los ajustes finales.
- Inicio, selección de rol, ambos formularios de acceso y registro revisados en el navegador.
- Las cinco vistas del cliente y las seis del administrador se visitaron mediante navegación de la aplicación.
- Pedido de prueba creado con 3 kg de lavado y secado, total de $25.500, fecha e instrucciones de cuidado.
- Pedido consultado tras recargar el navegador: la persistencia conservó los datos.
- Cita creada y cancelada mediante su modal de confirmación.
- Pago simulado confirmado; se verificaron el estado de pago y la factura con el importe y las líneas del pedido.
- Inicio de sesión como administrador y cambio del pedido de prueba a «Listo».
- Nuevo inicio de sesión como cliente: el mismo pedido apareció con estado «Listo» y el importe histórico intacto.
- Edición del teléfono de un cliente y creación de un empleado de prueba verificadas con cambios en sus tablas.
- Precio del servicio modificado de $8.500 a $9.000; el catálogo del cliente mostró el nuevo precio y el pedido previo conservó $25.500.
- Métricas verificadas con los pagos y pedidos de la sesión: 9 pedidos, $133.500 de ingresos y ticket promedio de $40.000.
- Registro de Sofía Demo y acceso con sus credenciales locales: panel vacío independiente del cliente precargado.
- Intento de abrir `/admin` con una sesión de cliente: redirección a `/cliente` verificada.
- Vistas examinadas a 1440 × 1000 (escritorio), 834 × 1112 (tablet) y 390 × 844 (móvil). La anchura de la página coincidió con el viewport en tablet y móvil.
- Menú móvil abierto, navegación a una sección y cierre de sesión comprobados. La navegación cerrada usa `inert` para evitar foco en controles ocultos.
- El navegador de verificación final no registró errores de consola.
- Auditoría de estructura: `components`, `context`, `hooks`, `models`, `services` y `routes` presentes; ninguna carpeta `pages`.
- Auditoría de código: no hay llamadas fetch/axios, APIs, SDKs de pago ni conexiones a servicios externos.

Los registros creados durante la prueba existen solo en el almacenamiento del navegador usado para verificar; no fueron añadidos a los datos iniciales del código. Los datos de prueba permanecen visibles en ese navegador como evidencia de funcionamiento.

## Alcance de las pruebas

Se realizaron pruebas manuales en el navegador y comprobaciones de compilación y estructura. No se implementó una suite automatizada de pruebas. Los modales de activar/desactivar comparten el formulario y las operaciones de contexto, y fueron revisados en código; no se ejecutó cada combinación de todas las entidades. El comprobante se abrió y se revisó; no se completó la impresión del sistema operativo. No se verificó cada tamaño de dispositivo físico ni cada combinación posible de datos.

Durante los ajustes, Vite recargó los contextos y fue necesario refrescar la aplicación. La vista previa se recuperó con una pestaña nueva después de un error de recarga del navegador integrado; la compilación final y la nueva pestaña funcionaron correctamente.

## Actualización de la paleta

Se aplicaron los nueve colores solicitados mediante variables CSS, incluyendo botones, enlaces, fondos, bordes y texto. Se revisaron Inicio y Panel del cliente en el navegador. El botón principal mostró `rgb(8, 105, 224)` (`#0869E0`) y texto blanco; el enlace de inicio de sesión también mostró `#0869E0`. La compilación TypeScript/Vite volvió a pasar. Se actualizaron el favicon, el color de tema y las capturas.

## Reducción de turquesa

Se retiró el turquesa de los banners y fondos de autenticación, título de Inicio, encabezados, controles, navegación e iconos generales. Se mantiene en cuatro reglas puntuales: marca, indicador de éxito, serie de estado y paso completado.

## Ampliación de Inicio · 1 de octubre de 2026

Se añadieron tres secciones dentro de Inicio: pasos de uso, catálogo de servicios y llamada final a registro. El catálogo consume ServicioContext y comparte nombres, precios y estados activos con la gestión del administrador. No se añadieron rutas. Compilación TypeScript/Vite aprobada. Se revisó la página completa en escritorio y a 390 px; la anchura del documento fue 390 px sin desbordamiento horizontal. El botón final «Crear mi cuenta» abrió la ruta existente `/register`.
