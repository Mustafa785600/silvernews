/* ===================================================
   SilverNews — Main JavaScript
   Hero slider, navigation, scroll effects, particles
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Background Particles ----
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    for (let i = 0; i < 40; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (8 + Math.random() * 15) + 's';
      p.style.animationDelay = Math.random() * 10 + 's';
      p.style.width = (1 + Math.random() * 2) + 'px';
      p.style.height = p.style.width;
      const colors = ['#6c5ce7', '#00cec9', '#0ff', '#fd79a8'];
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      particlesContainer.appendChild(p);
    }
  }

  // ---- Header Scroll Effect ----
  const header = document.getElementById('header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ---- Mobile Navigation ----
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      // Animate hamburger to X
      const spans = hamburger.querySelectorAll('span');
      if (navMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // ---- Hero Slider ----
  const heroSlider = document.getElementById('heroSlider');
  if (heroSlider) {
    const slides = heroSlider.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const heroTitle = document.getElementById('heroTitle');
    const heroExcerpt = document.getElementById('heroExcerpt');
    let currentSlide = 0;
    let slideInterval;

    const slidesData = [
      {
        title: 'GTA VI Official Release Date Finally Confirmed by Rockstar Games',
        excerpt: 'Rockstar Games has officially confirmed the highly anticipated release window for Grand Theft Auto VI, sending shockwaves across the gaming community worldwide.'
      },
      {
        title: 'The Future of Cloud Gaming: How Streaming Will Change Everything',
        excerpt: 'Cloud gaming technology is evolving rapidly, with major players like Xbox, PlayStation, and NVIDIA competing to deliver seamless, lag-free experiences.'
      },
      {
        title: 'PS6 Hardware Specifications Leak — Next-Gen Console Wars Begin',
        excerpt: 'Leaked documents reveal Sony\'s ambitious plans for the PlayStation 6, featuring custom AMD hardware and advanced ray tracing capabilities.'
      }
    ];

    function goToSlide(index) {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      slides[index].classList.add('active');
      dots[index].classList.add('active');

      // Animate text
      if (heroTitle && heroExcerpt) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        heroExcerpt.style.opacity = '0';
        heroExcerpt.style.transform = 'translateY(20px)';

        setTimeout(() => {
          heroTitle.textContent = slidesData[index].title;
          heroExcerpt.textContent = slidesData[index].excerpt;
          heroTitle.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          heroExcerpt.style.transition = 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s';
          heroTitle.style.opacity = '1';
          heroTitle.style.transform = 'translateY(0)';
          heroExcerpt.style.opacity = '1';
          heroExcerpt.style.transform = 'translateY(0)';
        }, 300);
      }

      currentSlide = index;
    }

    function nextSlide() {
      goToSlide((currentSlide + 1) % slides.length);
    }

    function prevSlide() {
      goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    // Auto-play
    function startAutoPlay() {
      slideInterval = setInterval(nextSlide, 6000);
    }

    function stopAutoPlay() {
      clearInterval(slideInterval);
    }

    startAutoPlay();

    // Controls
    const nextBtn = document.getElementById('heroNext');
    const prevBtn = document.getElementById('heroPrev');

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
      });
    }

    // Dots
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        stopAutoPlay();
        goToSlide(parseInt(dot.dataset.index));
        startAutoPlay();
      });
    });
  }

  // ---- Scroll Reveal Animation ----
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ---- Filter Buttons (Category Page) ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // In production: filter articles via API or hide/show
      });
    });
  }

  // ---- Newsletter Form ----
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value) {
        const btn = newsletterForm.querySelector('.newsletter-btn');
        const originalText = btn.textContent;
        btn.textContent = '✓ Subscribed!';
        btn.style.background = 'var(--accent-green)';
        input.value = '';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
        }, 3000);
      }
    });
  }

  // ---- Pagination Active State ----
  const pageBtns = document.querySelectorAll('.page-btn');
  if (pageBtns.length > 0) {
    pageBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        pageBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  // ---- Smooth link scrolling ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Dynamic Articles Loader ----
  const newsGrid = document.getElementById('latestNewsGrid');
  if (newsGrid) {
    loadArticles();
  }

  async function loadArticles() {
    const grid = document.getElementById('latestNewsGrid');
    const loading = document.getElementById('newsLoading');
    if (!grid) return;

    try {
      const res = await fetch('articles.json?' + Date.now());
      if (!res.ok) throw new Error('No articles.json');
      const articles = await res.json();

      if (!Array.isArray(articles) || articles.length === 0) {
        showFallbackCards(grid, loading);
        return;
      }

      // Sort by date, newest first
      articles.sort((a, b) => new Date(b.date) - new Date(a.date));

      if (loading) loading.remove();
      grid.innerHTML = '';

      // Render up to 10 latest articles
      const shown = articles.slice(0, 10);
      shown.forEach((article, index) => {
        const isFirst = index === 0;
        const categoryIcons = {
          'News': '📰', 'Indie': '🎮', 'Release': '🆕', 'Review': '📋',
          'CEO': '👔', 'Controversy': '🔥', 'Update': '⬆️'
        };
        const icon = categoryIcons[article.category] || '📰';
        const dateStr = new Date(article.date).toLocaleDateString('en-US', {
          day: 'numeric', month: 'short', year: 'numeric'
        });

        const card = document.createElement('article');
        card.className = isFirst ? 'card card--featured reveal visible' : 'card reveal visible';
        card.innerHTML = `
          <a href="articles/${article.slug}.html" class="card-image-wrap">
            <span class="card-category">${icon} ${article.category}</span>
          </a>
          <div class="card-body">
            <a href="articles/${article.slug}.html"><h3 class="card-title">${article.title}</h3></a>
            <p class="card-excerpt">${article.description}</p>
            <div class="card-meta">
              <div class="card-author">
                <div class="card-author-avatar"></div>
                <span>SilverNews AI</span>
              </div>
              <span>${dateStr}</span>
            </div>
          </div>
        `;
        grid.appendChild(card);
      });

    } catch (e) {
      showFallbackCards(grid, loading);
    }
  }

  function showFallbackCards(grid, loading) {
    if (loading) loading.remove();
    const fallback = [
      { title: 'AI-Powered News Coming Soon', desc: 'SilverNews uses artificial intelligence to discover and write the most relevant PC and console gaming news every day.', cat: '🤖 AI News', date: 'Coming Soon' },
      { title: 'PC & Console Gaming Focus', desc: 'We cover everything from indie developer announcements to major studio releases across PlayStation, Xbox, Nintendo, and PC.', cat: '🎮 Gaming', date: 'Daily Updates' },
      { title: 'Industry Insights & Analysis', desc: 'Deep analysis of CEO statements, studio acquisitions, and the business side of gaming that matters to you.', cat: '📊 Analysis', date: 'Stay Tuned' }
    ];
    grid.innerHTML = '';
    fallback.forEach((item, i) => {
      const card = document.createElement('article');
      card.className = i === 0 ? 'card card--featured reveal visible' : 'card reveal visible';
      card.innerHTML = `
        <div class="card-body">
          <h3 class="card-title">${item.title}</h3>
          <p class="card-excerpt">${item.desc}</p>
          <div class="card-meta">
            <div class="card-author"><div class="card-author-avatar"></div><span>SilverNews</span></div>
            <span>${item.date}</span>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

});
