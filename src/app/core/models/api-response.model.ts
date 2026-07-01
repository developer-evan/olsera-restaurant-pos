export interface ApiResponse<T> {
  success: true;
  data: T;
  requestId?: string;
}

export interface ApiPaginatedMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiPaginatedResponse<T> {
  success: true;
  data: T[];
  meta: ApiPaginatedMeta;
  requestId?: string;
}

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string | string[];
  error: string;
  timestamp: string;
  path: string;
  requestId?: string;
}
