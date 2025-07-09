<template>
  <div class="login-view">
    <div class="login-card">
      <h2>Login</h2>
      
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit" class="btn btn-primary full-width">Masuk</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');

const authStore = useAuthStore();
const router = useRouter();

const handleLogin = () => {
  
  authStore.login({ email: email.value, password: password.value });

  
  if (authStore.userRole === 'admin') {
    
    router.push('/games');
  } else {
    
    router.push('/');
  }
};
</script>

<style scoped>
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 1rem;
 background-image: url('/background.jpg'); 
  background-size: cover; 
  background-position: center; 
}

.login-card {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px M10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  text-align: center;
  margin-top: 0;
  margin-bottom: 1rem;
}

.login-hint {
  text-align: left;
  font-size: 0.85rem;
  color: #555;
  background-color: #f0f0f0;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.login-hint:last-of-type {
    margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.full-width {
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.5rem;
}
</style>