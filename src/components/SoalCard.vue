<template>
  <div
    class="card"
    :class="{ 'zoomed-in': isZoomed }"
  >
    <img :src="soal.gambar" alt="Gambar Soal" @click="toggleZoom" style="cursor: zoom-in;" />
    <p>
      Mata Kuliah: {{ soal.matkul }} |
      Dosen: {{ soal.dosen }} |
      Semester: {{ soal.semester }} |
      Tahun: {{ soal.tahun }}
    </p>
    <div v-if="auth.role === 'admin' && !isZoomed" class="actions">
      <button @click.stop="openEditModal" class="edit-btn">Edit</button>
      <button @click.stop="onDelete" class="delete-btn">Hapus</button>
    </div>
  </div>
    <!-- Edit Modal -->
    <div v-if="editMode" class="modal-overlay">
      <div class="modal-content">
        <h3>Edit Soal</h3>
        <input v-model="editMatkul" placeholder="Mata Kuliah" class="edit-input" />
        <input v-model="editDosen" placeholder="Dosen" class="edit-input" />
        <input v-model="editSemester" placeholder="Semester" class="edit-input" />
        <input v-model="editTahun" placeholder="Tahun" class="edit-input" />
        <label class="edit-file-upload">
          <input type="file" accept="image/*" @change="handleFile" />
          Pilih Gambar Baru
        </label>
        <img v-if="editGambar" :src="editGambar" class="edit-preview-img" />
        <div class="modal-actions">
          <button @click="onEdit" class="edit-btn">Simpan</button>
          <button @click="editMode = false" class="delete-btn">Batal</button>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { auth } from '../store/auth';

const props = defineProps({
  soal: {
    type: Object,
    required: true,
    validator: (value) => {
      return 'gambar' in value && 'deskripsi' in value; 
    }
  }
});
const emit = defineEmits(['edit', 'delete', 'open-edit-modal']); 

const isZoomed = ref(false);

const toggleZoom = (e) => {
  e.stopPropagation();
  isZoomed.value = !isZoomed.value;
};

function openEditModal() {
  emit('open-edit-modal', props.soal); 
}

function onDelete() {
  if (confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
    emit('delete', props.soal.id);
  }
}
</script>


<style>
.card {
  border: none;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 8px;
  width: calc(25% - 1rem);
  min-height: 100px;
  max-width: 220px;
  position: relative;
  color: black;
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
  background-color: rgb(253, 253, 253);
  cursor: pointer;
  z-index: 0;
  display: flex;
  flex-direction: column;
  vertical-align: top;
  box-sizing: border-box;
}

.card img {
  width: 100%;
  height: 100px;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.card p {
  flex: 1;
  margin: 0.5rem 0;
  line-height: 1.5;
}

.actions {
  margin-top: auto;
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
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
  background-color: #4caf50;
  color: white;
}

.edit-btn:hover {
  background-color: #45a049;
  transform: translateY(-1px);
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.delete-btn:hover {
  background-color: #da190b;
  transform: translateY(-1px);
}

.card.zoomed-in {
  position: fixed;
  top: 45%;
  left: 50%;
  width: 80vw;
  height: 80vh;
  max-width: none;
  transform: translate(-50%, -50%);
  box-shadow: 0 25px 50px rgba(0,0,0,0.5);
  padding: 2rem;
  z-index: 1000;
  overflow: auto;
}

.card.zoomed-in img {
  width: auto;
  height: auto;
  max-width: 90vw;
  max-height: 80vh;
  display: block;
  margin: 0 auto;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
}

@media (max-width: 768px) {
  .card {
    width: calc(50% - 1rem); 
  }
}

@media (max-width: 480px) {
  .card {
    width: calc(100% - 1rem); 
  }
}
</style>