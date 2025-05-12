document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('sparkles-canvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    let mousePosition = {
        x: 0,
        y: 0
    };

    // Set canvas dimensions
    function setCanvasDimensions() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.imageSmoothingEnabled = false;

    }

    setCanvasDimensions();

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mousePosition.x = e.clientX;
        mousePosition.y = e.clientY;
    });

    // Particle class
    class Particle {
        constructor() {
            this.size = 2; // instead of 1

            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = 1; // Solid visible dot size

            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            const dx = mousePosition.x - this.x;
            const dy = mousePosition.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Cursor drag repulsion
            if (distance < 80) {
                const force = (80 - distance) / 80; // closer = stronger force
                const angle = Math.atan2(dy, dx);
                const pushX = Math.cos(angle) * force;
                const pushY = Math.sin(angle) * force;
                this.x -= pushX * 2;
                this.y -= pushY * 2;
            }

            // Wrap around
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = '#00ffff'; // bright teal/cyan
            ctx.shadowBlur = 0; // no glow
            ctx.fill();
            ctx.restore();
        }

    }

    // Initialize particles
    function initParticles() {
        particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        setCanvasDimensions();
        initParticles();
    });

    // Start animation
    initParticles();
    animate();
});
