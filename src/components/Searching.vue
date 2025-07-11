<template>
  <div class="searching-container">
    <input v-model="searchQuery" class="search-input" placeholder="Cari soal berdasarkan Mata Kuliah..." />
    <button class="search-btn" @click="searchSoal">Cari</button>
    <ul v-if="searchResults.length" class="search-results">
      <li v-for="(soal, idx) in searchResults" :key="idx">
        <strong>{{ soal.matakuliah }}</strong> - {{ soal.deskripsi }}
      </li>
    </ul>
    <div v-else-if="searchQuery">Tidak ditemukan soal untuk mata kuliah tersebut.</div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  soalList: {
    type: Array,
    required: true
  }
})
const searchQuery = ref('')
const searchResults = ref([])

function searchSoal() {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) {
    searchResults.value = []
    return
  }
  searchResults.value = props.soalList.filter(s =>
    s.matakuliah && s.matakuliah.toLowerCase().includes(query)
  )
}

watch(searchQuery, searchSoal)
</script>

<style scoped>
.searching-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 0.75rem;
  background: #fff0f6;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  color: #4A4A4A;
  margin-bottom: 20px;
}
.search-input {
  width: 80%;
  padding: 6px;
  border-radius: 5px;
  border: 1px solid #F06292;
  font-size: 1rem;
  margin-right: 8px;
}
.search-btn {
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
.search-btn:hover {
  background-color: #D81B60;
}
.search-results {
  margin-top: 1.2rem;
  padding-left: 1.2rem;
}
.search-results li {
  margin-bottom: 0.5rem;
  background: #fce4ec;
  padding: 6px 12px;
  border-radius: 6px;
}
</style>