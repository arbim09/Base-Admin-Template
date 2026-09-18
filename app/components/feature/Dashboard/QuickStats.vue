<script setup lang="ts">
const resourceStats = [
  {
    label: 'Cloud Database Storage',
    used: '3.4 GB',
    total: '5.0 GB',
    percentage: 68,
    colorClass: 'bg-brand-600',
  },
  {
    label: 'API Request Quota',
    used: '42.1K',
    total: '100K',
    percentage: 42,
    colorClass: 'bg-emerald-500',
  },
  {
    label: 'Seat Licenses',
    used: '17',
    total: '20',
    percentage: 85,
    colorClass: 'bg-amber-500',
  },
]
</script>

<template>
  <div class="space-y-4">
    <div v-for="(stat, index) in resourceStats" :key="index" class="space-y-1.5">
      <div class="flex items-center justify-between text-xs">
        <span class="font-medium text-slate-700 dark:text-slate-300">{{ stat.label }}</span>
        <span class="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
          {{ stat.used }} / {{ stat.total }}
        </span>
      </div>

      <div class="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          :class="['h-full rounded-full transition-all duration-500 ease-out', stat.colorClass]"
          :style="{ width: `${stat.percentage}%` }"
        />
      </div>
    </div>
  </div>
</template>
