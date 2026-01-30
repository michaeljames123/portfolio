const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('[data-nav-link]');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('hidden');
  });
}

const setActiveNav = (targetId) => {
  if (!targetId) return;
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    const sectionId = href && href.startsWith('#') ? href.substring(1) : null;

    if (sectionId === targetId) {
      link.classList.add('text-primary-300', 'border-primary-500');
    } else {
      link.classList.remove('text-primary-300', 'border-primary-500');
    }
  });
};

const scrollLinks = document.querySelectorAll('[data-scroll]');

scrollLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');

    if (href && href.startsWith('#')) {
      event.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveNav(targetId);
      }

      if (window.innerWidth < 640 && navMenu && !navMenu.classList.contains('hidden')) {
        navMenu.classList.add('hidden');
      }
    }
  });
});

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let currentId = null;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) {
      currentId = section.id;
    }
  });

  if (currentId) {
    setActiveNav(currentId);
  }
});

const revealEls = document.querySelectorAll('[data-reveal]');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-4');
          entry.target.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealEls.forEach((el) => {
    el.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-700');
    observer.observe(el);
  });
}

const toTopBtn = document.getElementById('to-top');

if (toTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      toTopBtn.classList.remove('opacity-0', 'pointer-events-none');
      toTopBtn.classList.add('opacity-100');
    } else {
      toTopBtn.classList.add('opacity-0', 'pointer-events-none');
      toTopBtn.classList.remove('opacity-100');
    }
  });

  toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const yearSpan = document.getElementById('year');

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear().toString();
}
