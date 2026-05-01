const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface ApiSuccess<T> {
  success: true;
  data: T;
  meta?: { page: number; limit: number; total: number; totalPages: number };
}

interface ApiError {
  success: false;
  error: { code: string; message: string; details?: unknown };
}

type ApiResponse<T> = ApiSuccess<T> | ApiError;

function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('ht_access_token');
}

export function setTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem('ht_access_token', accessToken);
  localStorage.setItem('ht_refresh_token', refreshToken);
}

export function clearTokens() {
  localStorage.removeItem('ht_access_token');
  localStorage.removeItem('ht_refresh_token');
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem('ht_refresh_token');
  if (!refreshToken) return null;
  try {
    const res = await fetch(`${API_BASE}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.success) {
      setTokens(json.data.accessToken, json.data.refreshToken);
      return json.data.accessToken;
    }
    return null;
  } catch {
    return null;
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const token = getAccessToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  let res = await fetch(`${API_BASE}/api${path}`, { ...options, headers });

  // Auto-refresh on 401
  if (res.status === 401 && token) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      headers['Authorization'] = `Bearer ${newToken}`;
      res = await fetch(`${API_BASE}/api${path}`, { ...options, headers });
    } else {
      clearTokens();
      if (typeof window !== 'undefined') window.location.href = '/login';
      return { success: false, error: { code: 'UNAUTHORIZED', message: 'Session expired' } };
    }
  }

  const json = await res.json();
  return json as ApiResponse<T>;
}

export async function apiGet<T>(path: string) {
  return apiFetch<T>(path, { method: 'GET' });
}

export async function apiPost<T>(path: string, body: unknown) {
  return apiFetch<T>(path, { method: 'POST', body: JSON.stringify(body) });
}

export async function apiPatch<T>(path: string, body: unknown) {
  return apiFetch<T>(path, { method: 'PATCH', body: JSON.stringify(body) });
}

export async function apiDelete<T>(path: string) {
  return apiFetch<T>(path, { method: 'DELETE' });
}
