<template>
  <div class="games-view container">
    <div class="view-header">
      <h1>Katalog Admin</h1>
      <button @click="openAddDialog" class="btn btn-primary">
        <span class="icon">+</span> Tambah Game Baru
      </button>
    </div>

    <div v-if="gameStore.loading && !isDialogVisible" class="loading-message">
      Memuat data game...
    </div>
    <div v-else-if="gameStore.error" class="error-message">
      {{ gameStore.error }}
    </div>

    <div v-else class="table-container">
      <table class="games-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Game</th>
            <th>Genre</th>
            <th>Harga</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="game in gameStore.games" :key="game.id">
            <td>{{ game.id }}</td>
            <td>
              <div class="game-info">
                <img :src="game.image" :alt="game.name" class="game-image-thumbnail">
                <span>{{ game.name }}</span>
              </div>
            </td>
            <td>{{ game.genre }}</td>
            <td>{{ formatPrice(game.price) }}</td>
            <td>
              <div class="action-buttons">
                <button @click="openEditDialog(game)" class="btn-icon btn-edit">✎</button>
                <button @click="handleDelete(game.id)" class="btn-icon btn-delete">🗑</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="isDialogVisible" class="dialog-overlay">
      <div class="dialog-content">
        <h2>{{ isEditMode ? 'Edit Game' : 'Tambah Game Baru' }}</h2>
        <form @submit.prevent="handleFormSubmit">
          <div class="form-group">
            <label for="name">Nama Game</label>
            <input type="text" id="name" v-model="activeGame.name" required>
          </div>
          <div class="form-group">
            <label for="genre">Genre</label>
            <input type="text" id="genre" v-model="activeGame.genre" required>
          </div>
          <div class="form-group">
            <label for="price">Harga</label>
            <input type="number" id="price" v-model.number="activeGame.price" required>
          </div>
          <div class="form-group">
            <label for="image">URL Gambar</label>
            <input type="text" id="image" v-model="activeGame.image" required>
          </div>
          <div class="form-actions">
            <button type="button" @click="closeDialog" class="btn-secondary">Batal</button>
            <button type="submit" class="btn-primary" :disabled="gameStore.loading">
              {{ gameStore.loading ? 'Menyimpan...' : 'Simpan' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useGameStore } from '@/stores/gameStore.js';

const gameStore = useGameStore();
const isDialogVisible = ref(false);
const isEditMode = ref(false);

const initialGameState = { name: '', genre: '', price: 0, image: '' };
const activeGame = ref({ ...initialGameState });


const openAddDialog = () => {
  isEditMode.value = false;
  activeGame.value = { ...initialGameState };
  isDialogVisible.value = true;
};


const openEditDialog = (game) => {
  isEditMode.value = true;
  activeGame.value = { ...game };
  isDialogVisible.value = true;
};

const closeDialog = () => {
  isDialogVisible.value = false;
};


const handleFormSubmit = async () => {
  if (isEditMode.value) {
    await gameStore.updateGame(activeGame.value);
  } else {
    await gameStore.addGame(activeGame.value);
  }
  
  if (!gameStore.error) {
    closeDialog();
  }
};

const handleDelete = (gameId) => {
  if (confirm('Apakah Anda yakin ingin menghapus game ini?')) {
    gameStore.deleteGame(gameId);
  }
};

const formatPrice = (value) => {
  if (typeof value !== 'number') return '';
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
.games-view {
  padding: 1rem 0;
}

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.view-header h1 {
  margin: 0;
}

.view-header .btn .icon {
  margin-right: 0.5rem;
}

.table-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

.games-table {
  width: 100%;
  border-collapse: collapse;
}

.games-table th, .games-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.games-table thead th {
  background-color: #f9f9f9;
  font-weight: 600;
}

.game-info {
  display: flex;
  align-items: center;
}

.game-image-thumbnail {
  width: 40px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 1rem;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.btn-edit {
  color: #1e88e5; /* Biru */
}
.btn-edit:hover {
  background-color: #e3f2fd;
}

.btn-delete {
  color: #e53935; /* Merah */
}
.btn-delete:hover {
  background-color: #ffebee;
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

/* STYLE UNTUK DIALOG/MODAL */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.dialog-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(200, 9, 9, 0.3);
}

.dialog-content h2 {
  margin-top: 0;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn-primary, .btn-secondary {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
}
.btn-primary {
  background-color: #03A791;
  color: white;
}
.btn-secondary {
  background-color: #e0e0e0;
  color: #333;
}
</style>