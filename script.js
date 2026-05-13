/* ── AUTH REDIRECT ── */
const TOKEN_KEY = 'logintoken';

function getSessionAuth() {
    const raw = sessionStorage.getItem(TOKEN_KEY);
    if (!raw) return null;

    try {
        const data = JSON.parse(raw);
        if (!data || typeof data.token !== 'string' || typeof data.expiresAt !== 'number') return null;
        return data;
    } catch (err) {
        return null;
    }
}

function validateAuth() {
    const auth = getSessionAuth();
    if (!auth || auth.expiresAt <= Date.now()) {
        sessionStorage.removeItem(TOKEN_KEY);
        window.location.replace('index.html');
    }
}

validateAuth();

/* ── PETALS ── */
const canvas = document.getElementById('petals'), ctx = canvas.getContext('2d');
let W, H, petals = [];
const PC = ['#f9d4d4', '#e07585', '#f5b8c4', '#c9922a', '#b84059', '#f0c9d0', '#fce4d0'];
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
resize(); window.addEventListener('resize', resize);
function mkP() { return { x: Math.random() * W, y: -20, r: 3 + Math.random() * 7, color: PC[0 | Math.random() * PC.length], speed: .55 + Math.random() * 1.15, drift: (Math.random() - .5) * .55, rot: Math.random() * Math.PI * 2, rs: (Math.random() - .5) * .04, wobble: Math.random() * 100, ws: .02 + Math.random() * .02, opacity: .5 + Math.random() * .5 } }
for (let i = 0; i < 24; i++) { const p = mkP(); p.y = Math.random() * H; petals.push(p) }
function drawP(p) { ctx.save(); ctx.globalAlpha = p.opacity; ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * 1.65, 0, 0, Math.PI * 2); ctx.fillStyle = p.color; ctx.fill(); ctx.restore() }
(function loop() { ctx.clearRect(0, 0, W, H); petals.forEach(p => { p.wobble += p.ws; p.x += p.drift + Math.sin(p.wobble) * .5; p.y += p.speed; p.rot += p.rs; if (p.y > H + 20) Object.assign(p, mkP()); drawP(p) }); if (Math.random() < .025 && petals.length < 40) petals.push(mkP()); requestAnimationFrame(loop) })();

/* ── FLIP CARDS ── */
const reasons = [
    { n: '01', e: '🌟', t: 'You turn ordinary mornings into something truly magical.' },
    { n: '02', e: '🤗', t: 'Your hugs make every hard day instantly better.' },
    { n: '03', e: '😂', t: 'You make me laugh harder than anyone ever could.' },
    { n: '04', e: '💪', t: 'You are stronger than you ever give yourself credit for.' },
    { n: '05', e: '🍳', t: 'Your cooking is a love language — and I am fluent.' },
    { n: '06', e: '🌙', t: 'You stay up late just to make sure everyone is okay.' },
    { n: '07', e: '🧠', t: 'You think of everything before anyone else even notices.' },
    { n: '08', e: '💞', t: 'You love our family completely and unconditionally.' },
    // { n: '09', e: '✨', t: 'You light up every single room you walk into.' },
    // { n: '10', e: '🌷', t: 'Because you choose to be the most wonderful mother — every single day.' },
];
const grid = document.getElementById('cards-grid');
reasons.forEach(r => {
    grid.innerHTML += `<div class="flip-card" onclick="this.classList.toggle('flipped')"><div class="flip-inner"><div class="flip-front"><div class="f-num">${r.n}</div><div class="f-emoji">${r.e}</div><div class="f-hint">${r.t}</div></div><div class="flip-back"></div></div></div>`;
});

/* ── MEMORY JAR ── */
const memories = [
    { r: './pri/us/1.jpg' },
    { r: './pri/us/2.jpg' },
    { r: './pri/us/3.jpg' },
    { r: './pri/us/4.jpg' },
    { r: './pri/us/5.jpg' },
    { r: './pri/us/6.jpg' },
    { r: './pri/us/7.jpg' },
    { r: './pri/us/8.jpg' },
    { r: './pri/us/9.jpg' },
    { r: './pri/us/10.jpg' },
    { r: './pri/us/11.jpg' },
    { r: './pri/us/12.jpg' },
    { r: './pri/us/13.jpg' },
    { r: './pri/us/14.jpg' },
];
let memIdx = 0;
function openMemory() {
    const m = memories[memIdx % memories.length];
    // document.getElementById('p-emoji').textContent = m.e;
    // document.getElementById('p-text').textContent = m.t;
    document.getElementById('back-img').style.backgroundImage = `url('${m.r}')`;
    document.getElementById('p-num').textContent = `Memory ${(memIdx % memories.length) + 1} of ${memories.length}`;
    document.getElementById('popup').classList.add('show');
    memIdx++;
}
function closePopup(e) {
    if (e && e.force) return document.getElementById('popup').classList.remove('show');
    if (e && (e.target === document.getElementById('popup') || e.target.classList.contains('popup-close'))) document.getElementById('popup').classList.remove('show');
}

/* ── VIDEO ── */

showVideo();

function showVideo() {
    const vid = document.getElementById('mem-video');
    vid.play();
    //vid.muted = false;
    // .catch(() => {
    //   console.log("fallback");
    //   vid.muted = true;   // fallback: mute and try again
    //   vid.play();
    // });
}
function resetVideo() {
    document.getElementById('mem-video').pause();
    document.getElementById('mem-video').src = '';
    document.getElementById('video-drop').style.display = 'flex';
    document.getElementById('vid-player').style.display = 'none';
    document.getElementById('video-shell').classList.remove('has-video');
    document.getElementById('vid-input').value = '';
}
function onDragOver(e) { e.preventDefault(); document.getElementById('video-shell').classList.add('drag-over') }
function onDragLeave() { document.getElementById('video-shell').classList.remove('drag-over') }
function onDrop(e) { e.preventDefault(); onDragLeave(); const f = e.dataTransfer.pri[0]; if (f && f.type.startsWith('video/')) showVideo(URL.createObjectURL(f)) }

/* ── TYPEWRITER LETTER ── */
const letterText = `My dearest love,\n\nEvery day I watch you pour your whole heart into our family — your patience, your warmth, your laughter — and I am in complete awe of you.\n\nBeing a mother is the hardest thing in the world, and you make it look like the most beautiful, natural thing I have ever seen. Our children are so lucky to have you. And so am I.\n\nThank you for choosing us, again and again, every single day. Today is yours. You deserve every flower, every hug, every quiet moment of rest and joy.\n\nI love you more than yesterday, and less than tomorrow. 🌷`;
let typed = false;
function typeLetter() {
    if (typed) return; typed = true;
    const el = document.getElementById('letter-text');
    let i = 0;
    function tick() {
        if (i >= letterText.length) return;
        const ch = letterText[i++];
        if (ch === '\n') el.innerHTML += '<br/>';
        else el.innerHTML += ch;
        const delay = ch === '.' || ch === '!' || ch === '?' ? 65 : ch === ',' ? 42 : 17;
        setTimeout(tick, delay);
    }
    tick();
}

/* ── SCROLL REVEAL ── */
const io = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible') } }) }, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
const letterBox = document.querySelector('.letter-box');
if (letterBox) { const lo = new IntersectionObserver(entries => { if (entries[0].isIntersecting) typeLetter() }, { threshold: .2 }); lo.observe(letterBox) }

/* ── CONFETTI ── */
function launchConfetti(btn) {
    const COLORS = ['#e07585', '#f9d4d4', '#c9922a', '#b84059', '#7fa87f', '#fff', '#f5c6c6', '#d4a040'];
    const EMOJIS = ['Manisha💕', 'Manisha💛', 'Manisha💖', 'Manisha🩷'];

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    // Shape confetti — burst to random screen positions
    for (let i = 0; i < 100; i++) {
        const el = document.createElement('div');
        el.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      left: ${cx}px;
      top: ${cy}px;
      width: ${6 + Math.random() * 12}px;
      height: ${6 + Math.random() * 12}px;
      background: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
      border-radius: ${['50%', '0', '30%'][Math.floor(Math.random() * 3)]};
      --tx: ${(Math.random() - 0.5) * window.innerWidth * 1.4}px;
      --ty: ${(Math.random() - 0.5) * window.innerHeight * 1.4}px;
      --rot: ${Math.random() * 720}deg;
      animation: cfBurst ${20 + Math.random() * 1.2}s cubic-bezier(0.1, 0.8, 0.3, 1) ${Math.random() * 0.2}s forwards;
    `;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 3000);
    }

    // Emoji burst — scatter across whole screen
    for (let i = 0; i < 30; i++) {
        const el = document.createElement('div');
        el.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      font-size: ${18 + Math.random() * 22}px;
      left: ${cx}px;
      top: ${cy}px;
      --tx: ${(Math.random() - 0.5) * window.innerWidth * 1.6}px;
      --ty: ${(Math.random() - 0.5) * window.innerHeight * 1.6}px;
      --rot: ${Math.random() * 360}deg;
      animation: cfBurst ${20 + Math.random() * 1.4}s cubic-bezier(0.1, 0.8, 0.3, 1) ${Math.random() * 0.3}s forwards;
    `;
        el.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 3000);
    }
}

const TRAIL_HEARTS = ['🩷', '🤍', '💕', '✨', '🌸'];


/* mini hearts on click */
document.addEventListener('click', e => {
    validateAuth();
    if (e.target.closest('button,.flip-card,.jar-svg,.video-shell,.popup-overlay,input')) return;
    const el = document.createElement('div');
    el.className = 'cpx';
    el.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;font-size:${18 + Math.random() * 14}px;background:transparent;--dur:5s;--del:0s;--tx:${(Math.random() - .5) * 70}px`;
    el.textContent = TRAIL_HEARTS[0 | Math.random() * TRAIL_HEARTS.length];
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1400);
});

// ── Custom heart cursor
const cursor = document.createElement('div');
cursor.className = 'cursor-heart';
cursor.textContent = '💘';
document.body.appendChild(cursor);

document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    spawnTrail(e.clientX, e.clientY);
});

// Slightly enlarge on click
document.addEventListener('mousedown', () => cursor.style.transform = 'translate(-50%,-50%) scale(0.8)');
document.addEventListener('mouseup', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');

// ── Trail hearts
let lastTrail = 0;

function spawnTrail(x, y) {
    const now = Date.now();
    if (now - lastTrail < 60) return; // throttle: one trail every 60ms
    lastTrail = now;

    const el = document.createElement('div');
    el.className = 'trail-heart';
    el.textContent = TRAIL_HEARTS[Math.floor(Math.random() * TRAIL_HEARTS.length)];

    // small random offset so they don't stack perfectly
    el.style.left = (x + (Math.random() - 0.5) * 16) + 'px';
    el.style.top = (y + (Math.random() - 0.5) * 16) + 'px';
    el.style.fontSize = (10 + Math.random() * 10) + 'px';

    document.body.appendChild(el);
    setTimeout(() => el.remove(), 700);
}


/* Add to your script.js */
function initCarousel(trackId, dotsId) {
    let currentSlide = 0;
    const track = document.getElementById(trackId);
    const slides = document.querySelectorAll(`#${trackId} .carousel-slide`);
    const dotsWrap = document.getElementById(dotsId);

    // Build dots
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'car-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(i);
        dotsWrap.appendChild(dot);
    });

    function goToSlide(index) {
        currentSlide = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        document.querySelectorAll(`#${dotsId} .car-dot`).forEach((d, i) => {
            d.classList.toggle('active', i === currentSlide);
        });
    }

    function moveCarousel(dir) {
        goToSlide(currentSlide + dir);
    }

    // Auto-play every 4 seconds
    //setInterval(() => moveCarousel(1), 4000);

    // Swipe support for mobile
    let touchStartX = 0;
    track.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
    track.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) moveCarousel(diff > 0 ? 1 : -1);
    });

    // Expose moveCarousel to global scope for button clicks
    const carouselNum = trackId.slice(-1);
    window[`moveCarousel${carouselNum}`] = moveCarousel;
}

// Initialize the three carousels
initCarousel('carousel-track1', 'car-dots1');
initCarousel('carousel-track2', 'car-dots2');
initCarousel('carousel-track3', 'car-dots3');