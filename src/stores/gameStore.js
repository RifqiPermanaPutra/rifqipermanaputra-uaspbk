import { defineStore } from 'pinia';
import axios from 'axios';

export const useGameStore = defineStore('game', {
  state: () => ({
    games: [],
    loading: false,
    error: null,
  }),

  getters: {
    totalGames: (state) => state.games.length,
  },

  actions: {
    async fetchGames() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:3000/games');
        this.games = response.data;
      } catch (err) {
        this.error = 'Gagal mengambil data game. Pastikan server API sudah berjalan.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async addGame(newGame) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post('http://localhost:3000/games', newGame);
        this.games.push(response.data);
      } catch (err) {
        this.error = 'Gagal menambahkan game baru.';
      } finally {
        this.loading = false;
      }
    },
    
    async updateGame(updatedGame) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.put(`http://localhost:3000/games/${updatedGame.id}`, updatedGame);
        const index = this.games.findIndex(game => game.id === updatedGame.id);
        if (index !== -1) {
          this.games[index] = response.data;
        }
      } catch (err) {
        this.error = 'Gagal mengupdate game.';
      } finally {
        this.loading = false;
      }
    },
    
    async deleteGame(gameId) {
      this.loading = true;
      this.error = null;
      try {
        await axios.delete(`http://localhost:3000/games/${gameId}`);
        this.games = this.games.filter(game => game.id !== gameId);
      } catch (err) {
        this.error = 'Gagal menghapus game.';
      } finally {
        this.loading = false;
      }
    },
  },
});