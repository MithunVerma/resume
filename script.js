/* ============================================================
   RESUME PORTFOLIO - MAIN JAVASCRIPT FILE
   Pure vanilla JavaScript implementation (no jQuery needed)
   ============================================================ */

/* ============================================================
   DOCUMENT READY EVENT
   Wait for DOM to fully load before running scripts
   This ensures all HTML elements are available to manipulate
   ============================================================ */
document.addEventListener('DOMContentLoaded', function() {
    
    /* ========================================================
       CACHE DOM ELEMENTS
       Store references to frequently accessed elements
       for better performance
       ======================================================== */
    
    // Mobile menu toggle icons
    const menuIcon = document.querySelector('.menu-icon');           // Hamburger icon to open menu
    const menuCloseIcon = document.querySelector('.menu-close-icon'); // X icon to close menu
    
    // Navigation menu items
    const navDivs = document.querySelectorAll('nav div');    // All navigation item containers
    const navLinks = document.querySelectorAll('nav div a'); // All navigation links
    
    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTop'); // Button to return to page top
    
    
    /* ========================================================
       MOBILE MENU - OPEN FUNCTIONALITY
       Show navigation menu when hamburger icon is clicked
       ======================================================== */
    menuIcon.addEventListener('click', function() {
        // Make all navigation items visible
        navDivs.forEach(function(div) {
            div.style.display = 'block';  // Change from display:none to display:block
        });
        
        // Swap menu icons: hide hamburger, show X
        menuIcon.style.display = 'none';
        menuCloseIcon.style.display = 'block';
    });
    
    
    /* ========================================================
       MOBILE MENU - CLOSE FUNCTIONALITY
       Hide navigation menu when X icon is clicked
       ======================================================== */
    menuCloseIcon.addEventListener('click', function() {
        // Hide all navigation items
        navDivs.forEach(function(div) {
            div.style.display = 'none';   // Return to display:none
        });
        
        // Swap menu icons: hide X, show hamburger
        menuCloseIcon.style.display = 'none';
        menuIcon.style.display = 'block';
    });
    
    
    /* ========================================================
       SMOOTH SCROLL NAVIGATION
       Handle navigation link clicks with smooth scrolling
       and automatic menu closing on mobile
       ======================================================== */
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');  // Get link destination
            
            // Only handle internal anchor links (starting with #)
            // External links like projects.html will work normally
            if (href.startsWith('#')) {
                e.preventDefault();  // Prevent default jump behavior
                
                // Close mobile menu after clicking a link
                navDivs.forEach(function(div) {
                    div.style.display = 'none';
                });
                menuCloseIcon.style.display = 'none';
                menuIcon.style.display = 'block';
                
                // Find the target section on the page
                const target = document.querySelector(href);
                
                if (target) {
                    // Calculate scroll position accounting for fixed header
                    const headerOffset = 70;  // Height of fixed header in pixels
                    const elementPosition = target.getBoundingClientRect().top;  // Position relative to viewport
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;  // Absolute position minus header
                    
                    // Smoothly scroll to the calculated position
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'  // Native smooth scrolling animation
                    });
                }
            }
            // If href doesn't start with #, the link will work normally (e.g., projects.html)
        });
    });
    
    
    /* ========================================================
       SCROLL TO TOP BUTTON
       Show/hide button based on scroll position
       and handle click to scroll to top
       ======================================================== */
    if (scrollToTopBtn) {  // Only run if button exists on page
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            // Show button after scrolling down 300 pixels
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');  // Add 'show' class (opacity: 1, visible)
            } else {
                scrollToTopBtn.classList.remove('show');  // Remove 'show' class (opacity: 0, hidden)
            }
        });
        
        // Scroll to top when button is clicked
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,              // Scroll to very top of page
                behavior: 'smooth'   // Smooth animation
            });
        });
    }
    
    
    /* ========================================================
       INTERSECTION OBSERVER - SCROLL ANIMATIONS
       Animate sections as they enter the viewport
       Using modern IntersectionObserver API for performance
       ======================================================== */
    
    // Configuration for the observer
    const observerOptions = {
        threshold: 0.1,                      // Trigger when 10% of element is visible
        rootMargin: '0px 0px -100px 0px'    // Trigger 100px before element enters viewport (from bottom)
    };
    
    // Create the observer with callback function
    const observer = new IntersectionObserver(function(entries) {
        // Loop through all observed elements that changed
        entries.forEach(function(entry) {
            // Check if element is now visible in viewport
            if (entry.isIntersecting) {
                // Animate the element into view
                entry.target.style.opacity = '1';           // Fade in
                entry.target.style.transform = 'translateY(0)';  // Slide up to position
                // Note: CSS transition handles the animation smoothness
            }
        });
    }, observerOptions);
    
    // Find all sections on the page
    const sections = document.querySelectorAll('section');
    
    // Set up each section for animation and start observing
    sections.forEach(function(section) {
        // Initial state: invisible and slightly below
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';  // Smooth 0.6s animation
        
        // Start observing this section
        observer.observe(section);
        
        // When section enters viewport, observer callback will trigger
        // and animate it to opacity:1 and translateY(0)
    });
    
    
    /* ========================================================
       NOTE: Additional features that could be added:
       - Form validation for contact form
       - Lazy loading for images
       - Dark mode toggle
       - Progress bar on scroll
       - Typing animation for hero text
       ======================================================== */
});
