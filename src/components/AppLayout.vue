<template>
  <div class="app-layout">
    <header class="main-header">
      <div class="header-container">
        <div class="logo">
          <strong>Toko</strong><span>Game</span>
        </div>

        <nav class="main-nav">
          <router-link to="/">Beranda</router-link>
          <router-link v-if="authStore.userRole === 'admin'" to="/games">
            Katalog Admin
          </router-link>
          <router-link v-else to="/katalog-pengguna">
            Katalog Game
          </router-link>
          <router-link to="/promo">Promo</router-link>
        </nav>

        <div class="header-actions">
          <router-link to="/cart" class="nav-link cart-link">
            Keranjang
            <span v-if="cartStore.itemCount > 0" class="cart-count-text">
              ({{ cartStore.itemCount }})
            </span>
          </router-link>

          <router-link v-if="!authStore.isAuthenticated" to="/login" class="btn btn-primary">
            Masuk
          </router-link>
          <button v-else @click="authStore.logout()" class="btn btn-secondary">
            Keluar
          </button>
        </div>
        </div>
    </header>

    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore.js';

const authStore = useAuthStore();
const cartStore = useCartStore();
</script>

<style scoped>
.main-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  padding: 0.75rem 0;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.header-container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
}

.logo strong {
  font-weight: 700;
  color: #C62828;
}

.logo span {
  font-weight: 300;
}

.main-nav a, .cart-link {
  margin: 0 1rem;
  font-weight: 500;
  color: #333;
  transition: color 0.3s ease;
  padding-bottom: 5px;
  border-bottom: 2px solid transparent;
  text-decoration: none; /* Menghilangkan garis bawah dari router-link */
}

.main-nav a:hover,
.main-nav a.router-link-exact-active,
.cart-link:hover {
  color: #C62828;
  border-bottom-color: #C62828;
}

.cart-count-text {
  font-weight: 600;
  margin-left: 4px;
}

main {
  padding-top: 1rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  border: none;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.btn-secondary:hover {
  background-color: #5a6268;
}
</style>