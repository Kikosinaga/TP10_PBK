<template>
  <div v-if="auth.role === 'admin'">
    <form class="upload-navbar" @submit.prevent="submitSoal">
      <label class="custom-file-upload">
        <input type="file" accept="image/*" @change="handleFile" />
        Pilih File
      </label>
      <input v-model="deskripsi" placeholder="Deskripsi soal" class="desc-input" />
      <button type="submit" class="upload-btn">Upload</button>
    </form>
  </div>
  <div v-else>
    <p>Anda tidak punya akses untuk menambahkan soal.</p>
  </div>
</template>


<script setup>
import { auth } from '../store/auth'
import { ref } from 'vue'
const emit = defineEmits(['upload'])

const deskripsi = ref('')
const gambar = ref(null)

function handleFile(e) {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.onload = () => {
    gambar.value = reader.result
  }
  reader.readAsDataURL(file)
}

function submitSoal() {
  if (!gambar.value || !deskripsi.value) return
  emit('upload', {
    deskripsi: deskripsi.value,
    gambar: gambar.value
  })
  deskripsi.value = ''
  gambar.value = null
}
</script>

<style scoped>
.upload-navbar {
  display: flex;
  align-items: center;
  background-color: #2e3192;
  padding: 12px 16px;
  border-radius: 8px;
  gap: 10px;
  margin-bottom: 20px;
}

.custom-file-upload {
  background-color: #ffdd57;
  color: #2e3192;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.custom-file-upload input[type="file"] {
  display: none;
}

.desc-input {
  padding: 8px;
  border-radius: 5px;
  border: none;
  flex: 1;
}

.upload-btn {
  background-color: #ffdd57;
  color: #2e3192;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}

</style>