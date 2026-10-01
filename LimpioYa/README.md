# LimpioYa

Prototipo académico nuevo de gestión de lavandería. Desarrollado con React, TypeScript, TSX (JSX tipado), CSS, React Router, componentes funcionales, Hooks y Context API. Vite se usa exclusivamente como herramienta de desarrollo y compilación.

## Ejecutar localmente

Requisitos: Node.js 22 y npm.

```bash
npm install
npm run dev
```

Abre la dirección local que imprime Vite. Para generar y comprobar la versión compilada:

```bash
npm run build
npm run preview
```

Se requiere Internet para descargar las dependencias la primera vez. La aplicación en ejecución no realiza llamadas HTTP a APIs, no carga fuentes remotas y no necesita backend, base de datos ni servicios externos.

## Accesos de demostración

| Rol           | Correo              | Contraseña |
| ------------- | ------------------- | ---------- |
| Cliente       | cliente@limpioya.co | demo123    |
| Administrador | admin@limpioya.co   | demo123    |

Inicio → Iniciar sesión → Cliente o Administrador → Panel del rol. El botón «Usar estos datos» completa el formulario; el inicio de sesión se confirma aparte. Registro crea exclusivamente clientes locales y dirige al flujo de inicio de sesión. Los clientes creados desde Gestión de clientes tienen contraseña inicial `demo123`.

## Mapa de rutas

| Ruta                    | Pantalla oficial                    |
| ----------------------- | ----------------------------------- |
| `/`                     | Inicio                              |
| `/login`                | Iniciar sesión: selección de rol    |
| `/login/cliente`        | Cliente: formulario de acceso       |
| `/login/administrador`  | Administrador: formulario de acceso |
| `/register`             | Registro                            |
| `/cliente`              | Panel del cliente                   |
| `/cliente/crear-pedido` | Crear pedido                        |
| `/cliente/agenda`       | Agenda                              |
| `/cliente/pagos`        | Pagos y factura                     |
| `/cliente/historial`    | Historial de pedidos                |
| `/admin`                | Panel del administrador             |
| `/admin/pedidos`        | Gestión de pedidos                  |
| `/admin/clientes`       | Gestión de clientes                 |
| `/admin/empleados`      | Gestión de empleados                |
| `/admin/servicios`      | Servicios y precios                 |
| `/admin/metricas`       | Métricas / KPIs                     |

Los paneles tienen rutas hijas exclusivamente para sus secciones. El guard de rol redirige accesos sin sesión a Iniciar sesión y accesos del rol incorrecto a su propio panel. Las direcciones desconocidas regresan a Inicio sin crear otra página.

## Arquitectura

- `src/components/`: todas las interfaces, organizadas en `shared/`, `inicio/`, `autenticacion/`, `cliente/` y `administrador/`. Incluye tabla y detalle de pedidos, formularios de gestión, modales y elementos compartidos. No existe carpeta `pages/`.
- `src/context/`: siete dominios independientes: Auth, Cliente, Empleado, Servicio, Pedido, Pago y Agenda. AppProviders solo compone sus proveedores.
- `src/hooks/`: acceso tipado a los contextos, persistencia reusable, consulta de pedidos del cliente, métricas derivadas y detección de la navegación móvil.
- `src/models/`: interfaces y tipos centrales del dominio.
- `src/services/`: datos iniciales, almacenamiento, identificadores y formato de moneda/fechas. No contiene servicios HTTP.
- `src/routes/`: configuración completa y guards de React Router.

Los pedidos guardan una copia del nombre y precio de cada servicio. Cambiar el catálogo modifica pedidos futuros, preservando los importes de los pedidos y comprobantes anteriores. Los KPIs se derivan de pedidos y pagos compartidos, sin cifras decorativas independientes.

## Recorrido de demostración

1. Entra desde Inicio como Cliente con los datos demo.
2. Crea un pedido seleccionando servicios, cantidades y fecha. Comprueba el total estimado.
3. Consulta el pedido y su progreso en Historial de pedidos.
4. En Agenda, programa una recogida o entrega. Puedes cancelarla con confirmación.
5. En Pagos y factura, simula un pago y abre su comprobante imprimible.
6. Cierra sesión. Ingresa mediante Iniciar sesión → Administrador.
7. En Gestión de pedidos, cambia el estado del pedido creado.
8. Agrega o edita clientes, empleados y servicios. Activa o desactiva registros conservando el historial.
9. Consulta las métricas. El total de pedidos y los ingresos reflejan las acciones realizadas.
10. Cierra sesión e ingresa nuevamente como Cliente. Verifica el estado modificado y los pagos persistidos.

## Datos y límites del prototipo

Los datos se conservan en `localStorage` bajo el prefijo `limpioya:v1:` en el navegador y origen actuales. Cambiar de navegador, perfil, dispositivo o puerto crea una demostración independiente. El estado se comparte entre vistas mediante los contextos y se vuelve a cargar al recargar la aplicación; no hay sincronización en tiempo real entre pestañas.

Para restaurar los datos iniciales, cierra las pestañas de LimpioYa, elimina únicamente las entradas con el prefijo `limpioya:v1:` en las herramientas del navegador y vuelve a abrir la aplicación. No borres datos de otros sitios.

Las credenciales se guardan como datos ficticios locales para facilitar el ejercicio. No usar datos personales ni contraseñas reales. Los guards simulan navegación por roles; no constituyen seguridad de producción. No hay JWT, cifrado de cuentas, pasarela, PSE, notificaciones ni correos. Los comprobantes carecen de validez fiscal. La agenda simula horarios sin logística real ni control global de capacidad. El administrador puede seleccionar cualquier estado para facilitar la demostración.

Las fechas nuevas usan el día local del navegador. Los datos iniciales corresponden a septiembre y octubre de 2026. Las tablas permiten desplazamiento horizontal dentro de su contenedor en pantallas pequeñas; el resto de la interfaz se adapta a móvil y tablet.

## Verificación

Consulta `VERIFICACION.md` para los recorridos y tamaños revisados. `npm run build` incluye la comprobación estricta de TypeScript.

## Paleta visual

| Uso                           | HEX       |
| ----------------------------- | --------- |
| Botones y enlaces principales | `#0869E0` |
| Azul oscuro y hover           | `#0756BB` |
| Detalles y acentos turquesa   | `#12A89B` |
| Texto principal               | `#182B43` |
| Texto secundario              | `#77869A` |
| Fondo general                 | `#F5F7FB` |
| Fondo azul suave              | `#EEF5FF` |
| Bordes                        | `#E7EDF4` |
| Tarjetas y paneles            | `#FFFFFF` |

La paleta está centralizada en variables CSS. Los indicadores de éxito, error y advertencia conservan sus colores semánticos para distinguir estados.

El turquesa se limita a pequeños indicadores de estado; los títulos, iconos, foco, navegación y grandes superficies priorizan azul y tonos neutros.

El logo y el favicon no utilizan turquesa: la marca usa azul y su versión sobre fondo oscuro usa blanco.
