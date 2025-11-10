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

// Extra items reveal animation
const extraObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const extraObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('reveal');
            }, index * 150);
        }
    });
}, extraObserverOptions);

// Observe extra items
document.querySelectorAll('.extra-item').forEach(item => {
    extraObserver.observe(item);
});

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
document.querySelectorAll('a, button, .extra-item').forEach(element => {
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

    // Navigation functionality
    document.addEventListener('DOMContentLoaded', () => {
        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    const headerOffset = 80;
                    const elementPosition = targetSection.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Update active nav link
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });

        // Modal functionality
        const modal = document.getElementById('modal');
        const modalBody = document.getElementById('modal-body');
        const closeModal = document.querySelector('.close-modal');

        // Sample data for modals (you can expand this)
        const modalData = {
            atividade1: {
                title: 'Atividade 1',
                description: 'Esta é uma descrição detalhada da Atividade 1. Aqui você pode adicionar mais informações sobre o que é essa atividade, como funciona, e qualquer detalhe relevante.',
                image: 'https://via.placeholder.com/600x400/00ff00/000000?text=Atividade+1+Detalhes'
            },
            atividade2: {
                title: 'Atividade 2',
                description: 'Esta é uma descrição detalhada da Atividade 2. Aqui você pode adicionar mais informações sobre o que é essa atividade, como funciona, e qualquer detalhe relevante.',
                image: 'https://via.placeholder.com/600x400/004400/00ff00?text=Atividade+2+Detalhes'
            },
            atividade3: {
                title: 'Atividade 3',
                description: 'Esta é uma descrição detalhada da Atividade 3. Aqui você pode adicionar mais informações sobre o que é essa atividade, como funciona, e qualquer detalhe relevante.',
                image: 'https://via.placeholder.com/600x400/0000ff/ffffff?text=Atividade+3+Detalhes'
            },
            musica1: {
                title: 'Música 1',
                description: 'Esta é uma descrição detalhada da Música 1. Aqui você pode adicionar informações sobre a composição, inspiração, e detalhes técnicos.',
                image: 'https://via.placeholder.com/600x400/ff0000/ffffff?text=Música+1+Detalhes'
            },
            musica2: {
                title: 'Música 2',
                description: 'Esta é uma descrição detalhada da Música 2. Aqui você pode adicionar informações sobre a composição, inspiração, e detalhes técnicos.',
                image: 'https://via.placeholder.com/600x400/ffff00/000000?text=Música+2+Detalhes'
            },
            musica3: {
                title: 'Música 3',
                description: 'Esta é uma descrição detalhada da Música 3. Aqui você pode adicionar informações sobre a composição, inspiração, e detalhes técnicos.',
                image: 'https://via.placeholder.com/600x400/ff00ff/ffffff?text=Música+3+Detalhes'
            },
            ideia1: {
                title: 'Ideia 1',
                description: 'Esta é uma descrição detalhada da Ideia 1. Aqui você pode adicionar mais informações sobre o que é essa ideia, como implementar, e qualquer detalhe relevante.',
                image: 'https://via.placeholder.com/600x400/800080/ffffff?text=Ideia+1+Detalhes'
            },
            ideia2: {
                title: 'Ideia 2',
                description: 'Esta é uma descrição detalhada da Ideia 2. Aqui você pode adicionar mais informações sobre o que é essa ideia, como implementar, e qualquer detalhe relevante.',
                image: 'https://via.placeholder.com/600x400/008080/ffffff?text=Ideia+2+Detalhes'
            },
            atualizacao1: {
                title: 'Atualização 1',
                description: 'Esta é uma descrição detalhada da Atualização 1. Aqui você pode adicionar informações sobre as mudanças, melhorias, e novos recursos.',
                image: 'https://via.placeholder.com/600x400/ffa500/000000?text=Atualização+1+Detalhes'
            }
        };

        // Add click event to mini card items
        document.querySelectorAll('.mini-card-item').forEach(item => {
            item.addEventListener('click', () => {
                // Play click sound
                const clickSound = document.getElementById('click-sound');
                if (clickSound) {
                    clickSound.currentTime = 0;
                    clickSound.play();
                }

                // Scroll to top smoothly
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });

                const modalId = item.getAttribute('data-modal');
                if (modalData[modalId]) {
                    const data = modalData[modalId];
                    modalBody.innerHTML = `
                        <h2>${data.title}</h2>
                        <img src="${data.image}" alt="${data.title}">
                        <p>${data.description}</p>
                    `;
                    modal.style.display = 'block';
                }
            });
        });

        // Close modal when clicking the close button
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close modal when clicking outside the modal content
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

    // Music player functionality
    const audio = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const volumeSlider = document.getElementById('volume-slider');
    const smallPauseBtn = document.getElementById('small-pause-btn');

    if (audio && playPauseBtn && volumeSlider) {
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

        // Small pause button functionality
        if (smallPauseBtn) {
            smallPauseBtn.addEventListener('click', () => {
                if (!audio.paused) {
                    audio.pause();
                    playIcon.style.display = 'inline';
                    pauseIcon.style.display = 'none';
                }
            });
        }

        // Volume control
        volumeSlider.addEventListener('input', (e) => {
            audio.volume = e.target.value;
        });
    }

    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.extra-title').forEach((title) => {
            title.style.animationPlayState = 'running';
        });
    }, 500);

    // 3D Holographic effect on mouse move
    document.querySelectorAll('.mini-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            this.style.setProperty('--rx', rotateX + 'deg');
            this.style.setProperty('--ry', rotateY + 'deg');
        });

        card.addEventListener('mouseleave', function() {
            this.style.setProperty('--rx', '0deg');
            this.style.setProperty('--ry', '0deg');
        });
    });

    // Drag functionality for mini-card-content
    document.querySelectorAll('.mini-card-content').forEach(content => {
        let isDown = false;
        let startX;
        let scrollLeft;

        content.addEventListener('mousedown', (e) => {
            isDown = true;
            content.classList.add('active');
            startX = e.pageX - content.offsetLeft;
            scrollLeft = content.scrollLeft;
        });

        content.addEventListener('mouseleave', () => {
            isDown = false;
            content.classList.remove('active');
        });

        content.addEventListener('mouseup', () => {
            isDown = false;
            content.classList.remove('active');
        });

        content.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - content.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed
            content.scrollLeft = scrollLeft - walk;
        });
    });

    // Arrow button functionality for mini-card-content
    document.querySelectorAll('.mini-card-content').forEach(content => {
        const leftArrow = content.parentElement.querySelector('.arrow-left');
        const rightArrow = content.parentElement.querySelector('.arrow-right');

        if (leftArrow && rightArrow) {
            leftArrow.addEventListener('click', () => {
                content.scrollBy({
                    left: -200, // Scroll left by 200px (width of one item)
                    behavior: 'smooth'
                });
            });

            rightArrow.addEventListener('click', () => {
                content.scrollBy({
                    left: 200, // Scroll right by 200px (width of one item)
                    behavior: 'smooth'
                });
            });
        }
    });

    // Modal functionality
    document.querySelectorAll('.mini-card-item').forEach(item => {
        item.addEventListener('click', () => {
            // Play click sound
            const clickSound = document.getElementById('click-sound');
            if (clickSound) {
                clickSound.currentTime = 0;
                clickSound.play();
            }

            // Scroll to top smoothly
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            const modalId = item.getAttribute('data-modal');
            if (modalData[modalId]) {
                const data = modalData[modalId];
                modalBody.innerHTML = `
                    <h2>${data.title}</h2>
                    <img src="${data.image}" alt="${data.title}">
                    <p>${data.description}</p>
                `;
                modal.style.display = 'block';
            }
        });
    });

    // Close modal when clicking the close button
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
