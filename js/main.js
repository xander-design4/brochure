/* ============================================
   XANDER ACOSTA — Portfolio Interactions
   Stagger / Reveal / Parallax / Navigation
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ========== NAVIGATION ========== */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-logo');

  let lastScroll = 0;

  function handleScroll() {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 40);
    lastScroll = y;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  /* ========== HERO STAGGER ENTRANCE ========== */
  const heroElements = document.querySelectorAll('#hero .reveal');

  function animateHero() {
    heroElements.forEach(el => {
      const delay = parseInt(el.dataset.delay) || 0;
      setTimeout(() => {
        el.classList.add('visible');
      }, delay + 300);
    });
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(animateHero);
  });


  /* ========== SCROLL REVEAL ========== */
  const revealElements = document.querySelectorAll('.reveal-up, .reveal');
  const nonHeroRevealElements = Array.from(revealElements).filter(el => !el.closest('#hero'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  nonHeroRevealElements.forEach(el => {
    revealObserver.observe(el);
  });


  /* ========== SUBTLE PARALLAX ========== */
  const parallaxElements = document.querySelectorAll('.about-portrait img');

  function handleParallax() {
    parallaxElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const winH = window.innerHeight;
      if (rect.top < winH && rect.bottom > 0) {
        const progress = (winH - rect.top) / (winH + rect.height);
        const offset = (progress - 0.5) * 30;
        el.style.transform = `translateY(${offset}px)`;
      }
    });
  }

  let parallaxTicking = false;
  window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
      requestAnimationFrame(() => {
        handleParallax();
        parallaxTicking = false;
      });
      parallaxTicking = true;
    }
  }, { passive: true });


  /* ========== APPROACH HOVER REVEAL ========== */
  const approachItems = document.querySelectorAll('.approach-item');

  approachItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      approachItems.forEach(other => {
        if (other !== item) {
          other.style.opacity = '0.3';
          other.style.transition = 'opacity 0.4s var(--ease)';
        }
      });
    });

    item.addEventListener('mouseleave', () => {
      approachItems.forEach(other => {
        other.style.opacity = '1';
      });
    });
  });


  /* ========== SMOOTH SCROLL OFFSET ========== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ========== FULL PORTFOLIO DATA ========== */
  // Thumbnails (img/thumbs/) for grid, large (img/large/) for lightbox
  // Generated from original folders — total ~19MB vs 568MB original
  const projects = [
    // ===== BRANDING (23) =====
    { name: 'Agencia de Analistas de Conducta Infantil', category: 'branding', thumbs: ['img/thumbs/00-00.jpg','img/thumbs/00-01.jpg','img/thumbs/00-02.jpg'], large: ['img/large/00-00.jpg','img/large/00-01.jpg','img/large/00-02.jpg'] },
    { name: 'Agencia de Diseño', category: 'branding', thumbs: ['img/thumbs/01-00.jpg','img/thumbs/01-01.jpg','img/thumbs/01-02.jpg','img/thumbs/01-03.jpg'], large: ['img/large/01-00.jpg','img/large/01-01.jpg','img/large/01-02.jpg','img/large/01-03.jpg'] },
    { name: 'Agencia de Marketing Digital', category: 'branding', thumbs: ['img/thumbs/02-00.jpg','img/thumbs/02-01.jpg','img/thumbs/02-02.jpg'], large: ['img/large/02-00.jpg','img/large/02-01.jpg','img/large/02-02.jpg'] },
    { name: 'Agencia de Viajes', category: 'branding', thumbs: ['img/thumbs/03-00.jpg','img/thumbs/03-01.jpg'], large: ['img/large/03-00.jpg','img/large/03-01.jpg'] },
    { name: 'Arquitecto', category: 'branding', thumbs: ['img/thumbs/04-00.jpg','img/thumbs/04-01.jpg','img/thumbs/04-02.jpg','img/thumbs/04-03.jpg'], large: ['img/large/04-00.jpg','img/large/04-01.jpg','img/large/04-02.jpg','img/large/04-03.jpg'] },
    { name: 'Centro de Convenciones', category: 'branding', thumbs: ['img/thumbs/05-00.jpg','img/thumbs/05-01.jpg','img/thumbs/05-02.jpg'], large: ['img/large/05-00.jpg','img/large/05-01.jpg','img/large/05-02.jpg'] },
    { name: 'Del Rio Law Group', category: 'branding', thumbs: ['img/thumbs/06-00.jpg','img/thumbs/06-01.jpg','img/thumbs/06-02.jpg','img/thumbs/06-03.jpg','img/thumbs/06-04.jpg','img/thumbs/06-05.jpg','img/thumbs/06-06.jpg'], large: ['img/large/06-00.jpg','img/large/06-01.jpg','img/large/06-02.jpg','img/large/06-03.jpg','img/large/06-04.jpg','img/large/06-05.jpg','img/large/06-06.jpg'] },
    { name: 'DJ', category: 'branding', thumbs: ['img/thumbs/07-00.jpg'], large: ['img/large/07-00.jpg'] },
    { name: 'Doctor Maidiel — Ginecobstetra', category: 'branding', thumbs: ['img/thumbs/08-00.jpg','img/thumbs/08-01.jpg','img/thumbs/08-02.jpg','img/thumbs/08-03.jpg'], large: ['img/large/08-00.jpg','img/large/08-01.jpg','img/large/08-02.jpg','img/large/08-03.jpg'] },
    { name: 'Doctora Leyanis — Cirujana Plástica', category: 'branding', thumbs: ['img/thumbs/09-00.jpg','img/thumbs/09-01.jpg','img/thumbs/09-02.jpg','img/thumbs/09-03.jpg'], large: ['img/large/09-00.jpg','img/large/09-01.jpg','img/large/09-02.jpg','img/large/09-03.jpg'] },
    { name: 'Empresa de Acueducto', category: 'branding', thumbs: ['img/thumbs/10-01.jpg','img/thumbs/10-02.jpg','img/thumbs/10-03.jpg','img/thumbs/10-04.jpg'], large: ['img/large/10-01.jpg','img/large/10-02.jpg','img/large/10-03.jpg','img/large/10-04.jpg'] },
    { name: 'Estilista', category: 'branding', thumbs: ['img/thumbs/11-00.jpg','img/thumbs/11-01.jpg'], large: ['img/large/11-00.jpg','img/large/11-01.jpg'] },
    { name: 'Feria de Investigación Científica', category: 'branding', thumbs: ['img/thumbs/12-00.jpg','img/thumbs/12-01.jpg','img/thumbs/12-02.jpg'], large: ['img/large/12-00.jpg','img/large/12-01.jpg','img/large/12-02.jpg'] },
    { name: 'Fitness', category: 'branding', thumbs: ['img/thumbs/13-00.jpg'], large: ['img/large/13-00.jpg'] },
    { name: 'Gimnasio de Crossfit', category: 'branding', thumbs: ['img/thumbs/14-00.jpg','img/thumbs/14-01.jpg','img/thumbs/14-02.jpg','img/thumbs/14-03.jpg'], large: ['img/large/14-00.jpg','img/large/14-01.jpg','img/large/14-02.jpg','img/large/14-03.jpg'] },
    { name: 'Granja Agrícola y Ganadera', category: 'branding', thumbs: ['img/thumbs/15-00.jpg','img/thumbs/15-01.jpg','img/thumbs/15-02.jpg','img/thumbs/15-03.jpg'], large: ['img/large/15-00.jpg','img/large/15-01.jpg','img/large/15-02.jpg','img/large/15-03.jpg'] },
    { name: 'Juegos de Lógica', category: 'branding', thumbs: ['img/thumbs/16-00.jpg','img/thumbs/16-01.jpg','img/thumbs/16-02.jpg','img/thumbs/16-03.jpg'], large: ['img/large/16-00.jpg','img/large/16-01.jpg','img/large/16-02.jpg','img/large/16-03.jpg'] },
    { name: 'Ministerio de Diáconos', category: 'branding', thumbs: ['img/thumbs/17-00.jpg'], large: ['img/large/17-00.jpg'] },
    { name: 'Restaurante Italiano', category: 'branding', thumbs: ['img/thumbs/18-00.jpg','img/thumbs/18-01.jpg','img/thumbs/18-02.jpg','img/thumbs/18-03.jpg','img/thumbs/18-04.jpg'], large: ['img/large/18-00.jpg','img/large/18-01.jpg','img/large/18-02.jpg','img/large/18-03.jpg','img/large/18-04.jpg'] },
    { name: 'Taller de Componentes Gaming', category: 'branding', thumbs: ['img/thumbs/19-00.jpg','img/thumbs/19-01.jpg','img/thumbs/19-02.jpg','img/thumbs/19-03.jpg'], large: ['img/large/19-00.jpg','img/large/19-01.jpg','img/large/19-02.jpg','img/large/19-03.jpg'] },
    { name: 'Taller Móvil de Celulares', category: 'branding', thumbs: ['img/thumbs/20-00.jpg','img/thumbs/20-01.jpg','img/thumbs/20-02.jpg','img/thumbs/20-03.jpg'], large: ['img/large/20-00.jpg','img/large/20-01.jpg','img/large/20-02.jpg','img/large/20-03.jpg'] },
    { name: 'Tienda de Productos Artesanales 2K', category: 'branding', thumbs: ['img/thumbs/21-00.jpg','img/thumbs/21-01.jpg','img/thumbs/21-02.jpg'], large: ['img/large/21-00.jpg','img/large/21-01.jpg','img/large/21-02.jpg'] },
    { name: 'Tienda Feminista de Velas Artesanales', category: 'branding', thumbs: ['img/thumbs/22-00.jpg','img/thumbs/22-01.jpg','img/thumbs/22-02.jpg','img/thumbs/22-03.jpg'], large: ['img/large/22-00.jpg','img/large/22-01.jpg','img/large/22-02.jpg','img/large/22-03.jpg'] },
    // ===== WEB (7) =====
    { name: 'App — Beauty Store', category: 'web', thumbs: ['img/thumbs/23-00.jpg'], large: ['img/large/23-00.jpg'] },
    { name: 'Email Template — HQ Parfums', category: 'web', thumbs: ['img/thumbs/24-00.jpg'], large: ['img/large/24-00.jpg'] },
    { name: 'Landing Page — Mindlock', category: 'web', thumbs: ['img/thumbs/25-00.jpg'], large: ['img/large/25-00.jpg'] },
    { name: 'Landing Page — Writing Jobs', category: 'web', thumbs: ['img/thumbs/26-00.jpg'], large: ['img/large/26-00.jpg'] },
    { name: 'Sitio Web — Dicom', category: 'web', thumbs: ['img/thumbs/27-00.jpg','img/thumbs/27-01.jpg'], large: ['img/large/27-00.jpg','img/large/27-01.jpg'] },
    { name: 'Sitio Web — Laptop Battery', category: 'web', thumbs: ['img/thumbs/28-00.jpg'], large: ['img/large/28-00.jpg'] },
    { name: 'Sitio Web — Scrap Foam', category: 'web', thumbs: ['img/thumbs/29-00.jpg'], large: ['img/large/29-00.jpg'] },
    { name: 'DM2GO — SaaS Product', category: 'web', thumbs: ['img/thumbs/38-00.jpg'], large: ['img/large/38-00.jpg'] },
    // ===== 3D (8) =====
    { name: 'Autobús Infantil', category: '3d', thumbs: ['img/thumbs/30-00.jpg','img/thumbs/30-01.jpg','img/thumbs/30-02.jpg'], large: ['img/large/30-00.jpg','img/large/30-01.jpg','img/large/30-02.jpg'] },
    { name: 'Co-living House Barcelona', category: '3d', thumbs: ['img/thumbs/31-00.jpg','img/thumbs/31-01.jpg','img/thumbs/31-02.jpg','img/thumbs/31-03.jpg','img/thumbs/31-04.jpg','img/thumbs/31-05.jpg','img/thumbs/31-06.jpg','img/thumbs/31-07.jpg','img/thumbs/31-08.jpg','img/thumbs/31-09.jpg','img/thumbs/31-10.jpg','img/thumbs/31-11.jpg','img/thumbs/31-12.jpg','img/thumbs/31-13.jpg','img/thumbs/31-14.jpg','img/thumbs/31-15.jpg','img/thumbs/31-16.jpg','img/thumbs/31-17.jpg','img/thumbs/31-18.jpg','img/thumbs/31-19.jpg','img/thumbs/31-20.jpg'], large: ['img/large/31-00.jpg','img/large/31-01.jpg','img/large/31-02.jpg','img/large/31-03.jpg','img/large/31-04.jpg','img/large/31-05.jpg','img/large/31-06.jpg','img/large/31-07.jpg','img/large/31-08.jpg','img/large/31-09.jpg','img/large/31-10.jpg','img/large/31-11.jpg','img/large/31-12.jpg','img/large/31-13.jpg','img/large/31-14.jpg','img/large/31-15.jpg','img/large/31-16.jpg','img/large/31-17.jpg','img/large/31-18.jpg','img/large/31-19.jpg','img/large/31-20.jpg'] },
    { name: 'Hotel de Campo', category: '3d', thumbs: ['img/thumbs/32-00.jpg','img/thumbs/32-01.jpg','img/thumbs/32-02.jpg','img/thumbs/32-03.jpg'], large: ['img/large/32-00.jpg','img/large/32-01.jpg','img/large/32-02.jpg','img/large/32-03.jpg'] },
    { name: 'Jr. Suite de Hotel', category: '3d', thumbs: ['img/thumbs/33-00.jpg','img/thumbs/33-01.jpg','img/thumbs/33-02.jpg','img/thumbs/33-03.jpg','img/thumbs/33-04.jpg','img/thumbs/33-05.jpg','img/thumbs/33-06.jpg','img/thumbs/33-07.jpg','img/thumbs/33-08.jpg','img/thumbs/33-09.jpg'], large: ['img/large/33-00.jpg','img/large/33-01.jpg','img/large/33-02.jpg','img/large/33-03.jpg','img/large/33-04.jpg','img/large/33-05.jpg','img/large/33-06.jpg','img/large/33-07.jpg','img/large/33-08.jpg','img/large/33-09.jpg'] },
    { name: 'Restaurante Clásico', category: '3d', thumbs: ['img/thumbs/34-00.jpg','img/thumbs/34-01.jpg','img/thumbs/34-02.jpg','img/thumbs/34-03.jpg','img/thumbs/34-04.jpg','img/thumbs/34-05.jpg','img/thumbs/34-06.jpg'], large: ['img/large/34-00.jpg','img/large/34-01.jpg','img/large/34-02.jpg','img/large/34-03.jpg','img/large/34-04.jpg','img/large/34-05.jpg','img/large/34-06.jpg'] },
    { name: 'Stand FILH', category: '3d', thumbs: ['img/thumbs/35-00.jpg','img/thumbs/35-01.jpg','img/thumbs/35-02.jpg','img/thumbs/35-03.jpg'], large: ['img/large/35-00.jpg','img/large/35-01.jpg','img/large/35-02.jpg','img/large/35-03.jpg'] },
    { name: 'Terraza Hotel Pasacaballos', category: '3d', thumbs: ['img/thumbs/36-00.jpg','img/thumbs/36-01.jpg'], large: ['img/large/36-00.jpg','img/large/36-01.jpg'] },
    { name: 'TV Studio', category: '3d', thumbs: ['img/thumbs/37-00.jpg','img/thumbs/37-01.jpg','img/thumbs/37-02.jpg','img/thumbs/37-03.jpg','img/thumbs/37-04.jpg','img/thumbs/37-05.jpg','img/thumbs/37-06.jpg'], large: ['img/large/37-00.jpg','img/large/37-01.jpg','img/large/37-02.jpg','img/large/37-03.jpg','img/large/37-04.jpg','img/large/37-05.jpg','img/large/37-06.jpg'] },
  ];

  /* ========== PORTFOLIO RENDER ========== */
  const grid = document.getElementById('portfolioGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const countEl = document.getElementById('portfolioCount');

  function categoryLabel(cat) {
    return { branding: 'Branding', web: 'Web', '3d': '3D' }[cat] || cat;
  }

  function renderProjects(filter) {
    const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
    grid.innerHTML = '';
    countEl.textContent = filtered.length;

    filtered.forEach((project) => {
      const realIdx = projects.indexOf(project);
      const item = document.createElement('div');
      item.className = 'portfolio-item reveal-up';
      item.dataset.index = realIdx;
      item.innerHTML = `
        <div class="portfolio-thumb">
          <img src="${project.thumbs[0]}" alt="${project.name}" loading="lazy" width="500" height="375">
          <div class="portfolio-thumb-overlay"><span>Ver (${project.thumbs.length})</span></div>
        </div>
        <div class="portfolio-meta">
          <span class="portfolio-cat">${categoryLabel(project.category)}</span>
          <h3 class="portfolio-name">${project.name}</h3>
        </div>
      `;
      item.addEventListener('click', () => openLightbox(realIdx));
      grid.appendChild(item);
    });

    requestAnimationFrame(() => {
      grid.querySelectorAll('.reveal-up').forEach(el => {
        revealObserver.observe(el);
      });
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.dataset.filter);
    });
  });

  /* ========== LIGHTBOX ========== */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  let currentProjectIdx = 0;
  let currentImageIdx = 0;

  function openLightbox(projectIdx) {
    currentProjectIdx = projectIdx;
    currentImageIdx = 0;
    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function updateLightbox() {
    const project = projects[currentProjectIdx];
    lightboxImg.src = project.large[currentImageIdx];
    lightboxTitle.textContent = project.name;
    lightboxCounter.textContent = (currentImageIdx + 1) + ' / ' + project.large.length;
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function navigateLightbox(dir) {
    const project = projects[currentProjectIdx];
    currentImageIdx = (currentImageIdx + dir + project.large.length) % project.large.length;
    updateLightbox();
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
  lightboxNext.addEventListener('click', () => navigateLightbox(1));

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  // Initial render
  renderProjects('all');

});
