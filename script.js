// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll with stagger effect
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

// Observe elements with stagger animation
document.querySelectorAll('.focus-card, .working-item, .learning-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Add parallax effect to hero section
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.profile-image');
            parallaxElements.forEach(el => {
                const speed = 0.5;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
            ticking = false;
        });
        ticking = true;
    }
});

// Add active state to navigation on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--accent)';
        }
    });
});

// Add mouse cursor glow effect
const createGlowEffect = (e) => {
    const glow = document.createElement('div');
    glow.style.position = 'fixed';
    glow.style.width = '300px';
    glow.style.height = '300px';
    glow.style.borderRadius = '50%';
    glow.style.background = 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)';
    glow.style.pointerEvents = 'none';
    glow.style.left = e.clientX - 150 + 'px';
    glow.style.top = e.clientY - 150 + 'px';
    glow.style.zIndex = '-1';
    glow.style.transition = 'opacity 0.3s';
    document.body.appendChild(glow);

    setTimeout(() => {
        glow.style.opacity = '0';
        setTimeout(() => glow.remove(), 300);
    }, 100);
};

let glowTimeout;
document.addEventListener('mousemove', (e) => {
    clearTimeout(glowTimeout);
    glowTimeout = setTimeout(() => createGlowEffect(e), 50);
});
