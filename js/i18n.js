(function () {
  function setLang(lang) {
    lang = lang === 'ko' ? 'ko' : 'en';
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang);
    try { localStorage.setItem('lang', lang); } catch (e) {}
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.classList.toggle('active', b.dataset.lang === lang);
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
  }
  var initial = document.documentElement.getAttribute('data-lang') || 'en';
  setLang(initial);
  document.querySelectorAll('.lang-btn').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang); });
  });
})();
