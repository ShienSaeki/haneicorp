
const translations = {
  en: {
    title: "Welcome",
    intro: "This is a multilingual demo page for HANEI Corporation."
  },
  zh: {
    title: "歡迎光臨",
    intro: "這是 HANEI Corporation 的多語系示範頁面。"
  },
  ja: {
    title: "ようこそ",
    intro: "こちらは HANEI Corporation の多言語デモページです。"
  }
};

function setLanguage(lang) {
  document.getElementById('title').innerText = translations[lang].title;
  document.getElementById('intro').innerText = translations[lang].intro;
}
