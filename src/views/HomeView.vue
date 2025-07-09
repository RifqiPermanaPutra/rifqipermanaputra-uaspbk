<template>
  <div class="home-view">
    <section class="hero-slider">
      <div class="slider-container">
        <transition name="fade" mode="out-in">
          <div class="slide" :key="currentSlideIndex">
            <img :src="slides[currentSlideIndex].image" :alt="slides[currentSlideIndex].alt" class="slide-image" />
            <div class="hero-text">
              <h1>{{ slides[currentSlideIndex].title }}</h1>
              <p>{{ slides[currentSlideIndex].subtitle }}</p>
              <router-link :to="slides[currentSlideIndex].link" class="btn btn-primary">
                {{ slides[currentSlideIndex].buttonText }}
              </router-link>
            </div>
          </div>
        </transition>
        <button @click="prevSlide" class="slider-nav prev">&#10094;</button>
        <button @click="nextSlide" class="slider-nav next">&#10095;</button>
      </div>
    </section>

    <section class="popular-games-section container">
      <h2>Game Populer</h2>
      <div v-if="gameStore.loading" class="loading-message">Memuat data game...</div>
      <div v-else-if="gameStore.error" class="error-message">{{ gameStore.error }}</div>
      <div v-else class="games-grid">
        <div v-for="game in gameStore.games" :key="game.id" class="game-card-modern">
          <router-link :to="'/game/' + game.id" class="game-card-link">
            <img :src="game.image" :alt="game.name" class="card-image" />
            <div class="card-content">
              <span class="genre-chip">{{ game.genre }}</span>
              <h3 class="game-name">{{ game.name }}</h3>
              <div class="game-price">{{ formatPrice(game.price) }}</div>
            </div>
          </router-link>
          <div class="card-actions">
            <button @click="addToCartAndNavigate(game)" class="btn-buy">Beli Sekarang</button>
            <router-link :to="'/game/' + game.id" class="btn-detail">
              Detail
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useGameStore } from '@/stores/gameStore.js';
import { useCartStore } from '@/stores/cartStore.js';
import { useRouter } from 'vue-router';


const gameStore = useGameStore();
const cartStore = useCartStore();
const router = useRouter();


const addToCartAndNavigate = (game) => {
  cartStore.addItem(game);
  router.push('/cart');
};


const slides = ref([
  { image: 'https://image.api.playstation.com/vulcan/ap/rnd/202311/2812/ae84720b553c4ce943e9c342621b60f198beda0dbf533e21.jpg', alt: 'Game Sale', title: 'Selamat Datang di Informasi Seputar Game', subtitle: 'Temukan dan beli game favoritmu dengan harga terbaik.', buttonText: 'Lihat Katalog', link: '/katalog-pengguna' },
  { image: 'https://www.chromethemer.com/download/hd-wallpapers/ghost-of-tsushima-3840x2160.jpg', alt: 'New Games', title: 'Promo Game Terbaru', subtitle: 'Dapatkan diskon menarik untuk game-game pilihan.', buttonText: 'Lihat Promo', link: '/promo' },
  { image: 'https://gaming-cdn.com/images/products/14352/orig/metaphor-refantazio-pc-game-steam-europe-cover.jpg?v=1728921586', alt: 'Best Sellers', title: 'Game Terlaris Minggu Ini', subtitle: 'Jangan lewatkan game-game yang sedang populer.', buttonText: 'Jelajahi Sekarang', link: '/katalog-pengguna' },
  { image: 'https://images4.alphacoders.com/137/thumb-1920-1370601.jpeg'},
  { image: 'https://images4.alphacoders.com/137/thumb-1920-1370601.jpeg'}
]);

const currentSlideIndex = ref(0);
let slideInterval = null;
const nextSlide = () => { currentSlideIndex.value = (currentSlideIndex.value + 1) % slides.value.length; };
const prevSlide = () => { currentSlideIndex.value = (currentSlideIndex.value - 1 + slides.value.length) % slides.value.length; };


const formatPrice = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};

onMounted(() => {
  gameStore.fetchGames();
  slideInterval = setInterval(nextSlide, 5000);
});

onUnmounted(() => {
  clearInterval(slideInterval);
});
</script>

<style scoped>
.game-card-link { text-decoration: none; color: inherit; display: block; }

.hero-slider { position: relative; height: 50vh; max-height: 450px; background-color: #222; color: #FAF7F3; margin-bottom: 2rem; }
.slider-container { width: 100%; height: 100%; }
.slide { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
.slide-image { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.6); }
.hero-text { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; width: 80%; }
.hero-text h1 { margin-top: 0; font-size: 2.5rem; font-weight: 700; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); }
.slider-nav { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(0, 0, 0, 0.3); color: white; border: none; padding: 0.75rem; cursor: pointer; font-size: 1.5rem; z-index: 10; transition: background-color 0.3s; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; }
.slider-nav:hover { background: rgba(0, 0, 0, 0.6); }
.prev { left: 1rem; }
.next { right: 1rem; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.8s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.popular-games-section { padding-bottom: 2rem; }
.popular-games-section h2 { text-align: center; font-size: 2rem; margin-bottom: 2rem; }
.games-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem; }
.game-card-modern { background-color: #fff; border-radius: 16px; box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.15); transition: all 0.3s ease-in-out; overflow: hidden; display: flex; flex-direction: column; height: 100%; }
.game-card-modern:hover { transform: translateY(-10px); box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.2); }
.card-image { width: 100%; aspect-ratio: 3 / 4; object-fit: cover; transition: transform 0.4s ease; }
.game-card-modern:hover .card-image { transform: scale(1.05); }
.card-content { padding: 1rem; flex-grow: 1; }
.genre-chip { display: inline-block; background-color: #f0f0f0; color: #555; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.75rem; margin-bottom: 0.5rem; }
.game-name { font-size: 1.1rem; font-weight: 600; margin: 0.5rem 0; }
.game-price { font-size: 1.25rem; font-weight: 700; color: #102E50; }
.card-actions { padding: 0 1rem 1rem 1rem; display: flex; justify-content: space-between; align-items: center; }
.btn-buy { background-color: #B8001F; color: white; border: none; padding: 0.6rem 1rem; border-radius: 8px; cursor: pointer; font-weight: 500; flex-grow: 1; margin-right: 0.5rem; }
.btn-detail { font-size: 0.9rem; font-weight: 500; color: #c00b0b; text-decoration: none; padding: 0.6rem; border-radius: 8px; transition: background-color 0.2s; }
.btn-detail:hover { background-color: #f0f0f0; }
.loading-message, .error-message { text-align: center; padding: 2rem; font-size: 1.2rem; color: #555; }
.error-message { color: #C62828; }
</style>