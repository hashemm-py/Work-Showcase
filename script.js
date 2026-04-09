/* ========================================
   PORTFOLIO TIMELINE - INTERACTIONS
   ======================================== */

// Smooth scroll for the timeline container
document.addEventListener('DOMContentLoaded', function() {
    const timelineContainer = document.getElementById('timeline');
    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse wheel horizontal scrolling
    timelineContainer.addEventListener('wheel', function(e) {
        if (e.deltaY !== 0) {
            e.preventDefault();
            timelineContainer.scrollLeft += e.deltaY;
        }
    }, { passive: false });

    // Touch scroll for mobile
    timelineContainer.addEventListener('touchstart', function(e) {
        isDown = true;
        startX = e.touches[0].pageX - timelineContainer.offsetLeft;
        scrollLeft = timelineContainer.scrollLeft;
    });

    timelineContainer.addEventListener('touchend', function() {
        isDown = false;
    });

    timelineContainer.addEventListener('touchmove', function(e) {
        if (!isDown) return;
        const x = e.touches[0].pageX - timelineContainer.offsetLeft;
        const walk = (x - startX) * 1.5;
        timelineContainer.scrollLeft = scrollLeft - walk;
    });

    // Mouse drag scrolling (optional - for desktop)
    timelineContainer.addEventListener('mousedown', function(e) {
        isDown = true;
        startX = e.pageX - timelineContainer.offsetLeft;
        scrollLeft = timelineContainer.scrollLeft;
        timelineContainer.style.cursor = 'grabbing';
    });

    timelineContainer.addEventListener('mouseleave', function() {
        isDown = false;
        timelineContainer.style.cursor = 'grab';
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
