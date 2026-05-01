'use client';

import { create } from 'zustand';
import { apiPost, setTokens, clearTokens, apiGet } from '@/lib/api';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  tenantSlug: string | null;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: { email: string; password: string; firstName: string; lastName: string; companyName: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (email, password) => {
    const res = await apiPost<{ accessToken: string; refreshToken: string; user: User }>('/auth/login', { email, password });
    if (res.success) {
      setTokens(res.data.accessToken, res.data.refreshToken);
      set({ user: res.data.user, isAuthenticated: true });
      return { success: true };
    }
    return { success: false, error: res.error.message };
  },

  register: async (data) => {
    const res = await apiPost<{ accessToken: string; refreshToken: string; user: User }>('/auth/register', data);
    if (res.success) {
      setTokens(res.data.accessToken, res.data.refreshToken);
      set({ user: res.data.user, isAuthenticated: true });
      return { success: true };
    }
    return { success: false, error: res.error.message };
  },

  logout: () => {
    clearTokens();
    set({ user: null, isAuthenticated: false });
    window.location.href = '/login';
  },

  loadUser: async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('ht_access_token') : null;
    if (!token) {
      set({ isLoading: false });
      return;
    }
    const res = await apiGet<User>('/auth/me');
    if (res.success) {
      set({ user: res.data, isAuthenticated: true, isLoading: false });
    } else {
      clearTokens();
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
