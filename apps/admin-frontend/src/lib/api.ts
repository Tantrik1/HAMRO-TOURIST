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

/**
 * Paths under /api that must NEVER trigger a silent token-refresh + redirect on 401.
 * Login/register failures must surface their actual error to the user, and the refresh
 * endpoint refreshing itself would loop.
 */
const AUTH_PATHS_NO_REFRESH = [
  '/auth/login',
  '/auth/register',
  '/auth/send-otp',
  '/auth/refresh',
  '/auth/logout',
];

function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('ht_access_token');
}

export function setTokens(accessToken: string) {
  localStorage.setItem('ht_access_token', accessToken);
  // Refresh token is stored in HttpOnly cookie; we never persist it in localStorage.
}

export function clearTokens() {
  localStorage.removeItem('ht_access_token');
}

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Send HttpOnly refresh_token cookie
        body: JSON.stringify({}),
      });

      if (!res.ok) {
        clearTokens();
        return null;
      }

      const json = (await res.json()) as ApiResponse<{ accessToken: string }>;
      if (json.success && json.data?.accessToken) {
        setTokens(json.data.accessToken);
        return json.data.accessToken;
      }

      clearTokens();
      return null;
    } catch (error) {
      console.error('Token refresh failed:', error);
      clearTokens();
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
    credentials: 'include', // Always send cookies (refresh_token is HttpOnly)
  };

  let res = await fetch(`${API_BASE}/api${path}`, fetchOptions);

  // 401 → try one transparent refresh + retry, but never on auth endpoints themselves.
  const isAuthPath = AUTH_PATHS_NO_REFRESH.some((p) => path.startsWith(p));
  if (res.status === 401 && token && !isAuthPath) {
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
    const json = (await res.json()) as ApiResponse<T>;
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

export interface PresignedUploadResult {
  uploadUrl: string;
  key: string;
  cdnUrl: string;
}

export async function uploadImage(
  file: File,
  tenantSlug: string,
  category: string,
): Promise<string> {
  const ext = file.name.split('.').pop() || 'bin';
  const filename = file.name;
  const contentType = file.type || 'application/octet-stream';

  // 1. Get presigned URL
  const presignRes = await apiPost<PresignedUploadResult>('/media/presigned-url', {
    tenantSlug,
    category,
    filename,
    contentType,
  });
  if (!presignRes.success) {
    throw new Error(presignRes.error.message || 'Failed to get upload URL');
  }
  const { uploadUrl, key, cdnUrl } = presignRes.data;

  // 2. Upload file to R2 (no auth headers - presigned URL is the auth)
  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
    headers: { 'Content-Type': contentType },
  });
  if (!uploadRes.ok) {
    throw new Error(`Upload failed: ${uploadRes.status} ${uploadRes.statusText}`);
  }

  // 3. Register upload to queue image processing
  const registerRes = await apiPost<{ cdnUrl: string }>('/media/register', {
    tenantSlug,
    key,
    contentType,
  });
  if (!registerRes.success) {
    throw new Error(registerRes.error.message || 'Failed to register upload');
  }

  return registerRes.data.cdnUrl;
}
