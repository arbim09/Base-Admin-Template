<script setup lang="ts">
import { ChevronRight, Home } from 'lucide-vue-next'

const route = useRoute()

const breadcrumbs = computed(() => {
  const path = route.path.replace(/^\/|\/$/g, '')
  if (!path) {
    return [{ label: 'Dashboard', to: '/dashboard' }]
  }

  const segments = path.split('/')
  const items = [{ label: 'Home', to: '/dashboard' }]

  let accumulatedPath = ''
  segments.forEach((seg, idx) => {
    accumulatedPath += `/${seg}`
    // Format segment label (e.g. "components-gallery" -> "UI Components")
    let label = seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    if (seg === 'components-gallery') label = 'UI Components'

    items.push({
      label,
      to: idx === segments.length - 1 ? '' : accumulatedPath,
    })
  })

  return items
})
</script>

<template>
  <nav aria-label="Breadcrumb" class="hidden sm:flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
    <template v-for="(item, index) in breadcrumbs" :key="index">
      <div class="flex items-center">
        <ChevronRight v-if="index > 0" class="w-3.5 h-3.5 mx-1.5 text-slate-300 dark:text-slate-600 flex-shrink-0" />
        <NuxtLink
          v-if="item.to"
          :to="item.to"
          class="hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium flex items-center gap-1"
        >
          <Home v-if="index === 0" class="w-3 h-3" />
          <span>{{ item.label }}</span>
        </NuxtLink>
        <span v-else class="font-semibold text-slate-800 dark:text-slate-200">
          {{ item.label }}
        </span>
      </div>
    </template>
  </nav>
</template>
