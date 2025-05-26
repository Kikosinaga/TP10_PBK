<template>
  <div class="login-container">
    <h2>Login</h2>
    <input v-model="username" placeholder="Username" class="login-input" />
    <input v-model="password" type="password" placeholder="Password" class="login-input" />
    <button @click="login" class="login-button">Login</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../store/auth'

const username = ref('')
const password = ref('')
const router = useRouter()

function login() {
  if (username.value === 'admin' && password.value === 'admin123') {
    auth.isLoggedIn = true
    auth.role = 'admin'
    router.push('/admin')
  } else if (username.value === 'user' && password.value === 'user123') {
    auth.isLoggedIn = true
    auth.role = 'user'
    router.push('/uts')
  } else {
    alert('Login gagal')
  }
}
</script>

<style scoped>
.login-container {
  max-width: 360px;
  margin: 5rem auto;
  padding: 2rem;
  background: #f0f4ff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login-container h2 {
  margin-bottom: 1.5rem;
  color: #1a237e;
  font-weight: 700;
  font-size: 2rem;
}

.login-input {
  width: calc(90% - 4px);
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border: 2px solid #1a237e;
  border-radius: 8px;
  font-size: 1.1rem;
  outline: none;
  transition: border-color 0.3s ease;
}

.login-input:focus {
  border-color: #3949ab;
  box-shadow: 0 0 8px #3949ab;
}

.login-button {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #1a237e;
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #3949ab;
}
</style>
