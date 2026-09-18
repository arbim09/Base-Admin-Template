<script setup lang="ts">
import type { ActivityItem } from '~/types/dashboard'
import { getInitials } from '~/utils/helpers'

defineProps<{
  activities: ActivityItem[]
}>()

const getBadgeVariant = (type: string): 'brand' | 'success' | 'warning' | 'danger' | 'info' => {
  switch (type) {
    case 'create':
      return 'success'
    case 'update':
      return 'brand'
    case 'delete':
      return 'danger'
    case 'auth':
    default:
      return 'info'
  }
}
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="act in activities"
      :key="act.id"
      class="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
    >
      <img
        v-if="act.user.avatar"
        :src="act.user.avatar"
        :alt="act.user.name"
        class="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800 flex-shrink-0"
      />
      <div
        v-else
        class="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs font-semibold flex-shrink-0"
      >
        {{ getInitials(act.user.name) }}
      </div>

      <div class="flex-1 min-w-0">
        <p class="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
          <span class="font-semibold text-slate-900 dark:text-slate-100">{{ act.user.name }}</span>
          {{ ' ' }}{{ act.action }}{{ ' ' }}
          <span class="font-medium text-brand-600 dark:text-brand-400">{{ act.target }}</span>
        </p>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-[11px] text-slate-400">{{ act.timeAgo }}</span>
          <span class="text-slate-300 dark:text-slate-700">&bull;</span>
          <UiBadge :variant="getBadgeVariant(act.type)" size="sm">
            {{ act.type }}
          </UiBadge>
        </div>
      </div>
    </div>
  </div>
</template>
