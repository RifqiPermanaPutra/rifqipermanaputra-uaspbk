import { defineStore } from 'pinia';
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://shuocqlvoecsyqpuxgfd.supabase.co';    
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNodW9jcWx2b2Vjc3lxcHV4Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNDg4NTEsImV4cCI6MjA2NzcyNDg1MX0.PFsZedgX_kJAiFpnrcvbkqlUM_txCVjfwj2WYejgBPQ';      // <-- GANTI DENGAN KUNCI ANON ANDA

const supabase = createClient(supabaseUrl, supabaseKey);

export const useGameStore = defineStore('game', {
  state: () => ({
    games: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchGames() {
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await supabase.from('games').select('*');
        if (error) throw error;
        this.games = data;
      } catch (err) {
        this.error = 'Gagal mengambil data game dari server.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async addGame(newGame) {
      this.loading = true;
      this.error = null;
      try {
        const { id, ...gameData } = newGame;
        const { data, error } = await supabase.from('games').insert([gameData]).select();
        if (error) throw error;
        this.games.push(data[0]);
      } catch (err) {
        this.error = 'Gagal menambahkan game.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async updateGame(updatedGame) {
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await supabase.from('games').update(updatedGame).eq('id', updatedGame.id).select();
        if (error) throw error;
        const index = this.games.findIndex(g => g.id === updatedGame.id);
        if (index !== -1) this.games[index] = data[0];
      } catch (err) {
        this.error = 'Gagal mengupdate game.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async deleteGame(gameId) {
      this.loading = true;
      this.error = null;
      try {
        const { error } = await supabase.from('games').delete().eq('id', gameId);
        if (error) throw error;
        this.games = this.games.filter(g => g.id !== gameId);
      } catch (err) {
        this.error = 'Gagal menghapus game.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
});