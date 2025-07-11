<template>
  <div class="kontak-container">
    <h2>Kontak Pengelola</h2>
    <p>Jika ada pertanyaan, saran, atau kendala terkait aplikasi Bank Soal UTS & UAS, silakan hubungi kami melalui:</p>
    <ul class="info-list">
      <li><strong>Email:</strong> info@banksoal.com</li>
      <li><strong>WhatsApp:</strong> 0812-3456-7890</li>
    </ul>
    <div v-if="auth.role === 'admin'" class="form-section">
      <h3>Pesan dari User</h3>
      <div v-if="loading" style="margin-bottom:1rem;">Memuat pesan...</div>
      <div v-if="pesanList.length === 0 && !loading">Belum ada pesan masuk.</div>
      <ul v-else>
        <li v-for="pesan in pesanList" :key="pesan.id" class="pesan-item">
          <strong>{{ pesan.nama }}</strong> ({{ pesan.email }})<br>
          <span>{{ pesan.pesan }}</span>
        </li>
      </ul>
    </div>
    <div v-else class="form-section">
      <h3>Kirim Pesan Singkat</h3>
      <form @submit.prevent="kirimPesan">
        <input v-model="nama" type="text" placeholder="Nama Anda" required class="kontak-input" />
        <input v-model="email" type="email" placeholder="Email Anda" required class="kontak-input" />
        <textarea v-model="pesan" placeholder="Pesan Anda" required class="kontak-textarea"></textarea>
        <button type="submit" class="kontak-btn">Kirim</button>
      </form>
      <div v-if="sukses" class="sukses-msg">Pesan berhasil dikirim!</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { auth } from '../store/auth'

const nama = ref('')
const email = ref('')
const pesan = ref('')
const sukses = ref(false)
const pesanList = ref([])
const loading = ref(false)

async function kirimPesan() {
  await axios.post('http://localhost:3000/pesan', {
    nama: nama.value,
    email: email.value,
    pesan: pesan.value
  })
  nama.value = ''
  email.value = ''
  pesan.value = ''
  sukses.value = true
  setTimeout(() => sukses.value = false, 2500)
}

async function fetchPesan() {
  loading.value = true
  try {
    const res = await axios.get('http://localhost:3000/pesan')
    pesanList.value = res.data
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (auth.role === 'admin') fetchPesan()
})
</script>

<style scoped>
.kontak-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: #fff0f6;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  color: #4A4A4A;
}
h2 {
  color: #D81B60;
  margin-bottom: 1rem;
}
.info-list {
  margin: 1.2rem 0;
  padding-left: 1.2rem;
}
.info-list li {
  margin-bottom: 0.7rem;
  font-size: 1.08rem;
}
.form-section {
  margin-top: 2rem;
  background: #fce4ec;
  padding: 1rem 1.5rem;
  border-radius: 8px;
}
.form-section h3 {
  color: #AD1457;
  margin-bottom: 0.7rem;
}
.kontak-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 0.7rem;
  border-radius: 5px;
  border: 1px solid #F06292;
  font-size: 1rem;
}
.kontak-textarea {
  width: 100%;
  min-height: 70px;
  padding: 8px;
  margin-bottom: 0.7rem;
  border-radius: 5px;
  border: 1px solid #F06292;
  font-size: 1rem;
}
.kontak-btn {
  background-color: #EC407A;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;
}
.kontak-btn:hover {
  background-color: #D81B60;
}
.sukses-msg {
  margin-top: 1rem;
  color: #388E3C;
  font-weight: bold;
}
.pesan-item {
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  padding: 0.7rem 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
}
</style>