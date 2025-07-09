import { defineStore } from 'pinia';
import router from '@/router'; 

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    userRole: (state) => state.user?.role,
  },

  actions: {
    login(credentials) {
      
      if (credentials.email === 'admin@gmail.com' && credentials.password === 'password') {
        const adminData = {
          name: 'Admin Rifqi',
          email: credentials.email,
          role: 'admin',
        };
        this.user = adminData;
        localStorage.setItem('user', JSON.stringify(adminData));
      } else {
        
        const userData = {
      
          name: credentials.email.split('@')[0] || 'Pengguna',
          email: credentials.email,
          role: 'user',
        };
        this.user = userData;
        localStorage.setItem('user', JSON.stringify(userData));
      }
    },

    logout() {
      this.user = null;
      localStorage.removeItem('user');
      router.push('/login');
    },
  },
});