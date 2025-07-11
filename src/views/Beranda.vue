<template>
  <div class="beranda-container">
    <h2>Selamat Datang di Bank Soal UTS & UAS</h2>
    <p>Aplikasi ini membantu mahasiswa untuk mengelola dan mengakses kumpulan soal UTS & UAS secara mudah dan terpusat.</p>
    <ul class="fitur-list">
      <li><strong>Admin:</strong> Dapat mengupload soal beserta deskripsi dan gambar, serta mengelola data soal.</li>
      <li><strong>Mahasiswa:</strong> Dapat melihat dan mencari soal UTS & UAS sesuai mata kuliah.</li>
      <li><strong>Fitur Navigasi:</strong> Beranda, UTS, UAS, Kontak, dan Logout.</li>
    </ul>
    <div class="petunjuk">
      <h3>Petunjuk Penggunaan:</h3>
      <ol>
        <li>Login sesuai peran Anda (admin/mahasiswa).</li>
        <li>Pilih menu UTS/UAS untuk melihat soal.</li>
        <li>Admin dapat mengupload soal melalui menu yang tersedia.</li>
        <li>Gunakan menu Kontak untuk menghubungi pengelola aplikasi.</li>
      </ol>
    </div>
  </div>
</template>

<script setup>
// ...existing code...
</script>

<style scoped>
.beranda-container {
  max-width: 500px;
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
.fitur-list {
  margin: 1.5rem 0;
  padding-left: 1.2rem;
}
.fitur-list li {
  margin-bottom: 0.7rem;
  font-size: 1.08rem;
}
.petunjuk {
  margin-top: 2rem;
  background: #fce4ec;
  padding: 1rem 1.5rem;
  border-radius: 8px;
}
.petunjuk h3 {
  color: #AD1457;
  margin-bottom: 0.7rem;
}
.petunjuk ol {
  padding-left: 1.2rem;
}
.petunjuk li {
  margin-bottom: 0.5rem;
}
</style>