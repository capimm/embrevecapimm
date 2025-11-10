// Auth functionality
let currentUser = null;
let authToken = localStorage.getItem('authToken');

// Auth modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (authToken) {
        validateToken();
    }

    // Auth modal functionality
    const authModal = document.getElementById('auth-modal');
    const closeAuthModal = document.querySelector('.close-auth-modal');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');

    // Open auth modal (you can add a button to trigger this)
    // For now, we'll add a temporary button in the nav
    const navContainer = document.querySelector('.nav-container');
    const authBtn = document.createElement('button');
    authBtn.textContent = 'Login';
    authBtn.className = 'cta-button secondary';
    authBtn.style.marginLeft = '1rem';
    authBtn.addEventListener('click', () => {
        authModal.style.display = 'block';
    });
    navContainer.appendChild(authBtn);

    // Close modal
    closeAuthModal.addEventListener('click', () => {
        authModal.style.display = 'none';
    });

    // Tab switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            tab.classList.add('active');
            const tabName = tab.getAttribute('data-tab');
            document.getElementById(`${tabName}-form`).classList.add('active');
        });
    });

    // Form submissions
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('register-form').addEventListener('submit', handleRegister);
});

// Auth functions
async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            authToken = data.token;
            currentUser = data.user;
            localStorage.setItem('authToken', authToken);
            document.getElementById('auth-modal').style.display = 'none';
            updateUIForLoggedInUser();
            showSuccess('Login realizado com sucesso!');
        } else {
            document.getElementById('login-error').textContent = data.error;
        }
    } catch (error) {
        document.getElementById('login-error').textContent = 'Erro ao fazer login';
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            authToken = data.token;
            currentUser = data.user;
            localStorage.setItem('authToken', authToken);
            document.getElementById('auth-modal').style.display = 'none';
            updateUIForLoggedInUser();
            showSuccess('Conta criada com sucesso!');
        } else {
            document.getElementById('register-error').textContent = data.error;
        }
    } catch (error) {
        document.getElementById('register-error').textContent = 'Erro ao criar conta';
    }
}

async function validateToken() {
    try {
        const response = await fetch('/api/messages', {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        });

        if (response.ok) {
            // Token is valid, user is logged in
            updateUIForLoggedInUser();
        } else {
            // Token is invalid, clear it
            localStorage.removeItem('authToken');
            authToken = null;
        }
    } catch (error) {
        localStorage.removeItem('authToken');
        authToken = null;
    }
}

function updateUIForLoggedInUser() {
    const authBtn = document.querySelector('.nav-container .cta-button');
    if (authBtn) {
        authBtn.textContent = `Olá, ${currentUser.username}`;
        authBtn.addEventListener('click', logout);
    }
}

function logout() {
    localStorage.removeItem('authToken');
    authToken = null;
    currentUser = null;
    location.reload();
}

function showSuccess(message) {
    // Simple success message - you can enhance this
    alert(message);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for section animations
const sectionObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, sectionObserverOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Work items reveal animation
const workObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const workObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('reveal');
            }, index * 150);
        }
    });
}, workObserverOptions);

// Observe work items
document.querySelectorAll('.work-item').forEach(item => {
    workObserver.observe(item);
});

// Skills animation
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.skill-fill');
            fills.forEach(fill => {
                fill.style.width = fill.style.width || '0%';
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-item').forEach(skill => {
    skillsObserver.observe(skill);
});

// Contact items animation
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.contact-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    contactObserver.observe(item);
});

// Stats counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const target = parseInt(statNumber.textContent.replace(/[^\d]/g, ''));
            animateCounter(statNumber, 0, target, 2000);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current + (element.textContent.includes('+') ? '+' : '');

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Enhanced scroll effects with parallax and sticky elements
let lastScrollY = window.scrollY;
let ticking = false;

function updateScrollEffects() {
    const scrolled = window.pageYOffset;

    // Dynamic navigation background
    const nav = document.querySelector('.main-nav');
    if (scrolled > 100) {
        nav.style.background = 'rgba(0, 0, 0, 0.95)';
        nav.style.backdropFilter = 'blur(20px)';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.8)';
    }

    // Active navigation link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLinks[index]) {
                navLinks[index].classList.add('active');
            }
        }
    });

    // Enhanced parallax effect for floating elements
    const rate = scrolled * 0.5;
    document.querySelectorAll('.floating-element').forEach((element, index) => {
        const speed = (index + 1) * 0.1;
        const parallaxY = rate * speed;
        const parallaxX = Math.sin(scrolled * 0.001 + index) * 10;
        element.style.transform = `translate(${parallaxX}px, ${parallaxY}px)`;
    });

    // Parallax for background elements
    document.querySelectorAll('.parallax-bg').forEach((bg, index) => {
        const speed = 0.3 + (index * 0.1);
        bg.style.transform = `translateY(${scrolled * speed}px)`;
    });

    // Sticky elements animation
    document.querySelectorAll('.sticky-element').forEach((element, index) => {
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        const windowHeight = window.innerHeight;

        if (scrolled > elementTop - windowHeight + 100 && scrolled < elementTop + elementHeight) {
            const progress = (scrolled - (elementTop - windowHeight + 100)) / (elementHeight + windowHeight - 200);
            element.style.transform = `translateY(${progress * 50}px)`;
            element.style.opacity = Math.max(0.3, 1 - progress * 0.5);
        }
    });

    // Fade-in/fade-out effects for sections
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const windowCenter = window.innerHeight / 2;
        const distance = Math.abs(centerY - windowCenter);
        const maxDistance = window.innerHeight / 2;

        if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance) * 0.3;
            const scale = 0.95 + (1 - distance / maxDistance) * 0.05;
            section.style.opacity = opacity;
            section.style.transform = `scale(${scale})`;
        } else {
            section.style.opacity = '0.7';
            section.style.transform = 'scale(0.95)';
        }
    });

    lastScrollY = scrolled;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// Loading animation with smoother transition
window.addEventListener('load', () => {
    setTimeout(() => {
        const loading = document.getElementById('loading');
        loading.classList.add('hidden');
        // Add fade-out effect to main content
        const mainWrapper = document.querySelector('.main-wrapper');
        mainWrapper.style.opacity = '0';
        mainWrapper.style.transform = 'translateY(20px)';
        mainWrapper.style.transition = 'opacity 1.2s ease-out, transform 1.2s ease-out';
        setTimeout(() => {
            loading.style.display = 'none';
            // Fade in main content smoothly
            mainWrapper.style.opacity = '1';
            mainWrapper.style.transform = 'translateY(0)';
        }, 800);
    }, 2500);
});

// Mouse interaction effects
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    // Subtle parallax on hero elements
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        const moveX = (mouseX - 0.5) * 20;
        const moveY = (mouseY - 0.5) * 20;
        heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// Custom cursor effect (optional enhancement)
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid #00ff00;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    mix-blend-mode: difference;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
});

// Hover effects for interactive elements
document.querySelectorAll('a, button, .work-item, .contact-item').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = '#ffffff';
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = '#00ff00';
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Chat Widget Functionality
const chatWidget = document.getElementById('chat-widget');
const chatToggle = document.getElementById('chat-toggle');
const chatClose = document.getElementById('chat-close');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

// Music player functionality
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const volumeSlider = document.getElementById('volume-slider');
    const globalPauseBtn = document.getElementById('global-pause-btn');

    // Set initial volume to 35%
    audio.volume = 0.35;
    volumeSlider.value = 0.35;

    // Play/Pause functionality
    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline';
        } else {
            audio.pause();
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
        }
    });

    // Global pause button functionality
    globalPauseBtn.addEventListener('click', () => {
        if (!audio.paused) {
            audio.pause();
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
        }
    });

    // Volume control
    volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
    });

    // Chat widget functionality
    if (chatWidget && chatToggle && chatClose) {
        // Toggle chat widget
        chatToggle.addEventListener('click', function() {
            chatWidget.classList.toggle('open');
            chatWidget.classList.toggle('minimized');
        });

        // Close chat widget
        chatClose.addEventListener('click', function() {
            chatWidget.classList.add('minimized');
            chatWidget.classList.remove('open');
        });

        // Send message
        sendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Load messages on startup
        loadMessages();
    }

    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.hero-title .line').forEach((line, index) => {
            setTimeout(() => {
                line.style.animationPlayState = 'running';
            }, index * 200);
        });
    }, 500);
});

// Chat functions
function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatInput.value = '';

        // Simulate bot response
        setTimeout(() => {
            const responses = [
                'Olá! Como posso ajudar?',
                'Obrigado pela mensagem!',
                'CAPIMM: Estou aqui para ajudar.',
                'Interessante! Conte-me mais.',
                'Entendi. O que mais você gostaria de saber?'
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, false);
        }, 1000);
    }
}

function addMessage(text, isUser, timestamp = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    const time = timestamp ? new Date(timestamp).toLocaleTimeString() : new Date().toLocaleTimeString();
    messageDiv.innerHTML = `
        <div class="message-content">${text}</div>
        <div class="timestamp">${time}</div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function loadMessages() {
    // Simulate loading previous messages
    const initialMessages = [
        { text: 'Bem-vindo ao chat! Como posso ajudar?', isUser: false, timestamp: new Date(Date.now() - 60000) }
    ];

    initialMessages.forEach(msg => {
        addMessage(msg.text, msg.isUser, msg.timestamp);
    });
}
