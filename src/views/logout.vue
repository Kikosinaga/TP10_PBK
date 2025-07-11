<template>
  <div>
    <p>Apakah Anda yakin ingin logout?</p>
    <button @click="confirmLogout">Ya, Logout</button>
    <button @click="batal">Batal</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../store/auth'

const router = useRouter()

function confirmLogout() {
  auth.isLoggedIn = false
  auth.role = null
  auth.logout()
  router.push('/login')
}
function batal() {
  router.back()
}
</script>