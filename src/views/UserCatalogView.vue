<template>
  <div class="user-catalog-view container">
    <div class="view-header">
      <h1>Katalog Game Kami</h1>
      <p>Jelajahi semua game yang tersedia di toko kami.</p>
    </div>

    <div v-if="gameStore.loading" class="loading-message">Memuat data game...</div>
    <div v-else-if="gameStore.error" class="error-message">{{ gameStore.error }}</div>

    <div v-else class="games-grid">
      <div v-for="game in gameStore.games" :key="game.id" class="game-card-modern">
        <img :src="game.image" :alt="game.name" class="card-image" />
        <div class="card-content">
          <span class="genre-chip">{{ game.genre }}</span>
          <h3 class="game-name">{{ game.name }}</h3>
          <div class="game-price">{{ formatPrice(game.price) }}</div>
        </div>
        <div class="card-actions">
          <button class="btn-buy">Beli Sekarang</button>
          <router-link :to="'/game/' + game.id" class="btn-detail">
            Detail
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useGameStore } from '@/stores/gameStore.js';

const gameStore = useGameStore();

const formatPrice = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};

onMounted(() => {
  if (gameStore.games.length === 0) {
    gameStore.fetchGames();
  }
});
</script>

<style scoped>
.container { padding-bottom: 2rem; }
.view-header { text-align: center; margin-bottom: 2rem; }
.view-header h1 { margin-bottom: 0.5rem; }
.view-header p { font-size: 1.1rem; color: #666; }
.games-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem; }
.game-card-modern { background-color: #fff; border-radius: 16px; box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.15); transition: all 0.3s ease-in-out; overflow: hidden; display: flex; flex-direction: column; height: 100%; }
.game-card-modern:hover { transform: translateY(-10px); box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.2); }
.card-image { width: 100%; aspect-ratio: 3 / 4; object-fit: cover; transition: transform 0.4s ease; }
.game-card-modern:hover .card-image { transform: scale(1.05); }
.card-content { padding: 1rem; flex-grow: 1; }
.genre-chip { display: inline-block; background-color: #f0f0f0; color: #555; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.75rem; margin-bottom: 0.5rem; }
.game-name { font-size: 1.1rem; font-weight: 600; margin: 0.5rem 0; }
.game-price { font-size: 1.25rem; font-weight: 700; color: #C62828; }
.card-actions { padding: 0 1rem 1rem 1rem; display: flex; justify-content: space-between; align-items: center; }
.btn-buy { background-color: #C62828; color: white; border: none; padding: 0.6rem 1rem; border-radius: 8px; cursor: pointer; font-weight: 500; flex-grow: 1; margin-right: 0.5rem; }
.btn-detail { font-size: 0.9rem; font-weight: 500; color: #555; text-decoration: none; padding: 0.6rem; border-radius: 8px; transition: background-color 0.2s; }
.btn-detail:hover { background-color: #f0f0f0; }
.loading-message, .error-message { text-align: center; padding: 2rem; font-size: 1.2rem; color: #555; }
.error-message { color: #C62828; }
</style>