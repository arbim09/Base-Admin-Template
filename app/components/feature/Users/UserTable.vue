<script setup lang="ts">
import { Eye, Edit3, Trash2 } from 'lucide-vue-next'
import type { UserItem } from '~/types/user'
import type { TableColumn, PaginationMeta } from '~/types/ui'
import { formatDate } from '~/utils/formatters'
import { getInitials } from '~/utils/helpers'

defineProps<{
  users: UserItem[]
  loading: boolean
  meta: PaginationMeta
}>()

const emit = defineEmits<{
  (e: 'view', user: UserItem): void
  (e: 'edit', user: UserItem): void
  (e: 'delete', user: UserItem): void
  (e: 'toggleStatus', user: UserItem): void
  (e: 'pageChange', page: number): void
}>()

const columns: TableColumn[] = [
  { key: 'user', label: 'Team Member', width: 'w-72' },
  { key: 'department', label: 'Department' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'createdAt', label: 'Joined' },
  { key: 'actions', label: 'Actions', align: 'right' },
]

const getRoleBadgeVariant = (role: string): 'brand' | 'success' | 'warning' | 'neutral' => {
  switch (role) {
    case 'superadmin':
      return 'brand'
    case 'admin':
      return 'success'
    case 'editor':
      return 'warning'
    case 'viewer':
    default:
      return 'neutral'
  }
}

const getStatusBadgeVariant = (status: string): 'success' | 'warning' | 'neutral' => {
  switch (status) {
    case 'active':
      return 'success'
    case 'pending':
      return 'warning'
    case 'inactive':
    default:
      return 'neutral'
  }
}
</script>

<template>
  <UiDataTable
    :columns="columns"
    :items="users"
    :loading="loading"
  >
    <!-- Custom Cell: Member info -->
    <template #cell(user)="{ row }">
      <div class="flex items-center gap-3">
        <img
          v-if="row.avatar"
          :src="row.avatar"
          :alt="row.name"
          class="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
        />
        <div
          v-else
          class="w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold"
        >
          {{ getInitials(row.name) }}
        </div>

        <div class="min-w-0">
          <p class="font-semibold text-slate-900 dark:text-slate-100 truncate text-xs sm:text-sm">
            {{ row.name }}
          </p>
          <p class="text-xs text-slate-400 truncate">
            {{ row.email }}
          </p>
        </div>
      </div>
    </template>

    <!-- Custom Cell: Department -->
    <template #cell(department)="{ value }">
      <span class="text-xs text-slate-600 dark:text-slate-300 font-medium">
        {{ value || 'General' }}
      </span>
    </template>

    <!-- Custom Cell: Role -->
    <template #cell(role)="{ value }">
      <UiBadge :variant="getRoleBadgeVariant(value)" size="sm">
        {{ value }}
      </UiBadge>
    </template>

    <!-- Custom Cell: Status -->
    <template #cell(status)="{ row, value }">
      <button
        type="button"
        @click="$emit('toggleStatus', row)"
        title="Click to toggle status"
        class="group focus:outline-none"
      >
        <UiBadge
          :variant="getStatusBadgeVariant(value)"
          dot
          size="sm"
          class="group-hover:opacity-80 transition-opacity"
        >
          {{ value }}
        </UiBadge>
      </button>
    </template>

    <!-- Custom Cell: Joined Date -->
    <template #cell(createdAt)="{ value }">
      <span class="text-xs text-slate-500 dark:text-slate-400">
        {{ formatDate(value) }}
      </span>
    </template>

    <!-- Custom Cell: Actions -->
    <template #cell(actions)="{ row }">
      <div class="flex items-center justify-end gap-1">
        <button
          type="button"
          @click="$emit('view', row)"
          class="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950/50 transition-colors"
          title="View profile"
        >
          <Eye class="w-4 h-4" />
        </button>

        <button
          type="button"
          @click="$emit('edit', row)"
          class="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/50 transition-colors"
          title="Edit member"
        >
          <Edit3 class="w-4 h-4" />
        </button>

        <button
          type="button"
          @click="$emit('delete', row)"
          class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
          title="Delete member"
        >
          <Trash2 class="w-4 h-4" />
        </button>
      </div>
    </template>

    <!-- Footer: Pagination -->
    <template #footer>
      <UiPagination
        :meta="meta"
        @change="$emit('pageChange', $event)"
      />
    </template>
  </UiDataTable>
</template>
