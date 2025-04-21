import create from 'zustand';
import { Category, Product } from '../types';

interface CatalogState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  addCategory: (name: string) => Promise<void>;
  updateCategory: (id: string, data: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  addProduct: (categoryId: string, product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (categoryId: string, productId: string, data: Partial<Product>) => Promise<void>;
  deleteProduct: (categoryId: string, productId: string) => Promise<void>;
}

export const useCatalogStore = create<CatalogState>((set, get) => ({
  categories: [],
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      set({ categories: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addCategory: async (name) => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      const newCategory = await response.json();
      set(state => ({
        categories: [...state.categories, newCategory],
        isLoading: false
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // ... autres méthodes similaires pour update et delete
}));