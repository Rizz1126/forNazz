const wishes = [
    "Happy Birthday to the most amazing person ever.",
    "You make life brighter just by being yourself.",
    "Happy Birthday to someone truly special and unforgettable.",
    "You deserve all the happiness in the world today and always.",
    "Your kindness and warmth make everyone around you happier.",
    "Happy Birthday to a friend who is beautiful inside and out.",
    "You’re honestly one of the most incredible people I know.",
    "The world is better because you’re in it.",
    "Happy Birthday to someone who deserves nothing but the best.",
    "You inspire people more than you realize.",
    "Your smile can make anyone’s day better.",
    "Happy Birthday to a friend who means so much to so many people.",
    "You’re proof that amazing people really do exist.",
    "I hope your birthday is as wonderful as you are.",
    "You have a heart that makes people feel safe and valued.",
    "Happy Birthday to someone who makes life more meaningful.",
    "You deserve love, peace, and endless happiness.",
    "Thank you for being such an amazing friend.",
    "Happy Birthday to the kindest soul I know.",
    "You make every moment brighter with your presence.",
    "You’re one of the rare people who make others feel truly appreciated.",
    "Happy Birthday to someone who deserves the world.",
    "Your energy and personality are genuinely unmatched.",
    "You’re strong, kind, and absolutely amazing.",
    "Happy Birthday to a person who makes life more beautiful.",
    "Never forget how loved and appreciated you are.",
    "You shine in ways you probably don’t even notice.",
    "Happy Birthday to someone who makes everyone around her happier.",
    "You have one of the purest hearts I’ve ever known.",
    "The world feels warmer with you in it.",
    "Happy Birthday to a truly extraordinary friend.",
    "You deserve every good thing coming your way.",
    "Your kindness leaves a mark on everyone you meet.",
    "Happy Birthday to someone who’s simply amazing in every way.",
    "You make people feel comfortable just by being around.",
    "Your existence is a gift to the people who know you.",
    "Happy Birthday to the sweetest and strongest person I know.",
    "You’re more special than you probably realize.",
    "Thank you for always being such a wonderful person.",
    "Happy Birthday to someone who deserves endless happiness."
];

const teasingMessages = [
    "Too slow 👀",
    "Try harder 😝",
    "Almost there!",
    "You can do better than that!",
    "Again again again~",
    "Not quite! 😂",
    "So close! 🤏",
    "Catch me if you can!",
    "Persistence is key! ✨",
    "Last one... maybe? 🤭"
];

const finalMessage = "You are genuinely one of the most amazing people I’ve ever met, and I’m really sorry for everything that happened. No matter what, you deserve happiness, love, and all the beautiful things in life.";

// State Variables
let attemptCount = 0;
const maxAttempts = 10;
let isMusicPlaying = false;
let audio;

// DOM Elements
const introSection = document.getElementById('intro');
const revealSection = document.getElementById('reveal');
const wishesSection = document.getElementById('wishes');
const finalSection = document.getElementById('final');
const mysteryButton = document.getElementById('mystery-button');
const teaserMessage = document.getElementById('teaser-message');
const wishContainer = document.getElementById('wish-container');
const finalMessageText = document.getElementById('final-message-text');
const particleContainer = document.getElementById('particle-container');
const musicToggle = document.getElementById('music-toggle');
const restartBtn = document.getElementById('restart-btn');

// Initialize
function init() {
    createBackgroundParticles();
    
    // Mystery Button Game
    mysteryButton.addEventListener('mouseover', moveButton);
    mysteryButton.addEventListener('click', handleButtonClick);
    
    // Music Toggle
    musicToggle.addEventListener('click', toggleMusic);
    
    // Restart
    restartBtn.addEventListener('click', () => location.reload());
}

// 1. Running Button Mechanic
function moveButton() {
    // Start music on first interaction (if not already playing)
    if (!isMusicPlaying && !audio) {
        toggleMusic();
    }

    if (attemptCount < maxAttempts) {
        const x = Math.random() * (window.innerWidth - 200) + 100;
        const y = Math.random() * (window.innerHeight - 100) + 50;
        
        mysteryButton.style.position = 'fixed';
        mysteryButton.style.left = `${x}px`;
        mysteryButton.style.top = `${y}px`;
        mysteryButton.style.transform = 'translate(-50%, -50%)';
        
        showTeaser();
        attemptCount++;
        
        if (attemptCount === maxAttempts) {
            mysteryButton.innerText = "Okay, I give up! Click me! 🤭";
            mysteryButton.style.background = "#ffb6c1";
            mysteryButton.style.color = "white";
        }
    }
}

function showTeaser() {
    const msg = teasingMessages[Math.floor(Math.random() * teasingMessages.length)];
    teaserMessage.innerText = msg;
    teaserMessage.style.opacity = '1';
    
    setTimeout(() => {
        teaserMessage.style.opacity = '0';
    }, 1000);
}

function handleButtonClick() {
    // Start music on first interaction (if not already playing)
    if (!isMusicPlaying && !audio) {
        toggleMusic();
    }

    if (attemptCount >= maxAttempts) {
        startRevealSequence();
    } else {
        // In case they manage to click it before hover (e.g. mobile or fast click)
        moveButton();
    }
}

// 2. Reveal Transition
function startRevealSequence() {
    introSection.classList.remove('active');
    introSection.classList.add('hidden');
    
    setTimeout(() => {
        revealSection.classList.remove('hidden');
        revealSection.classList.add('active');
        createExplosion();
        
        // Auto-play music if possible (needs interaction, which we just had)
        if (!isMusicPlaying) toggleMusic();
        
        setTimeout(() => {
            startWishesSequence();
        }, 4000);
    }, 1000);
}

// 3. Birthday Wish Explosion
async function startWishesSequence() {
    revealSection.classList.remove('active');
    revealSection.classList.add('hidden');
    
    setTimeout(async () => {
        wishesSection.classList.remove('hidden');
        wishesSection.classList.add('active');
        
        for (let i = 0; i < wishes.length; i++) {
            await showWish(wishes[i]);
        }
        
        showFinalEnding();
    }, 1000);
}

function showWish(text) {
    return new Promise((resolve) => {
        const wishEl = document.createElement('div');
        wishEl.className = 'wish-item';
        wishEl.innerText = text;
        
        // Random animation style
        const animations = ['fade', 'float', 'bounce', 'slide'];
        const anim = animations[Math.floor(Math.random() * animations.length)];
        
        wishContainer.appendChild(wishEl);
        
        // Trigger reflow
        wishEl.offsetHeight;
        
        wishEl.style.opacity = '1';
        wishEl.style.transform = 'scale(1) translateY(0)';
        
        setTimeout(() => {
            wishEl.style.opacity = '0';
            wishEl.style.transform = 'scale(0.8) translateY(-20px)';
            setTimeout(() => {
                wishEl.remove();
                resolve();
            }, 800);
        }, 2500);
    });
}

const projectImages = [
    "WhatsApp Image 2026-05-11 at 10.01.01 AM.jpeg",
    "WhatsApp Image 2026-05-13 at 12.43.07 PM.jpeg",
    "WhatsApp Image 2026-05-13 at 12.45.54 PM.jpeg",
    "WhatsApp Image 2026-05-13 at 12.46.19 PM.jpeg",
    "WhatsApp Image 2026-05-13 at 12.46.36 PM.jpeg"
];

// 4. Final Emotional Ending
function showFinalEnding() {
    wishesSection.classList.remove('active');
    wishesSection.classList.add('hidden');
    
    setTimeout(() => {
        finalSection.classList.remove('hidden');
        finalSection.classList.add('active');
        createHangingPhotos();
        typewriterEffect(finalMessage, finalMessageText);
    }, 1000);
}

function createHangingPhotos() {
    const container = document.getElementById('hanging-photos-container');
    container.innerHTML = ''; // Clear previous if any
    
    // Positions to avoid the center where the text is
    const positions = [
        { left: '5%', ropeBase: 150 },
        { left: '25%', ropeBase: 280 },
        { right: '5%', ropeBase: 200 },
        { right: '25%', ropeBase: 120 },
        { left: '45%', ropeBase: 80 } // Center-top, short rope to not cover text
    ];
    
    projectImages.forEach((src, index) => {
        const hangingPhoto = document.createElement('div');
        hangingPhoto.className = 'hanging-photo';
        
        const pos = positions[index % positions.length];
        
        // Apply position
        if (pos.left) hangingPhoto.style.left = pos.left;
        if (pos.right) hangingPhoto.style.right = pos.right;
        
        // Randomize rope length slightly and rotation
        const ropeHeight = pos.ropeBase + Math.floor(Math.random() * 50);
        const rotation = (Math.random() * 14 - 7).toFixed(1);
        const delay = index * 300; // Staggered entry
        
        hangingPhoto.innerHTML = `
            <div class="rope" style="height: ${ropeHeight}px"></div>
            <div class="photo-frame" style="--rotation: ${rotation}deg">
                <img src="${src}" alt="Memory">
            </div>
        `;
        
        container.appendChild(hangingPhoto);
        
        // Trigger animation
        setTimeout(() => {
            hangingPhoto.classList.add('show');
        }, delay);
    });
}

function typewriterEffect(text, element) {
    let i = 0;
    element.innerText = "";
    const timer = setInterval(() => {
        if (i < text.length) {
            element.append(text.charAt(i));
            i++;
        } else {
            clearInterval(timer);
        }
    }, 50);
}

// Background Visuals
function createBackgroundParticles() {
    const types = ['💙', '✨', '⭐', '🌸'];
    for (let i = 0; i < 30; i++) {
        createParticle(types[Math.floor(Math.random() * types.length)]);
    }
}

function createParticle(char) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.innerText = char;
    p.style.left = `${Math.random() * 100}vw`;
    p.style.top = `${Math.random() * 100}vh`;
    p.style.fontSize = `${Math.random() * 20 + 10}px`;
    p.style.opacity = Math.random() * 0.5 + 0.2;
    
    // Animation
    const duration = Math.random() * 10 + 10;
    p.style.transition = `all ${duration}s linear`;
    
    particleContainer.appendChild(p);
    
    // Initial movement
    setTimeout(() => {
        moveParticle(p);
    }, 100);
}

function moveParticle(p) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    p.style.left = `${x}vw`;
    p.style.top = `${y}vh`;
    
    setTimeout(() => {
        moveParticle(p);
    }, 15000);
}

function createExplosion() {
    for (let i = 0; i < 50; i++) {
        const confetto = document.createElement('div');
        confetto.className = 'particle';
        confetto.innerText = ['🫶', '🎂', '🎈', '✨', '🎉'][Math.floor(Math.random() * 5)];
        confetto.style.left = '50vw';
        confetto.style.top = '50vh';
        confetto.style.fontSize = '24px';
        confetto.style.zIndex = '100';
        
        document.body.appendChild(confetto);
        
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 300 + 100;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;
        
        confetto.animate([
            { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: 2000,
            easing: 'cubic-bezier(0.1, 0.8, 0.4, 1)'
        }).onfinish = () => confetto.remove();
    }
}

// Music Logic
function toggleMusic() {
    if (!audio) {
        // Creating a silent audio element if no source is provided
        // In a real scenario, the user would replace this URL
        audio = new Audio();
        audio.loop = true;
        // Using a royalty-free placeholder URL if possible, otherwise just a dummy
        audio.src = 'Backstreet Boys - Shape of My Heart (Lyrics).mp3'; // Placeholder
    }
    
    if (isMusicPlaying) {
        audio.pause();
        musicToggle.innerHTML = '<span class="icon">🔇</span>';
    } else {
        audio.play().catch(e => console.log("Audio play blocked until interaction"));
        musicToggle.innerHTML = '<span class="icon">🎵</span>';
    }
    isMusicPlaying = !isMusicPlaying;
}

window.onload = init;
