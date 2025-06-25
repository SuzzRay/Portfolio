document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("floating-papers")

  // Detect if it's mobile device
  const isMobile = window.innerWidth <= 768
  const paperCount = isMobile ? 3 : 4

  // Store animation state to prevent restart on refresh
  let animationsStarted = false

  // Create floating papers
  function createFloatingPapers() {
    // Don't clear existing papers if animations already started on mobile
    if (isMobile && animationsStarted) return

    // Clear existing papers only if not mobile or first time
    if (!isMobile || !animationsStarted) {
      container.innerHTML = ""
    }

    for (let i = 0; i < paperCount; i++) {
      const paper = document.createElement("div")
      paper.className = "floating-paper"
      paper.setAttribute("data-paper-id", i)

      const icon = document.createElement("i")
      icon.className = "fa-solid fa-file-lines"
      paper.appendChild(icon)

      // Set initial position
      const x = Math.random() * window.innerWidth
      const y = Math.random() * window.innerHeight

      paper.style.left = `${x}px`
      paper.style.top = `${y}px`

      // Add to container
      container.appendChild(paper)

      // Animate the paper
      requestAnimationFrame(() => animatePaper(paper))
    }

    animationsStarted = true
  }

  // Animate a single paper
  function animatePaper(paper) {
    let x = Number.parseFloat(paper.style.left)
    let y = Number.parseFloat(paper.style.top)
    let angle = Math.random() * 2 * Math.PI

    // Much slower speed for mobile devices
    const baseSpeed = isMobile ? 0.03 : 0.1
    const speed = baseSpeed + Math.random() * (isMobile ? 0.07 : 0.2)

    let rotation = Math.random() * 360
    const rotationSpeed = (Math.random() - 0.5) * (isMobile ? 0.01 : 0.05)

    function update() {
      // Movement direction
      x += Math.cos(angle) * speed
      y += Math.sin(angle) * speed

      // Bounce off screen edges
      if (x < 0 || x > window.innerWidth - 60) angle = Math.PI - angle
      if (y < 0 || y > window.innerHeight - 60) angle = -angle

      rotation += rotationSpeed

      paper.style.left = `${x}px`
      paper.style.top = `${y}px`
      paper.style.transform = `rotate(${rotation}deg)`

      requestAnimationFrame(update)
    }

    update()
  }

  // Handle window resize - but don't restart animations on mobile
  window.addEventListener("resize", () => {
    const newIsMobile = window.innerWidth <= 768
    if (newIsMobile !== isMobile && !newIsMobile) {
      // Only recreate if switching from mobile to desktop
      createFloatingPapers()
    }
  })

  // Initialize
  createFloatingPapers()
})
