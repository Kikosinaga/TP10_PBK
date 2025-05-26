<template>
  <div>
    <div>
      <h1>Soal UAS</h1>
    </div>
    <SoalForm @upload="tambahSoal" />
    <div class="soal-list">
      <SoalCard
        v-for="(soal, i) in daftarSoal"
        :key="i"
        :soal="soal"
        @edit="editSoal"
        @delete="hapusSoal"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SoalForm from '../components/SoalForm.vue'
import SoalCard from '../components/SoalCard.vue'

const daftarSoal = ref([])

function tambahSoal(soalBaru) {
  daftarSoal.value.push(soalBaru)
}

function editSoal(soal) {
  const index = daftarSoal.value.findIndex(s => s === soal)
  if (index !== -1) {
    const newDeskripsi = prompt('Edit deskripsi:', soal.deskripsi)
    if (newDeskripsi !== null) {
      daftarSoal.value[index].deskripsi = newDeskripsi
    }
  }
}

function hapusSoal(soal) {
  const index = daftarSoal.value.findIndex(s => s === soal)
  if (index !== -1) {
    if (confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
      daftarSoal.value.splice(index, 1)
    }
  }
}

</script>
