<template>
  <div v-if="auth.role === 'admin'">
    <form class="upload-navbar" @submit.prevent="submitSoal">
      <input v-model="matakuliah" placeholder="Mata Kuliah" class="desc-input" />
      <input v-model="dosen" placeholder="Dosen Pengampu" class="desc-input" />
      <input v-model="semester" placeholder="Semester" class="desc-input" />
      <input v-model="tahun" placeholder="Tahun" class="desc-input" />
      <div class="file-upload-group">
        <label class="custom-file-upload">
          <input type="file" accept="image/*" @change="handleFile" />
          Pilih File
        </label>
        <button type="submit" class="upload-btn">Upload</button>
      </div>
      <div v-if="gambar" class="preview-container">
        <img :src="gambar" alt="Preview Soal" class="preview-img" />
      </div>
    </form>
  </div>
  <div v-else>
    <p>===========================================================================================</p>
  </div>
</template>


<script setup>
import { auth } from '../store/auth'
import { ref } from 'vue'
const emit = defineEmits(['upload'])

const matakuliah = ref('')
const dosen = ref('')
const semester = ref('')
const tahun = ref('')
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
  if (!matakuliah.value || !dosen.value || !semester.value || !tahun.value || !gambar.value) return
  const deskripsi = `Mata Kuliah: ${matakuliah.value} | Dosen: ${dosen.value} | Semester: ${semester.value} | Tahun: ${tahun.value}`
  emit('upload', {
    matakuliah: matakuliah.value,
    dosen: dosen.value,
    semester: semester.value,
    tahun: tahun.value,
    deskripsi,
    gambar: gambar.value
  })
  matakuliah.value = ''
  dosen.value = ''
  semester.value = ''
  tahun.value = ''
  gambar.value = null
}
</script>

<style scoped>
.upload-navbar {
  display: flex;
  align-items: center;
  background-color: #F48FB1; 
  padding: 10px 10px;
  border-radius: 10px;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}
.file-upload-group {
  display: flex;
  align-items: center;
  gap: 6px;
}
.custom-file-upload {
  background-color: #EC407A; 
  color: white; 
  padding: 8px 8px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-family: inherit;
  font-size: 1.1rem;
  transition: background-color 0.3s ease; 
}

.custom-file-upload:hover {
    background-color: #D81B60; 
}

.custom-file-upload input[type="file"] {
  display: none;
}

.desc-input {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #F06292; 
  flex: 1;
  color: #424242; 
}

.upload-btn {
  background-color: #EC407A; 
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  font-family: inherit;
  font-size: 1.1rem;
  transition: background-color 0.3s ease; 
}

.upload-btn:hover {
    background-color: #D81B60; 
}

.preview-container {
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
}
.preview-img {
  max-width: 120px;
  max-height: 120px;
  border-radius: 8px;
  border: 2px solid #EC407A; 
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
</style>