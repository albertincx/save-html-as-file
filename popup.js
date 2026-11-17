const TRANSLATIONS = {
  en: {
    downloadBtn: "Download HTML",
    gettingHtml: "Getting HTML...",
    noActiveTab: "No active tab",
    done: "Done",
    error: "Error: unavailable on this page",
    langLabel: "Language"
  },
  ru: {
    downloadBtn: "Скачать HTML",
    gettingHtml: "Получение HTML...",
    noActiveTab: "Нет активной вкладки",
    done: "Готово",
    error: "Ошибка: недоступно на этой странице",
    langLabel: "Язык"
  }
};

let currentLang = "en";
let currentStatusKey = null;

function applyLanguage(lang) {
  currentLang = TRANSLATIONS[lang] ? lang : "en";
  const t = TRANSLATIONS[currentLang];

  document.documentElement.lang = currentLang;
  document.getElementById("downloadBtn").textContent = t.downloadBtn;

  const langSelect = document.getElementById("langSelect");
  langSelect.value = currentLang;
  langSelect.setAttribute("aria-label", t.langLabel);

  if (currentStatusKey && t[currentStatusKey]) {
    document.getElementById("status").textContent = t[currentStatusKey];
  }
}

function setStatus(key) {
  currentStatusKey = key;
  const t = TRANSLATIONS[currentLang];
  document.getElementById("status").textContent = key ? t[key] : "";
}

document.addEventListener("DOMContentLoaded", async () => {
  const { lang = "en" } = await chrome.storage.local.get({ lang: "en" });
  applyLanguage(lang);

  document.getElementById("langSelect").addEventListener("change", async (e) => {
    const selected = e.target.value;
    applyLanguage(selected);
    await chrome.storage.local.set({ lang: selected });
  });

  document.getElementById("downloadBtn").addEventListener("click", async () => {
    setStatus("gettingHtml");

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) {
      setStatus("noActiveTab");
      return;
    }

    try {
      const [{ result }] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => document.documentElement.outerHTML
      });

      const blob = new Blob([result], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const filename = `${(tab.title || "page").replace(/[\\/:*?"<>|]/g, "_")}.html`;

      await chrome.downloads.download({ url, filename, saveAs: true });
      setStatus("done");
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (e) {
      setStatus("error");
    }
  });
});
