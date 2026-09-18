import type { UserItem, CreateUserDto, UpdateUserDto, UserFilterState } from '~/types/user'
import type { PaginationMeta } from '~/types/common'
import { userService } from '~/services/user.service'
import { debounce } from '~/utils/formatters'

export function useUsers() {
  const toast = useToast()

  const users = ref<UserItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const filters = reactive<UserFilterState>({
    search: '',
    role: '',
    status: '',
    page: 1,
    limit: 6,
  })

  const meta = ref<PaginationMeta>({
    currentPage: 1,
    perPage: 6,
    totalItems: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  })

  const isEmpty = computed(() => !loading.value && !error.value && users.value.length === 0)

  const fetchUsers = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await userService.getUsers(filters)
      users.value = response.data.items
      meta.value = response.data.meta
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch users'
      toast.error(error.value || 'Error loading users')
    } finally {
      loading.value = false
    }
  }

  // Debounced search trigger
  const debouncedSearch = debounce(() => {
    filters.page = 1
    fetchUsers()
  }, 350)

  const handleSearch = (query: string) => {
    filters.search = query
    debouncedSearch()
  }

  const handleRoleChange = (role: string) => {
    filters.role = role
    filters.page = 1
    fetchUsers()
  }

  const handleStatusChange = (status: string) => {
    filters.status = status
    filters.page = 1
    fetchUsers()
  }

  const handlePageChange = (newPage: number) => {
    filters.page = newPage
    fetchUsers()
  }

  const resetFilters = () => {
    filters.search = ''
    filters.role = ''
    filters.status = ''
    filters.page = 1
    fetchUsers()
  }

  const createUser = async (payload: CreateUserDto) => {
    try {
      const response = await userService.createUser(payload)
      toast.success(`User "${response.data.name}" was created successfully`)
      await fetchUsers()
      return true
    } catch (err: any) {
      toast.error(err.message || 'Failed to create user')
      return false
    }
  }

  const updateUser = async (payload: UpdateUserDto) => {
    try {
      const response = await userService.updateUser(payload)
      toast.success(`User "${response.data.name}" updated successfully`)
      await fetchUsers()
      return true
    } catch (err: any) {
      toast.error(err.message || 'Failed to update user')
      return false
    }
  }

  const deleteUser = async (id: string, name?: string) => {
    try {
      await userService.deleteUser(id)
      toast.success(name ? `User "${name}" deleted` : 'User deleted successfully')
      // If current page is now empty and page > 1, go back one page
      if (users.value.length === 1 && filters.page > 1) {
        filters.page--
      }
      await fetchUsers()
      return true
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete user')
      return false
    }
  }

  const toggleStatus = async (user: UserItem) => {
    const nextStatus = user.status === 'active' ? 'inactive' : 'active'
    return updateUser({
      id: user.id,
      status: nextStatus,
    })
  }

  return {
    users,
    loading,
    error,
    isEmpty,
    filters,
    meta,
    fetchUsers,
    handleSearch,
    handleRoleChange,
    handleStatusChange,
    handlePageChange,
    resetFilters,
    createUser,
    updateUser,
    deleteUser,
    toggleStatus,
  }
}
