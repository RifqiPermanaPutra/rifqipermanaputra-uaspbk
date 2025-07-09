import { describe, test, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useGameStore } from '../gameStore'; 
import axios from 'axios';


vi.mock('axios');

describe('Game Store', () => {
  
  
  beforeEach(() => {
    
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

  
    axios.get.mockResolvedValue({ data: mockData });

    
    await store.fetchGames();

    
    expect(store.games).toEqual(mockData);
    expect(store.totalGames).toBe(1);
    expect(store.loading).toBe(false);
  });

  test('action deleteGame harus menghapus game dari state', async () => {
    const store = useGameStore();
  
    store.games = [{ id: 1, name: 'Game A' }, { id: 2, name: 'Game B' }];
    
  
    axios.delete.mockResolvedValue({});

  
    await store.deleteGame(1);

    
    expect(store.games).toHaveLength(1);
    expect(store.games[0].id).toBe(2);
    expect(store.loading).toBe(false);
  });
});