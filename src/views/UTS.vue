<template>
  <div class="soal-list-page-container">
    <div class="main-content-area">
      <div>
        <h1>Soal UTS</h1>
      </div>
      <Searching :soalList="daftarSoal" />
      <Alert v-if="alert.show" :type="alert.type" :message="alert.message" @close="alert.show = false" />
      <SoalForm @upload="handleTambahSoal" />
      <div class="soal-list">
        <SoalCard
          v-for="(soal, i) in daftarSoal"
          :key="soal.id || i"
          :soal="soal"
          @open-edit-modal="handleOpenEditModal" @delete="handleHapusSoal"
        />
      </div>
    </div>

    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Edit Soal</h3>

        <div class="input-group">
          <label for="editMatkulUTS">Mata Kuliah:</label>
          <input id="editMatkulUTS" v-model="currentEditSoal.matkul" placeholder="Masukkan Mata Kuliah" class="edit-input" />
        </div>

        <div class="input-group">
          <label for="editDosenUTS">Dosen:</label>
          <input id="editDosenUTS" v-model="currentEditSoal.dosen" placeholder="Masukkan Nama Dosen" class="edit-input" />
        </div>

        <div class="input-group">
          <label for="editSemesterUTS">Semester:</label>
          <input id="editSemesterUTS" v-model="currentEditSoal.semester" placeholder="Masukkan Semester" class="edit-input" />
        </div>

        <div class="input-group">
          <label for="editTahunUTS">Tahun:</label>
          <input id="editTahunUTS" v-model="currentEditSoal.tahun" placeholder="Masukkan Tahun" class="edit-input" />
        </div>

        <label class="edit-file-upload">
          <input type="file" accept="image/*" @change="handleFileEdit" />
          Pilih Gambar Baru
        </label>
        <img v-if="currentEditSoal.gambar" :src="currentEditSoal.gambar" class="edit-preview-img" />
        <div class="modal-actions">
          <button @click="saveEditedSoal" class="edit-btn">Simpan</button>
          <button @click="cancelEdit" class="delete-btn">Batal</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { createSoalStore } from '../store/soal' 
import SoalForm from '../components/SoalForm.vue'
import SoalCard from '../components/SoalCard.vue'
import Alert from '../components/Alert.vue'
import Searching from '../components/Searching.vue'

const useUTSStore = createSoalStore('soalUTS')
const soalStore = useUTSStore()
const { daftarSoal, fetchSoal, tambahSoal, editSoal, hapusSoal } = soalStore

const alert = ref({ show: false, type: '', message: '' })

const showEditModal = ref(false)
const currentEditSoal = ref({}) 

function parseSoalDescription(soal) {
  const match = soal.deskripsi.match(/Mata Kuliah: (.*?) \| Dosen: (.*?) \| Semester: (.*?) \| Tahun: (.*)/);
  if (match) {
    return {
      ...soal,
      matkul: match[1] || '',
      dosen: match[2] || '',
      semester: match[3] || '',
      tahun: match[4] || ''
    };
  }
  return {
    ...soal,
    matkul: '', dosen: '', semester: '', tahun: ''
  };
}

function handleOpenEditModal(soalToEdit) {
  currentEditSoal.value = parseSoalDescription({ ...soalToEdit }); 
  showEditModal.value = true;
  console.log('Membuka modal edit untuk soal UTS:', currentEditSoal.value);
}

function handleFileEdit(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      currentEditSoal.value.gambar = reader.result;
    };
    reader.readAsDataURL(file);
  }
}

async function saveEditedSoal() {
  currentEditSoal.value.deskripsi = `Mata Kuliah: ${currentEditSoal.value.matkul} | Dosen: ${currentEditSoal.value.dosen} | Semester: ${currentEditSoal.value.semester} | Tahun: ${currentEditSoal.value.tahun}`;

  await editSoal(currentEditSoal.value); 
  showAlert('info', 'Soal berhasil diubah!');
  showEditModal.value = false;
  currentEditSoal.value = {};
}

function cancelEdit() {
  showEditModal.value = false;
  currentEditSoal.value = {};
}

function showAlert(type, message) {
  alert.value = { show: true, type, message }
  setTimeout(() => { alert.value.show = false }, 2500)
}

async function handleTambahSoal(soal) {
  await tambahSoal(soal)
  showAlert('success', 'Soal berhasil ditambahkan!')
}

async function handleEditSoal(soal) {
  await editSoal(soal)
  showAlert('info', 'Soal berhasil diubah!')
}

async function handleHapusSoal(id) {
  showAlert('warning', 'Soal berhasil dihapus!')
  await hapusSoal(id)
}

onMounted(() => {
  fetchSoal()
})
</script>

<style>
.soal-list-page-container {
  display: flex;
}

.main-content-area {
  flex-grow: 1;
}

.main-content-area h1 {
  color: #880E4F; 
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.08);
}

.soal-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem; 
  justify-content: flex-start;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5); 
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow-y: auto;
}
.modal-content {
  background: #FFEBEE; 
  padding: 2rem;
  border-radius: 10px;
  min-width: 400px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 5px 25px rgba(0,0,0,0.3); 
  z-index: 10000;
  position: relative;
  box-sizing: border-box;
}

.input-group {
  margin-bottom: 1rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #880E4F; 
  font-size: 1rem;
}

.edit-input {
  width: 96%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #F48FB1; 
  font-size: 1.1rem;
  font-family: inherit;
  color: #424242; 
}
.edit-file-upload {
  background-color: #EC407A; 
  color: white; 
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-family: inherit;
  font-size: 1.1rem;
  margin-bottom: 10px;
  display: inline-block;
  transition: background-color 0.3s ease; 
}

.edit-file-upload input[type="file"] {
  display: none;
}

.edit-file-upload:hover {
  background-color: #D81B60; 
}

.edit-preview-img {
  max-width: 120px;
  max-height: 120px;
  border-radius: 8px;
  border: 2px solid #EC407A; 
  background: #fff; 
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  margin: 10px 0;
}
.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.edit-btn, .delete-btn { 
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
  text-align: center;
  transition: all 0.2s ease;
}

.edit-btn {
  background-color: #EC407A; 
  color: white;
}

.edit-btn:hover {
  background-color: #D81B60; 
  transform: translateY(-1px);
}

.delete-btn {
  background-color: #F48FB1; 
  color: #ffffff; 
}

.delete-btn:hover {
  background-color: #FCC2D4; 
  transform: translateY(-1px);
}
</style>