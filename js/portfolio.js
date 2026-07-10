// Portfolio JavaScript - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initScrollAnimations();
    initCounterAnimations();
    initFormHandling();
    initProjectHoverEffects();
    initHeroMotion();
    initTiltInteractions();
    initDynamicRoleText();
    initScrollSpy();
    initFloatingDots();
    addScrollProgress();
    initHeroEntranceAnimations();
    initProfileImageEffects();
    initInteractiveElements();
    initMouseFollower();
    initSkillsProgressBars();
    initProjectModals();
    initTimelineInteractions();
    initContactFormValidation();
    initDynamicContent();
    initScrollToTop();
    initThemeToggle();
    initLoadingAnimation();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href*="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const hashIndex = href.indexOf('#');
            if (hashIndex === -1) return;

            const targetId = href.slice(hashIndex);
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                e.preventDefault();
                const offsetTop = targetSection.offsetTop - 90; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    const targets = document.querySelectorAll('section, .timeline-item, .project-card, .skill-category, .contact-item, .stat-item');
    targets.forEach((target, index) => {
        target.style.opacity = '0';
        target.style.transform = 'translateY(24px)';
        target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        target.style.transitionDelay = `${index * 80}ms`;
        observer.observe(target);
    });
}

// Animated counters for statistics
function initCounterAnimations() {
    const statsSection = document.querySelector('.portfolio-hero');
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    animateCounter(stat);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    if (statsSection) {
        observer.observe(statsSection);
    }
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^0-9]/g, '')) || 0;
    const duration = 1800;
    const stepTime = 16;
    const increment = Math.max(1, target / (duration / stepTime));
    let current = 0;
    const suffix = element.textContent.replace(/[0-9]/g, '');

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, stepTime);
}

// Project card hover effects
function initProjectHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const image = card.querySelector('.project-image img');
        const overlay = card.querySelector('.project-overlay');

        card.addEventListener('mouseenter', function() {
            image.style.transform = 'scale(1.08)';
            overlay.style.opacity = '1';
        });

        card.addEventListener('mouseleave', function() {
            image.style.transform = 'scale(1)';
            overlay.style.opacity = '0';
        });
    });
}

// Contact form handling
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form .form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showFormSuccess();
            this.reset();
        });
    }
}

function showFormSuccess() {
    if (document.querySelector('.form-success')) return;

    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = `✅ Message sent successfully! I'll get back to you soon.`;
    document.body.appendChild(successMessage);

    setTimeout(() => {
        successMessage.classList.add('hide');
    }, 4200);
    setTimeout(() => {
        successMessage.remove();
    }, 5200);
}

// Hero gradient motion and subtle movement
function initHeroMotion() {
    const hero = document.querySelector('.portfolio-hero');
    if (!hero) return;

    let angle = 0;

    function animateGradient() {
        angle += 0.01;
        const x = 50 + Math.sin(angle) * 18;
        const y = 35 + Math.cos(angle) * 18;
        hero.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(99,102,241,0.16), transparent 16%), radial-gradient(circle at ${100 - x}% ${100 - y}%, rgba(139,92,246,0.12), transparent 12%), linear-gradient(135deg, #ebf0ff 0%, #f0f4ff 42%, #fcfcff 100%)`;
        requestAnimationFrame(animateGradient);
    }

    requestAnimationFrame(animateGradient);
}

// Tilt effect on interactive cards
function initTiltInteractions() {
    const tiltItems = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .contact-item, .stat-item');

    tiltItems.forEach(item => {
        item.addEventListener('mousemove', (event) => {
            const rect = item.getBoundingClientRect();
            const dx = event.clientX - rect.left;
            const dy = event.clientY - rect.top;
            const px = (dx / rect.width - 0.5) * 12;
            const py = (dy / rect.height - 0.5) * -12;
            item.style.transform = `perspective(900px) rotateX(${py}deg) rotateY(${px}deg)`;
            item.style.transition = 'transform 0.15s ease';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
        });
    });
}

// Rotate hero role text to make the hero feel alive
function initDynamicRoleText() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;

    const phrases = [
        'building beautiful digital experiences.',
        'crafting intuitive user journeys.',
        'designing polished front-end products.',
        'turning ideas into immersive interfaces.'
    ];

    let phraseIndex = 0;
    const baseText = 'Creative Developer & Designer passionate about ';

    function updateRoleText() {
        subtitle.classList.remove('text-fade');
        void subtitle.offsetWidth;
        subtitle.textContent = baseText + phrases[phraseIndex];
        subtitle.classList.add('text-fade');
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    updateRoleText();
    setInterval(updateRoleText, 5200);
}

// Highlight navigation while scrolling
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 110;

        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href*="#${section.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}

// Floating accent dots in hero for extra motion
function initFloatingDots() {
    const hero = document.querySelector('.portfolio-hero');
    if (!hero) return;

    for (let i = 0; i < 6; i++) {
        const dot = document.createElement('span');
        dot.className = 'hero-floating-dot';
        dot.style.left = `${10 + Math.random() * 75}%`;
        dot.style.top = `${10 + Math.random() * 75}%`;
        dot.style.width = `${8 + Math.random() * 10}px`;
        dot.style.height = dot.style.width;
        dot.style.animationDuration = `${8 + Math.random() * 8}s`;
        dot.style.animationDelay = `${Math.random() * 3}s`;
        hero.appendChild(dot);
    }
}

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    });
}

// Enhanced hero entrance animations
function initHeroEntranceAnimations() {
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    const heroBadge = document.querySelector('.hero-badge');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroStats = document.querySelector('.hero-stats');

    if (!heroContent) return;

    // Initial states
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(40px)';
    heroVisual.style.opacity = '0';
    heroVisual.style.transform = 'translateY(40px) scale(0.9)';

    heroBadge.style.opacity = '0';
    heroBadge.style.transform = 'translateY(20px)';
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(30px)';
    heroSubtitle.style.opacity = '0';
    heroSubtitle.style.transform = 'translateY(25px)';
    heroStats.style.opacity = '0';
    heroStats.style.transform = 'translateY(20px)';

    // Staggered entrance animations
    setTimeout(() => {
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';

        setTimeout(() => {
            heroVisual.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
            heroVisual.style.opacity = '1';
            heroVisual.style.transform = 'translateY(0) scale(1)';
        }, 200);

        setTimeout(() => {
            heroBadge.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroBadge.style.opacity = '1';
            heroBadge.style.transform = 'translateY(0)';
        }, 400);

        setTimeout(() => {
            heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 600);

        setTimeout(() => {
            heroSubtitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 800);

        setTimeout(() => {
            heroStats.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroStats.style.opacity = '1';
            heroStats.style.transform = 'translateY(0)';
        }, 1000);
    }, 300);
}

// Enhanced profile image effects
function initProfileImageEffects() {
    const profileImage = document.querySelector('.profile-image');
    const profilePhoto = document.querySelector('.profile-photo');
    const profileOverlay = document.querySelector('.profile-overlay');

    if (!profileImage) return;

    // Add subtle breathing animation
    profileImage.style.animation = 'breathe 4s ease-in-out infinite';

    let isFloating = false;

    // Mouse proximity detection for floating effect
    document.addEventListener('mousemove', (e) => {
        if (!profileImage) return;

        const rect = profileImage.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));

        const proximityThreshold = 200; // Distance in pixels to trigger floating

        if (distance < proximityThreshold && !isFloating) {
            isFloating = true;
            profileImage.style.transform = 'translateY(-15px) scale(1.03)';
            profileImage.style.boxShadow = '0 45px 100px rgba(99, 102, 241, 0.25)';
            profileImage.style.filter = 'brightness(1.05)';
        } else if (distance >= proximityThreshold && isFloating) {
            isFloating = false;
            profileImage.style.transform = 'translateY(0) scale(1)';
            profileImage.style.boxShadow = '0 35px 90px rgba(99, 102, 241, 0.18)';
            profileImage.style.filter = 'brightness(1)';
        }
    });

    // Enhanced hover effects
    profileImage.addEventListener('mouseenter', () => {
        profilePhoto.style.transform = 'scale(1.06) rotate(2deg)';
        profileOverlay.style.opacity = '0.25';
        profileOverlay.style.transform = 'scale(1.02)';
        profileImage.style.boxShadow = '0 50px 120px rgba(99, 102, 241, 0.3)';
    });

    profileImage.addEventListener('mouseleave', () => {
        profilePhoto.style.transform = 'scale(1) rotate(0deg)';
        profileOverlay.style.opacity = '0.1';
        profileOverlay.style.transform = 'scale(1)';
        if (!isFloating) {
            profileImage.style.boxShadow = '0 35px 90px rgba(99, 102, 241, 0.18)';
        }
    });

    // Add click effect for mobile
    profileImage.addEventListener('click', () => {
        profilePhoto.style.transform = 'scale(1.12) rotate(6deg)';
        profileImage.style.boxShadow = '0 60px 140px rgba(99, 102, 241, 0.35)';
        setTimeout(() => {
            profilePhoto.style.transform = 'scale(1) rotate(0deg)';
            if (!isFloating) {
                profileImage.style.boxShadow = '0 35px 90px rgba(99, 102, 241, 0.18)';
            }
        }, 400);
    });
}

// Interactive elements with micro-animations
function initInteractiveElements() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.login-btn, .submit-btn, .project-link');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Enhanced skill tags interaction
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 50}ms`;
        tag.classList.add('skill-tag-entrance');

        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'scale(1.1) translateY(-2px)';
            tag.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.3)';
        });

        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'scale(1) translateY(0)';
            tag.style.boxShadow = '0 2px 8px rgba(99, 102, 241, 0.15)';
        });
    });

    // Add magnetic effect to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            link.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translate(0, 0)';
        });
    });
}

// Mouse follower for enhanced interactivity
function initMouseFollower() {
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    document.body.appendChild(follower);

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(updateFollower);
    }

    updateFollower();

    // Change follower on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-tag, .profile-image');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.classList.add('active');
        });

        el.addEventListener('mouseleave', () => {
            follower.classList.remove('active');
        });
    });
}

// Skills progress bars animation
function initSkillsProgressBars() {
    const skillCategories = document.querySelectorAll('.skill-category');

    skillCategories.forEach((category, index) => {
        category.style.animationDelay = `${index * 200}ms`;
        category.classList.add('skill-category-entrance');

        const skillTags = category.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, tagIndex) => {
            tag.style.animationDelay = `${(index * 200) + (tagIndex * 100)}ms`;
            tag.classList.add('skill-tag-entrance');
        });
    });
}

// Project modals functionality
function initProjectModals() {
    const projectLinks = document.querySelectorAll('.project-link');
    const projectsData = {
        'e-commerce': {
            title: 'E-commerce Platform',
            description: 'A comprehensive full-stack e-commerce solution built with modern technologies. Features include user authentication, payment processing, inventory management, and an intuitive admin dashboard.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'JWT'],
            features: ['User Authentication', 'Payment Integration', 'Inventory Management', 'Admin Dashboard', 'Order Tracking'],
            images: ['./images/commerce.avif'],
            demo: '#',
            code: '#'
        },
        'portfolio': {
            title: 'Portfolio Website',
            description: 'A modern, responsive portfolio website showcasing creative work with smooth animations and interactive elements. Built with clean code and optimized performance.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Responsive Design'],
            features: ['Smooth Animations', 'Interactive Elements', 'Mobile Responsive', 'SEO Optimized', 'Fast Loading'],
            images: ['./images/portfolio.png'],
            demo: '#',
            code: '#'
        },
        'mobile-app': {
            title: 'Task Management Mobile App',
            description: 'A cross-platform mobile application for efficient task management with real-time synchronization across devices. Features offline support and collaborative features.',
            technologies: ['React Native', 'Firebase', 'Redux', 'AsyncStorage', 'Push Notifications'],
            features: ['Real-time Sync', 'Offline Support', 'Push Notifications', 'Collaborative Tasks', 'Cross-platform'],
            images: ['./images/mobile_app.jpg'],
            demo: '#',
            code: '#'
        }
    };

    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const projectCard = link.closest('.project-card');
            const projectType = projectCard.querySelector('img').alt.toLowerCase().replace(' ', '-');

            if (projectsData[projectType]) {
                showProjectModal(projectsData[projectType]);
            }
        });
    });
}

function showProjectModal(projectData) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.project-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="closeProjectModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>${projectData.title}</h2>
                <button class="modal-close" onclick="closeProjectModal()">×</button>
            </div>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="${projectData.images[0]}" alt="${projectData.title}">
                </div>
                <div class="modal-details">
                    <p class="modal-description">${projectData.description}</p>

                    <div class="modal-section">
                        <h3>Technologies Used</h3>
                        <div class="tech-stack">
                            ${projectData.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>

                    <div class="modal-section">
                        <h3>Key Features</h3>
                        <ul class="features-list">
                            ${projectData.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a href="${projectData.demo}" class="modal-btn primary" target="_blank">View Demo</a>
                <a href="${projectData.code}" class="modal-btn secondary" target="_blank">View Code</a>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Animate modal entrance
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    // Close on escape key
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            closeProjectModal();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

// Global function for closing modal
function closeProjectModal() {
    const modal = document.querySelector('.project-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

// Timeline interactions
function initTimelineInteractions() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('timeline-active');
        });

        item.addEventListener('mouseleave', () => {
            item.classList.remove('timeline-active');
        });

        item.addEventListener('click', () => {
            // Toggle expanded view
            const isExpanded = item.classList.contains('timeline-expanded');
            timelineItems.forEach(i => i.classList.remove('timeline-expanded'));
            if (!isExpanded) {
                item.classList.add('timeline-expanded');
            }
        });
    });
}

// Enhanced contact form validation and submission
function initContactFormValidation() {
    const contactForm = document.querySelector('.contact-form .form');
    if (!contactForm) return;

    const inputs = contactForm.querySelectorAll('input, textarea');

    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', removeError);
    });

    // Enhanced form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!validateForm()) return;

        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 2000));

            showFormSuccess('Message sent successfully! I\'ll get back to you soon.');
            contactForm.reset();

        } catch (error) {
            showFormError('Failed to send message. Please try again.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch (field.name) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'message':
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters';
            }
            break;
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        removeFieldError(field);
    }

    return isValid;
}

function validateForm() {
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });

    return isValid;
}

function showFieldError(field, message) {
    removeFieldError(field);

    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;

    field.parentNode.appendChild(errorDiv);
    field.classList.add('field-error-input');
}

function removeFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) existingError.remove();
    field.classList.remove('field-error-input');
}

function removeError(e) {
    const field = e.target;
    if (field.classList.contains('field-error-input')) {
        removeFieldError(field);
    }
}

function showFormSuccess(message) {
    showFormMessage(message, 'success');
}

function showFormError(message) {
    showFormMessage(message, 'error');
}

function showFormMessage(message, type) {
    if (document.querySelector('.form-message')) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;

    const form = document.querySelector('.contact-form .form');
    form.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.classList.add('hide');
        setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
}

// Dynamic content loading and animations
function initDynamicContent() {
    // Add loading states for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.classList.add('loading');
            img.addEventListener('load', () => {
                img.classList.remove('loading');
                img.classList.add('loaded');
            });
        } else {
            img.classList.add('loaded');
        }
    });

    // Add intersection observer for lazy loading effects
    const lazyElements = document.querySelectorAll('.project-card, .timeline-item, .contact-item');

    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('lazy-loaded');
            }
        });
    }, { threshold: 0.1 });

    lazyElements.forEach(el => lazyObserver.observe(el));
}

// Scroll to top button
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Theme toggle (light/dark mode)
function initThemeToggle() {
    const themeBtn = document.createElement('button');
    themeBtn.className = 'theme-toggle';
    themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    themeBtn.setAttribute('aria-label', 'Toggle theme');
    document.body.appendChild(themeBtn);

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeBtn.innerHTML = theme === 'light'
            ? '<i class="fas fa-moon"></i>'
            : '<i class="fas fa-sun"></i>';
    }
}

// Loading animation on page load
function initLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    document.body.appendChild(loader);

    // Hide loader after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 500);
        }, 500);
    });
}

// Global helper styles injected once
(function injectGlobalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .form-success {
            position: fixed;
            top: 24px;
            right: 24px;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 16px 22px;
            border-radius: 14px;
            box-shadow: 0 18px 40px rgba(16, 185, 129, 0.18);
            z-index: 10000;
            font-weight: 600;
            opacity: 1;
            transform: translateX(0);
            transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .form-success.hide {
            opacity: 0;
            transform: translateX(20px);
        }

        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            width: 0;
            background: linear-gradient(90deg, #6366f1, #14b8a6);
            z-index: 1001;
            transition: width 0.1s ease;
        }

        .hero-floating-dot {
            position: absolute;
            border-radius: 50%;
            background: rgba(99, 102, 241, 0.24);
            pointer-events: none;
            animation: floatBubble infinite ease-in-out;
        }

        .text-fade {
            animation: fadeText 0.75s ease;
        }

        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }

        .skill-tag-entrance {
            animation: skillTagEntrance 0.6s ease forwards;
            opacity: 0;
            transform: translateY(20px) scale(0.8);
        }

        .mouse-follower {
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: rgba(99, 102, 241, 0.2);
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: multiply;
        }

        .mouse-follower.active {
            transform: scale(1.5);
            background: rgba(99, 102, 241, 0.4);
        }

        @keyframes floatBubble {
            0%, 100% { transform: translateY(0) scale(1); opacity: 0.75; }
            50% { transform: translateY(-18px) scale(1.1); opacity: 0.95; }
        }

        @keyframes fadeText {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes breathe {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
        }

        @keyframes ripple {
            to { transform: scale(4); opacity: 0; }
        }

        @keyframes skillTagEntrance {
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Enhanced animations for better UX */
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

        /* Smooth transitions for all interactive elements */
        * {
            transition: transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
        }

        /* Better focus states for accessibility */
        a:focus, button:focus {
            outline: 2px solid #6366f1;
            outline-offset: 2px;
        }

        .loading {
            position: relative;
            overflow: hidden;
        }

        .loading::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            animation: loading 1.5s infinite;
        }

        @keyframes loading {
            0% { left: -100%; }
            100% { left: 100%; }
        }

        /* Project Modal Styles */
        .project-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .project-modal.active {
            opacity: 1;
            visibility: visible;
        }

        .modal-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
        }

        .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.9);
            background: white;
            border-radius: 20px;
            width: 90%;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s ease;
        }

        .project-modal.active .modal-content {
            transform: translate(-50%, -50%) scale(1);
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem;
            border-bottom: 1px solid #e5e7eb;
        }

        .modal-header h2 {
            margin: 0;
            color: #1e293b;
            font-size: 1.5rem;
        }

        .modal-close {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #64748b;
            padding: 0;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }

        .modal-close:hover {
            background: #f1f5f9;
            color: #1e293b;
        }

        .modal-body {
            padding: 2rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }

        .modal-image img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 12px;
        }

        .modal-details {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .modal-description {
            color: #475569;
            line-height: 1.6;
        }

        .modal-section h3 {
            color: #1e293b;
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
        }

        .tech-stack {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .tech-tag {
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 500;
        }

        .features-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .features-list li {
            color: #475569;
            padding: 0.25rem 0;
            position: relative;
            padding-left: 1.5rem;
        }

        .features-list li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: bold;
        }

        .modal-footer {
            padding: 2rem;
            border-top: 1px solid #e5e7eb;
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
        }

        .modal-btn {
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }

        .modal-btn.primary {
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
        }

        .modal-btn.primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
        }

        .modal-btn.secondary {
            background: #f1f5f9;
            color: #475569;
        }

        .modal-btn.secondary:hover {
            background: #e2e8f0;
        }

        /* Timeline Interactions */
        .timeline-item {
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .timeline-item.timeline-active {
            transform: translateX(10px);
        }

        .timeline-item.timeline-expanded .timeline-content {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05));
            border-left: 4px solid #6366f1;
        }

        /* Form Validation Styles */
        .field-error {
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            animation: errorShake 0.3s ease;
        }

        .field-error-input {
            border-color: #ef4444 !important;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
        }

        .form-message {
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 500;
            animation: messageSlideIn 0.3s ease;
        }

        .form-message.success {
            background: #d1fae5;
            color: #065f46;
            border: 1px solid #a7f3d0;
        }

        .form-message.error {
            background: #fee2e2;
            color: #991b1b;
            border: 1px solid #fca5a5;
        }

        .form-message.hide {
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        }

        @keyframes errorShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }

        @keyframes messageSlideIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Scroll to Top Button */
        .scroll-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }

        .scroll-to-top:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
        }

        /* Theme Toggle */
        .theme-toggle {
            position: fixed;
            top: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            color: #1e293b;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .theme-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        /* Page Loader */
        .page-loader {
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
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }

        .page-loader.hidden {
            opacity: 0;
            visibility: hidden;
        }

        .loader-content {
            text-align: center;
        }

        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #e5e7eb;
            border-top: 4px solid #6366f1;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }

        .loader-content p {
            color: #64748b;
            font-weight: 500;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Dark Theme */
        [data-theme="dark"] {
            --bg-color: #0f172a;
            --text-color: #f1f5f9;
            --card-bg: #1e293b;
            --border-color: #334155;
        }

        [data-theme="dark"] body {
            background-color: var(--bg-color);
            color: var(--text-color);
        }

        [data-theme="dark"] .navbar,
        [data-theme="dark"] .hero-content,
        [data-theme="dark"] .modal-content {
            background: rgba(30, 41, 59, 0.95);
            backdrop-filter: blur(20px);
        }

        [data-theme="dark"] .theme-toggle {
            background: rgba(30, 41, 59, 0.9);
            color: #f1f5f9;
        }

        /* Lazy Loading */
        .lazy-loaded {
            animation: lazyFadeIn 0.6s ease forwards;
        }

        @keyframes lazyFadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Enhanced Skill Animations */
        .skill-category-entrance {
            animation: skillCategoryEntrance 0.8s ease forwards;
            opacity: 0;
            transform: translateY(30px);
        }

        @keyframes skillCategoryEntrance {
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
})();