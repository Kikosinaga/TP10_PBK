<script setup>
import { ref } from 'vue'
import { auth } from './store/auth.js'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const showLogoutModal = ref(false)

function logout() {
  showLogoutModal.value = true
}
function confirmLogout() {
  auth.isLoggedIn = false
  auth.role = null
  router.push('/login')
  showLogoutModal.value = false
}
function cancelLogout() {
  showLogoutModal.value = false
}
</script>

<template>
  <div class="background">
  <div class="container">
    <nav class="sidebar">
      <h1>Bank Soal UTS & UAS</h1>
      <template v-if="auth.isLoggedIn && route.path !== '/login'">
        <div class="menu-links">
          <router-link to="/beranda" class="nav-link">Beranda</router-link>
          <router-link to="/uts" class="nav-link">UTS</router-link>
          <router-link to="/uas" class="nav-link">UAS</router-link>
          <router-link to="/kontak" class="nav-link">Kontak</router-link>
        </div>
        <button class="logout-button" @click="logout" style="margin-top: 12rem; margin-bottom: 0; align-self: flex-start;">Logout</button>
      </template>
    </nav>
    <main class="content">
      <router-view />
    </main>
    <div v-if="showLogoutModal" class="modal-overlay">
      <div class="modal-content">
        <p>Apakah Anda yakin ingin logout?</p>
        <button @click="confirmLogout">Ya, Logout</button>
        <button @click="cancelLogout">Batal</button>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped>

:global(html), :global(body) {
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #FCE4EC 0%, #F8BBD0 100%);
  min-height: 100vh;
  overflow-x: hidden;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1rem;
  align-items: stretch;
}

.container{
  width: 100%;
  margin: 0;
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #FCE4EC 0%, #F8BBD0 100%);
  color: #4A4A4A; 
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding-left: 220px;
}

.sidebar {
  width: 220px;
  padding: 1.5rem 2rem;
  background-color: rgba(255, 124, 146, 0.363); 
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  box-sizing: border-box;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
}

.sidebar h1 {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  font-weight: 700;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2); 
  width: 100%;
  text-align: left;
  color: #880E4F; 
}

.menu-links {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.nav-link {
  display: block;
  width: auto;
  color: #E57373; 
  text-decoration: none;
  padding: 0.8rem 1rem;
  border-radius: 6px;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  transition: background-color 0.3s ease, color 0.3s ease;
  text-align: left;
}

.nav-link:last-child {
  margin-bottom: 0;
}

.nav-link:hover {
  background-color: #FF85A2; 
  color: white; 
}

.router-link-exact-active {
  background-color: #FF85A2; 
  color: white; 
  font-weight: 700;
}

.logout-button {
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white; 
  background-color: #FF85A2; 
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;
}

.logout-button:hover {
  background-color: #F87693; 
}

.content {
  flex-grow: 1;
  padding: 2rem;
  box-sizing: border-box;
  color: #4A4A4A; 
  text-align: left;
  max-width: 1040px;
  width: 100%;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.4); 
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #ffe7ea; 
  padding: 2rem 2.5rem;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.409); 
  text-align: center;
  color: #4A4A4A; 
}
.modal-content p {
    color: #4A4A4A; 
    margin-bottom: 1rem;
}
.modal-content button {
  margin: 0 10px;
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 5px;
  background: #FF85A2; 
  color: white; 
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}
.modal-content button:hover {
    background-color: #F87693; 
}
.modal-content button:last-child {
  background: #F8BBD0; 
  color: #4A4A4A; 
}
.modal-content button:last-child:hover {
    background-color: #FCC2D4; 
}
</style>