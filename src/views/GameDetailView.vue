<template>
  <div class="game-detail-view container">
    <div v-if="loading" class="loading-message">Memuat data...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    
    <div v-else-if="game" class="game-content">
      <div class="image-container">
        <img :src="game.image" :alt="game.name" class="game-image">
      </div>
      <div class="info-container">
        <span class="genre-chip">{{ game.genre }}</span>
        <h1>{{ game.name }}</h1>
        <p class="description">{{ game.description }}</p>
        <div class="price">{{ formatPrice(game.price) }}</div>
        <button @click="addToCart" class="btn btn-primary add-to-cart-btn">Tambah ke Keranjang</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '@/stores/cartStore.js'; // Import cart store
import axios from 'axios';

const route = useRoute();
const cartStore = useCartStore(); // Inisialisasi cart store

const game = ref(null);
const loading = ref(true);
const error = ref(null);

// Fungsi untuk menambahkan item ke keranjang
const addToCart = () => {
  if (game.value) {
    cartStore.addItem(game.value);
    alert(`${game.value.name} telah ditambahkan ke keranjang!`);
  }
};

const formatPrice = (value) => {
  if (!value) return '';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};

onMounted(async () => {
  const gameId = route.params.id;
  try {
    const response = await axios.get(`http://localhost:3000/games/${gameId}`);
    game.value = response.data;
  } catch (err) {
    error.value = 'Gagal memuat data game. Mungkin game tidak ditemukan.';
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.game-detail-view {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.game-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}
.image-container .game-image {
  width: 100%;
  border-radius: 8px;
}
.info-container h1 {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}
.genre-chip {
  display: inline-block;
  background-color: #f0f0f0;
  color: #555;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.9rem;
}
.description {
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
}
.price {
  font-size: 2rem;
  font-weight: 700;
  color: #C62828;
  margin: 1.5rem 0;
}
.add-to-cart-btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}
.loading-message, .error-message {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #555;
}
.error-message {
  color: #C62828;
}
</style>