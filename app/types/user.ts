import type { UserRole } from './auth'

export type UserStatus = 'active' | 'inactive' | 'pending'

export interface UserItem {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  avatar?: string
  phone?: string
  department?: string
  createdAt: string
  updatedAt: string
}

export interface UserFilterState {
  search: string
  role: string
  status: string
  page: number
  limit: number
}

export interface CreateUserDto {
  name: string
  email: string
  role: UserRole
  status: UserStatus
  phone?: string
  department?: string
}

export interface UpdateUserDto extends Partial<CreateUserDto> {
  id: string
}
