import type { ApiResponse } from '~/types/common'

export class ApiError extends Error {
  statusCode: number
  data?: unknown

  constructor(message: string, statusCode = 500, data?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.data = data
  }
}

export const apiClient = {
  async request<T>(
    endpoint: string,
    options: {
      method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
      body?: unknown
      query?: Record<string, unknown>
      headers?: Record<string, string>
    } = {}
  ): Promise<ApiResponse<T>> {
    const config = useRuntimeConfig()
    const baseUrl = config.public.apiBaseUrl || '/api'
    const authStore = useAuthStore()

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options.headers || {}),
    }

    if (authStore.token) {
      headers.Authorization = `Bearer ${authStore.token}`
    }

    try {
      const response = await $fetch<ApiResponse<T>>(`${baseUrl}${endpoint}`, {
        method: options.method || 'GET',
        body: options.body as any,
        query: options.query,
        headers,
      })

      return response
    } catch (err: any) {
      const statusCode = err?.response?.status || err?.statusCode || 500
      const message = err?.response?._data?.message || err?.message || 'An unexpected error occurred'
      
      // Auto handle 401 unauthenticated
      if (statusCode === 401 && authStore.isAuthenticated) {
        authStore.logout()
        navigateTo('/auth/login')
      }

      throw new ApiError(message, statusCode, err?.response?._data)
    }
  },

  get<T>(endpoint: string, query?: Record<string, unknown>) {
    return this.request<T>(endpoint, { method: 'GET', query })
  },

  post<T>(endpoint: string, body?: unknown) {
    return this.request<T>(endpoint, { method: 'POST', body })
  },

  put<T>(endpoint: string, body?: unknown) {
    return this.request<T>(endpoint, { method: 'PUT', body })
  },

  patch<T>(endpoint: string, body?: unknown) {
    return this.request<T>(endpoint, { method: 'PATCH', body })
  },

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'DELETE' })
  },
}
