<script setup lang="ts">
import type { RevenuePoint } from '~/types/dashboard'
import { formatCurrency } from '~/utils/formatters'

const props = defineProps<{
  data: RevenuePoint[]
}>()

const activePoint = ref<RevenuePoint | null>(null)
const activeIndex = ref<number | null>(null)

const maxVal = computed(() => {
  if (!props.data.length) return 100000
  return Math.max(...props.data.map((d) => d.revenue)) * 1.15
})

const width = 600
const height = 220
const padding = { top: 20, right: 20, bottom: 30, left: 20 }

const chartWidth = computed(() => width - padding.left - padding.right)
const chartHeight = computed(() => height - padding.top - padding.bottom)

// Compute points for SVG path
const points = computed(() => {
  if (!props.data.length) return []
  const step = chartWidth.value / (props.data.length - 1)
  return props.data.map((d, i) => {
    const x = padding.left + i * step
    const y = padding.top + chartHeight.value - (d.revenue / maxVal.value) * chartHeight.value
    return { x, y, data: d, index: i }
  })
})

const linePath = computed(() => {
  if (points.value.length < 2) return ''
  return points.value.reduce((acc, p, i, arr) => {
    if (i === 0) return `M ${p.x} ${p.y}`
    const prev = arr[i - 1]
    const cx1 = prev.x + (p.x - prev.x) / 2
    const cy1 = prev.y
    const cx2 = prev.x + (p.x - prev.x) / 2
    const cy2 = p.y
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p.x} ${p.y}`
  }, '')
})

const areaPath = computed(() => {
  if (!linePath.value || points.value.length === 0) return ''
  const first = points.value[0]
  const last = points.value[points.value.length - 1]
  const bottomY = padding.top + chartHeight.value
  return `${linePath.value} L ${last.x} ${bottomY} L ${first.x} ${bottomY} Z`
})

const setActive = (point: (typeof points.value)[0]) => {
  activePoint.value = point.data
  activeIndex.value = point.index
}

const clearActive = () => {
  activePoint.value = null
  activeIndex.value = null
}
</script>

<template>
  <div class="relative w-full">
    <!-- Active Tooltip Header -->
    <div class="flex items-center justify-between mb-3 text-xs">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-brand-500"></span>
        <span class="text-slate-600 dark:text-slate-300 font-medium">Revenue Growth</span>
      </div>

      <div v-if="activePoint" class="font-semibold text-brand-600 dark:text-brand-400">
        {{ activePoint.month }}: {{ formatCurrency(activePoint.revenue) }}
      </div>
      <div v-else class="text-slate-400">
        Hover points for details
      </div>
    </div>

    <!-- SVG Area Chart -->
    <div class="w-full overflow-hidden">
      <svg
        :viewBox="`0 0 ${width} ${height}`"
        class="w-full h-48 sm:h-56 overflow-visible"
      >
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#6366f1" stop-opacity="0.35" />
            <stop offset="100%" stop-color="#6366f1" stop-opacity="0.0" />
          </linearGradient>
        </defs>

        <!-- Subtle horizontal grid lines -->
        <g class="stroke-slate-200/60 dark:stroke-slate-800/80 stroke-dasharray-2">
          <line
            v-for="line in [0.25, 0.5, 0.75, 1]"
            :key="line"
            :x1="padding.left"
            :y1="padding.top + chartHeight * (1 - line)"
            :x2="width - padding.right"
            :y2="padding.top + chartHeight * (1 - line)"
            stroke-dasharray="3 3"
          />
        </g>

        <!-- Area Fill -->
        <path :d="areaPath" fill="url(#areaGradient)" />

        <!-- Smooth Curve Line -->
        <path
          :d="linePath"
          fill="none"
          stroke="#4f46e5"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="dark:stroke-brand-400 transition-all duration-300"
        />

        <!-- Hover vertical cursor line -->
        <line
          v-if="activeIndex !== null && points[activeIndex]"
          :x1="points[activeIndex].x"
          :y1="padding.top"
          :x2="points[activeIndex].x"
          :y2="padding.top + chartHeight"
          stroke="#818cf8"
          stroke-width="1.5"
          stroke-dasharray="2 2"
        />

        <!-- Interactive Data Points -->
        <g v-for="p in points" :key="p.index">
          <!-- Invisible larger hover target -->
          <circle
            :cx="p.x"
            :cy="p.y"
            r="14"
            fill="transparent"
            class="cursor-pointer"
            @mouseenter="setActive(p)"
            @mouseleave="clearActive"
          />

          <!-- Visible dot -->
          <circle
            :cx="p.x"
            :cy="p.y"
            :r="activeIndex === p.index ? 5.5 : 3.5"
            :class="[
              'transition-all duration-150 pointer-events-none',
              activeIndex === p.index
                ? 'fill-brand-600 stroke-white dark:stroke-slate-900 stroke-2'
                : 'fill-white stroke-brand-600 dark:fill-slate-900 stroke-2',
            ]"
          />

          <!-- Month Label -->
          <text
            :x="p.x"
            :y="height - 5"
            text-anchor="middle"
            class="text-[11px] fill-slate-400 font-medium select-none"
          >
            {{ p.data.month }}
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>
