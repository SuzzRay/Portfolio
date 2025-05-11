document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('floating-papers');
  const paperCount = 6;
  
  // Create floating papers
  function createFloatingPapers() {
    // Clear existing papers
    container.innerHTML = '';
    
    for (let i = 0; i < paperCount; i++) {
      const paper = document.createElement('div');
      paper.className = 'floating-paper';
      
      const icon = document.createElement('i');
      icon.className = 'fa-solid fa-file-lines';
      paper.appendChild(icon);
      
      // Set initial position
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      
      paper.style.left = `${x}px`;
      paper.style.top = `${y}px`;
      
      // Add to container
      container.appendChild(paper);
      
      // Animate the paper
      animatePaper(paper);
    }
  }
  
  // Animate a single paper
  function animatePaper(paper) {
    const duration = 20000 + Math.random() * 10000; // 20-30 seconds
    
    function move() {
      // Generate new random position
      const newX = Math.random() * (window.innerWidth - 100);
      const newY = Math.random() * (window.innerHeight - 100);
      const rotation = Math.random() * 360;
      
      // Apply transition
      paper.style.transition = `transform ${duration/1000}s linear, left ${duration/1000}s linear, top ${duration/1000}s linear`;
      paper.style.transform = `rotate(${rotation}deg)`;
      paper.style.left = `${newX}px`;
      paper.style.top = `${newY}px`;
      
      // Schedule next movement
      setTimeout(move, duration);
    }
    
    // Start movement
    move();
  }
  
  // Handle window resize
  window.addEventListener('resize', createFloatingPapers);
  
  // Initialize
  createFloatingPapers();
});