<script setup lang="ts">
interface Props {
  variant?: 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  size?: 'sm' | 'md'
  dot?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'brand',
  size: 'md',
  dot: false,
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'brand':
      return 'bg-brand-50 text-brand-700 border-brand-200/60 dark:bg-brand-950/40 dark:text-brand-300 dark:border-brand-800/60'
    case 'success':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60'
    case 'warning':
      return 'bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60'
    case 'danger':
      return 'bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/60'
    case 'info':
      return 'bg-sky-50 text-sky-700 border-sky-200/60 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800/60'
    case 'neutral':
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
  }
})

const dotColor = computed(() => {
  switch (props.variant) {
    case 'brand':
      return 'bg-brand-500'
    case 'success':
      return 'bg-emerald-500'
    case 'warning':
      return 'bg-amber-500'
    case 'danger':
      return 'bg-rose-500'
    case 'info':
      return 'bg-sky-500'
    case 'neutral':
    default:
      return 'bg-slate-400'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-2 py-0.5 text-[11px] gap-1'
    case 'md':
    default:
      return 'px-2.5 py-1 text-xs gap-1.5'
  }
})
</script>

<template>
  <span
    :class="[
      'inline-flex items-center font-medium rounded-full border transition-colors select-none',
      variantClasses,
      sizeClasses,
    ]"
  >
    <span v-if="dot" :class="['w-1.5 h-1.5 rounded-full', dotColor]" />
    <slot />
  </span>
</template>
