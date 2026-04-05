// Interactive JavaScript for Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    initSmoothScrolling();

    // Typing effect for hero title
    initTypingEffect();

    // Scroll-triggered animations
    initScrollAnimations();

    // Feature card hover effects
    initFeatureCardEffects();

    // Scroll to top button
    initScrollToTop();

    // Animate skill counters
    initSkillCounters();

    // Advanced features
    initHeroEntranceAnimations();
    initParallaxEffect();
    initNavbarAnimations();
    initCTAButtonEffects();
    initThemeToggle();
    initPageLoadAnimation();
    initScrollProgressBar();
    initHeroBackground();
    initFeatureCardAnimations();
    initEnhancedScrollAnimations();
    initAcknowledgmentAnimation();
    initDynamicContent();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Typing effect for hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    const words = ['Creative Developer', 'UI/UX Designer', 'Web Enthusiast', 'Problem Solver'];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function typeWriter() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            heroTitle.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 100;
        } else {
            heroTitle.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before next word
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Start typing effect
    heroTitle.textContent = '';
    setTimeout(typeWriter, 1000);
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        observer.observe(card);
    });
}

// Feature card hover effects
function initFeatureCardEffects() {
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 24px rgba(99, 102, 241, 0.08)';
        });
    });
}

// Scroll to top button
function initScrollToTop() {
    // Create scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #6366f1, #14b8a6);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 20px;
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    `;

    document.body.appendChild(scrollButton);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });

    // Scroll to top functionality
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animated skill counters
function initSkillCounters() {
    // Add numbers to skills for animation
    const skillsList = document.querySelector('.skills-list');
    if (skillsList) {
        const skills = skillsList.querySelectorAll('li');
        skills.forEach(skill => {
            const originalText = skill.textContent;
            skill.innerHTML = `<span class="skill-counter" data-target="85">0</span>% ${originalText}`;
        });

        // Animate counters when about section is visible
        const aboutSection = document.querySelector('.about');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(aboutSection);
    }
}

function animateCounters() {
    const counters = document.querySelectorAll('.skill-counter');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Hero entrance animations
function initHeroEntranceAnimations() {
    const heroBadge = document.querySelector('.hero-badge');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCtas = document.querySelector('.hero-ctas');

    if (!heroBadge) return;

    // Set initial states
    heroBadge.style.opacity = '0';
    heroBadge.style.transform = 'translateY(20px)';
    heroSubtitle.style.opacity = '0';
    heroSubtitle.style.transform = 'translateY(20px)';
    heroCtas.style.opacity = '0';
    heroCtas.style.transform = 'translateY(20px)';

    // Staggered animations
    setTimeout(() => {
        heroBadge.style.transition = 'all 0.8s ease';
        heroBadge.style.opacity = '1';
        heroBadge.style.transform = 'translateY(0)';

        setTimeout(() => {
            heroSubtitle.style.transition = 'all 0.8s ease';
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 300);

        setTimeout(() => {
            heroCtas.style.transition = 'all 0.8s ease';
            heroCtas.style.opacity = '1';
            heroCtas.style.transform = 'translateY(0)';
        }, 600);
    }, 200);
}

// Parallax effect for hero background
function initParallaxEffect() {
    const heroBg = document.querySelector('.hero-bg-image');
    if (!heroBg) return;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        heroBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
}

// Navbar animations
function initNavbarAnimations() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    let lastScrollTop = 0;
    let isNavbarHidden = false;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll down
            if (!isNavbarHidden) {
                navbar.style.transform = 'translateY(-100%)';
                navbar.style.transition = 'all 0.3s ease';
                isNavbarHidden = true;
            }
        } else {
            // Scroll up
            if (isNavbarHidden) {
                navbar.style.transform = 'translateY(0)';
                isNavbarHidden = false;
            }
        }

        // Add shadow on scroll
        if (scrollTop > 10) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScrollTop = scrollTop;
    });

    // Active link animation
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transformation = 'scale(1.05)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// CTA button effects
function initCTAButtonEffects() {
    const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary, .feature-link');

    ctaButtons.forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';

        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 25px rgba(99, 102, 241, 0.3)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.15)';
        });

        // Ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                width: 100px;
                height: 100px;
                pointer-events: none;
                transform: scale(0);
                animation: rippleAnimation 0.6s ease-out;
            `;

            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left - 50) + 'px';
            ripple.style.top = (e.clientY - rect.top - 50) + 'px';

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Theme toggle
function initThemeToggle() {
    const themeBtn = document.createElement('button');
    themeBtn.className = 'theme-toggle-index';
    themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    themeBtn.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        z-index: 1000;
        font-size: 1.2rem;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    `;

    document.body.appendChild(themeBtn);

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButtonIcon(themeBtn, savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButtonIcon(themeBtn, newTheme);
    });

    themeBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
    });

    themeBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    });

    function updateThemeButtonIcon(btn, theme) {
        if (theme === 'light') {
            btn.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            btn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
}

// Page load animation
function initPageLoadAnimation() {
    const loader = document.createElement('div');
    loader.className = 'page-loader-index';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1;
        transition: opacity 0.5s ease;
    `;

    loader.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 60px; height: 60px; border: 4px solid #e5e7eb; border-top: 4px solid #6366f1; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
            <p style="color: #64748b; font-weight: 500;">Loading...</p>
        </div>
    `;

    document.body.appendChild(loader);

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.pointerEvents = 'none';
            setTimeout(() => loader.remove(), 500);
        }, 500);
    });
}

// Scroll progress bar
function initScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #6366f1, #14b8a6);
        z-index: 1001;
        transition: width 0.1s ease;
        width: 0;
    `;

    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Hero background animation
function initHeroBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    let angle = 0;

    function animateGradient() {
        angle += 0.01;
        const x = 50 + Math.sin(angle) * 15;
        const y = 35 + Math.cos(angle) * 15;

        hero.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(99,102,241,0.1), transparent 50%)`;
        requestAnimationFrame(animateGradient);
    }

    requestAnimationFrame(animateGradient);
}

// Enhanced feature card animations
function initFeatureCardAnimations() {
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';

        setTimeout(() => {
            card.style.transition = 'all 0.8s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + index * 200);

        // Add tilt effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Enhanced scroll animations
function initEnhancedScrollAnimations() {
    const elements = document.querySelectorAll('section, .feature-card');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-animate-in');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => scrollObserver.observe(el));
}

// Acknowledgment animations
function initAcknowledgmentAnimation() {
    const aboutSection = document.querySelector('.about');
    if (!aboutSection) return;

    const aboutContent = aboutSection.querySelector('.about-content');
    const skillsList = aboutSection.querySelector('.skills-list');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (aboutContent) {
                    aboutContent.style.opacity = '1';
                    aboutContent.style.transform = 'translateX(0)';
                }

                if (skillsList) {
                    const skills = skillsList.querySelectorAll('li');
                    skills.forEach((skill, index) => {
                        setTimeout(() => {
                            skill.style.opacity = '1';
                            skill.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(aboutSection);

    // Set initial states
    if (aboutContent) {
        aboutContent.style.opacity = '0';
        aboutContent.style.transform = 'translateX(-30px)';
        aboutContent.style.transition = 'all 0.8s ease';
    }

    if (skillsList) {
        skillsList.querySelectorAll('li').forEach(skill => {
            skill.style.opacity = '0';
            skill.style.transform = 'translateY(20px)';
            skill.style.transition = 'all 0.6s ease';
        });
    }
}

// Dynamic content updates
function initDynamicContent() {
    // Add loading states for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0.5';
            img.addEventListener('load', () => {
                img.style.opacity = '1';
                img.style.transition = 'opacity 0.3s ease';
            });
        }
    });

    // Inject global styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleAnimation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .animate-in {
            animation: fadeInUp 0.8s ease forwards;
        }

        .scroll-animate-in {
            animation: fadeInUp 0.8s ease forwards;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Dark theme support */
        [data-theme="dark"] {
            --bg-color: #0f172a;
            --text-color: #f1f5f9;
            --card-bg: #1e293b;
        }

        [data-theme="dark"] body {
            background-color: var(--bg-color);
            color: var(--text-color);
        }

        [data-theme="dark"] .navbar,
        [data-theme="dark"] .hero-content,
        [data-theme="dark"] .feature-card {
            background: rgba(30, 41, 59, 0.95);
        }

        .skills-list li {
            transition: all 0.6s ease;
        }

        .feature-link {
            transition: all 0.3s ease;
            display: inline-block;
        }

        .feature-link:hover {
            transform: translateX(5px);
        }
    `;

    document.head.appendChild(style);
}