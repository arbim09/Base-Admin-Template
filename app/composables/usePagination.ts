import type { PaginationMeta } from '~/types/common'

export function usePagination(initialPage = 1, initialLimit = 10) {
  const page = ref(initialPage)
  const limit = ref(initialLimit)
  const totalItems = ref(0)

  const totalPages = computed(() => Math.max(1, Math.ceil(totalItems.value / limit.value)))
  const hasNextPage = computed(() => page.value < totalPages.value)
  const hasPrevPage = computed(() => page.value > 1)

  const setPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages.value) {
      page.value = newPage
    }
  }

  const nextPage = () => {
    if (hasNextPage.value) {
      page.value++
    }
  }

  const prevPage = () => {
    if (hasPrevPage.value) {
      page.value--
    }
  }

  const setLimit = (newLimit: number) => {
    limit.value = newLimit
    page.value = 1 // Reset to first page
  }

  const setTotal = (total: number) => {
    totalItems.value = total
  }

  const meta = computed<PaginationMeta>(() => ({
    currentPage: page.value,
    perPage: limit.value,
    totalItems: totalItems.value,
    totalPages: totalPages.value,
    hasNextPage: hasNextPage.value,
    hasPrevPage: hasPrevPage.value,
  }))

  return {
    page,
    limit,
    totalItems,
    totalPages,
    hasNextPage,
    hasPrevPage,
    setPage,
    nextPage,
    prevPage,
    setLimit,
    setTotal,
    meta,
  }
}
