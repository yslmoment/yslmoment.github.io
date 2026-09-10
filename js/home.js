(function () {
  var nav = document.querySelector('body.home .site-nav');
  if (!nav) return;

  var toggle = nav.querySelector('.menu-toggle');
  var menu = nav.querySelector('#primary-menu');
  if (!toggle || !menu) return;

  var desktop = window.matchMedia('(min-width: 761px)');

  function setOpen(open) {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }

  toggle.hidden = false;
  nav.classList.add('nav-ready');
  setOpen(false);

  toggle.addEventListener('click', function (event) {
    var open = !menu.classList.contains('is-open');
    setOpen(open);
    // Keyboard activation enters links that precede the toggle in DOM order.
    if (open && event.detail === 0) {
      var firstLink = menu.querySelector('a');
      if (firstLink) firstLink.focus();
    }
  });

  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
      event.preventDefault();
    }
  });

  document.addEventListener('click', function (event) {
    if (!nav.contains(event.target)) setOpen(false);
  });

  function resetMenu(event) {
    var focused = document.activeElement;
    setOpen(false);
    if (event.matches && focused === toggle) {
      var firstLink = menu.querySelector('a');
      if (firstLink) firstLink.focus();
    } else if (!event.matches && menu.contains(focused)) {
      toggle.focus();
    }
  }

  if (desktop.addEventListener) {
    desktop.addEventListener('change', resetMenu);
  } else {
    desktop.addListener(resetMenu);
  }
})();
