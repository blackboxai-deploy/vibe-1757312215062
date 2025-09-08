// ===== WEBSITE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen
    hideLoadingScreen();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize modals
    initializeModals();
    
    // Initialize forms
    initializeForms();
    
    // Initialize testimonials carousel
    initializeTestimonials();
    
    // Initialize scroll effects
    initializeScrollEffects();
    
    // Set minimum date for appointment booking
    setMinimumAppointmentDate();
});

// ===== LOADING SCREEN =====
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL TO SECTION =====
function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    const header = document.getElementById('header');
    if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// ===== APPOINTMENT MODAL =====
function initializeModals() {
    const modal = document.getElementById('appointment-modal');
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeAppointmentModal();
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeAppointmentModal();
        }
    });
}

function openAppointmentModal() {
    const modal = document.getElementById('appointment-modal');
    modal.classList.add('active');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Focus on first input for accessibility
    const firstInput = modal.querySelector('input');
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
    }
}

function closeAppointmentModal() {
    const modal = document.getElementById('appointment-modal');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    document.body.style.overflow = '';
}

// ===== FORMS =====
function initializeForms() {
    const contactForm = document.getElementById('contact-form');
    const appointmentForm = document.getElementById('appointment-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', handleAppointmentSubmit);
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!validateContactForm(data)) {
        return;
    }
    
    // Simulate form submission
    showFormSuccess('Thank you for contacting us! We will get back to you within 24 hours.');
    e.target.reset();
}

function handleAppointmentSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!validateAppointmentForm(data)) {
        return;
    }
    
    // Simulate appointment booking
    showFormSuccess('Your appointment request has been submitted! Our staff will contact you within 2 business hours to confirm your appointment.');
    e.target.reset();
    closeAppointmentModal();
}

function validateContactForm(data) {
    if (!data.name || data.name.trim().length < 2) {
        showFormError('Please enter a valid name (at least 2 characters).');
        return false;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        showFormError('Please enter a valid email address.');
        return false;
    }
    
    if (!data.message || data.message.trim().length < 10) {
        showFormError('Please enter a message (at least 10 characters).');
        return false;
    }
    
    if (!data.consent) {
        showFormError('Please agree to our privacy policy to continue.');
        return false;
    }
    
    return true;
}

function validateAppointmentForm(data) {
    if (!data.name || data.name.trim().length < 2) {
        showFormError('Please enter a valid name (at least 2 characters).');
        return false;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        showFormError('Please enter a valid email address.');
        return false;
    }
    
    if (!data.phone || data.phone.trim().length < 10) {
        showFormError('Please enter a valid phone number.');
        return false;
    }
    
    if (!data.dob) {
        showFormError('Please enter your date of birth.');
        return false;
    }
    
    if (!data.service) {
        showFormError('Please select a service.');
        return false;
    }
    
    if (!data.date) {
        showFormError('Please select a preferred appointment date.');
        return false;
    }
    
    if (!data.time) {
        showFormError('Please select a preferred appointment time.');
        return false;
    }
    
    // Check if appointment date is not in the past
    const appointmentDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (appointmentDate < today) {
        showFormError('Please select a future date for your appointment.');
        return false;
    }
    
    if (!data.consent) {
        showFormError('Please agree to our terms of service to continue.');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormSuccess(message) {
    // Create success notification
    const notification = createNotification(message, 'success');
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function showFormError(message) {
    // Create error notification
    const notification = createNotification(message, 'error');
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function createNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        max-width: 400px;
        font-family: var(--font-primary);
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    return notification;
}

// ===== TESTIMONIALS CAROUSEL =====
let currentTestimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.dot');

function initializeTestimonials() {
    // Auto-rotate testimonials
    setInterval(nextTestimonial, 8000);
}

function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    // Remove active class from all dots
    testimonialDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current testimonial and activate dot
    if (testimonials[index]) {
        testimonials[index].classList.add('active');
    }
    
    if (testimonialDots[index]) {
        testimonialDots[index].classList.add('active');
    }
    
    currentTestimonialIndex = index;
}

function nextTestimonial() {
    const nextIndex = (currentTestimonialIndex + 1) % testimonials.length;
    showTestimonial(nextIndex);
}

function changeTestimonial(direction) {
    let newIndex;
    if (direction === 1) {
        newIndex = (currentTestimonialIndex + 1) % testimonials.length;
    } else {
        newIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
    }
    showTestimonial(newIndex);
}

function currentTestimonial(index) {
    showTestimonial(index - 1);
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .doctor-card, .tip-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
    
    // Add fadeInUp animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== UTILITY FUNCTIONS =====
function setMinimumAppointmentDate() {
    const dateInput = document.getElementById('apt-date');
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        dateInput.setAttribute('min', minDate);
    }
}

// ===== ACCESSIBILITY FEATURES =====
document.addEventListener('keydown', function(e) {
    // Skip to main content with Tab
    if (e.key === 'Tab' && !e.shiftKey) {
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const firstFocusableElement = document.querySelectorAll(focusableElements)[0];
        
        if (document.activeElement === document.body) {
            firstFocusableElement?.focus();
            e.preventDefault();
        }
    }
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Website error:', e.error);
    // Could implement error reporting here
});

// ===== CONTACT FORM ENHANCEMENTS =====
function initializeFormEnhancements() {
    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{3})/, '($1) $2');
            }
            e.target.value = value;
        });
    });
    
    // Real-time email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function(e) {
            if (e.target.value && !isValidEmail(e.target.value)) {
                e.target.style.borderColor = '#dc3545';
            } else {
                e.target.style.borderColor = '#e9ecef';
            }
        });
    });
}

// Initialize form enhancements
document.addEventListener('DOMContentLoaded', initializeFormEnhancements);

// ===== EMERGENCY BANNER INTERACTION =====
document.addEventListener('DOMContentLoaded', function() {
    const emergencyPhone = document.querySelector('.emergency-phone');
    if (emergencyPhone) {
        emergencyPhone.addEventListener('click', function() {
            // Track emergency call click (analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'emergency_call_click', {
                    event_category: 'engagement',
                    event_label: 'Emergency Phone Number'
                });
            }
        });
    }
});

// ===== COOKIE CONSENT (Basic Implementation) =====
function initializeCookieConsent() {
    // Check if user has already consented
    if (!localStorage.getItem('cookieConsent')) {
        // Create cookie banner
        const banner = document.createElement('div');
        banner.innerHTML = `
            <div style="position: fixed; bottom: 0; left: 0; right: 0; background: #343a40; color: white; padding: 20px; z-index: 2000; box-shadow: 0 -2px 10px rgba(0,0,0,0.1);">
                <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px;">
                    <div>
                        <p style="margin: 0; font-size: 14px;">We use cookies to enhance your experience on our website. By continuing to browse, you agree to our use of cookies.</p>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button onclick="acceptCookies()" style="background: #0077be; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 14px;">Accept</button>
                        <button onclick="declineCookies()" style="background: transparent; color: white; border: 1px solid #ccc; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 14px;">Decline</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(banner);
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.querySelector('[style*="position: fixed"][style*="bottom: 0"]')?.remove();
}

function declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    document.querySelector('[style*="position: fixed"][style*="bottom: 0"]')?.remove();
}

// Initialize cookie consent
setTimeout(initializeCookieConsent, 2000);

// ===== ANALYTICS TRACKING (Placeholder) =====
function trackUserInteraction(action, category, label) {
    // Placeholder for analytics tracking
    console.log('Analytics:', { action, category, label });
    
    // Example: Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn')) {
        const buttonText = e.target.textContent.trim();
        trackUserInteraction('button_click', 'engagement', buttonText);
    }
});

// ===== PRINT FUNCTIONALITY =====
function initializePrintStyles() {
    // Add print button for contact info
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const printBtn = document.createElement('button');
        printBtn.textContent = 'Print Contact Info';
        printBtn.className = 'btn btn-outline';
        printBtn.style.marginTop = '20px';
        printBtn.addEventListener('click', () => window.print());
        contactSection.appendChild(printBtn);
    }
}

// Initialize print functionality
document.addEventListener('DOMContentLoaded', initializePrintStyles);