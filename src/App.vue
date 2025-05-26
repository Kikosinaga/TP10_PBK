<script setup>
import { auth } from './store/auth.js'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

function logout() {
  auth.isLoggedIn = false
  auth.role = null
  router.push('/login')
}
</script>

<template>
  <div class="background">
  <div class="container">
    <nav class="sidebar">
      <h1>Bank Soal UTS & UAS</h1>
      <template v-if="auth.isLoggedIn && route.path !== '/login'">
        <div class="menu-links">
          <router-link to="/uts" class="nav-link">UTS</router-link>
          <router-link to="/uas" class="nav-link">UAS</router-link>
        </div>
        <button class="logout-button" @click="logout">Logout</button>
      </template>
    </nav>
    <main class="content">
      <router-view />
    </main>
    </div>
  </div>
</template>

<style scoped>

:global(html), :global(body) {
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #6b73ff 0%, #000dff 100%);
  min-height: 100vh;
}

.container {
  display: flex;
  margin-top: 64px; 
  min-height: calc(100vh - 64px);
}


.container{
  width: 100%;
  margin: 0;
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #6b73ff 0%, #000dff 100%);
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.sidebar {
  width: 220px;
  padding: 1.5rem 2rem;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  box-sizing: border-box;
  height: 100vh;
  position: sticky;
  top: 0;
  z-index: 10;
}

.sidebar h1 {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  font-weight: 700;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
  width: 100%;
  text-align: left;
}

.menu-links {
  display: flex;
  margin-bottom: 20rem;
  flex-direction: column;
  width: 100%;
}

.nav-link {
  display: block;
  width: auto;
  color: #cce0ff;
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
  background-color: #cce0ff;
  color: #000dff;
}

.router-link-exact-active {
  background-color: #ffdd57;
  color: #000dff;
  font-weight: 700;
}

.logout-button {
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #000dff;
  background-color: #ffdd57;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;
}

.logout-button:hover {
  background-color: #ffc107;
}

.content {
  flex-grow: 1;
  padding: 2rem;
  box-sizing: border-box;
  color: white;
  text-align: left;
}
</style>
