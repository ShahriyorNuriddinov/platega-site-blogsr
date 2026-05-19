// FAQ Accordion
document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close all
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        
        // Toggle current
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Smooth scroll to top
document.querySelector('.back-to-top')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Reviews slider
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

// Mobile nav toggle
(function() {
    const toggle = document.getElementById('mobileNavToggle');
    const nav = document.querySelector('.nav');
    const headerRight = document.querySelector('.header-right');
    if (!toggle || !nav) return;

    let overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
    }

    function closeMenu() {
        toggle.classList.remove('active');
        nav.classList.remove('mobile-open');
        if (headerRight) headerRight.classList.remove('mobile-open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openMenu() {
        toggle.classList.add('active');
        nav.classList.add('mobile-open');
        if (headerRight) headerRight.classList.add('mobile-open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    toggle.addEventListener('click', () => {
        if (nav.classList.contains('mobile-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    overlay.addEventListener('click', closeMenu);

    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
})();

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.background = 'rgba(48, 33, 79, 0.92)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'transparent';
        header.style.backdropFilter = 'none';
    }
});
