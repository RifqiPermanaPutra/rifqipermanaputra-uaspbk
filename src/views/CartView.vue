<template>
  <div class="cart-view container">
    <h1>Keranjang Belanja Anda</h1>

    <div v-if="cartStore.itemCount === 0" class="empty-cart">
      <p>Keranjang Anda masih kosong.</p>
      <router-link to="/katalog-pengguna" class="btn btn-primary">Mulai Belanja</router-link>
    </div>

    <div v-else class="cart-content">
      <div class="cart-items">
        <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.name" class="item-image">
          <div class="item-info">
            <h3>{{ item.name }}</h3>
            <p>{{ formatPrice(item.price) }}</p>
            <div class="item-platforms">
              <a 
                v-for="platform in item.platforms" 
                :key="platform.name" 
                :href="platform.url" 
                target="_blank" 
                class="platform-link"
                :title="`Tersedia di ${platform.name}`"
              >
                <img 
                  v-if="platformLogos[platform.name]"
                  :src="platformLogos[platform.name]" 
                  :alt="`${platform.name} logo`"
                  class="platform-logo"
                />
              </a>
            </div>
          </div>
          <div class="item-quantity">
            <span>Qty: {{ item.quantity }}</span>
          </div>
          <div class="item-subtotal">
            <p>Subtotal</p>
            <strong>{{ formatPrice(item.price * item.quantity) }}</strong>
          </div>
          <div class="item-actions">
            <button @click="cartStore.removeItem(item.id)" class="btn-remove">×</button>
          </div>
        </div>
      </div>

      <div class="cart-summary">
        </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore.js';

// 1. Import gambar dari folder assets
import playstationLogo from '@/assets/playstation.png';
import xboxLogo from '@/assets/xbox.png';
import steamLogo from '@/assets/steam.png';

const cartStore = useCartStore();

// 2. Gunakan variabel hasil import di dalam objek platformLogos
const platformLogos = {
  PlayStation: playstationLogo,
  Xbox: xboxLogo,
  Steam: steamLogo,
};

const formatPrice = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};
</script>

<style scoped>
/* Style tidak ada perubahan dari sebelumnya */
.cart-view {
  padding: 2rem 0;
}
.empty-cart {
  text-align: center;
  padding: 4rem;
  background-color: #fff;
  border-radius: 8px;
}
.cart-content {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2rem;
  align-items: flex-start;
}
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.cart-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: white;
  padding: 1rem;
  border-radius: 8px;
}
.item-image {
  width: 80px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}
.item-info {
  flex-grow: 1;
}
.item-info h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
}
.item-platforms {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.75rem;
}
.platform-logo {
  height: 20px;
  opacity: 0.7;
  transition: opacity 0.2s;
}
.platform-logo:hover {
  opacity: 1;
}
.item-quantity {
  min-width: 60px;
  text-align: center;
}
.item-subtotal {
  min-width: 120px;
  text-align: right;
}
.item-subtotal p {
  margin: 0;
  font-size: 0.8rem;
  color: #666;
}
.item-subtotal strong {
  font-size: 1.1rem;
}
.item-actions {
  min-width: 30px;
  text-align: right;
}
.btn-remove {
  background: none;
  border: none;
  color: #C62828;
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
}
.cart-summary {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  position: sticky;
  top: 100px;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}
.summary-row strong {
  font-weight: 700;
}
.full-width {
  width: 100%;
  padding: 0.75rem;
}
</style>