// Theme toggle: remembers the reader's choice, otherwise follows the system setting.
(function () {
  var root = document.documentElement;
  var button = document.getElementById('theme-toggle');
  if (!button) return;

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    var dark = theme === 'dark';
    button.setAttribute('aria-pressed', String(dark));
    button.textContent = dark ? 'Light mode' : 'Dark mode';
  }

  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) { /* storage may be blocked */ }
  apply(saved || (systemPrefersDark() ? 'dark' : 'light'));

  button.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
  });
})();

// Reading progress bar: fills as the reader scrolls down the page.
(function () {
  var bar = document.getElementById('progress');
  if (!bar) return;

  function update() {
    var doc = document.documentElement;
    var scrollable = doc.scrollHeight - doc.clientHeight;
    var ratio = scrollable > 0 ? doc.scrollTop / scrollable : 0;
    bar.style.transform = 'scaleX(' + Math.min(1, Math.max(0, ratio)) + ')';
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
