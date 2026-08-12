const countdownText = document.getElementById('countdownText');
const messageInput = document.getElementById('messageInput');
const addMessageButton = document.getElementById('addMessageButton');
const messageList = document.getElementById('messageList');

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

function addMessage() {
  const text = messageInput.value.trim();
  if (!text) return;
  const chip = document.createElement('div');
  chip.className = 'message-chip';
  chip.textContent = text;
  messageList.prepend(chip);
  messageInput.value = '';
  addMessageButton.disabled = true;
}

messageInput.addEventListener('input', () => {
  addMessageButton.disabled = messageInput.value.trim().length === 0;
});

addMessageButton.addEventListener('click', addMessage);

updateCountdown();
setInterval(updateCountdown, 1000);
