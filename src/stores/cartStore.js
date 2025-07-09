import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  
  state: () => ({
    
    items: JSON.parse(localStorage.getItem('cartItems')) || [],
  }),

  
  getters: {
    
    itemCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
    
    totalPrice: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
  },

  
  actions: {
    
    addItem(game) {
      
      const existingItem = this.items.find(item => item.id === game.id);

      if (existingItem) {
        
        existingItem.quantity++;
      } else {
        
        this.items.push({ ...game, quantity: 1 });
      }

      
      this.saveCartToLocalStorage();
    },

    
    removeItem(gameId) {
      this.items = this.items.filter(item => item.id !== gameId);
      this.saveCartToLocalStorage();
    },
    
    
    saveCartToLocalStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.items));
    },

    
    clearCart() {
      this.items = [];
      this.saveCartToLocalStorage();
    }
  },
});