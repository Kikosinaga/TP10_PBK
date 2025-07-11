import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

// Membuat factory store agar bisa untuk UAS/UTS
export function createSoalStore(endpoint) {
  return defineStore('soal_' + endpoint, () => {
    const daftarSoal = ref([])
    const loading = ref(false)
    const error = ref(null)
    const API_URL = `http://localhost:3000/${endpoint}`

    async function fetchSoal() {
      loading.value = true
      daftarSoal.value = [] // Reset sebelum fetch agar tidak menampilkan data lama
      try {
        const res = await axios.get(API_URL)
        daftarSoal.value = res.data
      } catch (err) {
        error.value = err
      } finally {
        loading.value = false
      }
    }

    async function tambahSoal(soalBaru) {
      try {
        const res = await axios.post(API_URL, soalBaru)
        // *** PERBAIKAN DI SINI ***
        // Tambahkan data soal yang baru saja dibuat/dikembalikan oleh API ke daftarSoal
        daftarSoal.value.push(res.data) 
        // Anda tidak perlu memanggil fetchSoal() lagi di sini untuk kasus ini
      } catch (err) {
        error.value = err
      }
    }

    async function editSoal(soal) {
      try {
        const res = await axios.put(`${API_URL}/${soal.id}`, soal)
        const idx = daftarSoal.value.findIndex(s => s.id === soal.id)
        if (idx !== -1) daftarSoal.value[idx] = res.data
      } catch (err) {
        error.value = err
      }
    }

    async function hapusSoal(id) {
      try {
        await axios.delete(`${API_URL}/${id}`)
        daftarSoal.value = daftarSoal.value.filter(s => s.id !== id)
      } catch (err) {
        error.value = err
      }
    }

    return { daftarSoal, loading, error, fetchSoal, tambahSoal, editSoal, hapusSoal }
  })
}

export const useSoalStore = createSoalStore('soalUAS')