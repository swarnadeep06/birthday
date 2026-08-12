const app = Vue.createApp({
  data() {
    return {
      name: '',
      customText: '',
      pageTitle: 'Happy Birthday!',
    };
  },
  computed: {
    displayName() {
      return this.name.trim() || 'Someone special';
    },
    wishText() {
      if (this.customText.trim()) {
        return this.customText.trim();
      }
      return `Wishing you a beautiful day full of joy, laughter, and all your favorite things.`;
    },
  },
  methods: {
    generateWish() {
      this.pageTitle = `Happy Birthday, ${this.displayName}!`;
      const params = new URLSearchParams({ name: this.name, message: this.customText });
      window.history.replaceState(null, '', `?${params.toString()}`);
    },
    resetForm() {
      this.name = '';
      this.customText = '';
      this.pageTitle = 'Happy Birthday!';
      window.history.replaceState(null, '', window.location.pathname);
    },
    loadFromQuery() {
      const params = new URLSearchParams(window.location.search);
      if (params.has('name')) {
        this.name = params.get('name');
      }
      if (params.has('message')) {
        this.customText = params.get('message');
      }
      if (this.name.trim()) {
        this.pageTitle = `Happy Birthday, ${this.displayName}!`;
      }
    },
  },
  mounted() {
    this.loadFromQuery();
  },
});

app.mount('#app');
