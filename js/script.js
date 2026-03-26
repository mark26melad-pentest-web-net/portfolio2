// Portfolio JavaScript
// Mark Melad Ebrahim - Cybersecurity Portfolio

// ========== THEME TOGGLE ==========
function toggleTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('themeToggle');
    
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        themeBtn.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    } else {
        themeBtn.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    }
}

// ========== MOBILE MENU ==========
function toggleMobileMenu() {
    const nav = document.querySelector('.nav-links');
    if (nav) {
        nav.classList.toggle('active');
    }
}

// ========== BIRTHDAY WISHES (FORMSPREE) ==========
function showWishConfirmation(event) {
    event.preventDefault();
    const form = event.target;
    
    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            form.style.display = 'none';
            const successMsg = document.getElementById('wish-success');
            if (successMsg) {
                successMsg.style.display = 'block';
                // Redirect to home page after 0.25 seconds
                setTimeout(() => {
                    window.location.href = '#home';
                }, 150);
            }
        }
    }).catch(error => {
        console.log('Form submission error:', error);
    });
    
    return false;
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Add visible class styling
const style = document.createElement('style');
style.textContent = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ========== LOAD THEME ON STARTUP ==========
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const themeBtn = document.getElementById('themeToggle');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (themeBtn) themeBtn.textContent = '☀️';
    }
});