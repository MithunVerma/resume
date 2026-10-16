// Pure vanilla JavaScript - no jQuery needed
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const menuCloseIcon = document.querySelector('.menu-close-icon');
    const navDivs = document.querySelectorAll('nav div');
    const navLinks = document.querySelectorAll('nav div a');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
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
    
    // Scroll to top button functionality
    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        
        // Scroll to top when button is clicked
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Add animation on scroll for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(function(section) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});
