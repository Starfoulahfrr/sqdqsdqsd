import create from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: null | {
    id: number;
    username: string;
    isAdmin: boolean;
  };
  initAuth: () => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,

  initAuth: async () => {
    try {
      const response = await fetch('/api/auth/check');
      const data = await response.json();
      set({ isAuthenticated: data.isAuthenticated, user: data.user });
    } catch {
      set({ isAuthenticated: false, user: null });
    }
  },

  login: async (username, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.success) {
      set({ isAuthenticated: true, user: data.user });
    }
  },

  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
}));