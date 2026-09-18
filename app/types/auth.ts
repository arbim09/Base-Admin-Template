export type UserRole = 'superadmin' | 'admin' | 'editor' | 'viewer'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  department?: string
  lastLoginAt?: string
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface AuthResponse {
  token: string
  user: AuthUser
}
