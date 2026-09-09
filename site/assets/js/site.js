const menuButton = document.querySelector('[data-menu-button]');
const navLinks = document.querySelector('[data-nav-links]');

menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  navLinks?.classList.toggle('is-open', !expanded);
});

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
