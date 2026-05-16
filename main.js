/* ===========================
   ANJNEYA TECH — main.js
   =========================== */

// ─── NAV SCROLL ───
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

hamburger.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});

navMobile.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navMobile.classList.remove('open'));
});

// ─── PIXEL GRID (2048 visual) ───
const TILE_COLORS = {
  2:    '#eee4da', 4:    '#ede0c8', 8:    '#f2b179',
  16:   '#f59563', 32:   '#f67c5f', 64:   '#f65e3b',
  128:  '#edcf72', 256:  '#edcc61', 512:  '#edc850',
  1024: '#edc53f', 2048: '#edc22e',
};
const TILE_VALUES = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];

function getRandomTiles() {
  const vals = [];
  for (let i = 0; i < 16; i++) {
    const v = TILE_VALUES[Math.floor(Math.random() * 8)];
    vals.push(v);
  }
  return vals;
}

function buildPixelGrid() {
  const grid = document.getElementById('pixelGrid');
  if (!grid) return;
  const tiles = getRandomTiles();
  grid.innerHTML = '';
  tiles.forEach(val => {
    const cell = document.createElement('div');
    cell.className = 'pixel-cell';
    cell.style.background = TILE_COLORS[val] || '#cdc1b4';
    cell.style.color = val <= 4 ? '#776e65' : '#f9f6f2';
    cell.textContent = val;
    grid.appendChild(cell);
  });
}

buildPixelGrid();
setInterval(() => {
  const cells = document.querySelectorAll('.pixel-cell');
  const idx = Math.floor(Math.random() * 16);
  const val = TILE_VALUES[Math.floor(Math.random() * 8)];
  if (cells[idx]) {
    cells[idx].style.background = TILE_COLORS[val] || '#cdc1b4';
    cells[idx].style.color = val <= 4 ? '#776e65' : '#f9f6f2';
    cells[idx].textContent = val;
    cells[idx].style.transform = 'scale(1.15)';
    setTimeout(() => { cells[idx].style.transform = ''; }, 200);
  }
}, 900);

// ─── STAT COUNTER ───
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1600;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(update);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(animateCounter);
      observer.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) observer.observe(statsSection);

// ─── TAP REFLEX RUSH DEMO ───
const EMOJIS = ['🔴','🟡','🟢','🔵','🟠','🟣'];
const GAME_DURATION = 20; // seconds
let gameState = { active: false, score: 0, combo: 0, timeLeft: GAME_DURATION, timer: null, barTimer: null };

const startBtn = document.getElementById('startDemo');
const restartBtn = document.getElementById('restartDemo');
const demoIdle = document.getElementById('demoIdle');
const demoPlaying = document.getElementById('demoPlaying');
const demoResult = document.getElementById('demoResult');
const demoScoreEl = document.getElementById('demoScore');
const targetsArea = document.getElementById('targetsArea');
const comboDisplay = document.getElementById('comboDisplay');
const timerBar = document.getElementById('timerBar');
const resultEmoji = document.getElementById('resultEmoji');
const resultText = document.getElementById('resultText');
const resultScore = document.getElementById('resultScore');

function startGame() {
  gameState = { active: true, score: 0, combo: 0, timeLeft: GAME_DURATION };
  demoIdle.style.display = 'none';
  demoResult.style.display = 'none';
  demoPlaying.style.display = 'block';
  updateScore();
  spawnTargets();
  startTimer();
}

function startTimer() {
  let elapsed = 0;
  const interval = 100;
  gameState.barTimer = setInterval(() => {
    elapsed += interval;
    const pct = (1 - elapsed / (GAME_DURATION * 1000)) * 100;
    timerBar.style.width = Math.max(0, pct) + '%';
    if (elapsed >= GAME_DURATION * 1000) {
      clearInterval(gameState.barTimer);
      endGame();
    }
  }, interval);
}

function spawnTargets() {
  if (!gameState.active) return;
  targetsArea.innerHTML = '';
  const count = Math.min(3 + Math.floor((GAME_DURATION - gameState.timeLeft) / 5), 6);
  const shuffled = [...EMOJIS].sort(() => Math.random() - 0.5).slice(0, Math.max(2, count));
  const target = shuffled[Math.floor(Math.random() * shuffled.length)];

  shuffled.forEach(emoji => {
    const btn = document.createElement('button');
    btn.className = 'target-btn';
    btn.textContent = emoji;
    btn.style.background = `hsl(${Math.random()*360}, 60%, 45%)`;
    btn.addEventListener('click', () => handleTap(emoji === target, target));
    targetsArea.appendChild(btn);
  });

  // Show the target hint
  comboDisplay.textContent = `Tap → ${target}`;
}

function handleTap(correct, target) {
  if (!gameState.active) return;
  if (correct) {
    gameState.combo++;
    const points = 10 * Math.min(gameState.combo, 5);
    gameState.score += points;
    comboDisplay.textContent = gameState.combo >= 3 ? `🔥 x${gameState.combo} COMBO! +${points}` : `✅ +${points}`;
    comboDisplay.style.color = gameState.combo >= 3 ? 'var(--accent2)' : 'var(--accent)';
  } else {
    gameState.combo = 0;
    comboDisplay.textContent = '❌ Wrong!';
    comboDisplay.style.color = '#ff4444';
  }
  updateScore();
  setTimeout(spawnTargets, 300);
}

function updateScore() {
  demoScoreEl.textContent = `Score: ${gameState.score}`;
}

function endGame() {
  gameState.active = false;
  demoPlaying.style.display = 'none';
  demoResult.style.display = 'block';

  const s = gameState.score;
  if (s >= 300) { resultEmoji.textContent = '🏆'; resultText.textContent = 'Legendary!'; }
  else if (s >= 150) { resultEmoji.textContent = '⭐'; resultText.textContent = 'Amazing!'; }
  else if (s >= 80) { resultEmoji.textContent = '😎'; resultText.textContent = 'Nice work!'; }
  else { resultEmoji.textContent = '😅'; resultText.textContent = 'Keep trying!'; }
  resultScore.textContent = `You scored ${s} points`;
}

if (startBtn) startBtn.addEventListener('click', startGame);
if (restartBtn) restartBtn.addEventListener('click', () => {
  clearInterval(gameState.barTimer);
  startGame();
});

// ─── CONTACT FORM ───
function handleForm(e) {
  e.preventDefault();
  const success = document.getElementById('formSuccess');
  success.style.display = 'block';
  e.target.reset();
  setTimeout(() => { success.style.display = 'none'; }, 5000);
}

// ─── SCROLL REVEAL ───
const revealEls = document.querySelectorAll('.game-card, .about-grid, .stat-item, .contact-grid');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});
