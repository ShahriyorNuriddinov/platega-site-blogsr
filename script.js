// ===== FAQ Accordion =====
document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('active');
            i.querySelector('.faq-icon').textContent = '+';
        });
        if (!isActive) {
            item.classList.add('active');
            btn.querySelector('.faq-icon').textContent = '−';
        }
    });
});

// ===== Back to top =====
document.querySelector('.back-to-top')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Reviews slider =====
(function () {
    const slider = document.getElementById('reviewsSlider');
    const dotsContainer = document.getElementById('reviewsDots');
    const overflow = slider?.parentElement;
    if (!slider || !overflow) return;

    const cards = slider.querySelectorAll('.review-card');
    const total = cards.length;
    const gap = 20;
    let current = 0;
    let perPage = 3;
    let pages = Math.ceil(total / perPage);

    function getPerPage() {
        return window.innerWidth < 768 ? 1 : 3;
    }

    function buildDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < pages; i++) {
            const d = document.createElement('span');
            d.className = 'dot' + (i === 0 ? ' active' : '');
            d.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(d);
        }
    }

    function setCardWidths() {
        perPage = getPerPage();
        pages = Math.ceil(total / perPage);
        current = Math.min(current, pages - 1);
        const containerWidth = overflow.offsetWidth;
        const cardW = (containerWidth - gap * (perPage - 1)) / perPage;
        cards.forEach(c => {
            c.style.width = cardW + 'px';
            c.style.minWidth = cardW + 'px';
        });
        buildDots();
        goTo(current);
    }

    function goTo(page) {
        current = Math.max(0, Math.min(page, pages - 1));
        const cardW = cards[0].offsetWidth;
        slider.style.transform = `translateX(-${current * perPage * (cardW + gap)}px)`;
        dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
            d.classList.toggle('active', i === current);
        });
    }

    document.getElementById('reviewsPrev')?.addEventListener('click', () => goTo(current - 1));
    document.getElementById('reviewsNext')?.addEventListener('click', () => goTo(current + 1));
    setCardWidths();
    window.addEventListener('resize', setCardWidths);
})();

// ===== Mobile Menu =====
(function () {
    const menuBtn = document.getElementById('menuOpen');
    const closeBtn = document.getElementById('menuClose');
    const overlay = document.getElementById('mobileOverlay');
    const drawer = document.getElementById('mobileMenu');
    if (!menuBtn || !drawer) return;

    function openMenu() {
        drawer.classList.add('open');
        if (overlay) {
            overlay.style.display = 'block';
            requestAnimationFrame(() => overlay.classList.add('visible'));
        }
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        drawer.classList.remove('open');
        if (overlay) {
            overlay.classList.remove('visible');
            setTimeout(() => { overlay.style.display = 'none'; }, 300);
        }
        document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', openMenu);
    closeBtn?.addEventListener('click', closeMenu);
    overlay?.addEventListener('click', closeMenu);
})();

// ===== Nav Dropdown (Платежи) =====
(function () {
    const dropdown = document.querySelector('.nav-dropdown');
    if (!dropdown) return;

    const btn = dropdown.querySelector('.nav-dropdown-btn');
    btn?.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });
})();

// ===== Scroll Animations =====
(function () {
    const animEls = document.querySelectorAll('.anim-fade-up, .anim-fade-in');
    if (!animEls.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('anim-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animEls.forEach(el => observer.observe(el));
})();

// ===== Sticky Header on scroll =====
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (!header) return;
    if (window.pageYOffset > 100) {
        header.style.background = 'rgba(20, 10, 30, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '';
        header.style.backdropFilter = '';
    }
});

// ===== Contact Representatives Accordion =====
document.querySelector('.contact-reps-btn')?.addEventListener('click', () => {
    const reps = document.querySelector('.contact-reps');
    reps?.classList.toggle('active');
});
