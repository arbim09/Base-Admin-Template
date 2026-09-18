<script setup lang="ts">
import { UserPlus, AlertTriangle } from 'lucide-vue-next'
import type { UserItem, CreateUserDto, UpdateUserDto } from '~/types/user'

const {
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
} = useUsers()

// Modal states
const isFormModalOpen = ref(false)
const selectedUserForEdit = ref<UserItem | null>(null)

const isDetailModalOpen = ref(false)
const selectedUserForDetail = ref<UserItem | null>(null)

const isDeleteModalOpen = ref(false)
const userToDelete = ref<UserItem | null>(null)
const isDeleting = ref(false)

onMounted(() => {
  fetchUsers()
})

const openCreateModal = () => {
  selectedUserForEdit.value = null
  isFormModalOpen.value = true
}

const openEditModal = (user: UserItem) => {
  selectedUserForEdit.value = { ...user }
  isFormModalOpen.value = true
}

const openDetailModal = (user: UserItem) => {
  selectedUserForDetail.value = user
  isDetailModalOpen.value = true
}

const openDeleteModal = (user: UserItem) => {
  userToDelete.value = user
  isDeleteModalOpen.value = true
}

const handleFormSubmit = async (payload: CreateUserDto | UpdateUserDto) => {
  let success = false
  if ('id' in payload) {
    success = await updateUser(payload)
  } else {
    success = await createUser(payload)
  }

  if (success) {
    isFormModalOpen.value = false
  }
}

const confirmDelete = async () => {
  if (!userToDelete.value) return
  isDeleting.value = true
  const success = await deleteUser(userToDelete.value.id, userToDelete.value.name)
  isDeleting.value = false
  if (success) {
    isDeleteModalOpen.value = false
    userToDelete.value = null
  }
}
</script>

<template>
  <div class="space-y-4">
    <!-- Filter Toolbar & Add Button -->
    <div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
      <div class="flex-1">
        <FeatureUsersUserFilter
          :filters="filters"
          @search="handleSearch"
          @role-change="handleRoleChange"
          @status-change="handleStatusChange"
          @reset="resetFilters"
        />
      </div>

      <UiButton variant="primary" size="md" @click="openCreateModal" class="flex-shrink-0 self-end md:self-auto">
        <template #icon>
          <UserPlus class="w-4 h-4 mr-1.5" />
        </template>
        Add Member
      </UiButton>
    </div>

    <!-- Error State -->
    <CommonErrorState
      v-if="error"
      title="Failed to load user directory"
      :message="error"
      @retry="fetchUsers"
    />

    <!-- Empty State -->
    <CommonEmptyState
      v-else-if="isEmpty"
      title="No team members found"
      description="No results match your search and filter criteria. You can reset filters or invite a new member."
      action-label="Add Member"
      @action="openCreateModal"
    />

    <!-- Users Table -->
    <FeatureUsersUserTable
      v-else
      :users="users"
      :loading="loading"
      :meta="meta"
      @view="openDetailModal"
      @edit="openEditModal"
      @delete="openDeleteModal"
      @toggle-status="toggleStatus"
      @page-change="handlePageChange"
    />

    <!-- Add / Edit Modal -->
    <FeatureUsersUserModal
      v-model="isFormModalOpen"
      :user="selectedUserForEdit"
      @submit="handleFormSubmit"
    />

    <!-- User Detail Modal -->
    <FeatureUsersUserDetailModal
      v-model="isDetailModalOpen"
      :user="selectedUserForDetail"
    />

    <!-- Delete Confirmation Modal -->
    <UiModal
      v-model="isDeleteModalOpen"
      title="Confirm Delete Member"
      size="sm"
    >
      <div class="flex items-start gap-3.5 py-2">
        <div class="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center flex-shrink-0">
          <AlertTriangle class="w-5 h-5" />
        </div>
        <div class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          Are you sure you want to delete
          <span class="font-semibold text-slate-900 dark:text-slate-100">
            "{{ userToDelete?.name }}"
          </span>?
          This action will immediately revoke their workspace access.
        </div>
      </div>

      <template #footer>
        <UiButton
          variant="ghost"
          size="md"
          @click="isDeleteModalOpen = false"
        >
          Cancel
        </UiButton>
        <UiButton
          variant="danger"
          size="md"
          :loading="isDeleting"
          @click="confirmDelete"
        >
          Delete Member
        </UiButton>
      </template>
    </UiModal>
  </div>
</template>
