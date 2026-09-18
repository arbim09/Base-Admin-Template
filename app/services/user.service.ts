import { apiClient } from './api.service'
import type { ApiResponse, PaginatedResponse } from '~/types/common'
import type { UserItem, CreateUserDto, UpdateUserDto, UserFilterState } from '~/types/user'
import { sleep } from '~/utils/helpers'

// High quality initial mock data for instant out-of-the-box template usage
const INITIAL_USERS: UserItem[] = [
  {
    id: 'usr-101',
    name: 'Sarah Jenkins',
    email: 'sarah.j@enterprise.com',
    role: 'superadmin',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 234-5678',
    department: 'Engineering',
    createdAt: '2025-01-15T08:30:00Z',
    updatedAt: '2025-05-10T14:22:00Z',
  },
  {
    id: 'usr-102',
    name: 'Marcus Sterling',
    email: 'marcus.s@enterprise.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 345-6789',
    department: 'Product Management',
    createdAt: '2025-02-11T10:15:00Z',
    updatedAt: '2025-05-18T16:40:00Z',
  },
  {
    id: 'usr-103',
    name: 'Elena Rostova',
    email: 'elena.r@enterprise.com',
    role: 'editor',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 456-7890',
    department: 'UI/UX Design',
    createdAt: '2025-03-04T09:00:00Z',
    updatedAt: '2025-06-01T11:20:00Z',
  },
  {
    id: 'usr-104',
    name: 'David Kim',
    email: 'david.k@enterprise.com',
    role: 'viewer',
    status: 'inactive',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 567-8901',
    department: 'Marketing',
    createdAt: '2025-03-20T14:10:00Z',
    updatedAt: '2025-06-12T08:50:00Z',
  },
  {
    id: 'usr-105',
    name: 'Amara Okafor',
    email: 'amara.o@enterprise.com',
    role: 'editor',
    status: 'pending',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 678-9012',
    department: 'Operations',
    createdAt: '2025-04-02T16:45:00Z',
    updatedAt: '2025-06-14T10:05:00Z',
  },
  {
    id: 'usr-106',
    name: 'Lucas Silva',
    email: 'lucas.s@enterprise.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 789-0123',
    department: 'DevOps & Infra',
    createdAt: '2025-04-18T11:30:00Z',
    updatedAt: '2025-06-15T09:12:00Z',
  },
  {
    id: 'usr-107',
    name: 'Chantelle Dupont',
    email: 'chantelle.d@enterprise.com',
    role: 'viewer',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 890-1234',
    department: 'Finance',
    createdAt: '2025-05-01T13:20:00Z',
    updatedAt: '2025-06-16T15:30:00Z',
  },
]

// In-memory state for prototype / template standalone mode
let mockUsersList: UserItem[] = [...INITIAL_USERS]

export const userService = {
  /**
   * Fetch users with search, role, status filtering and pagination
   */
  async getUsers(params: UserFilterState): Promise<ApiResponse<PaginatedResponse<UserItem>>> {
    // Check if runtime config specifies a real API endpoint
    const config = useRuntimeConfig()
    const isMock = !config.public.apiBaseUrl || config.public.apiBaseUrl === '/api'

    if (!isMock) {
      return apiClient.get<PaginatedResponse<UserItem>>('/users', params as any)
    }

    // Mock API simulation with realistic delay
    await sleep(350)

    let filtered = [...mockUsersList]

    if (params.search) {
      const q = params.search.toLowerCase()
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.department?.toLowerCase().includes(q)
      )
    }

    if (params.role) {
      filtered = filtered.filter((u) => u.role === params.role)
    }

    if (params.status) {
      filtered = filtered.filter((u) => u.status === params.status)
    }

    const totalItems = filtered.length
    const totalPages = Math.max(1, Math.ceil(totalItems / params.limit))
    const startIdx = (params.page - 1) * params.limit
    const paginatedItems = filtered.slice(startIdx, startIdx + params.limit)

    return {
      success: true,
      message: 'Users fetched successfully',
      data: {
        items: paginatedItems,
        meta: {
          currentPage: params.page,
          perPage: params.limit,
          totalItems,
          totalPages,
          hasNextPage: params.page < totalPages,
          hasPrevPage: params.page > 1,
        },
      },
    }
  },

  async getUser(id: string): Promise<ApiResponse<UserItem>> {
    const user = mockUsersList.find((u) => u.id === id)
    if (!user) {
      throw new Error('User not found')
    }
    return {
      success: true,
      message: 'User details',
      data: { ...user },
    }
  },

  async createUser(payload: CreateUserDto): Promise<ApiResponse<UserItem>> {
    await sleep(300)
    const newUser: UserItem = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      status: payload.status,
      phone: payload.phone || '-',
      department: payload.department || 'General',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(payload.name)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockUsersList.unshift(newUser)
    return {
      success: true,
      message: 'User created successfully',
      data: newUser,
    }
  },

  async updateUser(payload: UpdateUserDto): Promise<ApiResponse<UserItem>> {
    await sleep(300)
    const index = mockUsersList.findIndex((u) => u.id === payload.id)
    if (index === -1) {
      throw new Error('User not found')
    }
    const updated = {
      ...mockUsersList[index],
      ...payload,
      updatedAt: new Date().toISOString(),
    }
    mockUsersList[index] = updated
    return {
      success: true,
      message: 'User updated successfully',
      data: updated,
    }
  },

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    await sleep(300)
    mockUsersList = mockUsersList.filter((u) => u.id !== id)
    return {
      success: true,
      message: 'User deleted successfully',
      data: undefined,
    }
  },
}
