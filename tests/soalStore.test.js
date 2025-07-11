import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useSoalStore } from '../src/store/soal'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: [{ id: 1, deskripsi: 'Soal 1', gambar: 'img1.png' }] })),
    post: vi.fn((url, soal) => Promise.resolve({ data: { ...soal, id: 2 } })),
    put: vi.fn((url, soal) => Promise.resolve({ data: soal })),
    delete: vi.fn(() => Promise.resolve()),
  }
}))

describe('Pinia Soal Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('fetchSoal mengambil data soal dari API', async () => {
    const store = useSoalStore()
    await store.fetchSoal()
    expect(store.daftarSoal.length).toBe(1)
    expect(store.daftarSoal[0].deskripsi).toBe('Soal 1')
  })

  it('tambahSoal menambah soal ke daftar', async () => {
    const store = useSoalStore()
    await store.tambahSoal({ deskripsi: 'Baru', gambar: 'img2.png' })
    expect(store.daftarSoal.some(s => s.deskripsi === 'Baru')).toBe(true)
  })
  
})