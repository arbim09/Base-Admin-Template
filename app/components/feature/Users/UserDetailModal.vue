<script setup lang="ts">
import { Mail, Phone, Building2, Calendar, Shield } from 'lucide-vue-next'
import type { UserItem } from '~/types/user'
import { formatDate } from '~/utils/formatters'
import { getInitials } from '~/utils/helpers'

defineProps<{
  modelValue: boolean
  user: UserItem | null
}>()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const getStatusBadgeVariant = (status?: string) => {
  switch (status) {
    case 'active':
      return 'success'
    case 'inactive':
      return 'neutral'
    case 'pending':
      return 'warning'
    default:
      return 'neutral'
  }
}
</script>

<template>
  <UiModal
    :model-value="modelValue"
    title="Member Details"
    size="md"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div v-if="user" class="space-y-6">
      <!-- Profile Header -->
      <div class="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <img
          v-if="user.avatar"
          :src="user.avatar"
          :alt="user.name"
          class="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-500/20 shadow-soft"
        />
        <div
          v-else
          class="w-16 h-16 rounded-2xl bg-brand-600 text-white flex items-center justify-center text-lg font-bold shadow-soft"
        >
          {{ getInitials(user.name) }}
        </div>

        <div>
          <h3 class="text-base font-bold text-slate-900 dark:text-slate-100">
            {{ user.name }}
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {{ user.department || 'Workspace Member' }}
          </p>
          <div class="flex items-center gap-2 mt-2">
            <UiBadge :variant="getStatusBadgeVariant(user.status)" dot size="sm">
              {{ user.status }}
            </UiBadge>
            <UiBadge variant="brand" size="sm">
              {{ user.role }}
            </UiBadge>
          </div>
        </div>
      </div>

      <!-- Information List -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <span class="text-slate-400 flex items-center gap-1.5 mb-1">
            <Mail class="w-3.5 h-3.5" /> Email
          </span>
          <span class="font-medium text-slate-800 dark:text-slate-200 break-all">
            {{ user.email }}
          </span>
        </div>

        <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <span class="text-slate-400 flex items-center gap-1.5 mb-1">
            <Phone class="w-3.5 h-3.5" /> Phone
          </span>
          <span class="font-medium text-slate-800 dark:text-slate-200">
            {{ user.phone || 'Not provided' }}
          </span>
        </div>

        <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <span class="text-slate-400 flex items-center gap-1.5 mb-1">
            <Building2 class="w-3.5 h-3.5" /> Department
          </span>
          <span class="font-medium text-slate-800 dark:text-slate-200">
            {{ user.department || 'General' }}
          </span>
        </div>

        <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <span class="text-slate-400 flex items-center gap-1.5 mb-1">
            <Calendar class="w-3.5 h-3.5" /> Joined Date
          </span>
          <span class="font-medium text-slate-800 dark:text-slate-200">
            {{ formatDate(user.createdAt, true) }}
          </span>
        </div>
      </div>
    </div>

    <template #footer>
      <UiButton
        variant="secondary"
        size="md"
        @click="$emit('update:modelValue', false)"
      >
        Close
      </UiButton>
    </template>
  </UiModal>
</template>
