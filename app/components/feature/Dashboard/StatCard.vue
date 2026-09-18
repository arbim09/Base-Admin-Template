<script setup lang="ts">
import {
  DollarSign,
  Users,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-vue-next'
import type { MetricStat } from '~/types/dashboard'

const props = defineProps<{
  stat: MetricStat
}>()

const iconComponent = computed(() => {
  switch (props.stat.iconName) {
    case 'DollarSign':
      return DollarSign
    case 'Users':
      return Users
    case 'TrendingUp':
      return TrendingUp
    case 'Activity':
    default:
      return Activity
  }
})

const colorClasses = computed(() => {
  switch (props.stat.color) {
    case 'indigo':
      return {
        iconBg: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/40',
      }
    case 'emerald':
      return {
        iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/40',
      }
    case 'amber':
      return {
        iconBg: 'bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400 border-amber-100 dark:border-amber-900/40',
      }
    case 'rose':
    default:
      return {
        iconBg: 'bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 border-rose-100 dark:border-rose-900/40',
      }
  }
})
</script>

<template>
  <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 shadow-soft hover:shadow-soft-md transition-all duration-200">
    <div class="flex items-center justify-between">
      <span class="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        {{ stat.label }}
      </span>

      <div :class="['w-10 h-10 rounded-xl flex items-center justify-center border transition-transform duration-200 group-hover:scale-105', colorClasses.iconBg]">
        <component :is="iconComponent" class="w-5 h-5" />
      </div>
    </div>

    <div class="mt-4 flex items-baseline justify-between">
      <div class="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        {{ stat.value }}
      </div>

      <div
        :class="[
          'inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full',
          stat.isPositive
            ? 'text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40'
            : 'text-rose-700 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/40',
        ]"
      >
        <ArrowUpRight v-if="stat.isPositive" class="w-3.5 h-3.5 mr-0.5" />
        <ArrowDownRight v-else class="w-3.5 h-3.5 mr-0.5" />
        {{ Math.abs(stat.changePercentage) }}%
      </div>
    </div>

    <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
      {{ stat.comparisonText }}
    </p>
  </div>
</template>
