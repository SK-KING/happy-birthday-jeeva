* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary: #FF6B9D;
    --secondary: #FFA502;
    --tertiary: #00B4DB;
    --accent: #FFD700;
    --dark-bg: #0a0a0a;
    --light-bg: #f5f7fa;
    --dark-text: #1a1a1a;
    --light-text: #ffffff;
    --shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    overflow-x: hidden;
    transition: all 0.3s ease;
}

body.dark-theme {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    color: var(--light-text);
}

body.light-theme {
    background: linear-gradient(135deg, #FFE5EC 0%, #FFD4E5 100%);
    color: var(--dark-text);
}

/* Theme Toggle */
.theme-toggle {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1000;
}

.theme-toggle button {
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.5);
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 24px;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.theme-toggle button:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
}

/* Sound Toggle */
.sound-toggle {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
}

.sound-toggle button {
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.5);
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 24px;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.sound-toggle button:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
}

/* Share Button */
.share-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 1000;
}

.share-btn button {
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    border: none;
    color: white;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 24px;
    box-shadow: var(--shadow);
    transition: all 0.3s ease;
}

.share-btn button:hover {
    transform: scale(1.1) rotate(10deg);
    box-shadow: 0 15px 40px rgba(255, 107, 157, 0.4);
}

/* Container */
.container {
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 20px;
}

/* Content */
.content {
    text-align: center;
    position: relative;
    z-index: 10;
}

/* Main Title */
.main-title {
    font-size: 3.5rem;
    font-weight: 900;
    margin-bottom: 30px;
    color: white;
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}

/* Countdown */
.countdown-wrapper {
    margin-bottom: 40px;
}

.countdown {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 20px;
}

.countdown-item {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.2);
    padding: 20px;
    border-radius: 15px;
    min-width: 80px;
    animation: slideIn 0.6s ease;
}

.countdown-value {
    display: block;
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--accent);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.countdown-label {
    display: block;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.7);
    margin-top: 5px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Cake */
.cake-container {
    margin: 40px 0;
    animation: zoomIn 1s ease;
}

.cake {
    position: relative;
    width: 150px;
    height: 120px;
    margin: 0 auto;
}

.cake-layer {
    position: absolute;
    width: 100%;
    border-radius: 10px;
    box-shadow: inset -2px -2px 5px rgba(0, 0, 0, 0.2);
}

.cake-layer-1 {
    bottom: 0;
    height: 40px;
    background: linear-gradient(135deg, #FF6B9D 0%, #FF8ABE 100%);
}

.cake-layer-2 {
    bottom: 35px;
    height: 45px;
    background: linear-gradient(135deg, #FFA502 0%, #FFB84D 100%);
    width: 85%;
    left: 50%;
    transform: translateX(-50%);
}

.cake-layer-3 {
    bottom: 75px;
    height: 50px;
    background: linear-gradient(135deg, #00B4DB 0%, #0083B0 100%);
    width: 70%;
    left: 50%;
    transform: translateX(-50%);
}

/* Candle */
.candle {
    position: absolute;
    width: 10px;
    height: 40px;
    background: #FFD700;
    top: -45px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.flame {
    position: absolute;
    width: 8px;
    height: 20px;
    background: linear-gradient(to top, #FF6B9D, #FFD700, #FFA502);
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50% 50% 50% 0;
    animation: flicker 0.6s infinite;
    box-shadow: 0 0 20px rgba(255, 107, 157, 0.8);
}

@keyframes flicker {
    0%, 100% { transform: translateX(-50%) scaleY(1); }
    50% { transform: translateX(-50%) scaleY(1.2); }
}

@keyframes zoomIn {
    from {
        opacity: 0;
        transform: scale(0.5);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

/* Wish Section */
.wish-section {
    margin: 40px 0;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 30px;
    border-radius: 20px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    animation: fadeIn 1s ease;
}

.wish-text {
    font-size: 1.1rem;
    color: white;
    margin: 15px 0;
    line-height: 1.6;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

/* Buttons */
.button-group {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
    margin: 40px 0;
}

.btn {
    padding: 15px 30px;
    font-size: 1rem;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    gap: 10px;
}

.btn-primary {
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    color: white;
}

.btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(255, 107, 157, 0.4);
}

.btn-secondary {
    background: linear-gradient(135deg, var(--tertiary) 0%, #0083B0 100%);
    color: white;
}

.btn-secondary:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 180, 219, 0.4);
}

.btn-tertiary {
    background: linear-gradient(135deg, var(--accent) 0%, #FFB700 100%);
    color: var(--dark-text);
}

.btn-tertiary:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(255, 215, 0, 0.4);
}

/* Balloons */
.balloons {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 5;
}

.balloon {
    position: absolute;
    width: 40px;
    height: 50px;
    border-radius: 50% 50% 50% 0;
    bottom: -60px;
}

.balloon::before {
    content: '';
    position: absolute;
    width: 1px;
    height: 60px;
    background: rgba(0, 0, 0, 0.1);
    left: 50%;
    top: -60px;
    transform: translateX(-50%);
}

.balloon-1 {
    left: 10%;
    background: linear-gradient(135deg, #FF6B9D, #FF8ABE);
    animation: float 6s infinite ease-in;
}

.balloon-2 {
    left: 25%;
    background: linear-gradient(135deg, #FFA502, #FFB84D);
    animation: float 7s infinite ease-in 0.5s;
}

.balloon-3 {
    left: 50%;
    background: linear-gradient(135deg, #00B4DB, #0083B0);
    animation: float 8s infinite ease-in 1s;
}

.balloon-4 {
    left: 75%;
    background: linear-gradient(135deg, var(--accent), #FFB700);
    animation: float 6.5s infinite ease-in 0.8s;
}

.balloon-5 {
    right: 10%;
    background: linear-gradient(135deg, #A8E6CF, #56AB91);
    animation: float 7.5s infinite ease-in 1.2s;
}

@keyframes float {
    0% {
        bottom: -60px;
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        bottom: 100vh;
        opacity: 0;
    }
}

/* Gallery Modal */
.gallery-modal {
    display: none;
    position: fixed;
    z-index: 2000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    animation: fadeIn 0.3s ease;
    backdrop-filter: blur(5px);
}

.gallery-modal.active {
    display: flex;
    align-items: center;
    justify-content: center;
}

.gallery-content {
    background: white;
    padding: 40px;
    border-radius: 20px;
    max-width: 800px;
    width: 90%;
    position: relative;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease;
}

.gallery-content h2 {
    color: var(--primary);
    margin-bottom: 30px;
    font-size: 2rem;
}

.close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 2rem;
    cursor: pointer;
    color: var(--primary);
    transition: all 0.3s ease;
}

.close-btn:hover {
    transform: rotate(90deg);
}

.photo-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
}

.photo-item {
    overflow: hidden;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    height: 150px;
}

.photo-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 2rem;
    transition: all 0.3s ease;
}

.photo-item:hover .photo-placeholder {
    transform: scale(1.1);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.photo-placeholder p {
    font-size: 0.8rem;
    margin-top: 10px;
}

@keyframes slideUp {
    from {
        transform: translateY(50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

/* Gift Box */
.gift-box {
    position: relative;
    width: 100px;
    height: 100px;
    margin: 30px auto;
    cursor: pointer;
    animation: pulse 2s infinite;
}

.gift-box-inner {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--accent) 0%, #FFB700 100%);
    border-radius: 10px;
    position: relative;
    box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
}

.gift-ribbon {
    position: absolute;
    width: 100%;
    height: 15px;
    background: linear-gradient(90deg, var(--primary), var(--secondary), var(--tertiary));
    top: 50%;
    transform: translateY(-50%);
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.2);
}

.gift-text {
    position: absolute;
    font-size: 3rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: bounce 1.5s infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

/* Hearts */
.hearts-container {
    position: fixed;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 8;
}

.heart {
    position: absolute;
    font-size: 2rem;
    animation: heartFloat 3s ease-in forwards;
    opacity: 0.8;
}

@keyframes heartFloat {
    0% {
        transform: translateY(0) translateX(0) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(-100vh) translateX(100px) rotate(360deg);
        opacity: 0;
    }
}

/* Footer */
.footer-message {
    margin-top: 50px;
    color: white;
    font-size: 0.9rem;
}

.footer-message i {
    color: var(--primary);
    animation: heartBeat 0.6s infinite;
}

@keyframes heartBeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
}

/* Fireworks */
.fireworks-container {
    position: fixed;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9;
}

.firework {
    position: absolute;
    pointer-events: none;
}

.particle {
    position: absolute;
    pointer-events: none;
}

/* Confetti Canvas */
#confetti {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 7;
}

/* Responsive */
@media (max-width: 768px) {
    .main-title {
        font-size: 2rem;
    }

    .countdown {
        gap: 10px;
    }

    .countdown-item {
        padding: 15px;
        min-width: 60px;
    }

    .countdown-value {
        font-size: 1.8rem;
    }

    .wish-section {
        padding: 20px;
    }

    .wish-text {
        font-size: 1rem;
    }

    .button-group {
        flex-direction: column;
        align-items: stretch;
    }

    .btn {
        justify-content: center;
    }

    .gallery-content {
        width: 95%;
        padding: 20px;
    }

    .photo-gallery {
        grid-template-columns: repeat(2, 1fr);
    }
        }
