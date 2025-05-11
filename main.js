document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }
  
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

  // Initialize animations
  animateContent();
});