import { apiClient } from './api.service'
import type { ApiResponse } from '~/types/common'
import type { AuthResponse, AuthUser, LoginCredentials } from '~/types/auth'

export const authService = {
  login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post<AuthResponse>('/auth/login', credentials)
  },

  logout(): Promise<ApiResponse<void>> {
    return apiClient.post<void>('/auth/logout')
  },

  getCurrentUser(): Promise<ApiResponse<AuthUser>> {
    return apiClient.get<AuthUser>('/auth/me')
  },
}
