
let idx = null;
let data = [];
let currentLang = (navigator.language || navigator.userLanguage || 'en').substr(0, 2);
if (!['zh', 'ja'].includes(currentLang)) currentLang = 'en';

const i18n = {
  en: { placeholder: "Enter keyword...", title: "Site Search" },
  zh: { placeholder: "輸入關鍵字...", title: "網站搜尋" },
  ja: { placeholder: "キーワードを入力...", title: "サイト内検索" }
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('searchBox').placeholder = i18n[currentLang].placeholder;
  document.getElementById('searchTitle').innerText = i18n[currentLang].title;

  fetch(`search-index-${currentLang}.json`)
    .then(response => response.json())
    .then(docs => {
      data = docs;
      idx = lunr(function () {
        this.ref('id');
        this.field('title');
        this.field('description');
        data.forEach(function (doc) {
          this.add(doc);
        }, this);
      });
    });
});

function runSearch() {
  const query = document.getElementById('searchBox').value;
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (!idx || query.trim() === '') return;

  const results = idx.search(query);
  results.forEach(result => {
    const match = data.find(d => d.id === result.ref);
    if (match) {
      resultsDiv.innerHTML += `
        <div class="result">
          <a href="${match.url}">${match.title}</a>
          <p>${match.description}</p>
        </div>
      `;
    }
  });
}
