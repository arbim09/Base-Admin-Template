<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import type { PaginationMeta } from '~/types/common'

interface Props {
  meta: PaginationMeta
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'change', page: number): void
}>()

const fromItem = computed(() => {
  if (props.meta.totalItems === 0) return 0
  return (props.meta.currentPage - 1) * props.meta.perPage + 1
})

const toItem = computed(() => {
  return Math.min(props.meta.currentPage * props.meta.perPage, props.meta.totalItems)
})

const visiblePages = computed(() => {
  const current = props.meta.currentPage
  const total = props.meta.totalPages
  const delta = 1
  const pages: (number | string)[] = []

  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    pages.push(i)
  }

  if (current - delta > 2) {
    pages.unshift('...')
  }
  if (current + delta < total - 1) {
    pages.push('...')
  }

  pages.unshift(1)
  if (total > 1) {
    pages.push(total)
  }

  return pages
})

const goToPage = (page: number | string) => {
  if (typeof page === 'number' && page !== props.meta.currentPage && page >= 1 && page <= props.meta.totalPages) {
    emit('change', page)
  }
}
</script>

<template>
  <div class="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 py-3">
    <div class="text-xs text-slate-500 dark:text-slate-400">
      Showing <span class="font-semibold text-slate-700 dark:text-slate-200">{{ fromItem }}</span> to
      <span class="font-semibold text-slate-700 dark:text-slate-200">{{ toItem }}</span> of
      <span class="font-semibold text-slate-700 dark:text-slate-200">{{ meta.totalItems }}</span> results
    </div>

    <div class="flex items-center gap-1">
      <button
        type="button"
        :disabled="!meta.hasPrevPage"
        @click="goToPage(meta.currentPage - 1)"
        class="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft class="w-4 h-4" />
      </button>

      <template v-for="(p, index) in visiblePages" :key="index">
        <span
          v-if="p === '...'"
          class="px-2 py-1 text-xs text-slate-400 select-none"
        >
          ...
        </span>
        <button
          v-else
          type="button"
          @click="goToPage(p)"
          :class="[
            'min-w-[32px] h-8 px-2 text-xs font-medium rounded-lg transition-colors',
            p === meta.currentPage
              ? 'bg-brand-600 text-white shadow-soft-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700',
          ]"
        >
          {{ p }}
        </button>
      </template>

      <button
        type="button"
        :disabled="!meta.hasNextPage"
        @click="goToPage(meta.currentPage + 1)"
        class="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <ChevronRight class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
