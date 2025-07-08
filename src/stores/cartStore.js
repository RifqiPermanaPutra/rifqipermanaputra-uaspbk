import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  // STATE: Menyimpan daftar item di keranjang
  state: () => ({
    // Mengambil item dari localStorage saat pertama kali dimuat agar keranjang tidak hilang saat refresh
    items: JSON.parse(localStorage.getItem('cartItems')) || [],
  }),

  // GETTERS: Menghitung data turunan dari state
  getters: {
    // Menghitung jumlah total item di keranjang
    itemCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
    // Menghitung total harga
    totalPrice: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
  },

  // ACTIONS: Fungsi untuk memodifikasi state
  actions: {
    // Fungsi untuk menambahkan game ke keranjang
    addItem(game) {
      // Cari apakah game sudah ada di keranjang
      const existingItem = this.items.find(item => item.id === game.id);

      if (existingItem) {
        // Jika sudah ada, cukup tambahkan jumlahnya (quantity)
        existingItem.quantity++;
      } else {
        // Jika belum ada, tambahkan sebagai item baru dengan quantity: 1
        this.items.push({ ...game, quantity: 1 });
      }

      // Simpan perubahan ke localStorage
      this.saveCartToLocalStorage();
    },

    // Fungsi untuk menghapus item dari keranjang
    removeItem(gameId) {
      this.items = this.items.filter(item => item.id !== gameId);
      this.saveCartToLocalStorage();
    },
    
    // Fungsi untuk menyimpan keranjang ke localStorage
    saveCartToLocalStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.items));
    },

    // Fungsi untuk mengosongkan keranjang
    clearCart() {
      this.items = [];
      this.saveCartToLocalStorage();
    }
  },
});