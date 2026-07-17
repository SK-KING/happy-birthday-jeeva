// ============================================
// BIRTHDAY GIFT WEB APP - Main JavaScript
// ============================================

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    startCountdown();
    startAutoCelebration();
});

// ============================================
// 1. INITIALIZATION
// ============================================

function initializeApp() {
    // Theme initialization
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    document.body.classList.add(savedTheme);
    updateThemeIcon(savedTheme);

    // Sound initialization
    const soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
    if (!soundEnabled) {
        document.getElementById('soundBtn').classList.add('muted');
    }

    // Event listeners
    setupEventListeners();
}

function setupEventListeners() {
    // Theme toggle
    document.getElementById('themeBtn').addEventListener('click', toggleTheme);

    // Sound toggle
    document.getElementById('soundBtn').addEventListener('click', toggleSound);

    // Celebrate button
    document.getElementById('celebrateBtn').addEventListener('click', startCelebration);

    // Gallery button
    document.getElementById('galleryBtn').addEventListener('click', openGallery);

    // Music button
    document.getElementById('musicBtn').addEventListener('click', playBirthdaySong);

    // Gallery close
    document.getElementById('closeGallery').addEventListener('click', closeGallery);

    // Share button
    document.getElementById('shareBtn').addEventListener('click', shareToSocial);

    // Gift box click
    document.querySelector('.gift-box').addEventListener('click', surpriseGiftBox);

    // Close gallery on outside click
    document.getElementById('galleryModal').addEventListener('click', (e) => {
        if (e.target.id === 'galleryModal') {
            closeGallery();
        }
    });
}

// ============================================
// 2. THEME TOGGLE
// ============================================

function toggleTheme() {
    const body = document.body;
    const currentTheme = body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
    const newTheme = currentTheme === 'dark-theme' ? 'light-theme' : 'dark-theme';

    body.classList.remove(currentTheme);
    body.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    playSound('switch');
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeBtn i');
    icon.className = theme === 'dark-theme' ? 'fas fa-sun' : 'fas fa-moon';
}

// ============================================
// 3. SOUND TOGGLE
// ============================================

function toggleSound() {
    const soundBtn = document.getElementById('soundBtn');
    const soundEnabled = !soundBtn.classList.contains('muted');

    soundBtn.classList.toggle('muted');
    localStorage.setItem('soundEnabled', !soundEnabled);

    const icon = soundBtn.querySelector('i');
    icon.className = soundEnabled ? 'fas fa-volume-mute' : 'fas fa-volume-up';
}

function isSoundEnabled() {
    return localStorage.getItem('soundEnabled') !== 'false' && 
           !document.getElementById('soundBtn').classList.contains('muted');
}

function playSound(type) {
    if (!isSoundEnabled()) return;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    switch(type) {
        case 'celebration':
            playTone(audioContext, 523.25, 0.1); // C
            playTone(audioContext, 659.25, 0.1, 0.1); // E
            playTone(audioContext, 783.99, 0.1, 0.2); // G
            break;
        case 'switch':
            playTone(audioContext, 880, 0.05);
            break;
        case 'click':
            playTone(audioContext, 440, 0.05);
            break;
    }
}

function playTone(audioContext, frequency, duration, delay = 0) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + delay);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + delay + duration);

    oscillator.start(audioContext.currentTime + delay);
    oscillator.stop(audioContext.currentTime + delay + duration);
}

// ============================================
// 4. COUNTDOWN TIMER
// ============================================

function startCountdown() {
    function updateCountdown() {
        const targetDate = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours from now

        setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        }, 1000);
    }

    updateCountdown();
}

// ============================================
// 5. AUTO CELEBRATION ON LOAD
// ============================================

function startAutoCelebration() {
    setTimeout(() => {
        createConfetti();
        createFireworks(5);
        createHearts(10);
        playSound('celebration');
    }, 500);
}

// ============================================
// 6. CELEBRATION EFFECTS
// ============================================

function startCelebration() {
    playSound('celebration');
    createConfetti();
    createFireworks(10);
    createHearts(20);
    
    // Cake animation
    const cake = document.querySelector('.cake');
    cake.style.animation = 'none';
    setTimeout(() => {
        cake.style.animation = 'bounce 0.6s ease';
    }, 10);

    // Shake effect
    document.querySelector('.main-title').style.animation = 'none';
    setTimeout(() => {
        document.querySelector('.main-title').style.animation = 'bounce 2s infinite';
    }, 10);
}

// ============================================
// 7. CONFETTI ANIMATION
// ============================================

function createConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];
    const colors = ['#FF6B9D', '#FFA502', '#00B4DB', '#FFD700', '#A8E6CF', '#FF8ABE', '#FFB84D'];

    function Confetti() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.width = Math.random() * 10 + 5;
        this.height = Math.random() * 10 + 5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = Math.random() * 8 - 4;
        this.speedY = Math.random() * 5 + 5;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
    }

    Confetti.prototype.draw = function() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    };

    Confetti.prototype.update = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        this.speedY += 0.1; // Gravity
    };

    // Create confetti particles
    for (let i = 0; i < 100; i++) {
        confetti.push(new Confetti());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confetti.forEach((c) => {
            c.update();
            c.draw();
        });

        if (confetti.length > 0) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}

// ============================================
// 8. FIREWORKS ANIMATION
// ============================================

function createFireworks(count) {
    const container = document.getElementById('fireworks');
    const colors = ['#FF6B9D', '#FFA502', '#00B4DB', '#FFD700', '#A8E6CF'];

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const x = Math.random() * 80 + 10;
            const y = Math.random() * 60 + 10;

            for (let j = 0; j < 8; j++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = x + '%';
                particle.style.top = y + '%';
                particle.style.color = colors[Math.floor(Math.random() * colors.length)];
                particle.innerHTML = '✨';
                particle.style.fontSize = Math.random() * 20 + 10 + 'px';
                particle.style.position = 'fixed';

                container.appendChild(particle);

                const angle = (j / 8) * Math.PI * 2;
                const velocity = Math.random() * 200 + 150;
                const tx = Math.cos(angle) * velocity;
                const ty = Math.sin(angle) * velocity;

                particle.animate([
                    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                    { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
                ], {
                    duration: 1000,
                    easing: 'ease-out'
                });

                setTimeout(() => particle.remove(), 1000);
            }
        }, i * 200);
    }
}

// ============================================
// 9. FLOATING HEARTS
// ============================================

function createHearts(count) {
    const container = document.getElementById('heartsContainer');
    const hearts = ['❤️', '💚', '💙', '💜', '🧡'];

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.bottom = '0';
            
            const randomX = Math.random() * 200 - 100;
            const duration = Math.random() * 2000 + 2000;

            container.appendChild(heart);

            const keyframes = [
                { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(-100vh) translateX(${randomX}px) rotate(360deg)`, opacity: 0 }
            ];

            heart.animate(keyframes, {
                duration: duration,
                easing: 'ease-in',
                fill: 'forwards'
            });

            setTimeout(() => heart.remove(), duration);
        }, i * 100);
    }
}

// ============================================
// 10. GALLERY MANAGEMENT
// ============================================

function openGallery() {
    document.getElementById('galleryModal').classList.add('active');
    playSound('click');
}

function closeGallery() {
    document.getElementById('galleryModal').classList.remove('active');
    playSound('click');
}

// ============================================
// 11. BIRTHDAY SONG
// ============================================

function playBirthdaySong() {
    const audio = document.getElementById('birthdayAudio');
    
    if (audio.paused) {
        audio.play();
        document.getElementById('musicBtn').innerHTML = '<i class="fas fa-pause"></i> Stop Song';
    } else {
        audio.pause();
        audio.currentTime = 0;
        document.getElementById('musicBtn').innerHTML = '<i class="fas fa-music"></i> Birthday Song';
    }

    playSound('click');
}

// ============================================
// 12. SHARE TO SOCIAL MEDIA
// ============================================

function shareToSocial() {
    const message = "🎉 Join my birthday celebration! Link: " + window.location.href;
    const encodedMessage = encodeURIComponent(message);

    const shareOptions = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                    background: white; padding: 30px; border-radius: 15px; 
                    box-shadow: 0 10px 40px rgba(0,0,0,0.3); z-index: 5000; text-align: center;">
            <h2 style="color: #333; margin-bottom: 20px;">Share on Social Media</h2>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 20px;">
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" 
                   target="_blank" style="background: #1877F2; color: white; padding: 10px 20px; border-radius: 10px; text-decoration: none; font-weight: bold;">
                   📘 Facebook
                </a>
                <a href="https://twitter.com/intent/tweet?text=${encodedMessage}" 
                   target="_blank" style="background: #1DA1F2; color: white; padding: 10px 20px; border-radius: 10px; text-decoration: none; font-weight: bold;">
                   🐦 Twitter
                </a>
                <a href="https://wa.me/?text=${encodedMessage}" 
                   target="_blank" style="background: #25D366; color: white; padding: 10px 20px; border-radius: 10px; text-decoration: none; font-weight: bold;">
                   💬 WhatsApp
                </a>
            </div>
            <button onclick="this.parentElement.style.display='none'" 
                    style="background: #FF6B9D; color: white; border: none; padding: 10px 20px; border-radius: 10px; cursor: pointer; font-weight: bold;">
                Close
            </button>
        </div>
    `;

    const shareDiv = document.createElement('div');
    shareDiv.innerHTML = shareOptions;
    document.body.appendChild(shareDiv);

    playSound('click');
}

// ============================================
// 13. SURPRISE GIFT BOX
// ============================================

function surpriseGiftBox() {
    createConfetti();
    createFireworks(8);
    createHearts(15);
    playSound('celebration');

    const giftBox = document.querySelector('.gift-box');
    giftBox.style.animation = 'none';
    setTimeout(() => {
        giftBox.style.animation = 'pulse 2s infinite';
    }, 10);

    // Show surprise message
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #FF6B9D 0%, #FFA502 100%);
        color: white;
        padding: 30px 40px;
        border-radius: 20px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        text-align: center;
        animation: slideUp 0.5s ease;
    `;
    message.innerHTML = `
        🎁 You're the best! <br>
        Thanks for being my bestfriend! 💕<br>
        <small style="font-size: 1rem; margin-top: 10px;">Let's create more memories together!</small>
    `;

    document.body.appendChild(message);

    setTimeout(() => {
        message.style.animation = 'slideUp 0.5s ease reverse';
        setTimeout(() => message.remove(), 500);
    }, 3000);
}

// ============================================
// 14. WINDOW RESIZE HANDLER
// ============================================

window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ============================================
// 15. EASTER EGG - KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        startCelebration();
    }
    if (e.key === ' ') {
        e.preventDefault();
        surpriseGiftBox();
    }
});
