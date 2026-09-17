const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

if (menuToggle && navigation) {
  const closeMenu = () => {
    navigation.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    navigation.classList.toggle('is-open', !expanded);
  });
  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuToggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
}

const revealLinkedProject = () => {
  const identifier = decodeURIComponent(window.location.hash.slice(1));
  if (!identifier) return;
  const project = document.getElementById(identifier);
  if (project instanceof HTMLDetailsElement) project.open = true;
};

window.addEventListener('hashchange', revealLinkedProject);
revealLinkedProject();

document.querySelectorAll('.project-accordion').forEach((project) => {
  const body = project.querySelector('.accordion-body');
  const summary = project.querySelector('summary');
  if (!body || !summary) return;
  const footer = document.createElement('div');
  footer.className = 'project-end';
  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'project-close';
  closeButton.textContent = 'Close project ↑';
  closeButton.addEventListener('click', () => {
    project.open = false;
    summary.focus({ preventScroll: true });
    summary.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  });
  footer.append(closeButton);
  body.append(footer);
});
