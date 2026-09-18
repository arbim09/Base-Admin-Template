import { defineStore } from 'pinia'
import type { AuthUser, LoginCredentials, UserRole } from '~/types/auth'

const DEFAULT_MOCK_USER: AuthUser = {
  id: 'usr-001',
  name: 'Alex Vance',
  email: 'alex.vance@company.io',
  role: 'superadmin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  department: 'Engineering & Product',
  lastLoginAt: new Date().toISOString(),
}

export const useAuthStore = defineStore('auth', () => {
  const token = useCookie<string | null>('auth_token', {
    default: () => 'mock-jwt-token-demo',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax',
  })

  const user = ref<AuthUser | null>(DEFAULT_MOCK_USER)
  const isAuthenticated = computed(() => !!token.value && !!user.value)

  async function login(credentials: LoginCredentials): Promise<boolean> {
    // In production, delegate to auth.service.ts
    // Here we provide instant mock login for rapid prototyping
    if (credentials.email && credentials.password) {
      token.value = 'demo-jwt-token-' + Date.now()
      user.value = {
        ...DEFAULT_MOCK_USER,
        email: credentials.email,
        name: credentials.email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      }
      return true
    }
    return false
  }

  function logout() {
    token.value = null
    user.value = null
  }

  function hasRole(allowedRoles: UserRole[]): boolean {
    if (!user.value) return false
    return allowedRoles.includes(user.value.role)
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
    hasRole,
  }
})
