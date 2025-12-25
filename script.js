// ========================================
// Landing Page - Interactive Effects
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all effects
    initParallaxBackground();
    initCardTilt();
    initScrollAnimations();
    initTypewriterEffect();
    initRippleEffect();
    initTooltips();
});

// ========================================
// Parallax Background Effect
// ========================================
function initParallaxBackground() {
    const bgGradient = document.querySelector('.bg-gradient');
    
    if (!bgGradient) return;
    
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        bgGradient.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// ========================================
// Card Tilt Effect
// ========================================
function initCardTilt() {
    const cards = document.querySelectorAll('.card, .product-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateY(-4px)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ========================================
// Scroll Animations (Intersection Observer)
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add scroll-reveal class to elements
    const revealElements = document.querySelectorAll('.card, .product-card, .timeline-item');
    revealElements.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
    
    // Add CSS for scroll reveal if not exists
    if (!document.getElementById('scroll-reveal-styles')) {
        const style = document.createElement('style');
        style.id = 'scroll-reveal-styles';
        style.textContent = `
            .scroll-reveal {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            .scroll-reveal.visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
}

// ========================================
// Typewriter Effect for Status
// ========================================
function initTypewriterEffect() {
    const statusLabel = document.querySelector('.status-label');
    
    if (!statusLabel) return;
    
    const text = statusLabel.textContent;
    statusLabel.textContent = '';
    statusLabel.style.borderRight = '2px solid var(--primary-cyan)';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            statusLabel.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Blinking cursor effect
            let visible = true;
            setInterval(() => {
                statusLabel.style.borderRight = visible 
                    ? '2px solid var(--primary-cyan)' 
                    : '2px solid transparent';
                visible = !visible;
            }, 500);
        }
    };
    
    // Delay start
    setTimeout(typeWriter, 500);
}

// ========================================
// Ripple Effect on Buttons
// ========================================
function initRippleEffect() {
    const buttons = document.querySelectorAll('.product-btn, .payment-btn, .social-link');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple styles
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            .product-btn, .payment-btn, .social-link {
                position: relative;
                overflow: hidden;
            }
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-effect 0.6s ease-out;
                pointer-events: none;
            }
            @keyframes ripple-effect {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ========================================
// Tooltip System
// ========================================
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.dataset.tooltip;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            setTimeout(() => tooltip.classList.add('visible'), 10);
            
            this._tooltip = tooltip;
        });
        
        el.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.classList.remove('visible');
                setTimeout(() => this._tooltip?.remove(), 200);
            }
        });
    });
    
    // Add tooltip styles
    if (!document.getElementById('tooltip-styles')) {
        const style = document.createElement('style');
        style.id = 'tooltip-styles';
        style.textContent = `
            .tooltip {
                position: fixed;
                background: var(--bg-card);
                border: 1px solid var(--border-primary);
                color: var(--text-primary);
                padding: 6px 12px;
                border-radius: 6px;
                font-size: 0.8rem;
                z-index: 1000;
                opacity: 0;
                transform: translateY(5px);
                transition: opacity 0.2s, transform 0.2s;
                pointer-events: none;
            }
            .tooltip.visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
}

// ========================================
// Smooth Scroll for Internal Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========================================
// Timeline Animation Enhancement
// ========================================
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.15}s`;
    });
}

// Call on load
animateTimeline();

// ========================================
// Dynamic Gradient Following Mouse
// ========================================
function initDynamicGradient() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });
    
    // Add gradient hover styles
    if (!document.getElementById('gradient-hover-styles')) {
        const style = document.createElement('style');
        style.id = 'gradient-hover-styles';
        style.textContent = `
            .card::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: radial-gradient(
                    circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
                    rgba(0, 217, 255, 0.08) 0%,
                    transparent 50%
                );
                opacity: 0;
                transition: opacity 0.3s;
                pointer-events: none;
                z-index: 0;
            }
            .card:hover::after {
                opacity: 1;
            }
            .card > * {
                position: relative;
                z-index: 1;
            }
        `;
        document.head.appendChild(style);
    }
}

initDynamicGradient();

// ========================================
// Easter Egg: Konami Code
// ========================================
const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateRainbowMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateRainbowMode() {
    document.body.style.animation = 'rainbow-bg 3s linear infinite';
    
    if (!document.getElementById('rainbow-styles')) {
        const style = document.createElement('style');
        style.id = 'rainbow-styles';
        style.textContent = `
            @keyframes rainbow-bg {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove after 5 seconds
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

console.log('🦆 Landing Page Loaded Successfully!');
console.log('💡 Tip: Try the Konami Code for a surprise!');
