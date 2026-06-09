document.addEventListener('DOMContentLoaded', () => {

    // 1. Menu Fullscreen
    const menuTrigger = document.querySelector('.menu-trigger');
    const fullscreenMenu = document.querySelector('.fullscreen-menu');
    const navLinks = document.querySelectorAll('.nav-links a');

    function toggleMenu() {
        const isActive = menuTrigger.classList.contains('active');
        if (isActive) {
            menuTrigger.classList.remove('active');
            fullscreenMenu.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            menuTrigger.classList.add('active');
            fullscreenMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    menuTrigger.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (fullscreenMenu.classList.contains('active')) {
                toggleMenu();
            }
            
            // Smooth scroll to anchor
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // 2. Intersection Observer para Efeitos de Aparecimento (Fade Up)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up-elem').forEach(elem => {
        observer.observe(elem);
    });

    // 3. Efeito Parallax Simples na Imagem do Hero
    const parallaxImg = document.querySelector('.parallax-img');
    const heroSplit = document.querySelector('.hero-split');

    window.addEventListener('scroll', () => {
        if (!parallaxImg || !heroSplit) return;
        
        // Verifica se o hero está visível
        const heroRect = heroSplit.getBoundingClientRect();
        if (heroRect.bottom > 0) {
            const scrollPos = window.scrollY;
            // Move a imagem sutilmente (velocidade 0.15)
            parallaxImg.style.transform = `translateY(calc(-10% + ${scrollPos * 0.15}px))`;
        }
    });

});
