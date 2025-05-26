<template>
  <div class="card">
    <img :src="soal.gambar" alt="Gambar Soal" />
    <p>{{ soal.deskripsi }}</p>
    <div v-if="auth.role === 'admin'" class="actions">
      <button @click="$emit('edit', soal)" class="edit-btn">Edit</button>
      <button @click="$emit('delete', soal)" class="delete-btn">Delete</button>
    </div>
  </div>
</template>

<script setup>
import { auth } from '../store/auth'
defineProps(['soal'])
</script>

<style scoped>
.card {
  border: none;
  padding: 1rem;
  margin: 0.5rem;
  margin-top: 2rem;
  border-radius: 8px;
  max-width: 300px;
  position: relative;
  color: black;
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
  background-color: rgb(253, 253, 253);
}
.card img {
  width: 100%;
  height: auto;
}
.actions {
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
}
.edit-btn, .delete-btn {
  padding: 0.3rem 0.6rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}
.edit-btn {
  background-color: #4caf50;
  color: white;
}
.delete-btn {
  background-color: #f44336;
  color: white;
}
</style>
