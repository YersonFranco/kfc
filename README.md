# Catálogo web de hamburguesas

## 1. Propósito del proyecto

Esta página recrea la composición de la imagen de referencia: una barra con dos selectores, ocho tarjetas de productos y una franja de texto al pie. El usuario puede cambiar el idioma entre español e inglés, cambiar entre tema claro y oscuro y pulsar «Comprar» para ver una confirmación de demostración.

El proyecto está escrito con HTML, CSS y JavaScript sin bibliotecas externas. Cada tecnología tiene una responsabilidad concreta:

- **HTML** define las partes de la página y los controles que existen desde el inicio.
- **CSS** define colores, tamaños, distribución y adaptación a pantallas pequeñas.
- **JavaScript** toma los datos de los productos, crea las tarjetas y responde a las acciones de los selectores y botones.

## 2. Archivos y carpetas

```text
kfc/
├── index.html          Página que abre el navegador
├── README.md           Documentación del proyecto
├── css/
│   └── styles.css      Apariencia y distribución
├── js/
│   └── script.js       Datos e interacciones
└── img/
    ├── hamburguesa-1.webp
    ├── hamburguesa-2.webp
    ├── hamburguesa-3.webp
    ├── hamburguesa-4.webp
    ├── hamburguesa-5.webp
    ├── hamburguesa-6.webp
    ├── hamburguesa-7.webp
    └── hamburguesa-8.webp
```

Las rutas como `css/styles.css` e `img/hamburguesa-1.webp` son **rutas relativas**. El navegador las resuelve desde la ubicación de `index.html`. Por eso las carpetas deben conservar estos nombres y ubicaciones.

## 3. Cómo ejecutar la página

1. Conserva juntas las carpetas `css`, `js`, `img` y el archivo `index.html`.
2. Abre `index.html` con un navegador moderno.
3. Usa los selectores superiores para cambiar el idioma o el tema.
4. Pulsa «Comprar» en cualquier tarjeta para ver el mensaje de demostración.

No hay que instalar paquetes ni iniciar un servidor para esta versión. La página no envía datos a internet.

## 4. Recorrido de la página

1. El navegador abre `index.html` y lee su estructura.
2. Encuentra la referencia a `css/styles.css` y aplica los estilos.
3. Encuentra `js/script.js`. El atributo `defer` hace que el archivo se ejecute después de que el navegador haya leído el HTML.
4. JavaScript busca los selectores y el espacio vacío del catálogo por sus identificadores.
5. La llamada inicial a `setLanguage("es")` genera las tarjetas en español.
6. Cuando cambia un selector, su evento actualiza el idioma o el tema. Cuando se pulsa un botón de compra, aparece una alerta con el nombre del producto.

## 5. Explicación de `index.html`

### Información del documento

- `<!doctype html>` indica al navegador que use el estándar actual de HTML.
- `<html lang="es">` contiene toda la página. `lang="es"` indica a navegadores y lectores de pantalla que el idioma inicial es español. JavaScript actualiza este atributo al seleccionar inglés.
- `<meta charset="utf-8">` permite mostrar correctamente caracteres como tildes y `ñ`.
- `<meta name="viewport" content="width=device-width, initial-scale=1">` hace que el ancho de la página coincida con el ancho del dispositivo y evita que en móviles se vea como una página de escritorio reducida.
- `<meta name="description" ...>` proporciona una descripción breve del contenido del documento.
- `<title>Menú KFC</title>` define el texto de la pestaña del navegador.
- `<link rel="stylesheet" href="css/styles.css">` conecta el documento con el archivo de estilos.
- `<script src="js/script.js" defer></script>` conecta el documento con JavaScript. `defer` evita que el código busque elementos antes de que el HTML esté disponible.

### Contenido visible y controles

- `<body>` contiene lo que se muestra en la página.
- `<main class="page">` identifica el contenido principal. La clase `page` permite limitar su ancho con CSS.
- `<header class="toolbar">` agrupa los controles de idioma y tema.
- Cada `<label>` nombra un control. La clase `visually-hidden` lo oculta visualmente, pero conserva su nombre para tecnologías de asistencia. El atributo `for` debe coincidir con el `id` del control relacionado.
- `<select id="language">` es el selector de idioma. Sus opciones tienen los valores `es` y `en`; JavaScript utiliza esos valores para elegir la traducción.
- `<select id="theme">` es el selector de apariencia. Sus valores `light` y `dark` se convierten en el atributo de tema del `body`.
- `<section id="products">` es el espacio donde JavaScript inserta las ocho tarjetas. Empieza vacío porque las tarjetas se generan a partir de los datos de `script.js`.
- Los atributos `aria-label` dan nombres accesibles a controles y secciones. JavaScript cambia las etiquetas relevantes según el idioma.
- `<footer>` agrupa tres párrafos del pie. `data-copy="footerOne"`, `footerTwo` y `footerThree` son identificadores de texto que JavaScript relaciona con las traducciones.

## 6. Explicación de `css/styles.css`

### Variables de color

`:root` es el elemento raíz del documento. Las propiedades que empiezan por `--` son variables CSS. Por ejemplo, `--page-bg` guarda el color de fondo general y `--card-bg` el fondo de una tarjeta. `var(--page-bg)` lee el valor guardado. Centralizar los colores permite cambiar la paleta en un solo lugar.

`body[data-theme="dark"]` selecciona el `body` únicamente cuando tiene `data-theme="dark"` y reemplaza los valores de las variables por colores oscuros. JavaScript añade ese atributo al cambiar el selector. Si el atributo no existe, se aplican los valores claros definidos en `:root`.

`color-scheme: light` y `color-scheme: dark` indican al navegador qué esquema de color se está usando, lo cual también ayuda a que los controles nativos se vean acordes con el tema.

### Reglas generales y página

- `* { box-sizing: border-box; }` hace que el ancho declarado de un elemento incluya su relleno y borde. Esto vuelve más predecible el cálculo de tamaños.
- `body` quita el margen predeterminado del navegador, usa los colores de las variables y selecciona una fuente común disponible en la mayoría de equipos.
- `.page` limita el contenido a un máximo de 900 píxeles y deja al menos 32 píxeles de espacio horizontal total en pantallas más pequeñas. `margin: 0 auto` centra el bloque.
- `.toolbar` pone los selectores en una fila y crea separación entre ellos. `padding` deja espacio alrededor de la barra.
- `.toolbar select` hace que cada selector ocupe el mismo espacio (`flex: 1`), permite que se encoja (`min-width: 0`) y aplica borde, relleno, fondo y color de texto.

### Cuadrícula y tarjetas

- `.products` usa CSS Grid. `repeat(4, minmax(0, 1fr))` crea cuatro columnas de igual proporción. `minmax(0, 1fr)` permite que cada columna se reduzca sin desbordar por el ancho de su contenido.
- `gap: 30px 14px` deja 30 píxeles entre filas y 14 entre columnas. `padding` agrega espacio alrededor del conjunto.
- `.product-card` usa Flexbox en dirección vertical. Cada tarjeta apila imagen, precio, nombre, descripción y botón. El fondo toma el color de `--card-bg`; la sombra separa visualmente la tarjeta del fondo.
- `.product-card img` limita la imagen al ancho disponible y reserva un cuadro de proporción 1:1. `object-fit: contain` muestra la imagen completa sin estirarla ni recortarla.
- `.price`, `.product-name` y `.description` ajustan los márgenes, tamaños y peso de texto de cada parte de la tarjeta. `flex: 1` en la descripción deja que esta ocupe el espacio libre y ayuda a alinear los botones al pie de las tarjetas.
- `.buy-button` ocupa el ancho de la tarjeta, quita el borde predeterminado y usa el color de botón definido en las variables.
- `.buy-button:hover` cambia el fondo cuando el puntero pasa sobre el botón.
- `:focus-visible` dibuja un contorno claro al navegar con teclado. Esto facilita saber qué control está seleccionado.

### Pie, etiqueta accesible y tamaños de pantalla

- `.footer` crea tres columnas para los párrafos del pie. Su margen negativo amplía el fondo hasta los bordes de la ventana, mientras el `padding` mantiene el texto alineado con el contenido central.
- `.footer p` quita el margen predeterminado de los párrafos.
- `.visually-hidden` oculta una etiqueta solo a la vista: reduce su caja y la recorta, pero no la elimina del árbol de accesibilidad. Se usa para no mostrar etiquetas redundantes encima de los selectores.
- `@media (max-width: 700px)` es una regla para pantallas de hasta 700 píxeles. Cambia el catálogo a dos columnas y el pie a una columna.
- `@media (max-width: 380px)` reduce márgenes, separación y relleno en teléfonos muy estrechos.

## 7. Explicación de `js/script.js`

### Datos de productos: `products`

`const products = [...]` declara una lista que no se reasigna. Cada elemento entre llaves es un objeto que representa un producto:

- `image` indica el archivo de imagen dentro de `img/`.
- `price` guarda el precio que se muestra.
- `name` guarda el nombre en las propiedades `es` y `en`.
- `description` hace lo mismo con la descripción.

Los datos se separan de la estructura visual para que las ocho tarjetas puedan construirse con el mismo patrón. Para agregar un producto, se añade otro objeto con esas cuatro propiedades y una imagen existente en `img/`.

### Textos de interfaz: `translations`

`translations` es un objeto con dos conjuntos de texto, uno para `es` y otro para `en`. Cada propiedad tiene un uso concreto:

- `language` y `theme`: nombres accesibles de los selectores.
- `light` y `dark`: textos de las opciones de tema.
- `buy`: texto del botón de cada tarjeta.
- `added`: texto que completa el mensaje de confirmación.
- `menu`: nombre accesible de la sección del catálogo.
- `footerOne`, `footerTwo` y `footerThree`: textos de los párrafos del pie.

Los textos del pie se mantienen como Lorem ipsum de ejemplo, igual que en la referencia visual; no se traducen porque son texto de relleno.

### Referencias a elementos HTML

`document.querySelector("#language")`, `#theme` y `#products` buscan el primer elemento con el identificador indicado. El carácter `#` significa «buscar por id». Guardar el resultado en constantes evita tener que volver a buscar esos elementos cada vez que se usan.

### `renderProducts(language)`

Esta función recibe el código de idioma (`es` o `en`) y construye las tarjetas:

1. `products.map(...)` recorre cada producto y transforma sus datos en una cadena con elementos HTML.
2. `product.name[language]` y `product.description[language]` eligen el texto del idioma recibido.
3. `img/${product.image}` crea la ruta de la imagen para la tarjeta.
4. `alt` describe la imagen con el nombre del producto para quienes no pueden verla o cuando no carga.
5. `loading="lazy"` permite que el navegador retrase la carga de imágenes que aún están fuera de pantalla.
6. El botón guarda el nombre del producto en `data-product`; ese dato se lee después al pulsarlo.
7. `.join("")` combina las cadenas generadas sin separadores adicionales.
8. La asignación a `productsContainer.innerHTML` reemplaza el contenido previo del catálogo con las tarjetas nuevas.

### `setLanguage(language)`

Esta función actualiza todo el texto dependiente del idioma:

1. `translations[language]` obtiene el conjunto de textos correspondiente.
2. `document.documentElement.lang = language` actualiza el idioma del documento para el navegador y lectores de pantalla.
3. `setAttribute("aria-label", ...)` cambia los nombres accesibles de los controles y del catálogo.
4. `languageSelect.options[...]` modifica el texto visible de las opciones del selector.
5. `querySelectorAll("[data-copy]")` encuentra los párrafos del pie marcados con `data-copy`.
6. `forEach(...)` pasa por cada párrafo. `element.dataset.copy` lee el valor de su atributo `data-copy` y se usa como clave para obtener el texto dentro de `copy`.
7. `renderProducts(language)` vuelve a construir las tarjetas en el idioma elegido.

### Eventos de controles y botones

- `languageSelect.addEventListener("change", ...)` escucha el evento `change`, que ocurre cuando el usuario cambia una opción. Luego llama a `setLanguage` con el valor seleccionado.
- `themeSelect.addEventListener("change", ...)` escucha los cambios del tema y guarda el valor elegido en `document.body.dataset.theme`. `dataset.theme` corresponde al atributo HTML `data-theme`; CSS detecta ese atributo y cambia las variables de color.
- `productsContainer.addEventListener("click", ...)` escucha los clics dentro de todo el catálogo. Esto se llama **delegación de eventos**: los botones se recrean al cambiar idioma, pero el contenedor permanece y puede recibir sus clics.
- `event.target.closest(".buy-button")` comprueba si el elemento pulsado es un botón de compra o está dentro de uno. Si no lo es, `return` termina la función sin hacer nada.
- La plantilla de `message` combina el nombre guardado en `data-product` y la frase del idioma actual.
- `window.alert(message)` muestra el cuadro de confirmación integrado en el navegador.
- `setLanguage(languageSelect.value)` ejecuta la configuración inicial. El valor inicial del selector es `es`, por lo que la página aparece en español al abrirla.

## 8. Cómo modificar el proyecto

### Cambiar el precio, nombre o descripción

Abre `js/script.js`, busca el objeto del producto dentro de `products` y cambia `price`, `name.es`, `name.en`, `description.es` o `description.en`.

### Cambiar una imagen

Reemplaza el archivo dentro de `img/` conservando su nombre, o actualiza la propiedad `image` del producto. Los nombres distinguen mayúsculas y minúsculas en muchos servidores; deben coincidir exactamente.

### Cambiar un color

Modifica la variable correspondiente en `:root` para el tema claro o en `body[data-theme="dark"]` para el oscuro. Por ejemplo, `--page-bg` controla el fondo general.

### Cambiar columnas o puntos de adaptación

Modifica `grid-template-columns` en `.products`. Las reglas dentro de `@media` establecen las columnas para anchos pequeños. Por ejemplo, `repeat(2, minmax(0, 1fr))` significa dos columnas iguales.

### Añadir texto a la interfaz

Añade la misma clave a `translations.es` y `translations.en`. Luego úsala desde `setLanguage` o enlázala a un elemento con `data-copy` usando el mismo nombre de clave.

## 9. Alcance y limitaciones

- El botón «Comprar» solo enseña una alerta; no agrega productos a un carrito real ni procesa pagos.
- El idioma y el tema no se guardan. Al recargar, se inicia de nuevo en español y tema claro.
- No hay base de datos, servidor ni servicio de pedidos. Productos y textos están escritos directamente en `script.js`.
- Los precios y nombres representan la imagen de referencia. Algunas descripciones están abreviadas porque el texto pequeño de la imagen no se puede leer con certeza.
- Se mantienen los párrafos Lorem ipsum del pie como texto de muestra visible en la referencia.
