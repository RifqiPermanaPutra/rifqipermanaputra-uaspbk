import { describe, test, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useGameStore } from '../gameStore'; // Sesuaikan path import
import axios from 'axios';

// Memberitahu Vitest untuk menggunakan 'axios' versi palsu (mock)
vi.mock('axios');

describe('Game Store', () => {
  
  // Berjalan sebelum setiap 'test' dieksekusi
  beforeEach(() => {
    // Membuat instance Pinia baru untuk setiap tes agar tidak saling mempengaruhi
    setActivePinia(createPinia());
  });

  test('inisialisasi dengan state yang benar', () => {
    const store = useGameStore();
    expect(store.games).toEqual([]);
    expect(store.loading).toBe(false);
    expect(store.error).toBe(null);
  });

  test('action fetchGames harus mengisi state games dengan data dari API', async () => {
    const store = useGameStore();
    const mockData = [{ id: 1, name: 'Game Test' }];

    // Mengatur agar `axios.get` mengembalikan data palsu
    axios.get.mockResolvedValue({ data: mockData });

    // Panggil action
    await store.fetchGames();

    // Periksa hasilnya
    expect(store.games).toEqual(mockData);
    expect(store.totalGames).toBe(1);
    expect(store.loading).toBe(false);
  });

  test('action deleteGame harus menghapus game dari state', async () => {
    const store = useGameStore();
    // Isi state awal untuk tes ini
    store.games = [{ id: 1, name: 'Game A' }, { id: 2, name: 'Game B' }];
    
    // Mengatur agar `axios.delete` berhasil
    axios.delete.mockResolvedValue({});

    // Panggil action untuk menghapus game dengan id: 1
    await store.deleteGame(1);

    // Periksa hasilnya
    expect(store.games).toHaveLength(1);
    expect(store.games[0].id).toBe(2);
    expect(store.loading).toBe(false);
  });
});