const app = Vue.createApp({
  data() {
    return {
      pageTitle: 'Happy birthday Tithi lol 🎉',
      countdownText: 'Loading...',
      messageInput: '',
      messages: [],
      youtubeUrl: 'https://www.youtube.com/embed/2OEL4P1Rz04?controls=1&rel=0',
    };
  },
  methods: {
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
    addMessage() {
      const text = this.messageInput.trim();
      if (!text) return;
      this.messages.unshift(text);
      this.messageInput = '';
    },
  },
  mounted() {
    this.updateCountdown();
    setInterval(this.updateCountdown, 1000);
  },
});

app.mount('#app');
