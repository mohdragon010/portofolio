// Loading screen - smart loading based on visit history
window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    
    // Check visit history
    const hasVisitedBefore = localStorage.getItem('hasVisited');
    const justReloaded = sessionStorage.getItem('pageLoaded');
    
    if (!hasVisitedBefore) {
        // First time visitor - show full loading animation
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }, 2000);
        
        // Mark as visited
        localStorage.setItem('hasVisited', 'true');
        sessionStorage.setItem('pageLoaded', 'true');
    } else if (hasVisitedBefore && !justReloaded) {
        // Returning visitor (new session) - show quick welcome
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }, 800);
        
        sessionStorage.setItem('pageLoaded', 'true');
    } else {
        // Page reload - skip loading screen entirely
        loading.style.display = 'none';
    }
});

// Typing animations
document.addEventListener('DOMContentLoaded', function() {
    const hasVisitedBefore = localStorage.getItem('hasVisited');
    const justReloaded = sessionStorage.getItem('pageLoaded');
    
    if (!hasVisitedBefore) {
        // First time visitor - full intro
        new Typed(".typing-loader", {
            strings: [
                "Initializing portfolio...",
                "Loading components...",
                "Connecting to server...",
                "Welcome to Mohamed's Portfolio!"
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1000,
            loop: false,
            showCursor: false
        });
    } else if (hasVisitedBefore && !justReloaded) {
        // Returning visitor - quick welcome only
        new Typed(".typing-loader", {
            strings: ["Welcome back to Mohamed's Portfolio!"],
            typeSpeed: 80,
            loop: false,
            showCursor: false
        });
    }
    // If just reloaded - no typing animation at all

    // Hero typing animations (always show unless just reloaded)
    if (!justReloaded) {
        new Typed(".typing-role", {
            strings: ["Web Developer", "Problem Solver", "Student", "Tech Enthusiast"],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            showCursor: false
        });

        new Typed(".typing-skills", {
            strings: ["HTML", "CSS", "JavaScript", "Python", "Problem Solving"],
            typeSpeed: 80,
            backSpeed: 40,
            backDelay: 1500,
            loop: true,
            showCursor: false
        });
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

// Skills progress animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const skillsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-bar');
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
            });
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Section highlighting on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('.cta-button');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission delay (remove this if using real form handler)
        setTimeout(() => {
            // Show success state
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = 'var(--success-color)';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    });
}



