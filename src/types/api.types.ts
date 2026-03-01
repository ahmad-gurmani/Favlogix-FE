export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
  timestamp: string;
}

export interface ErrorResponse {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
  path?: string;
  timestamp?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}
