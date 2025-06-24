// Global variables
let mouseX = 0
let mouseY = 0
let targetX = 0
let targetY = 0

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initMouseFollower()
  initScrollProgress()
  initFloatingNav()
  initMobileMenu()
  initHeroAnimation()
  initScrollAnimations()
  initSkillBars()
  initSmoothScrolling()
  initAccessibility()
})

document.addEventListener("DOMContentLoaded", () => {
  const texts = ["Developer", "Data Analyst", "Computer Science Tutor", "Programmer", "AI & ML Enthusiast"]
  const target = document.getElementById("typing-text")
  let textIndex = 0
  let charIndex = 0

  function type() {
    if (charIndex < texts[textIndex].length) {
      target.textContent += texts[textIndex].charAt(charIndex)
      charIndex++
      setTimeout(type, 100)
    } else {
      setTimeout(erase, 1500) // Pause before erasing
    }
  }

  function erase() {
    if (charIndex > 0) {
      target.textContent = texts[textIndex].substring(0, charIndex - 1)
      charIndex--
      setTimeout(erase, 50)
    } else {
      textIndex = (textIndex + 1) % texts.length
      setTimeout(type, 500) // Pause before typing next
    }
  }
  type()
})

// Mouse Follower
function initMouseFollower() {
  const mouseFollower = document.querySelector(".mouse-follower")
  const mouseDot = document.querySelector(".mouse-dot")

  if (!mouseFollower || !mouseDot) return

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (prefersReducedMotion) return

  document.addEventListener("mousemove", (e) => {
    targetX = e.clientX
    targetY = e.clientY

    mouseDot.style.left = e.clientX + "px"
    mouseDot.style.top = e.clientY + "px"
  })

  document.addEventListener("mouseenter", () => {
    mouseFollower.style.opacity = "1"
    mouseDot.style.opacity = "1"
  })

  document.addEventListener("mouseleave", () => {
    mouseFollower.style.opacity = "0"
    mouseDot.style.opacity = "0"
  })

  // Smooth mouse follower animation
  function animateMouseFollower() {
    mouseX += (targetX - mouseX) * 0.05
    mouseY += (targetY - mouseY) * 0.05

    mouseFollower.style.left = mouseX + "px"
    mouseFollower.style.top = mouseY + "px"

    requestAnimationFrame(animateMouseFollower)
  }

  animateMouseFollower()
}

// Scroll Progress
function initScrollProgress() {
  const scrollProgress = document.querySelector(".scroll-progress")
  if (!scrollProgress) return

  const throttledScroll = throttle(() => {
    const scrollTop = window.pageYOffset
    const docHeight = document.body.scrollHeight - window.innerHeight
    const scrollPercent = scrollTop / docHeight

    scrollProgress.style.transform = `scaleX(${scrollPercent})`

    if (scrollTop > 100) {
      scrollProgress.classList.add("visible")
    } else {
      scrollProgress.classList.remove("visible")
    }
  }, 16)

  window.addEventListener("scroll", throttledScroll)
}

// Floating Navigation
function initFloatingNav() {
  const floatingNav = document.querySelector(".floating-nav")
  if (!floatingNav) return

  const throttledScroll = throttle(() => {
    if (window.scrollY > 100) {
      floatingNav.classList.add("visible")
    } else {
      floatingNav.classList.remove("visible")
    }
  }, 16)

  window.addEventListener("scroll", throttledScroll)
}

// Mobile Menu
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileMenu = document.querySelector(".mobile-menu")
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-content a")

  if (!mobileMenuBtn || !mobileMenu) return

  mobileMenuBtn.addEventListener("click", () => {
    const isActive = mobileMenu.classList.contains("active")
    mobileMenu.classList.toggle("active")

    const icon = mobileMenuBtn.querySelector("i")
    if (!isActive) {
      icon.className = "fas fa-times"
      mobileMenuBtn.setAttribute("aria-expanded", "true")
      document.body.style.overflow = "hidden"
    } else {
      icon.className = "fas fa-bars"
      mobileMenuBtn.setAttribute("aria-expanded", "false")
      document.body.style.overflow = ""
    }
  })

  // Close mobile menu when clicking on links
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      mobileMenuBtn.querySelector("i").className = "fas fa-bars"
      mobileMenuBtn.setAttribute("aria-expanded", "false")
      document.body.style.overflow = ""
    })
  })

  // Close mobile menu when clicking outside
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) {
      mobileMenu.classList.remove("active")
      mobileMenuBtn.querySelector("i").className = "fas fa-bars"
      mobileMenuBtn.setAttribute("aria-expanded", "false")
      document.body.style.overflow = ""
    }
  })

  // Handle escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active")
      mobileMenuBtn.querySelector("i").className = "fas fa-bars"
      mobileMenuBtn.setAttribute("aria-expanded", "false")
      document.body.style.overflow = ""
      mobileMenuBtn.focus()
    }
  })
}

// Hero Animation (Canvas)
function initHeroAnimation() {
  const canvas = document.getElementById("heroCanvas")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  let particles = []
  let animationId

  // Set canvas dimensions
  function setCanvasDimensions() {
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height
  }

  setCanvasDimensions()
  window.addEventListener("resize", setCanvasDimensions)

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 5 + 1
      this.speedX = Math.random() * 0.5 - 0.25
      this.speedY = Math.random() * 0.5 - 0.25
      this.hue = Math.random() * 60 + 200 // Blue to purple range
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY

      if (this.x > canvas.width || this.x < 0) {
        this.speedX = -this.speedX
      }

      if (this.y > canvas.height || this.y < 0) {
        this.speedY = -this.speedY
      }
    }

    draw() {
      ctx.fillStyle = `hsl(${this.hue}, 70%, 60%)`
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Initialize particles
  function initParticles() {
    particles = []
    const particleCount = Math.min(25, Math.floor((canvas.width * canvas.height) / 15000))

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw connections
    ctx.strokeStyle = "rgba(120, 180, 255, 0.1)"
    ctx.lineWidth = 1

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }

    // Update and draw particles
    particles.forEach((particle) => {
      particle.update()
      particle.draw()
    })

    animationId = requestAnimationFrame(animate)
  }

  initParticles()
  animate()

  // Handle visibility change to pause animation when not visible
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId)
    } else {
      animate()
    }
  })
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".fade-in, .slide-in-left, .slide-in-right, .scale-in, .skill-card, .project-card, .timeline-content",
  )
  animateElements.forEach((el) => observer.observe(el))
}

// Skill Bars Animation
function initSkillBars() {
  const skillCards = document.querySelectorAll(".skill-card")

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillCard = entry.target
          const skillLevel = skillCard.getAttribute("data-skill")
          const skillProgress = skillCard.querySelector(".skill-progress")

          skillCard.classList.add("animate")
          skillProgress.style.setProperty("--skill-width", skillLevel + "%")
        }
      })
    },
    { threshold: 0.5 },
  )

  skillCards.forEach((card) => skillObserver.observe(card))
}

// Smooth Scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()

      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 100

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// Accessibility Improvements
function initAccessibility() {
  // Add ARIA labels
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  if (mobileMenuBtn) {
    mobileMenuBtn.setAttribute("aria-label", "Toggle mobile menu")
    mobileMenuBtn.setAttribute("aria-expanded", "false")
  }

  // Add focus management for mobile menu
  const mobileMenu = document.querySelector(".mobile-menu")
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-content a, .mobile-menu-content button")

  if (mobileMenu && mobileMenuLinks.length > 0) {
    // Focus first link when menu opens
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          if (mobileMenu.classList.contains("active")) {
            mobileMenuLinks[0].focus()
          }
        }
      })
    })

    observer.observe(mobileMenu, { attributes: true })

    // Trap focus within mobile menu
    mobileMenuLinks.forEach((link, index) => {
      link.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
          if (e.shiftKey && index === 0) {
            e.preventDefault()
            mobileMenuLinks[mobileMenuLinks.length - 1].focus()
          } else if (!e.shiftKey && index === mobileMenuLinks.length - 1) {
            e.preventDefault()
            mobileMenuLinks[0].focus()
          }
        }
      })
    })
  }

  // Add skip link
  const skipLink = document.createElement("a")
  skipLink.href = "#main"
  skipLink.textContent = "Skip to main content"
  skipLink.className = "sr-only"
  skipLink.style.position = "absolute"
  skipLink.style.top = "10px"
  skipLink.style.left = "10px"
  skipLink.style.zIndex = "10000"
  skipLink.style.background = "white"
  skipLink.style.color = "black"
  skipLink.style.padding = "8px 16px"
  skipLink.style.textDecoration = "none"
  skipLink.style.borderRadius = "4px"

  skipLink.addEventListener("focus", () => {
    skipLink.style.position = "absolute"
    skipLink.style.width = "auto"
    skipLink.style.height = "auto"
    skipLink.style.clip = "auto"
  })

  skipLink.addEventListener("blur", () => {
    skipLink.className = "sr-only"
  })

  document.body.insertBefore(skipLink, document.body.firstChild)

  // Add main landmark
  const heroSection = document.querySelector(".hero")
  if (heroSection) {
    heroSection.setAttribute("id", "main")
    heroSection.setAttribute("role", "main")
  }
}

// Utility Functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Performance optimizations
const debouncedResize = debounce(() => {
  window.dispatchEvent(new Event("resize"))
}, 250)

window.addEventListener("resize", debouncedResize)

// Preload images
function preloadImages() {
  const images = ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=400&width=600"]

  images.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}

preloadImages()

// Service Worker Registration (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// Error handling
window.addEventListener("error", (e) => {
  console.error("Global error:", e.error)
})

window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled promise rejection:", e.reason)
})
