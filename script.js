// YouTube Player API
const videoId = 'qfHngy05ueM';
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '1', width: '1', videoId: videoId,
        playerVars: { 'autoplay': 0, 'controls': 0, 'loop': 1, 'playlist': videoId, 'origin': window.location.origin },
        events: { 'onReady': () => {} }
    });
}

// Particle Canvas
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
let particles = [];
function Particle() {
    this.x = Math.random() * canvas.width; this.y = canvas.height + 10;
    this.vx = Math.random() - 0.5; this.vy = -Math.random() * 2 - 1;
    this.size = Math.random() * 2 + 1; this.alpha = 1;
}
function createParticles() {
    if (particles.length < 200) {
        particles.push(new Particle());
    }
}
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createParticles();
    for(let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.vx; p.y += p.vy;
        p.alpha -= 0.01;
        if (p.alpha <= 0 || p.y < -10) {
            particles.splice(i, 1); i--; continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();
window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });

// Main App
document.addEventListener('DOMContentLoaded', () => {
    const getEl = (id) => document.getElementById(id);
    const touchBtn = getEl('touch-btn');
    const envelopeWrapper = getEl('envelope-wrapper');
    const envelopeFlap = getEl('envelope-flap');
    const envelopeScene = getEl('envelope-scene');
    const messageScene = getEl('message-scene');
    const messageContainer = getEl('message-container');

    const messageTexts = [
        `💞✨ "তুমি বলো, তোমায় দিয়ে কী করবো?" ✨💞`, `তুমি জিজ্ঞেস করলে — “আমাকে দিয়ে কী করবা?”`, `আহ্... যদি জানতা তুমি, তোমাকে দিয়ে আমি কী করব জানো?`,
        `আমি তোমায় দিয়ে আমার পুরো জীবনটা সাজাবো... 💍🌸`, `তুমি হবে আমার সকাল—যার হাসিতে ঘুম ভাঙবে,`, `তুমি হবে আমার রাত—যার কণ্ঠে মন শান্তি পাবে 🌙💗`,
        `তোমার ছোট্ট এক হাসি আমার দিনকে করে তুলবে সুন্দর,`, `তোমার একটু রাগ, আমার ভালোবাসাকে করবে আরও গভীর 💞`, `আমি তোমার চোখে ভবিষ্যৎ দেখতে চাই 👀✨`,
        `তোমার হাতটা ধরে হাঁটতে চাই, বৃষ্টিতে, রোদে, ঠান্ডায়…`, `যেন কেউ না থাকে মাঝখানে, শুধু আমি আর তুমি 🫶🏻☔`, `তুমি যদি ক্লান্ত হও, আমি হব তোমার বিশ্রাম 🌿`,
        `তুমি যদি কাঁদো, আমি হব তোমার চোখের পানি 💧`, `তুমি যদি ভয় পাও, আমি হব তোমার সাহস 💪🏻❤️‍🔥`, `তুমি বলো "তোমায় দিয়ে কী করবো?"`, `আমি বলি —`,
        `তোমায় নিয়ে বাঁচবো।`, `তোমায় দিয়ে আমি স্বপ্ন দেখব, *** গল্পে তোমার নাম রাখব 🕊️💍`, `আমার প্রতিটা ‘সফলতা’র পিছনে থাকবে তোমার ছোঁয়া,`,
        `প্রতিটা দো’আয় থাকবে শুধু তুমি 💫`, `তুমি আমার দোয়া পূরণের উত্তর,`, `তুমি আমার জীবনের শান্তি, আমার ভবিষ্যতের হাসি 🌹🕊️`, `যদি আল্লাহ চায়, একটা দিন আসবে, ইনশাআল্লাহ্‌,`,
        `যেদিন তোমার হাতে রাখব আংটি, বলব —`, `"দেখো, এবার চিরদিনের জন্য আমার হয়ে গেলে..." 💍💗`, `তুমি আমার পৃথিবী, আমি তোমার ছায়া 🌏🤍`, `ভালোবাসা শুধু মুখের কথা না,*** 🫶🏻🔥`
    ];
    
    messageTexts.forEach(text => {
        const p = document.createElement('p'); p.classList.add('message-line');
        messageContainer.appendChild(p);
    });
    const messageLines = Array.from(document.querySelectorAll('.message-line'));

    let lineIndex = 0;
    
    function typeLine() {
        if (lineIndex >= messageLines.length) return;
        
        const lineEl = messageLines[lineIndex];
        const text = messageTexts[lineIndex];
        let charIndex = 0;
        
        lineEl.classList.add('visible');

        function typeChar() {
            if (charIndex < text.length) {
                const span = document.createElement('span');
                span.textContent = text[charIndex];
                span.classList.add('char');
                span.style.animationDelay = `${charIndex * 0.05}s`;
                lineEl.appendChild(span);
                
                messageContainer.scrollTo({
                    top: messageContainer.scrollHeight,
                    behavior: 'smooth'
                });

                charIndex++;
                setTimeout(typeChar, 60);
            } else {
                const glow = document.createElement('div');
                glow.classList.add('line-glow');
                lineEl.appendChild(glow);
                lineIndex++;
                setTimeout(typeLine, 800);
            }
        }
        typeChar();
    }
    
    function startExperience() {
        if (player && typeof player.playVideo === 'function') {
            player.playVideo();
        }

        envelopeFlap.style.transform = 'rotateX(180deg)';
        envelopeWrapper.classList.add('opening');
        
        setTimeout(() => {
            envelopeWrapper.classList.add('open');
        }, 200);

        setTimeout(() => {
            envelopeScene.style.opacity = '0';
            messageScene.classList.add('visible');
            typeLine();
        }, 1500);
    }

    touchBtn.addEventListener('click', startExperience, { once: true });
});
