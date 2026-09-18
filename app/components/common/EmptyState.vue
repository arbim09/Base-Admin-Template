<script setup lang="ts">
import { FolderSearch } from 'lucide-vue-next'

interface Props {
  title?: string
  description?: string
  actionLabel?: string
}

withDefaults(defineProps<Props>(), {
  title: 'No items found',
  description: 'There are no records matching your criteria yet.',
  actionLabel: '',
})

defineEmits<{
  (e: 'action'): void
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
    <div class="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-950/50 border border-brand-100 dark:border-brand-900/50 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4 shadow-soft">
      <slot name="icon">
        <FolderSearch class="w-7 h-7 stroke-[1.5]" />
      </slot>
    </div>

    <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">
      {{ title }}
    </h3>
    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm leading-relaxed">
      {{ description }}
    </p>

    <div v-if="actionLabel || $slots.action" class="mt-5">
      <slot name="action">
        <UiButton variant="primary" size="sm" @click="$emit('action')">
          {{ actionLabel }}
        </UiButton>
      </slot>
    </div>
  </div>
</template>
