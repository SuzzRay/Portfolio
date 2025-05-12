document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-links a');

    // Toggle nav menu on button click
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close nav menu when any link is clicked (for mobile)
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });



    // Add background grid to main container
    const mainContainer = document.querySelector('.main-container');
    mainContainer.classList.add('bg-grid');

    // Animation for content elements
    function animateContent() {
        const heroTitle = document.querySelector('.hero-title');
        const heroDescription = document.querySelector('.hero-description');
        const heroButtons = document.querySelector('.hero-buttons');

        setTimeout(() => {
            if (heroTitle) heroTitle.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            if (heroDescription) heroDescription.style.opacity = '1';
        }, 300);

        setTimeout(() => {
            if (heroButtons) heroButtons.style.opacity = '1';
        }, 500);
    }

    function toggleMenu() {
        const menu = document.getElementById('menu');
        menu.classList.toggle('active');
    }
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
        });
    });

    // Initialize animations
    animateContent();
});
