import { defineStore } from 'pinia';
import router from '@/router'; // Import router untuk navigasi

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
      // 1. Cek apakah ini adalah kredensial ADMIN
      if (credentials.email === 'admin@gmail.com' && credentials.password === 'password') {
        const adminData = {
          name: 'Admin Rifqi',
          email: credentials.email,
          role: 'admin',
        };
        this.user = adminData;
        localStorage.setItem('user', JSON.stringify(adminData));
      } else {
        // 2. Jika bukan admin, anggap sebagai PENGGUNA BIASA
        const userData = {
          // Kita bisa gunakan bagian awal email sebagai nama panggilan
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