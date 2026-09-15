const menuToggle = document.querySelector('#menuToggle');
const mainNav = document.querySelector('#mainNav');
const filters = document.querySelectorAll('.filter');
const projectCards = document.querySelectorAll('.project-card');
const noProjects = document.querySelector('#noProjects');
const projectPhoto = document.querySelector('.project-photo');
const imageLightbox = document.querySelector('#imageLightbox');
const lightboxImage = document.querySelector('#lightboxImage');
const lightboxClose = document.querySelector('#lightboxClose');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

filters.forEach(filter => filter.addEventListener('click', () => {
  filters.forEach(item => item.classList.remove('active'));
  filter.classList.add('active');
  const category = filter.dataset.filter;
  let visibleCount = 0;

  projectCards.forEach(card => {
    const isVisible = category === 'todos' || card.dataset.category === category;
    card.classList.toggle('hidden', !isVisible);
    if (isVisible) visibleCount += 1;
  });

  noProjects.style.display = visibleCount ? 'none' : 'block';
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();

function closeLightbox() {
  imageLightbox.hidden = true;
  document.body.classList.remove('lightbox-open');
}

projectPhoto.addEventListener('click', () => {
  lightboxImage.src = projectPhoto.src;
  lightboxImage.alt = projectPhoto.alt;
  imageLightbox.hidden = false;
  document.body.classList.add('lightbox-open');
  lightboxClose.focus();
});

lightboxClose.addEventListener('click', closeLightbox);
imageLightbox.addEventListener('click', event => {
  if (event.target === imageLightbox) closeLightbox();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !imageLightbox.hidden) closeLightbox();
});
