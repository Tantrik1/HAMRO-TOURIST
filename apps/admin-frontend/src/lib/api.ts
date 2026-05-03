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

export function setTokens(accessToken: string) {
  localStorage.setItem('ht_access_token', accessToken);
  // Refresh token is stored in HttpOnly cookie, don't try to store it in localStorage
}

export function clearTokens() {
  localStorage.removeItem('ht_access_token');
}

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  // Prevent multiple simultaneous refresh requests
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Send refresh token cookie
        body: JSON.stringify({}),
      });

      if (!res.ok) {
        clearTokens();
        if (typeof window !== 'undefined') {
          window.location.href = '/login?reason=session_expired';
        }
        return null;
      }

      const json = await res.json() as ApiResponse<{ accessToken: string }>;
      if (json.success && json.data?.accessToken) {
        setTokens(json.data.accessToken);
        return json.data.accessToken;
      }

      clearTokens();
      if (typeof window !== 'undefined') {
        window.location.href = '/login?reason=refresh_failed';
      }
      return null;
    } catch (error) {
      console.error('Token refresh failed:', error);
      clearTokens();
      if (typeof window !== 'undefined') {
        window.location.href = '/login?reason=network_error';
      }
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
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

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const fetchOptions: RequestInit = {
    ...options,
    headers,
    credentials: 'include', // Always send cookies
  };

  let res = await fetch(`${API_BASE}/api${path}`, fetchOptions);

  // Handle 401 with token refresh
  if (res.status === 401 && token) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      headers['Authorization'] = `Bearer ${newToken}`;
      res = await fetch(`${API_BASE}/api${path}`, { ...fetchOptions, headers });
    } else {
      return {
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Session expired. Please login again.' },
      };
    }
  }

  try {
    const json = await res.json() as ApiResponse<T>;
    return json;
  } catch (error) {
    console.error(`Failed to parse response from ${path}:`, error);
    return {
      success: false,
      error: { code: 'PARSE_ERROR', message: 'Invalid response from server' },
    };
  }
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
