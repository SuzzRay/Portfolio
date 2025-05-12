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
            requestAnimationFrame(() => animatePaper(paper));

        }
    }

    // Animate a single paper
    function animatePaper(paper) {
        let x = parseFloat(paper.style.left);
        let y = parseFloat(paper.style.top);
        let angle = Math.random() * 2 * Math.PI;
        let speed = 0.3 + Math.random() * 0.5;
        let rotation = Math.random() * 360;
        let rotationSpeed = (Math.random() - 0.5) * 0.2;

        function update() {
            // Movement direction
            x += Math.cos(angle) * speed;
            y += Math.sin(angle) * speed;

            // Bounce off screen edges
            if (x < 0 || x > window.innerWidth - 60) angle = Math.PI - angle;
            if (y < 0 || y > window.innerHeight - 60) angle = -angle;

            rotation += rotationSpeed;

            paper.style.left = `${x}px`;
            paper.style.top = `${y}px`;
            paper.style.transform = `rotate(${rotation}deg)`;

            requestAnimationFrame(update);
        }

        update();
    }


    // Handle window resize
    window.addEventListener('resize', createFloatingPapers);

    // Initialize
    createFloatingPapers();
});
