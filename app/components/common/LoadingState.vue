<script setup lang="ts">
interface Props {
  message?: string
  submessage?: string
}

withDefaults(defineProps<Props>(), {
  message: 'Loading data...',
  submessage: 'Please wait while we fetch the latest information.',
})
</script>

<template>
  <div class="flex flex-col items-center justify-center p-12 text-center">
    <div class="relative w-12 h-12 mb-4">
      <div class="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-800"></div>
      <div class="absolute inset-0 rounded-full border-4 border-brand-600 border-t-transparent animate-spin"></div>
    </div>
    <h4 class="text-sm font-semibold text-slate-800 dark:text-slate-200">{{ message }}</h4>
    <p v-if="submessage" class="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
      {{ submessage }}
    </p>
  </div>
</template>
