<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  padding?: boolean
  hoverEffect?: boolean
}

withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  padding: true,
  hoverEffect: false,
})
</script>

<template>
  <div
    :class="[
      'bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-soft transition-all duration-200 overflow-hidden',
      hoverEffect ? 'hover:shadow-soft-md hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5' : '',
    ]"
  >
    <div
      v-if="title || $slots.header || $slots.headerAction"
      class="px-5 py-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between"
    >
      <div>
        <slot name="header">
          <h3 v-if="title" class="font-semibold text-slate-900 dark:text-slate-100 text-sm md:text-base">
            {{ title }}
          </h3>
          <p v-if="subtitle" class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {{ subtitle }}
          </p>
        </slot>
      </div>
      <div v-if="$slots.headerAction">
        <slot name="headerAction" />
      </div>
    </div>

    <div :class="padding ? 'p-5' : ''">
      <slot />
    </div>

    <div
      v-if="$slots.footer"
      class="px-5 py-3 bg-slate-50/60 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
