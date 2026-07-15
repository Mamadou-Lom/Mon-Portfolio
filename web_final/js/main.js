/* ===========================
   THÈME SOMBRE / CLAIR
=========================== */
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ===========================
   NAVBAR — SCROLL & MOBILE
=========================== */
const navbar = document.getElementById('navbar');
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  backToTop.classList.toggle('visible', window.scrollY > 400);
});

burger.addEventListener('click', () => {
  navLinks.classList.toggle('mobile-open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('mobile-open'));
});

/* ===========================
   LIEN ACTIF NAVBAR
=========================== */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const observerNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observerNav.observe(s));

/* ===========================
   ANIMATIONS FADE-IN
=========================== */
const fadeEls = document.querySelectorAll('.project-card, .about-link-card, .contact-card, .timeline-item, .section-header, .section-intro, .about-text');
fadeEls.forEach(el => el.classList.add('fade-in'));

const observerFade = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observerFade.observe(el));

/* ===========================
   TIMELINE ANIMATION
=========================== */
const timelineItems = document.querySelectorAll('.timeline-item');
const observerTimeline = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 150);
    }
  });
}, { threshold: 0.1 });
timelineItems.forEach(el => observerTimeline.observe(el));

/* ===========================
   COMPTEURS ANIMÉS
=========================== */
const statNums = document.querySelectorAll('.stat-num');
const observerStats = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target);
      let count = 0;
      const step = Math.ceil(target / 30);
      const interval = setInterval(() => {
        count += step;
        if (count >= target) { count = target; clearInterval(interval); }
        entry.target.textContent = count;
      }, 40);
      observerStats.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => observerStats.observe(el));

/* ===========================
   FILTRE PROJETS
=========================== */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const tagList = (card.dataset.tags || '').split(' ');
      if (filter === 'all' || tagList.includes(filter)) {
        card.classList.remove('hidden');
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        requestAnimationFrame(() => {
          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        });
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ===========================
   MODAL PROJET — PAGE DÉTAIL
=========================== */
const modalOverlay = document.getElementById('modalOverlay');
const modal = document.getElementById('modal');

function openModal(card) {
  const title      = card.dataset.title     || '';
  const tech       = (card.dataset.tech     || '').split(',');
  const year       = card.dataset.year      || '';
  const context    = card.dataset.context   || 'À compléter.';
  const donnees    = card.dataset.donnees   || 'À compléter.';
  const methode    = card.dataset.methode   || 'À compléter.';
  const resultats  = card.dataset.resultats || 'À compléter.';
  const img        = card.dataset.img       || '';
  const resultImg  = card.dataset.resultImg || '';
  const color      = card.querySelector('.card-banner').style.cssText.match(/--card-color:\s*([^;]+)/)?.[1] || '#378ADD';

  document.getElementById('modalTitle').textContent   = title;
  document.getElementById('modalYear').textContent    = year;
  document.getElementById('modalContext').textContent = context;
  document.getElementById('modalData').textContent    = donnees;
  document.getElementById('modalMethod').textContent  = methode;
  document.getElementById('modalResults').textContent = resultats;

  // Bannière fond d'écran
  const banner = document.getElementById('modalBanner');
  banner.style.cssText = `
    background-color: ${color};
    background-image: ${img ? `url('${img}')` : 'none'};
    background-size: cover;
    background-position: center;
    height: 200px;
  `;
  banner.innerHTML = '';

  // Image de résultat (optionnelle)
  const imgWrap = document.getElementById('modalResultImgWrap');
  const imgEl   = document.getElementById('modalResultImg');
  if (resultImg) {
    imgEl.src = resultImg;
    imgWrap.style.display = 'block';
  } else {
    imgWrap.style.display = 'none';
  }

  document.getElementById('modalTech').innerHTML = tech.map(t => `<span>${t.trim()}</span>`).join('');

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (!e || e.target === modalOverlay) {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeModal(); closePoster(); }
});

/* ===========================
   POSTER VIEWER
=========================== */
const posters = [
  { title: 'Production des données en entreprise',  year: '2024', img: 'assets/img/poster_economie_p1.jpg' },
  { title: 'Séries temporelles', year: '2026', img: 'assets/img/poster_groupe04_p1.jpg' },
  { title: '50 ans de requêtes : SQL et NoSQL', year: '2026', img: 'assets/img/poster_sid_p1.jpg' },
  { title: 'Dashboard data challenge', year: '2025', img: 'assets/img/poster_datachallenge_p1.jpg'}

];

let currentPoster = 0;

function goToPoster(index) {
  currentPoster = (index + posters.length) % posters.length;
  const p = posters[currentPoster];
  document.getElementById('posterViewerImg').src               = p.img;
  document.getElementById('posterViewerImg').alt               = p.title;
  document.getElementById('posterViewerTitle').textContent     = p.title;
  document.getElementById('posterViewerYear').textContent      = p.year;
  document.getElementById('posterCounter').textContent         = `${currentPoster + 1} / ${posters.length}`;
  document.querySelectorAll('.poster-dot').forEach((d, i) => d.classList.toggle('active', i === currentPoster));
}

function movePoster(dir) { goToPoster(currentPoster + dir); }

/* ===========================
   MODAL POSTER PDF
=========================== */
const posterOverlay = document.getElementById('posterOverlay');

function openPoster(pdfPath, title) {
  document.getElementById('posterModalTitle').textContent = title;
  document.getElementById('posterFrame').src = pdfPath;
  posterOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePoster(e) {
  if (!e || e.target === posterOverlay) {
    posterOverlay.classList.remove('open');
    document.getElementById('posterFrame').src = '';
    document.body.style.overflow = '';
  }
}

/* ===========================
   FORMULAIRE CONTACT
=========================== */
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name  = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg   = document.getElementById('message').value.trim();

  if (!name || !email || !msg) {
    formNote.textContent = 'Veuillez remplir tous les champs.';
    formNote.style.color = '#e24b4a';
    return;
  }

  formNote.textContent = 'Envoi en cours...';
  formNote.style.color = 'var(--text-muted)';

  try {
    const response = await fetch('https://formspree.io/f/xkolqvka', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, message: msg })
    });

    if (response.ok) {
      formNote.textContent = 'Message envoyé avec succès ! Je vous réponds bientôt.';
      formNote.style.color = 'var(--accent)';
      contactForm.reset();
    } else {
      formNote.textContent = 'Une erreur est survenue. Réessayez.';
      formNote.style.color = '#e24b4a';
    }
  } catch {
    formNote.textContent = 'Connexion impossible. Vérifiez votre réseau.';
    formNote.style.color = '#e24b4a';
  }

  setTimeout(() => { formNote.textContent = ''; }, 5000);
});


/* ===========================
   BOUTON RETOUR EN HAUT
=========================== */
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===========================
   CARROUSEL — PAUSE AU SURVOL
=========================== */
const track = document.getElementById('carouselTrack');
if (track) {
  track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
}



