// Pure vanilla JavaScript - no jQuery needed
document.addEventListener('DOMContentLoaded', function() {
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
});
