const products = [
  { image: "hamburguesa-1.webp", price: "$ 8.900", name: { es: "BBQ Crunch", en: "BBQ Crunch" }, description: { es: "1 Sandwich BBQ Crunch (1 filete de pollo apanado).", en: "1 BBQ Crunch sandwich (1 breaded chicken fillet)." } },
  { image: "hamburguesa-2.webp", price: "$ 15.900", name: { es: "Kentucky Sandwich", en: "Kentucky Sandwich" }, description: { es: "1 Kentucky hamburguesa / Sandwich (1 filete de pechuga de pollo apanado, pepinillos...", en: "1 Kentucky burger / sandwich (1 breaded chicken breast fillet, pickles...)." } },
  { image: "hamburguesa-3.webp", price: "$ 15.900", name: { es: "Combo BBQ Crunch", en: "BBQ Crunch Combo" }, description: { es: "1 Sandwich BBQ Crunch (1 filete de pollo apanado) + 1 gaseosa personal.", en: "1 BBQ Crunch sandwich (1 breaded chicken fillet) + 1 personal drink." } },
  { image: "hamburguesa-4.webp", price: "$ 16.900", name: { es: "Kentucky Coronel Sandwich", en: "Kentucky Colonel Sandwich" }, description: { es: "1 Kentucky Coronel hamburguesa / Sandwich (1 filete de pechuga de pollo apanado, ensalada...", en: "1 Kentucky Colonel sandwich (1 breaded chicken breast fillet, slaw...)." } },
  { image: "hamburguesa-5.webp", price: "$ 21.900", name: { es: "Combo Kentucky Sandwich", en: "Kentucky Sandwich Combo" }, description: { es: "1 Kentucky hamburguesa / Sandwich (1 filete de pechuga de pollo apanado, pepinillos...", en: "1 Kentucky sandwich (1 breaded chicken breast fillet, pickles...) + drink." } },
  { image: "hamburguesa-6.webp", price: "$ 22.900", name: { es: "Combo Kentucky Coronel Sandwich", en: "Kentucky Colonel Sandwich Combo" }, description: { es: "1 Kentucky Coronel hamburguesa / Sandwich (1 filete de pollo apanado, ensalada...).", en: "1 Kentucky Colonel sandwich (1 breaded chicken fillet, slaw...) + drink." } },
  { image: "hamburguesa-7.webp", price: "$ 23.900", name: { es: "Sandwich Crispy BBQ", en: "Crispy BBQ Sandwich" }, description: { es: "1 Sandwich Crispy BBQ (1 filete de pechuga extragrande, triple empanizado, cebolla crispy...).", en: "1 Crispy BBQ sandwich (1 extra-large, triple-breaded chicken fillet, crispy onions...)." } },
  { image: "hamburguesa-8.webp", price: "$ 29.900", name: { es: "Combo Sandwich Crispy BBQ", en: "Crispy BBQ Sandwich Combo" }, description: { es: "1 Sandwich Crispy BBQ (1 filete de pechuga extragrande, triple empanizado, cebolla crispy...).", en: "1 Crispy BBQ sandwich (1 extra-large, triple-breaded chicken fillet, crispy onions...) + drink." } }
];

const translations = {
  es: { language: "Seleccionar idioma", theme: "Seleccionar color", light: "Tema claro", dark: "Tema oscuro", buy: "Comprar", added: " añadido al pedido.", menu: "Menú de hamburguesas", footerOne: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis nemo iste quae quia corrupti, omnis tenetur, nihil beatae exercitationem et totam laudantium fuga in nulla cum? Numquam voluptas fugit animi.", footerTwo: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla quos libero iure, magnam velit consequuntur amet in quaerat ipsam vitae animi minus? Sequi sed vitae nihil iure voluptates magnam facilis?", footerThree: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore suscipit incidunt facilis voluptates consequuntur veniam maxime voluptatum fuga molestias odit vero voluptas, alias iusto quas iure, excepturi possimus, eligendi recusandae." },
  en: { language: "Select language", theme: "Select theme", light: "Light theme", dark: "Dark theme", buy: "Buy", added: " added to your order.", menu: "Burger menu", footerOne: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis nemo iste quae quia corrupti, omnis tenetur, nihil beatae exercitationem et totam laudantium fuga in nulla cum? Numquam voluptas fugit animi.", footerTwo: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla quos libero iure, magnam velit consequuntur amet in quaerat ipsam vitae animi minus? Sequi sed vitae nihil iure voluptates magnam facilis?", footerThree: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore suscipit incidunt facilis voluptates consequuntur veniam maxime voluptatum fuga molestias odit vero voluptas, alias iusto quas iure, excepturi possimus, eligendi recusandae." }
};

const languageSelect = document.querySelector("#language");
const themeSelect = document.querySelector("#theme");
const productsContainer = document.querySelector("#products");

function renderProducts(language) {
  productsContainer.innerHTML = products.map((product) => `
    <article class="product-card">
      <img src="img/${product.image}" alt="${product.name[language]}" loading="lazy">
      <p class="price">${product.price}</p>
      <h2 class="product-name">${product.name[language]}</h2>
      <p class="description">${product.description[language]}</p>
      <button class="buy-button" type="button" data-product="${product.name[language]}">${translations[language].buy}</button>
    </article>`).join("");
}

function setLanguage(language) {
  const copy = translations[language];
  document.documentElement.lang = language;
  languageSelect.setAttribute("aria-label", copy.language);
  themeSelect.setAttribute("aria-label", copy.theme);
  languageSelect.options[0].textContent = language === "es" ? "Español" : "Spanish";
  languageSelect.options[1].textContent = "English";
  themeSelect.options[0].textContent = copy.light;
  themeSelect.options[1].textContent = copy.dark;
  productsContainer.setAttribute("aria-label", copy.menu);
  document.querySelectorAll("[data-copy]").forEach((element) => {
    element.textContent = copy[element.dataset.copy];
  });
  renderProducts(language);
}

languageSelect.addEventListener("change", () => setLanguage(languageSelect.value));
themeSelect.addEventListener("change", () => {
  document.body.dataset.theme = themeSelect.value;
});

productsContainer.addEventListener("click", (event) => {
  const button = event.target.closest(".buy-button");
  if (!button) return;
  const message = `${button.dataset.product}${translations[languageSelect.value].added}`;
  window.alert(message);
});

setLanguage(languageSelect.value);
