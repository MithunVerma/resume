// Pure vanilla JavaScript - no jQuery needed
document.addEventListener('DOMContentLoaded', function() {
    // Hide page loader
    const pageLoader = document.querySelector('.page-loader');
    if (pageLoader) {
        setTimeout(function() {
            pageLoader.classList.add('hidden');
        }, 500);
    }
    
    const menuIcon = document.querySelector('.menu-icon');
    const menuCloseIcon = document.querySelector('.menu-close-icon');
    const navDivs = document.querySelectorAll('nav div');
    const navLinks = document.querySelectorAll('nav div a');
    
    // When menu opens
    menuIcon.addEventListener('click', function() {
        navDivs.forEach(function(div) {
            div.style.display = 'block';
        });
        menuIcon.style.display = 'none';
        menuCloseIcon.style.display = 'block';
    });
    
    // When menu closes
    menuCloseIcon.addEventListener('click', function() {
        navDivs.forEach(function(div) {
            div.style.display = 'none';
        });
        menuCloseIcon.style.display = 'none';
        menuIcon.style.display = 'block';
    });
    
    // Smooth scroll animation when menu item is clicked
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links (not projects.html)
            if (href.startsWith('#')) {
                e.preventDefault();
                
                // Close menu
                navDivs.forEach(function(div) {
                    div.style.display = 'none';
                });
                menuCloseIcon.style.display = 'none';
                menuIcon.style.display = 'block';
                
                // Get target element
                const target = document.querySelector(href);
                
                if (target) {
                    // Scroll to target with offset for fixed header (70px)
                    const headerOffset = 70;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Scroll-triggered fade-in animations
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);
    
    fadeInSections.forEach(function(section) {
        fadeInObserver.observe(section);
    });
    
    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);
    
    // Show/hide back to top button on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
        
        // Add shadow to header on scroll
        const header = document.querySelector('.header-row');
        if (window.pageYOffset > 10) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add smooth hover effects to skill items
    const skillItems = document.querySelectorAll('.skills .item');
    skillItems.forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            hero.style.backgroundPositionY = -(scrolled * parallaxSpeed) + 'px';
        });
    }
});
