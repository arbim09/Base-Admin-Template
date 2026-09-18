<script setup lang="ts">
import { Search, RotateCcw } from 'lucide-vue-next'
import type { UserFilterState } from '~/types/user'

const props = defineProps<{
  filters: UserFilterState
}>()

const emit = defineEmits<{
  (e: 'search', val: string): void
  (e: 'roleChange', val: string): void
  (e: 'statusChange', val: string): void
  (e: 'reset'): void
}>()

const roleOptions = [
  { label: 'All Roles', value: '' },
  { label: 'Superadmin', value: 'superadmin' },
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
]

const statusOptions = [
  { label: 'All Statuses', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending' },
]

const hasActiveFilters = computed(() => {
  return !!props.filters.search || !!props.filters.role || !!props.filters.status
})
</script>

<template>
  <div class="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-soft flex flex-col md:flex-row gap-3 items-center justify-between">
    <!-- Left: Search input -->
    <div class="w-full md:w-80">
      <UiInput
        :model-value="filters.search"
        placeholder="Search users by name, email..."
        @update:model-value="$emit('search', String($event))"
      >
        <template #prefix>
          <Search class="w-4 h-4" />
        </template>
      </UiInput>
    </div>

    <!-- Right: Filters dropdown & Reset -->
    <div class="w-full md:w-auto flex flex-wrap sm:flex-nowrap items-center gap-2.5">
      <div class="w-full sm:w-40">
        <UiSelect
          :model-value="filters.role"
          :options="roleOptions"
          placeholder="Filter by Role"
          @update:model-value="$emit('roleChange', String($event))"
        />
      </div>

      <div class="w-full sm:w-40">
        <UiSelect
          :model-value="filters.status"
          :options="statusOptions"
          placeholder="Filter by Status"
          @update:model-value="$emit('statusChange', String($event))"
        />
      </div>

      <UiButton
        v-if="hasActiveFilters"
        variant="ghost"
        size="md"
        @click="$emit('reset')"
        title="Reset filters"
      >
        <template #icon>
          <RotateCcw class="w-3.5 h-3.5" />
        </template>
        Reset
      </UiButton>
    </div>
  </div>
</template>
