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
  const projects = [
    // ===== BRANDING (23) =====
    { name: 'Agencia de Analistas de Conducta Infantil', category: 'branding', folder: 'Logos y Publicidad/Agencia de Analistas de Conducta Infantil', images: ['A.jpg', '2.png', '3.png'] },
    { name: 'Agencia de Diseño', category: 'branding', folder: 'Logos y Publicidad/Agencia de Diseno ', images: ['2025_Mesa de trabajo 1.png', 'Hover Over_Design_Oficial 2025_Mesa de trabajo 1 copia 2.png', 'X (16).png', 'x-01.png'] },
    { name: 'Agencia de Marketing Digital', category: 'branding', folder: 'Logos y Publicidad/Agencia de Marketing digital', images: ['8593319.jpg', '8606477.jpg', 'LEMNI.png'] },
    { name: 'Agencia de Viajes', category: 'branding', folder: 'Logos y Publicidad/Agencia de Viajes', images: ['0 (2).jpg', 'X (1).png'] },
    { name: 'Arquitecto', category: 'branding', folder: 'Logos y Publicidad/Arquitecto ', images: ['Logo Jinayra_PNG-03.png', 'Logo Jinayra_ JPG-01.jpg', 'Wallpapers (2).png', 'Wallpapers (8).png'] },
    { name: 'Centro de Convenciones', category: 'branding', folder: 'Logos y Publicidad/Centro de Convenciones ', images: ['GEVENTPO_Centro de Convenciones-09.png', 'Logo_mockup_on_the_glass_2.jpg', 'Logo_mockup_on_the_glass_door1.jpg'] },
    { name: 'Del Rio Law Group', category: 'branding', folder: 'Logos y Publicidad/Del Rio Law Group', images: ['del RIO-01.png', '0 (1).jpg', '0 (1).png', '16.png', '5.png', 'Brochure-01.jpg', 'Brochure-02.jpg'] },
    { name: 'DJ', category: 'branding', folder: 'Logos y Publicidad/DJ', images: ['Bryan DJ.jpg'] },
    { name: 'Doctor Maidiel — Ginecobstetra', category: 'branding', folder: 'Logos y Publicidad/Doctor Maidiel _ Ginecobstetra', images: ['1.jpg', '3.jpg', '4.jpg', 'para maidiel.jpg'] },
    { name: 'Doctora Leyanis — Cirujana Plástica', category: 'branding', folder: 'Logos y Publicidad/Doctora Leyanis_ Cirujana plastica', images: ['LS_0 (4).png', 'LS_0 (1).jpg', 'LS_0 (1).png', 'LS_0 (2).png'] },
    { name: 'Empresa de Acueducto', category: 'branding', folder: 'Logos y Publicidad/Empresa de Acueducto', images: ['Final-01.png', 'Acueducto-05.png', 'Acueducto-07.png', 'Logo_mockup.jpg', 'Manual Aguas de Mayabeque.jpg'] },
    { name: 'Estilista', category: 'branding', folder: 'Logos y Publicidad/Estilista', images: ['E.jpg', 'Lala Lashes.jpg'] },
    { name: 'Feria de Investigación Científica', category: 'branding', folder: 'Logos y Publicidad/Feria de Investigacion Cientifica de Agricultura y Ganaderia', images: ['AGROCIENCIAS (1).jpg', 'AGROCIENCIAS (4).jpg', 'agrociencias-04.png'] },
    { name: 'Fitness', category: 'branding', folder: 'Logos y Publicidad/Fitness', images: ['Simple Balance.jpg'] },
    { name: 'Gimnasio de Crossfit', category: 'branding', folder: 'Logos y Publicidad/Gimnasio de Crossfit', images: ['EJEMPLO (1).png', 'EJEMPLO (3).png', 'EJEMPLO (4).png', 'z_Mesa de trabajo 1 copia 15_Mesa de trabajo 1 copia 15.png'] },
    { name: 'Granja Agrícola y Ganadera', category: 'branding', folder: 'Logos y Publicidad/Granja Agricola y Ganadera', images: ['0 (2).jpg', '0 (3).jpg', '0 (4).jpg', 'X (12).png'] },
    { name: 'Juegos de Lógica', category: 'branding', folder: 'Logos y Publicidad/Juegos de Logica', images: ['White_T_Shirt_Model_Front_View_Mockup.jpg', 'burro_Mesa de trabajo 1 copia 2.png', 'logo_mockup_135.jpg', 'Logo_mockup.jpg'] },
    { name: 'Ministerio de Diáconos', category: 'branding', folder: 'Logos y Publicidad/Ministerio de Diaconos', images: ['Ministerio de Diáconos.jpg'] },
    { name: 'Restaurante Italiano', category: 'branding', folder: 'Logos y Publicidad/Restaurante italiano ', images: ['Vita Nuova.jpg', 'P30H1R1222.jpg', 'tablilla.jpg', 'Vita Nuova menú bar.jpg', 'Vita Nuova menú mesa.jpg'] },
    { name: 'Taller de Componentes Gaming', category: 'branding', folder: 'Logos y Publicidad/Taller de componentes Gaming', images: ['IMG_20200813_101946.png', '0 (1).jpg', '3.jpg', 'Logo_Mockup_070.jpg'] },
    { name: 'Taller Móvil de Celulares', category: 'branding', folder: 'Logos y Publicidad/Taller movil de venta y reparacion de celulares', images: ['Shopi Mobil-02.png', '10.jpg', '5.jpg', 'Shopi Mobil-01.png'] },
    { name: 'Tienda de Productos Artesanales 2K', category: 'branding', folder: 'Logos y Publicidad/Tienda de productos artesanales 2K', images: ['2k.jpg', '2k_1.jpg', '5921454.jpg'] },
    { name: 'Tienda Feminista de Velas Artesanales', category: 'branding', folder: 'Logos y Publicidad/Tienda feminista de velas artesanales', images: ['Chely_Identidad-21.png', '15.jpg', 'candle-05.jpg', 'Logo_Mockup_070.jpg'] },
    // ===== WEB (7) =====
    { name: 'App — Beauty Store', category: 'web', folder: 'WEB', images: ['App - Beauty store.jpg'] },
    { name: 'Email Template — HQ Parfums', category: 'web', folder: 'WEB', images: ['Email template - HQ Parfums.png'] },
    { name: 'Landing Page — Mindlock', category: 'web', folder: 'WEB', images: ['Landing page - Mindlock.png'] },
    { name: 'Landing Page — Writing Jobs', category: 'web', folder: 'WEB', images: ['Landing page - Writing jobs.png'] },
    { name: 'Sitio Web — Dicom', category: 'web', folder: 'WEB', images: ['Sitio web - Dicom.png', 'Sitio web - Dicom (con hover).png'] },
    { name: 'Sitio Web — Laptop Battery', category: 'web', folder: 'WEB', images: ['Sitio web - Laptop battery HQ.png'] },
    { name: 'Sitio Web — Scrap Foam', category: 'web', folder: 'WEB', images: ['Sitio web - Scrap foam.png'] },
    // ===== 3D (8) =====
    { name: 'Autobús Infantil', category: '3d', folder: '3D/Autobus infantil', images: ['1bd38c48-aa59-488e-9a6e-b4646714d3c5.png', '70e2f74f-d93f-4d78-b012-984b28339c5a.png', 'e258f57b-a9cc-49eb-9ec9-690114f542af.png'] },
    { name: 'Co-living House Barcelona', category: '3d', folder: '3D/Co-living house en Barcelona', images: ['x_Mesa de trabajo 1 copia 8.png', '0 (1).png', '0 (2).png', '1 (1).png', '1 (2).png', '2 (1).png', '2 (2).png', 'DD_Mesa de trabajo 1 copia 4.png', 'DD_Mesa de trabajo 1 copia 5.png', 'X (10).png', 'X (11).png', 'X (12).png', 'X (13).png', 'X (1).png', 'X (2).png', 'X (3).png', 'X (8).png', 'X (9).png', 'x_Mesa de trabajo 1 copia 10.png', 'x_Mesa de trabajo 1 copia 11.png', 'x_Mesa de trabajo 1 copia 9.png'] },
    { name: 'Hotel de Campo', category: '3d', folder: '3D/Hotel de Campo', images: ['Proyecto_ rancho_mar (9).jpg', 'Proyecto_ rancho_mar  (5.5).jpg', 'Proyecto_ rancho_mar (15).jpg', 'Proyecto_ rancho_mar (7).jpg'] },
    { name: 'Jr. Suite de Hotel', category: '3d', folder: '3D/Jr. Suit de Hotel', images: ['estos (9).jpg', 'BA;O_Mesa de trabajo 1 copia 6.png', 'BA;O_Mesa de trabajo 1 copia 7.png', 'estos (10).jpg', 'estos (1).jpg', 'estos (2).jpg', 'estos (3).jpg', 'estos (4).jpg', 'estos (7).jpg', 'estos (8).jpg'] },
    { name: 'Restaurante Clásico', category: '3d', folder: '3D/Restaurante Clasico', images: ['0 (2).jpg', '0 (1).jpg', 'Espacios Interiores Restaurante Clasico.jpg', 'Sin título-2_Mesa de trabajo 1 copia 2.jpg', 'Sin título-2_Mesa de trabajo 1 copia 4.jpg', 'Sin título-2_Mesa de trabajo 1 copia.jpg', 'Sin título-2_Mesa de trabajo 1.jpg'] },
    { name: 'Stand FILH', category: '3d', folder: '3D/Stand FILH', images: ['X (4).png', 'Enscape_2022-01-12-03-03-46.jpg', 'ONBC.png', 'Reconocimiento.png'] },
    { name: 'Terraza Hotel Pasacaballos', category: '3d', folder: '3D/Terraza de Hotel Pasacaballos', images: ['2 (1).jpg', '0.jpg'] },
    { name: 'TV Studio', category: '3d', folder: '3D/TV Studio', images: ['X (17).png', '11.jpg', '12.jpg', '2.jpg', '3.jpg', '4.jpg', 'X (16).png'] },
  ];

  /* ========== PORTFOLIO RENDER ========== */
  const grid = document.getElementById('portfolioGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const countEl = document.getElementById('portfolioCount');

  function folderPath(folder, file) {
    return encodeURI(folder + '/' + file);
  }

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
          <img src="${folderPath(project.folder, project.images[0])}" alt="${project.name}" loading="lazy">
          <div class="portfolio-thumb-overlay"><span>Ver (${project.images.length})</span></div>
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
    lightboxImg.src = folderPath(project.folder, project.images[currentImageIdx]);
    lightboxTitle.textContent = project.name;
    lightboxCounter.textContent = (currentImageIdx + 1) + ' / ' + project.images.length;
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function navigateLightbox(dir) {
    const project = projects[currentProjectIdx];
    currentImageIdx = (currentImageIdx + dir + project.images.length) % project.images.length;
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
