import type { PaginationMeta } from './interfaces';

export interface ApiSuccess<T> {
  success: true;
  data: T;
  meta?: PaginationMeta;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export function ok<T>(data: T, meta?: PaginationMeta): ApiSuccess<T> {
  return { success: true, data, ...(meta && { meta }) };
}

export function fail(code: string, message: string, details?: unknown): ApiError {
  return { success: false, error: { code, message, details } };
}
