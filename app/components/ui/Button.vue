<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'warning' | 'success'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  disabled?: boolean
  to?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  loading: false,
  disabled: false,
  to: undefined,
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-sm hover:shadow-glow focus:ring-brand-500/30'
    case 'secondary':
      return 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 focus:ring-slate-400/20'
    case 'outline':
      return 'border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 focus:ring-brand-500/20'
    case 'ghost':
      return 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 focus:ring-slate-400/20'
    case 'danger':
      return 'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-sm focus:ring-rose-500/30'
    case 'warning':
      return 'bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700 shadow-sm focus:ring-amber-500/30'
    case 'success':
      return 'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 shadow-sm focus:ring-emerald-500/30'
    default:
      return 'bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-500/30'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-1.5 text-xs font-medium rounded-lg gap-1.5'
    case 'lg':
      return 'px-5 py-3 text-base font-semibold rounded-xl gap-2.5'
    case 'md':
    default:
      return 'px-4 py-2 text-sm font-medium rounded-xl gap-2'
  }
})
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="[
      'inline-flex items-center justify-center font-medium transition-all duration-200 select-none outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
      variantClasses,
      sizeClasses,
    ]"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-0.5 h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
    </svg>
    <slot name="icon" v-if="!loading" />
    <slot />
    <slot name="iconRight" />
  </NuxtLink>

  <button
    v-else
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center font-medium transition-all duration-200 select-none outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
      variantClasses,
      sizeClasses,
    ]"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-0.5 h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
    </svg>
    <slot name="icon" v-if="!loading" />
    <slot />
    <slot name="iconRight" />
  </button>
</template>
