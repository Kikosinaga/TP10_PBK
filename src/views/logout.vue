<template>
  <div>
    <p>Logging out...</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../store/auth'

const router = useRouter()

onMounted(() => {
  auth.isLoggedIn = false
  auth.role = null
  router.push('/login')
})
</script>
