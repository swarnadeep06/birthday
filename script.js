const app = Vue.createApp({
  data() {
    return {
      pageTitle: 'Happy birthday Tithi on your 19th birthday',
      countdownText: 'Loading...',
      hiddenMessage: 'THANKS FOR BEING THE KINDEST SOUL I EVER MADE IN ONE LETTER',
      letters: [],
      bloomPulse: false,
    };
  },
  computed: {
    revealedCount() {
      return this.letters.filter((letter) => letter.revealed).length;
    },
    revealedPreview() {
      return this.letters
        .map((letter) => (letter.char === ' ' ? ' ' : letter.revealed ? letter.char : '•'))
        .join('');
    },
  },
  methods: {
    initLetters() {
      this.letters = Array.from(this.hiddenMessage).map((char) => ({ char, revealed: char === ' ' }));
    },
    revealLetter(index) {
      const letter = this.letters[index];
      if (!letter || letter.revealed || letter.char === ' ') {
        return;
      }
      letter.revealed = true;
      this.flashBloom();
    },
    flashBloom() {
      this.bloomPulse = false;
      requestAnimationFrame(() => {
        this.bloomPulse = true;
        setTimeout(() => {
          this.bloomPulse = false;
        }, 450);
      });
    },
    updateCountdown() {
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
      this.countdownText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    },
    touchBloom() {
      this.flashBloom();
    },
  },
  mounted() {
    this.initLetters();
    this.updateCountdown();
    setInterval(this.updateCountdown, 1000);
  },
});

app.mount('#app');
