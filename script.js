/* ========================================
   MODERN PORTFOLIO - INTERACTIONS & ANIMATIONS
   ======================================== */

// ========================================
// SMOOTH SCROLLING & NAVBAR
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.boxShadow = 'var(--shadow-sm)';
        }
        
        lastScrollTop = scrollTop;
    });

    // ========================================
    // PROJECT FILTERING
    // ========================================

    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ========================================
    // SCROLL REVEAL ANIMATIONS
    // ========================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements that should reveal on scroll
    document.querySelectorAll('.section-header, .project-card, .skill-category, .stat, .contact-form').forEach(el => {
        observer.observe(el);
    });

    // ========================================
    // CONTACT FORM HANDLING
    // ========================================

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                subject: this.querySelectorAll('input[type="text"]')[1].value,
                message: this.querySelector('textarea').value
            };

            // Validate form
            if (data.name && data.email && data.subject && data.message) {
                // Show success message
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = '✓ Message Sent!';
                submitBtn.style.background = 'rgba(58, 134, 255, 0.8)';
                
                // Reset form
                setTimeout(() => {
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                }, 2000);

                console.log('Form submitted:', data);
            } else {
                alert('Please fill in all fields');
            }
        });
    }

    // ========================================
    // SMOOTH ANCHOR LINK SCROLLING
    // ========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // ACTIVE NAV LINK TRACKING
    // ========================================

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSection) {
                link.classList.add('active');
            }
        });
    });

    // ========================================
    // MICRO-INTERACTIONS: HOVER EFFECTS
    // ========================================

    // Project cards scale animation
    const projectCardElements = document.querySelectorAll('.project-card');
    projectCardElements.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Skill badges animation
    const skillBadges = document.querySelectorAll('.skill-badge');
    skillBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Tech tags hover effect
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(0, 217, 255, 0.25)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(0, 217, 255, 0.15)';
        });
    });

    // ========================================
    // PARALLAX EFFECT (Optional)
    // ========================================

    const animatedBg = document.querySelector('.animated-background');
    if (animatedBg) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            animatedBg.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
        });
    }

    // ========================================
    // FORM INPUT FOCUS EFFECTS
    // ========================================

    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 0 15px rgba(0, 217, 255, 0.2)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = 'none';
        });
    });
});

    timelineContainer.addEventListener('mouseup', function() {
        isDown = false;
        timelineContainer.style.cursor = 'grab';
    });

    timelineContainer.addEventListener('mousemove', function(e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - timelineContainer.offsetLeft;
        const walk = (x - startX) * 0.5;
        timelineContainer.scrollLeft = scrollLeft - walk;
    });

    // Add hover effect for cards
    const cards = document.querySelectorAll('.timeline-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Subtle glow effect
            this.style.boxShadow = `0 12px 24px rgba(52, 152, 219, 0.2)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = `0 4px 6px rgba(0, 0, 0, 0.1)`;
        });
    });

    // Intersection Observer for fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 100px 0px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0.7';
        card.style.transform = 'translateX(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Keyboard navigation (arrow keys)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            timelineContainer.scrollLeft += 100;
        } else if (e.key === 'ArrowLeft') {
            timelineContainer.scrollLeft -= 100;
        }
    });

    // Smooth scroll indicator (shows scroll position)
    updateScrollIndicator();
    timelineContainer.addEventListener('scroll', updateScrollIndicator);
});

function updateScrollIndicator() {
    const container = document.getElementById('timeline');
    if (!container) return;

    const scrollPercentage = (container.scrollLeft) / (container.scrollWidth - container.clientWidth);
    
    // You can use this for custom scroll indicators if needed
    // console.log(`Scroll position: ${(scrollPercentage * 100).toFixed(1)}%`);
}

// Add scroll animation on page load
window.addEventListener('load', function() {
    // Auto-scroll a bit to show the scrollable nature
    const container = document.getElementById('timeline');
    if (container) {
        // Optional: Add a subtle auto-scroll animation on first load
        // Uncomment if you want auto-scroll behavior
        // container.scrollLeft = 50;
    }
});

// Responsive adjustment for smaller screens
function handleResponsive() {
    const timelineContainer = document.getElementById('timeline');
    if (window.innerWidth <= 768) {
        timelineContainer.style.scrollBehavior = 'smooth';
    }
}

window.addEventListener('resize', handleResponsive);
handleResponsive();
