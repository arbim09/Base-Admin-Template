export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data: T
  timestamp?: string
}

export interface PaginationMeta {
  currentPage: number
  perPage: number
  totalItems: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface PaginatedResponse<T> {
  items: T[]
  meta: PaginationMeta
}

export interface QueryParams {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  [key: string]: unknown
}
