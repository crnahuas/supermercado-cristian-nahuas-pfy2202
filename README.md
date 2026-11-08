# Supermercado Abasto

[Visitar Abasto](https://crnahuas.github.io/supermercado-cristian-nahuas-pfy2202/) · [Repositorio en GitHub](https://github.com/crnahuas/supermercado-cristian-nahuas-pfy2202)

Sitio web de un supermercado con gestión de inventario y carrito de compras. Permite registrar artículos con sus cantidades, filtrar por categoría, consultar un producto y reservar unidades en el carrito. Las existencias se actualizan en todas las pantallas al modificar una reserva.

Desarrollado con React 18, React Router 7, Vite 8 y Tailwind CSS 4. Mantiene las páginas de inicio, tiendas y preguntas frecuentes de la versión anterior.

## Ejecutar el proyecto

Requiere Node.js 24.15 o superior en la rama 24 y npm.

Desde esta carpeta:

```bash
npm ci
npm run dev
```

Abre la dirección que muestra Vite, normalmente `http://127.0.0.1:5173/`. También puedes ejecutar `npm start`.

```bash
npm test          # Pruebas de navegación, formulario, inventario y carrito
npm run build    # Genera dist/ para producción
npm run preview  # Revisa la compilación localmente
```

## Pantallas

| Ruta                                 | Contenido                                                             |
| ------------------------------------ | --------------------------------------------------------------------- |
| `/#/`                                | Inicio y secciones del supermercado.                                  |
| `/#/nuestras-tiendas`                | Direcciones, horarios y servicios.                                    |
| `/#/preguntas-frecuentes`            | Preguntas y respuestas.                                               |
| `/#/inventario`                      | Nombre, marca, categoría, unidades disponibles y unidades en carrito. |
| `/#/inventario/nuevo`                | Registro de artículos y su cantidad inicial.                          |
| `/#/inventario/articulos/:articleId` | Detalle de un producto y botón para agregar una unidad al carrito.    |
| `/#/inventario/carrito`              | Productos reservados y controles de cantidad.                         |

Las rutas de inventario están anidadas y comparten un layout. El detalle utiliza un parámetro dinámico; detalle y carrito se cargan bajo demanda con `React.lazy` y `Suspense`. Las rutas desconocidas y los artículos inexistentes tienen una pantalla de recuperación.

## Uso del inventario y carrito

1. Entra a **Gestión de inventario** y selecciona **Ingresar artículo**.
2. Completa nombre, marca, tipo de producto y cantidad inicial. Guarda el artículo. El formulario confirma el registro y queda listo para ingresar otro.
3. Abre **Inventario**. Selecciona una categoría para filtrar; **Todas las categorías** o **Quitar filtro** recuperan el listado completo.
4. Selecciona el nombre de un artículo para ver su detalle. **Agregar al carrito** reserva una unidad por pulsación y reduce las unidades disponibles.
5. Abre **Carrito**. Usa `+` y `−` para ajustar cantidades. Al disminuir la última unidad se elimina esa línea. **Quitar** devuelve todas las unidades del producto y **Vaciar carrito** devuelve las de todo el carrito.

Un producto agotado permanece visible con la indicación **Agotado · 0**, pero no permite nuevas reservas. El botón `+` se deshabilita cuando no queda stock. No se pueden guardar cantidades negativas, fraccionarias o superiores a las existencias registradas.

El filtro usa el parámetro `categoria` en la URL y calcula una lista derivada, sin modificar los artículos originales. Por ejemplo: `/#/inventario?categoria=L%C3%A1cteos`. El historial del navegador permite regresar al listado filtrado.

## Validación

Todos los campos son obligatorios. Nombre y marca aceptan hasta 100 caracteres, tildes, números y signos de uso comercial; deben comenzar con una letra o número. La categoría debe pertenecer al catálogo. La cantidad inicial admite enteros entre 0 y 999999.

Los datos se normalizan y validan con el mismo esquema al registrar y recuperar artículos. Los errores se muestran junto al campo y el envío enfoca el primer error. Si el registro falla, los valores se conservan para reintentar.

## Estado y almacenamiento

`InventoryProvider` comparte inventario y carrito mediante Context y `useReducer`. El reducer concentra las transiciones y valida los límites usando el estado más reciente, incluso si se reciben varias acciones en un mismo evento. Las operaciones crean nuevos arrays y objetos.

Por cada producto se guarda la cantidad registrada (`stock`) y, en el carrito, la cantidad reservada (`quantity`). Las pantallas calculan:

```text
unidades disponibles = stock registrado − unidades en carrito
```

Así, al agregar al carrito se descuentan existencias y al devolver una unidad se recupera disponibilidad. El filtro y los contadores son datos derivados; no duplican el estado del inventario.

Inventario y carrito se guardan juntos en `localStorage` con la clave `abasto.inventory.v2`. Al recargar, se recupera la misma reserva. Los identificadores repetidos, artículos inválidos y reservas sin producto, fraccionarias o superiores al stock se descartan al leerlos.

Si existe la clave anterior `abasto.inventory.v1` y todavía no hay datos de la nueva versión, cada registro válido se importa con **una unidad inicial**, porque antes no se registraban cantidades. La clave anterior permanece intacta.

Los datos pertenecen al navegador y al origen utilizado; cambiar de puerto o abrir el sitio publicado utiliza otro almacenamiento. No se sincronizan entre dispositivos ni pestañas. Si el navegador impide guardar, aparece un aviso y la sesión sigue funcionando en memoria. El inventario comienza vacío cuando no hay datos previos. El carrito reserva unidades; no procesa pagos ni completa ventas.

## Organización

```text
src/
  components/          Formulario, tabla, resumen, stock y controles reutilizables
  config/navigation.js Rutas, títulos y enlaces
  context/             Proveedor global de inventario y carrito
  data/                Reducer, recuperación de datos, validación y catálogos
  hooks/               Título, desplazamiento y foco al navegar
  layout/              Estructura pública y layout anidado de inventario
  pages/               Pantallas públicas, inventario, detalle y carrito
  routes/AppRoutes.jsx Configuración centralizada de rutas
  styles/              Paleta global y componentes de Tailwind
public/                Fotografías e icono del sitio
tests/                Pruebas con Vitest y Testing Library
.github/workflows/     Compilación, pruebas y despliegue en GitHub Pages
evidencias/capturas/  Capturas reales de escritorio y móvil
```

Tailwind utiliza la paleta de Abasto mediante `@theme`; los patrones repetidos usan `@apply`. Los componentes públicos conservan sus CSS Modules. En Tailwind 4 el tema se configura en CSS y el plugin de Vite detecta las clases utilizadas, por lo que no se necesita `tailwind.config.js`.

El diseño adapta la navegación, las tarjetas y los controles a pantallas pequeñas. La tabla conserva sus columnas dentro de una región con desplazamiento horizontal y acceso por teclado. Los formularios tienen etiquetas y errores asociados; las confirmaciones y los cambios del carrito se anuncian mediante regiones de estado. El salto al contenido mantiene el foco sin alterar las rutas.

## Publicar en GitHub Pages

El repositorio `supermercado-cristian-nahuas-pfy2202` está publicado y tiene GitHub Pages configurado mediante GitHub Actions.

El flujo `.github/workflows/pages.yml` instala las dependencias desde el lockfile, ejecuta las pruebas, compila y publica `dist/`. El despliegue se ejecuta al subir cambios a `main` o manualmente desde **Actions**. No requiere claves personales en el código.

Para reproducir la configuración en otro repositorio:

1. Crea el repositorio con el nombre indicado y sube el contenido de esta carpeta a `main`, incluyendo archivos ocultos, `public/`, `tests/` y `evidencias/`. Excluye `node_modules/` y `dist/`, ya cubiertos por `.gitignore`.
2. En el repositorio abre **Settings → Pages → Build and deployment → Source** y selecciona **GitHub Actions**.
3. Ejecuta el flujo **Publicar Abasto** desde **Actions → Run workflow** si el primer envío ocurrió antes de habilitar Pages.
4. Comprueba que los trabajos `build` y `deploy` terminen correctamente y abre el enlace que informa el entorno `github-pages`.

Se utiliza `HashRouter`, `base: "./"` y recursos relativos para permitir enlaces directos y recargas dentro de un subdirectorio de GitHub Pages, sin reglas adicionales de servidor. El entorno `github-pages` de Actions informa el resultado y la dirección de cada publicación.

## Verificación

La suite comprueba navegación pública y de gestión, validación y registro, filtro sin pérdida de artículos, detalle dinámico, carrito sin duplicados, devolución de unidades, límites de stock, acciones consecutivas, persistencia, migración y recuperación de datos dañados.

Las capturas de [evidencias/capturas/](evidencias/capturas/) muestran el inventario completo, el filtro aplicado, el detalle agotado y el carrito en escritorio y móvil. Los productos de las capturas se registraron durante la revisión; no están precargados en el código.

Referencias técnicas: [estado con reducer en React](https://react.dev/learn/extracting-state-logic-into-a-reducer), [rutas de React Router 7](https://reactrouter.com/7.18.5/start/declarative/routing), [tema de Tailwind CSS](https://tailwindcss.com/docs/theme) y [flujos de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
