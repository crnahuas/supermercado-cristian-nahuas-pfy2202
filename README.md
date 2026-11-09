# Supermercado Abasto

Abasto es un sitio de supermercado que reúne información de sus tiendas y una sección para gestionar productos. Permite registrar artículos, consultar las existencias, filtrar por categoría y reservar unidades en un carrito. Las cantidades disponibles se actualizan al agregar o devolver productos.

[Visitar Abasto](https://crnahuas.github.io/supermercado-cristian-nahuas-pfy2202/)

## Qué puedes hacer en el sitio

El sitio tiene dos áreas:

- **Información del supermercado:** desde Inicio puedes conocer sus secciones, consultar las direcciones y los horarios en Nuestras tiendas y revisar las Preguntas frecuentes.
- **Gestión de inventario:** permite ingresar artículos, revisar sus cantidades y administrar las unidades que se agregan al carrito.

Para comenzar a gestionar productos, selecciona **Gestión de inventario** desde la página de inicio. Dentro de esta sección encontrarás los accesos a **Inventario**, **Ingresar artículo** y **Carrito**.

## Registrar un artículo

1. Selecciona **Ingresar artículo**.
2. Completa el nombre, la marca, el tipo de producto y la cantidad inicial.
3. Pulsa **Guardar artículo**.
4. Cuando aparezca la confirmación, puedes ingresar otro producto o seleccionar **Ver inventario** para consultar el listado.

Por ejemplo, puedes registrar **Leche entera 1 L**, marca **Colun**, categoría **Lácteos**, con una cantidad inicial de **12** unidades.

Todos los campos son obligatorios. Nombre y marca admiten hasta 100 caracteres y deben comenzar con una letra o un número. Aceptan tildes, espacios y signos habituales de nombres comerciales. La categoría se elige de la lista y la cantidad inicial debe ser un número entero entre **0 y 999999**.

Si un dato no es válido, aparece un mensaje junto al campo para indicar qué debes corregir. Si el registro falla, el formulario conserva los datos para que puedas reintentarlo. Después de guardar correctamente, los campos quedan vacíos y listos para un nuevo artículo.

## Consultar y filtrar el inventario

La pantalla **Inventario** muestra un resumen con la cantidad de artículos registrados, las unidades disponibles y las unidades reservadas en el carrito.

En el listado puedes consultar:

| Dato | Qué representa |
| --- | --- |
| Nombre | Identifica el producto y permite abrir su detalle. |
| Marca | Indica la marca registrada para ese artículo. |
| Tipo de producto | Corresponde a su categoría, como Abarrotes, Bebidas o Lácteos. |
| Disponibles | Son las unidades que todavía puedes agregar al carrito. |
| En carrito | Son las unidades de ese producto que ya están reservadas. |

Para ver una categoría, selecciónala en **Filtrar por categoría**. El listado se actualiza de inmediato y muestra cuántos artículos coinciden. El resto del inventario se conserva; selecciona **Todas las categorías** o pulsa **Quitar filtro** para volver a verlo completo.

Si no hay productos registrados, aparece un acceso para agregar el primero. Si una categoría no tiene artículos, puedes elegir otra o quitar el filtro.

## Ver un producto y agregarlo al carrito

Selecciona el nombre de un artículo en el inventario para abrir su detalle. Allí encontrarás su nombre, marca, categoría, cantidad registrada, unidades disponibles y unidades en el carrito.

Cada pulsación en **Agregar al carrito** reserva **una unidad** y reduce la disponibilidad del producto. Si lo agregas varias veces, se acumula su cantidad en una sola línea del carrito.

Cuando se agotan las unidades disponibles, el producto sigue visible con la indicación **Agotado · 0** y el botón para agregarlo queda desactivado. Puedes continuar desde **Ver carrito** o regresar al inventario.

## Administrar el carrito

El **Carrito** muestra los productos reservados, su marca, categoría y disponibilidad restante. Desde esta pantalla puedes realizar las siguientes acciones:

| Control | Qué hace |
| --- | --- |
| **+** | Agrega una unidad y la descuenta de la disponibilidad. Se desactiva cuando no quedan unidades. |
| **−** | Devuelve una unidad al inventario. Si era la última del producto en el carrito, se retira esa línea. |
| **Quitar** | Retira todas las unidades de ese producto del carrito y las devuelve al inventario. |
| **Vaciar carrito** | Retira todos los productos del carrito y devuelve sus unidades al inventario. |
| **Seguir agregando artículos** | Abre el inventario para consultar otros productos. |

El total del carrito corresponde al **número de unidades reservadas**. Por ejemplo, dos unidades de leche y una de arroz suman tres unidades, aunque sean dos productos diferentes.

El botón **Comprar** aparece desactivado cuando el carrito contiene productos. La compra en línea aún no está disponible: el sitio permite gestionar reservas, pero no procesa pagos ni confirma ventas.

## Cómo se actualizan las cantidades

La cantidad registrada de un producto se distribuye entre las unidades disponibles y las reservadas en el carrito. Por ejemplo, si registras 12 unidades de leche:

| Acción | Disponibles | En carrito |
| --- | ---: | ---: |
| Registrar el producto | 12 | 0 |
| Agregar tres unidades al carrito | 9 | 3 |
| Devolver una unidad con **−** | 10 | 2 |
| Quitar el producto del carrito | 12 | 0 |

El inventario, el detalle y el carrito muestran las mismas cantidades. Filtrar una categoría no cambia las existencias ni las reservas.

## Cómo se guardan los datos

El inventario comienza vacío cuando no hay datos anteriores. Los productos que registres y las reservas del carrito se guardan en el navegador y se recuperan al recargar o volver a abrir el sitio.

Los datos pertenecen al navegador y a la dirección donde se utiliza la aplicación. Abrirla en otro navegador, dispositivo o dirección puede mostrar un inventario diferente. No hay sincronización automática entre dispositivos ni entre pestañas abiertas. Borrar los datos del sitio en el navegador también elimina el inventario guardado.

Si el navegador no permite guardar, el sitio muestra un aviso y puedes seguir trabajando durante la sesión, aunque los cambios podrían perderse al recargar.

## Uso en celulares

La navegación, los formularios y el carrito se adaptan al ancho de la pantalla. En el inventario puedes **deslizar la tabla horizontalmente** para consultar las columnas que no caben a la vez.

Los campos tienen etiquetas y mensajes de error. Las confirmaciones de registro y los cambios del carrito también se anuncian a las herramientas de lectura de pantalla.

## Capturas del sitio

Las imágenes muestran una demostración con productos y marcas reconocibles. Estos ejemplos no se cargan automáticamente al abrir la aplicación.

| Pantalla | Vista |
| --- | --- |
| Inventario completo | [Ver captura](evidencias/capturas/01-inventario.png) |
| Filtro por categoría | [Ver captura](evidencias/capturas/02-filtro-categoria.png) |
| Detalle de un producto agotado | [Ver captura](evidencias/capturas/03-detalle-articulo.png) |
| Carrito de compras | [Ver captura](evidencias/capturas/04-carrito.png) |
| Carrito en celular | [Ver captura](evidencias/capturas/05-carrito-movil.png) |
| Inventario en celular | [Ver captura](evidencias/capturas/06-inventario-movil.png) |
| Confirmación de registro | [Ver captura](evidencias/capturas/07-registro-exitoso.png) |
| Mensajes del formulario | [Ver captura](evidencias/capturas/08-validacion-formulario.png) |

## Ejecutar en tu equipo

Se recomienda **Node.js 24.15 o superior dentro de la rama 24**, junto con npm.

Desde la carpeta del proyecto, instala las dependencias e inicia el servidor:

```bash
npm ci
npm run dev
```

Abre la dirección que aparece en la terminal, normalmente `http://127.0.0.1:5173/`. También puedes iniciar el servidor con `npm start`.

Comandos adicionales:

| Comando | Función |
| --- | --- |
| `npm test` | Ejecuta las pruebas del sitio, los formularios, el inventario y el carrito. |
| `npm run build` | Genera la versión de producción en la carpeta `dist/`. |
| `npm run preview` | Permite revisar localmente la versión de producción después de compilarla. |

El sitio está desarrollado con **React**, **React Router**, **Vite** y **Tailwind CSS**.
