const countdownText = document.getElementById('countdownText');
const revealButtons = document.querySelectorAll('.reveal-button');
const letterGrid = document.getElementById('letterGrid');
const previewText = document.getElementById('previewText');

const hiddenPhrase = 'HAPPY 19TH BIRTHDAY TITHI';
const phraseLetters = Array.from(hiddenPhrase).map((char) => ({ char, revealed: false }));
let audioContext = null;

function playRevealSound() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;

  if (!audioContext) {
    audioContext = new AudioCtx();
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  const now = audioContext.currentTime;
  const primaryOsc = audioContext.createOscillator();
  const secondOsc = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  primaryOsc.type = 'sine';
  primaryOsc.frequency.setValueAtTime(392, now);
  secondOsc.type = 'sine';
  secondOsc.frequency.setValueAtTime(523.25, now);

  gainNode.gain.setValueAtTime(0.0001, now);
  gainNode.gain.exponentialRampToValueAtTime(0.022, now + 0.03);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);

  primaryOsc.connect(gainNode);
  secondOsc.connect(gainNode);
  gainNode.connect(audioContext.destination);

  primaryOsc.start(now);
  secondOsc.start(now);
  primaryOsc.stop(now + 0.42);
  secondOsc.stop(now + 0.42);
}

function updateCountdown() {
  const now = new Date();
  let target = new Date(now.getFullYear(), 7, 14, 0, 0, 0);
  if (now >= target) {
    target = new Date(now.getFullYear() + 1, 7, 14, 0, 0, 0);
  }
  const diff = target - now;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  countdownText.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function buildLetterGrid() {
  letterGrid.innerHTML = '';
  phraseLetters.forEach((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'letter-box';
    button.textContent = item.revealed ? item.char : '';
    button.dataset.index = String(index);
    button.style.animationDelay = `${index * 60}ms`;
    if (item.char === ' ') {
      button.classList.add('letter-space');
      button.disabled = true;
    }
    button.addEventListener('click', revealLetter);
    letterGrid.appendChild(button);
  });
  updatePreview();
}

function revealLetter(event) {
  const index = Number(event.currentTarget.dataset.index);
  const item = phraseLetters[index];
  if (!item || item.char === ' ') return;

  item.revealed = true;
  event.currentTarget.textContent = item.char;
  event.currentTarget.classList.add('revealed');
  playRevealSound();
  updatePreview();
}

function updatePreview() {
  const preview = phraseLetters
    .map((item) => (item.char === ' ' ? ' ' : item.revealed ? item.char : '•'))
    .join('');
  previewText.textContent = preview;
}

function toggleHiddenNote(event) {
  const button = event.currentTarget;
  if (button.dataset.locked === 'true') return;

  const targetId = button.dataset.target;
  const note = document.getElementById(targetId);
  if (!note) return;

  const isOpen = note.hidden;
  note.hidden = !isOpen;
  note.classList.toggle('is-open', isOpen);
  button.textContent = isOpen ? 'Close tile' : 'Open tile';
  button.setAttribute('aria-expanded', String(isOpen));
  playRevealSound();
}

revealButtons.forEach((button) => button.addEventListener('click', toggleHiddenNote));

document.addEventListener('DOMContentLoaded', () => {
  buildLetterGrid();
  updateCountdown();
  setInterval(updateCountdown, 1000);
});
