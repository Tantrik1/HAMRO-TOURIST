'use client';

import { create } from 'zustand';
import { apiPost, setTokens, clearTokens, apiGet } from '@/lib/api';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
  tenantSlug: string | null;
  isEmailVerified?: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  sendOtp: (email: string) => Promise<{ success: boolean; error?: string }>;
  verifyAndRegister: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    otp: string;
  }) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  sendOtp: async (email) => {
    const res = await apiPost<{ message: string }>('/auth/send-otp', { email });
    if (res.success) return { success: true };
    return { success: false, error: res.error.message };
  },

  verifyAndRegister: async (data) => {
    const res = await apiPost<{ accessToken: string; user: User }>(
      '/auth/register',
      data,
    );
    if (res.success) {
      setTokens(res.data.accessToken);
      set({ user: res.data.user, isAuthenticated: true });
      return { success: true };
    }
    return { success: false, error: res.error.message };
  },

  login: async (email, password) => {
    const res = await apiPost<{ accessToken: string; user: User }>('/auth/login', {
      email,
      password,
    });
    if (res.success) {
      setTokens(res.data.accessToken);
      set({ user: res.data.user, isAuthenticated: true });
      return { success: true };
    }
    return { success: false, error: res.error.message };
  },

  logout: async () => {
    // Best-effort: revoke refresh tokens server-side. Always clear local state regardless.
    try {
      await apiPost('/auth/logout', {});
    } catch (err) {
      console.warn('Server logout failed (continuing):', err);
    }
    clearTokens();
    set({ user: null, isAuthenticated: false });
    if (typeof window !== 'undefined') window.location.href = '/auth?mode=login';
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

  setUser: (user) => set({ user, isAuthenticated: true }),
}));
