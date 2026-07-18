document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    loadTheme();
    loadSoundPreference();
    setupEventListeners();
    startAutoCelebration();
    setupGallery();
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        updateThemeIcon('light');
    } else {
        updateThemeIcon('dark');
    }
}

function toggleTheme() {
    const isLight = document.body.classList.contains('light-theme');
    if (isLight) {
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
    } else {
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('light');
    }
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function loadSoundPreference() {
    const soundOn = localStorage.getItem('soundOn') !== 'false';
    if (!soundOn) {
        document.getElementById('soundToggle').classList.add('muted');
    }
}

function toggleSound() {
    const btn = document.getElementById('soundToggle');
    const isMuted = btn.classList.contains('muted');
    
    if (isMuted) {
        btn.classList.remove('muted');
        btn.querySelector('i').className = 'fas fa-volume-up';
        localStorage.setItem('soundOn', 'true');
    } else {
        btn.classList.add('muted');
        btn.querySelector('i').className = 'fas fa-volume-mute';
        localStorage.setItem('soundOn', 'false');
    }
}

function isSoundEnabled() {
    return localStorage.getItem('soundOn') !== 'false';
}

// Indian Birthday Song Audio URL (Bollywood style)
const INDIAN_BIRTHDAY_SONG = 'https://assets.mixkit.co/active_storage/sfx/2706/2706-preview.mp3';

function playCelebrationSound() {
    if (!isSoundEnabled()) return;
    
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 659.25];
    
    notes.forEach((freq, i) => {
        setTimeout(() => {
            playTone(audioCtx, freq, 0.2);
        }, i * 120);
    });
}

function playTone(audioCtx, frequency, duration) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.frequency.value = frequency;
    osc.type = 'sine';
    
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + duration);
}

function setupEventListeners() {
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('soundToggle').addEventListener('click', toggleSound);
    document.getElementById('celebrateBtn').addEventListener('click', startCelebration);
    document.getElementById('musicBtn').addEventListener('click', toggleBirthdayMusic);
    document.getElementById('galleryBtn').addEventListener('click', openGallery);
    document.getElementById('closeGallery').addEventListener('click', closeGallery);
    document.getElementById('shareBtn').addEventListener('click', shareOnSocial);
    document.getElementById('giftBox').addEventListener('click', openGift);
    
    document.getElementById('galleryModal').addEventListener('click', (e) => {
        if (e.target.id === 'galleryModal') closeGallery();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') startCelebration();
        if (e.code === 'Space') {
            e.preventDefault();
            openGift();
        }
    });
}

function startAutoCelebration() {
    setTimeout(() => {
        createConfetti();
        createFireworks(5);
        createHearts(8);
        playCelebrationSound();
    }, 500);
}

function startCelebration() {
    playCelebrationSound();
    createConfetti();
    createFireworks(12);
    createHearts(20);
    
    const teddyBear = document.querySelector('.teddy-bear');
    teddyBear.style.animation = 'none';
    setTimeout(() => {
        teddyBear.style.animation = 'teddyFloat 3s ease-in-out infinite';
    }, 10);
    
    const title = document.querySelector('.main-title');
    title.style.animation = 'none';
    setTimeout(() => {
        title.style.animation = 'bounce 2s infinite';
    }, 10);
}

function createConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettis = [];
    const colors = ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF', '#FF1744', '#FF6D00', '#FFC107'];
    
    class Confetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.w = Math.random() * 10 + 4;
            this.h = Math.random() * 10 + 4;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.vx = Math.random() * 10 - 5;
            this.vy = Math.random() * 5 + 5;
            this.rot = Math.random() * 360;
            this.rotSpeed = Math.random() * 10 - 5;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.rot += this.rotSpeed;
            this.vy += 0.1;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rot * Math.PI) / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
            ctx.restore();
        }
    }
    
    for (let i = 0; i < 150; i++) {
        confettis.push(new Confetti());
    }
    
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettis.forEach(c => {
            c.update();
            c.draw();
        });
        
        if (confettis.length > 0) {
            requestAnimationFrame(animate);
        }
    };
    
    animate();
}

function createFireworks(count) {
    const container = document.getElementById('fireworksContainer');
    const colors = ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF'];
    const emojis = ['✨', '⭐', '🌟', '💫', '🎆'];
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const x = Math.random() * 80 + 10;
            const y = Math.random() * 50 + 15;
            
            for (let j = 0; j < 12; j++) {
                const particle = document.createElement('div');
                particle.className = 'firework';
                particle.style.left = x + '%';
                particle.style.top = y + '%';
                particle.style.color = colors[Math.floor(Math.random() * colors.length)];
                particle.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
                particle.style.opacity = '1';
                
                container.appendChild(particle);
                
                const angle = (j / 12) * Math.PI * 2;
                const distance = Math.random() * 250 + 150;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                
                particle.animate([
                    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                    { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
                ], {
                    duration: 1200,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                });
                
                setTimeout(() => particle.remove(), 1200);
            }
        }, i * 150);
    }
}

function createHearts(count) {
    const container = document.getElementById('heartsContainer');
    const hearts = ['❤️', '💚', '💙', '💜', '🧡', '💕', '💖'];
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.bottom = '-20px';
            
            container.appendChild(heart);
            
            const duration = Math.random() * 2000 + 2500;
            const randomX = Math.random() * 300 - 150;
            
            heart.animate([
                { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(-100vh) translateX(${randomX}px) rotate(360deg)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'ease-in'
            });
            
            setTimeout(() => heart.remove(), duration);
        }, i * 80);
    }
}

function openGallery() {
    document.getElementById('galleryModal').classList.add('active');
    playCelebrationSound();
}

function closeGallery() {
    document.getElementById('galleryModal').classList.remove('active');
}

function setupGallery() {
    const photoInputs = document.querySelectorAll('.photo-input');
    
    photoInputs.forEach((input, index) => {
        const card = input.closest('.photo-card');
        const placeholder = card.querySelector('.photo-placeholder');
        
        // Click on photo card to trigger file input
        placeholder.addEventListener('click', () => {
            input.click();
        });
        
        // Handle file selection
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    placeholder.style.backgroundImage = `url(${event.target.result})`;
                    placeholder.style.backgroundSize = 'cover';
                    placeholder.style.backgroundPosition = 'center';
                    placeholder.innerHTML = '';
                    
                    // Save to localStorage
                    localStorage.setItem(`photo_${index}`, event.target.result);
                    
                    createConfetti();
                    playCelebrationSound();
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Load from localStorage if exists
        const savedPhoto = localStorage.getItem(`photo_${index}`);
        if (savedPhoto) {
            placeholder.style.backgroundImage = `url(${savedPhoto})`;
            placeholder.style.backgroundSize = 'cover';
            placeholder.style.backgroundPosition = 'center';
            placeholder.innerHTML = '';
        }
    });
}

function toggleBirthdayMusic() {
    const audio = document.getElementById('birthdayAudio');
    const btn = document.getElementById('musicBtn');
    
    if (audio.paused) {
        audio.src = INDIAN_BIRTHDAY_SONG;
        audio.play().catch(err => console.log('Audio play failed:', err));
        btn.innerHTML = '<i class="fas fa-pause"></i> Stop Song';
        btn.style.background = 'linear-gradient(135deg, #FF006E 0%, #FB5607 100%)';
        createHearts(5);
    } else {
        audio.pause();
        audio.currentTime = 0;
        btn.innerHTML = '<i class="fas fa-music"></i> Birthday Song';
        btn.style.background = '';
    }
}

function openGift() {
    createConfetti();
    createFireworks(8);
    createHearts(15);
    playCelebrationSound();
    
    const giftBox = document.getElementById('giftBox');
    giftBox.style.animation = 'none';
    setTimeout(() => {
        giftBox.style.animation = 'pulse 2.5s infinite';
    }, 10);
    
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #FF006E 0%, #FB5607 100%);
        color: white;
        padding: 40px 50px;
        border-radius: 25px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        text-align: center;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255, 255, 255, 0.2);
        animation: slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    `;
    
    messageDiv.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 15px;">🎁</div>
        <div>You're Amazing! 💫</div>
        <div style="font-size: 1.1rem; margin-top: 10px;">Thanks for being the best friend! 💕</div>
        <div style="font-size: 0.9rem; margin-top: 15px; opacity: 0.9;">Let's make more beautiful memories together! ✨</div>
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) reverse';
        setTimeout(() => messageDiv.remove(), 500);
    }, 3000);
}

function shareOnSocial() {
    const currentUrl = window.location.href;
    const message = "🎉 Join Jeeva Sree's Birthday Celebration! 🎂 Wishing you an amazing day filled with love and laughter! 💕 #BirthdayVibes #Celebration";
    
    const shareDiv = document.createElement('div');
    shareDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        z-index: 5000;
        text-align: center;
        backdrop-filter: blur(10px);
        animation: slideUp 0.3s ease;
        max-width: 500px;
        width: 90%;
    `;
    
    shareDiv.innerHTML = `
        <h3 style="color: #333; margin-bottom: 25px; font-size: 1.3rem;">Share the Celebration! 🎉</h3>
        <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin-bottom: 25px;">
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}" target="_blank" style="background: #1877F2; color: white; padding: 12px 24px; border-radius: 50px; text-decoration: none; font-weight: 600; transition: all 0.3s; display: flex; align-items: center; gap: 8px;">
                <i class="fab fa-facebook"></i> Facebook
            </a>
            <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(currentUrl)}" target="_blank" style="background: #1DA1F2; color: white; padding: 12px 24px; border-radius: 50px; text-decoration: none; font-weight: 600; transition: all 0.3s; display: flex; align-items: center; gap: 8px;">
                <i class="fab fa-twitter"></i> Twitter
            </a>
            <a href="https://wa.me/?text=${encodeURIComponent(message + ' ' + currentUrl)}" target="_blank" style="background: #25D366; color: white; padding: 12px 24px; border-radius: 50px; text-decoration: none; font-weight: 600; transition: all 0.3s; display: flex; align-items: center; gap: 8px;">
                <i class="fab fa-whatsapp"></i> WhatsApp
            </a>
            <button onclick="navigator.clipboard.writeText('${currentUrl}'); alert('Link copied! 🎉'); this.parentElement.parentElement.style.display='none';" style="background: #8338EC; color: white; padding: 12px 24px; border: none; border-radius: 50px; font-weight: 600; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-copy"></i> Copy Link
            </button>
        </div>
        <button onclick="this.parentElement.parentElement.removeChild(this.parentElement);" style="background: #FF006E; color: white; padding: 12px 30px; border: none; border-radius: 50px; font-weight: 600; cursor: pointer; transition: all 0.3s;">Close</button>
    `;
    
    const bgDiv = document.createElement('div');
    bgDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 4999;
        backdrop-filter: blur(5px);
    `;
    bgDiv.onclick = () => {
        bgDiv.remove();
        shareDiv.remove();
    };
    
    document.body.appendChild(bgDiv);
    document.body.appendChild(shareDiv);
}

window.addEventListener('resize', () => {
    const canvas = document.getElementById('confettiCanvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            transform: translate(-50%, -50%) translateY(100px);
            opacity: 0;
        }
        to {
            transform: translate(-50%, -50%) translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
