<script setup lang="ts">
import { AlertCircle, RotateCcw } from 'lucide-vue-next'

interface Props {
  title?: string
  message?: string
  showRetry?: boolean
}

withDefaults(defineProps<Props>(), {
  title: 'Something went wrong',
  message: 'An unexpected error occurred while loading this section.',
  showRetry: true,
})

defineEmits<{
  (e: 'retry'): void
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
    <div class="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-100 dark:border-rose-900/50 flex items-center justify-center text-rose-600 dark:text-rose-400 mb-4 shadow-soft">
      <AlertCircle class="w-7 h-7 stroke-[1.5]" />
    </div>

    <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">
      {{ title }}
    </h3>
    <p class="text-xs text-rose-500/90 dark:text-rose-400 mt-1 max-w-sm leading-relaxed">
      {{ message }}
    </p>

    <div v-if="showRetry" class="mt-5">
      <UiButton variant="outline" size="sm" @click="$emit('retry')">
        <template #icon>
          <RotateCcw class="w-3.5 h-3.5 mr-1" />
        </template>
        Try Again
      </UiButton>
    </div>
  </div>
</template>
