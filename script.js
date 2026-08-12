const countdownText = document.getElementById('countdownText');
const playAudioButton = document.getElementById('playAudioButton');
const birthdayAudio = document.getElementById('birthdayAudio');
const revealButtons = document.querySelectorAll('.reveal-button');

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

function toggleHiddenNote(event) {
  const button = event.currentTarget;
  const targetId = button.dataset.target;
  const note = document.getElementById(targetId);
  if (!note) return;
  const isHidden = note.hidden;
  note.hidden = !isHidden;
  button.textContent = isHidden ? 'Hide' : 'Reveal';
  button.setAttribute('aria-expanded', String(isHidden));
}

function playAudio() {
  if (birthdayAudio.paused) {
    birthdayAudio.play().catch(() => {});
  }
}

revealButtons.forEach((button) => button.addEventListener('click', toggleHiddenNote));
playAudioButton.addEventListener('click', playAudio);

updateCountdown();
setInterval(updateCountdown, 1000);
