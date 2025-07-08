import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

// Import semua komponen View
import HomeView from '../views/HomeView.vue';
import GamesView from '../views/GamesView.vue';
import PromoView from '../views/PromoView.vue';
import LoginView from '../views/LoginView.vue';
import UserCatalogView from '../views/UserCatalogView.vue';
import GameDetailView from '../views/GameDetailView.vue';
import CartView from '../views/CartView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/katalog-pengguna',
      name: 'user-catalog',
      component: UserCatalogView,
    },
    {
      path: '/game/:id',
      name: 'game-detail',
      component: GameDetailView,
    },
    {
      path: '/promo',
      name: 'promo',
      component: PromoView,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/games',
      name: 'admin-games',
      component: GamesView,
      meta: {
        requiresAuth: true, // Menandakan rute ini butuh login
        role: 'admin',      // Menandakan hanya role 'admin' yang boleh akses
      },
    },
  ],
});

// Navigation Guard
// Kode ini akan berjalan setiap kali pengguna mencoba pindah halaman.
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Cek jika rute yang dituju memerlukan autentikasi
  if (to.meta.requiresAuth) {
    // Jika pengguna belum login
    if (!authStore.isAuthenticated) {
      // Alihkan ke halaman login
      next({ name: 'login' });
    } 
    // Jika rute memerlukan peran 'admin' dan peran pengguna bukan 'admin'
    else if (to.meta.role === 'admin' && authStore.userRole !== 'admin') {
      // Alihkan ke halaman utama (atau halaman "tidak diizinkan")
      alert('Anda tidak memiliki akses ke halaman ini!');
      next({ name: 'home' });
    } 
    // Jika sudah login dan peran sesuai, izinkan akses
    else {
      next();
    }
  } 
  // Jika rute tidak memerlukan autentikasi, izinkan akses
  else {
    next();
  }
});

export default router;