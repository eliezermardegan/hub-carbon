(function () {
  const STORAGE_KEY = "hubcarbon_locale";
  const SUPPORTED = ["en", "pt", "es"];

  const messages = {
    en: {
      nav: { Hubs:"Hubs", Ecosystem:"Ecosystem", Infrastructure:"Infrastructure", "Project Intelligence":"Project Intelligence", About:"About", Contact:"Contact", "Talk to us":"Talk to us" },
      ui: { Language:"Language", "Privacy & Cookies":"Privacy & Cookies", "Cookie settings":"Cookie settings", Menu:"Menu", Close:"Close" },
      meta: {
        "index.html":"Hub Carbon — Connecting the low-carbon economy",
        "about.html":"About — Hub Carbon",
        "contact.html":"Contact — Hub Carbon",
        "project-intelligence.html":"Project Intelligence — Hub Carbon",
        "privacy.html":"Privacy & Cookies — Hub Carbon"
      }
    },
    pt: {
      nav: { Hubs:"Hubs", Ecosystem:"Ecossistema", Infrastructure:"Infraestrutura", "Project Intelligence":"Inteligência de Projetos", About:"Sobre", Contact:"Contacto", "Talk to us":"Fale connosco" },
      ui: { Language:"Idioma", "Privacy & Cookies":"Privacidade e Cookies", "Cookie settings":"Definições de cookies", Menu:"Menu", Close:"Fechar" },
      meta: {
        "index.html":"Hub Carbon — Conectando a economia de baixo carbono",
        "about.html":"Sobre — Hub Carbon",
        "contact.html":"Contacto — Hub Carbon",
        "project-intelligence.html":"Inteligência de Projetos — Hub Carbon",
        "privacy.html":"Privacidade e Cookies — Hub Carbon"
      }
    },
    es: {
      nav: { Hubs:"Hubs", Ecosystem:"Ecosistema", Infrastructure:"Infraestructura", "Project Intelligence":"Inteligencia de Proyectos", About:"Acerca de", Contact:"Contacto", "Talk to us":"Hablemos" },
      ui: { Language:"Idioma", "Privacy & Cookies":"Privacidad y Cookies", "Cookie settings":"Configuración de cookies", Menu:"Menú", Close:"Cerrar" },
      meta: {
        "index.html":"Hub Carbon — Conectando la economía baja en carbono",
        "about.html":"Acerca de — Hub Carbon",
        "contact.html":"Contacto — Hub Carbon",
        "project-intelligence.html":"Inteligencia de Proyectos — Hub Carbon",
        "privacy.html":"Privacidad y Cookies — Hub Carbon"
      }
    }
  };

  function currentFile() {
    const path = window.location.pathname.split("/").pop();
    return path || "index.html";
  }

  function getLocale() {
    const query = new URLSearchParams(window.location.search).get("lang");
    if (SUPPORTED.includes(query)) return query;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (SUPPORTED.includes(stored)) return stored;
    } catch (_) {}
    const browser = (navigator.language || "en").slice(0, 2).toLowerCase();
    return SUPPORTED.includes(browser) ? browser : "en";
  }

  function saveLocale(locale) {
    try { localStorage.setItem(STORAGE_KEY, locale); } catch (_) {}
  }

  function translatePlainText(root, dictionary) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    for (const node of nodes) {
      const value = node.nodeValue.trim();
      if (!value || !dictionary[value]) continue;
      const parent = node.parentElement;
      if (!parent || ["SCRIPT","STYLE","NOSCRIPT"].includes(parent.tagName)) continue;
      node.nodeValue = node.nodeValue.replace(value, dictionary[value]);
    }
  }

  function addLanguageControl(locale) {
    const nav = document.querySelector(".site-nav");
    if (!nav || nav.querySelector(".nav-languages")) return;

    const wrapper = document.createElement("div");
    wrapper.className = "nav-languages";
    wrapper.setAttribute("aria-label", "Language");

    const label = document.createElement("span");
    label.className = "nav-languages-label";
    label.dataset.i18nUi = "Language";
    label.textContent = messages[locale].ui.Language;

    const options = document.createElement("div");
    options.className = "language-options";

    for (const code of SUPPORTED) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "language-option" + (code === locale ? " is-active" : "");
      button.dataset.locale = code;
      button.textContent = code.toUpperCase();
      button.setAttribute("aria-label", code === "en" ? "English" : code === "pt" ? "Português" : "Español");
      if (code === locale) button.setAttribute("aria-current", "true");
      button.addEventListener("click", () => setLocale(code));
      options.appendChild(button);
    }

    wrapper.append(label, options);
    nav.appendChild(wrapper);
  }

  function applyPageLocale(locale) {
    const dict = { ...messages[locale].nav, ...messages[locale].ui };
    translatePlainText(document.body, dict);

    const file = currentFile();
    const title = messages[locale].meta[file];
    if (title) document.title = title;

    document.documentElement.lang = locale;

    document.querySelectorAll(".language-option").forEach(button => {
      const active = button.dataset.locale === locale;
      button.classList.toggle("is-active", active);
      if (active) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    });

    const menuButton = document.querySelector(".menu-toggle");
    if (menuButton) {
      const open = document.querySelector(".site-nav")?.classList.contains("open");
      menuButton.textContent = open ? messages[locale].ui.Close : messages[locale].ui.Menu;
    }

    const label = document.querySelector(".nav-languages-label");
    if (label) label.textContent = messages[locale].ui.Language;

    window.dispatchEvent(new CustomEvent("hubcarbon:localechange", {
      detail: { locale }
    }));
  }

  function setLocale(locale) {
    if (!SUPPORTED.includes(locale)) return;
    saveLocale(locale);
    applyPageLocale(locale);

    const url = new URL(window.location.href);
    url.searchParams.set("lang", locale);
    window.history.replaceState({}, "", url);
  }

  window.HubCarbonI18n = { setLocale, getLocale, supported: SUPPORTED };

  const init = () => {
    const locale = getLocale();
    addLanguageControl(locale);
    applyPageLocale(locale);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
