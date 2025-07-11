<template>
  <div class="register-container">
    <h2>Daftar Akun</h2>
    <Alert v-if="alert.show" :type="alert.type" :message="alert.message" @close="alert.show = false" />
    <input v-model="username" placeholder="Username" class="register-input" />
    <input v-model="password" type="password" placeholder="Password" class="register-input" />
    <button @click="register" class="register-button">Daftar</button>
    <p v-if="error" class="error">{{ error }}</p>
    <router-link to="/login" class="login-link">Sudah punya akun? Login di sini</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import Alert from '../components/Alert.vue'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const alert = ref({ show: false, type: '', message: '' })

function showAlert(type, message) {
  alert.value = { show: true, type, message }
  setTimeout(() => { alert.value.show = false }, 2500)
}

async function register() {
  error.value = ''
  if (!username.value || !password.value) {
    error.value = 'Username dan password wajib diisi.'
    return
  }
  try {
    // Cek username sudah ada
    const cek = await axios.get('http://localhost:3000/users?username=' + username.value)
    if (cek.data.length > 0) {
      error.value = 'Username sudah terdaftar.'
      return
    }
    await axios.post('http://localhost:3000/users', {
      username: username.value,
      password: password.value,
      role: 'user'
    })
    showAlert('success', 'Akun berhasil dibuat! Silakan login.')
    setTimeout(() => router.push('/login'), 2000)
  } catch (e) {
    error.value = 'Gagal mendaftar.'
  }
}
</script>

<style scoped>
.register-container {
  max-width: 360px;
  margin: 5rem auto;
  padding: 2rem;
  background: #FFEBEE; 
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1); 
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #424242; 
}

.register-container h2 {
  margin-bottom: 1.5rem;
  color: #880E4F; 
  font-weight: 700;
  font-size: 2rem;
}

.register-input {
  width: calc(90% - 4px);
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border: 2px solid #F48FB1; 
  border-radius: 8px;
  font-size: 1.1rem;
  outline: none;
  transition: border-color 0.3s ease;
  color: #424242; 
}
.register-input:focus {
  border-color: #EC407A; 
  box-shadow: 0 0 8px rgba(236, 64, 122, 0.5);
}

.register-button {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #EC407A; 
  color: white; 
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.register-button:hover {
  background-color: #D81B60; 
}
.error { 
  color: #DC143C; 
}
.login-link {
  display: block;
  margin-top: 1.5rem;
  color: #EC407A; 
  font-weight: 500;
  text-decoration: underline;
  cursor: pointer;
}
.login-link:hover {
  color: #D81B60; 
}
</style>