import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';


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
        requiresAuth: true, 
        role: 'admin',      
      },
    },
  ],
});


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  
  if (to.meta.requiresAuth) {
  
    if (!authStore.isAuthenticated) {
      
      next({ name: 'login' });
    } 
    
    else if (to.meta.role === 'admin' && authStore.userRole !== 'admin') {
    
      alert('Anda tidak memiliki akses ke halaman ini!');
      next({ name: 'home' });
    } 
    
    else {
      next();
    }
  } 
  
  else {
    next();
  }
});

export default router;