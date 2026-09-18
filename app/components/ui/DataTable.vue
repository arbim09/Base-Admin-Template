<script setup lang="ts">
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronRight,
  Check,
} from 'lucide-vue-next'
import type { TableColumn, SortOrder } from '~/types/ui'

interface Props {
  columns: TableColumn[]
  items: Record<string, any>[]
  loading?: boolean
  rowKey?: string
  selectable?: boolean
  selectedKeys?: (string | number)[]
  sortKey?: string
  sortOrder?: SortOrder
  striped?: boolean
  compact?: boolean
  expandable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  rowKey: 'id',
  selectable: false,
  selectedKeys: () => [],
  sortKey: '',
  sortOrder: null,
  striped: false,
  compact: false,
  expandable: false,
})

const emit = defineEmits<{
  (e: 'sort', key: string): void
  (e: 'update:selectedKeys', keys: (string | number)[]): void
  (e: 'rowClick', row: Record<string, any>): void
}>()

// Internal expanded rows tracking
const expandedRows = ref<Set<string | number>>(new Set())

const toggleExpand = (id: string | number) => {
  if (expandedRows.value.has(id)) {
    expandedRows.value.delete(id)
  } else {
    expandedRows.value.add(id)
  }
}

const isExpanded = (id: string | number) => expandedRows.value.has(id)

// Selection handling
const isAllSelected = computed(() => {
  if (!props.items.length) return false
  return props.items.every((item) => props.selectedKeys.includes(item[props.rowKey]))
})

const isSomeSelected = computed(() => {
  if (!props.items.length) return false
  const selectedCount = props.items.filter((item) =>
    props.selectedKeys.includes(item[props.rowKey])
  ).length
  return selectedCount > 0 && selectedCount < props.items.length
})

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    emit('update:selectedKeys', [])
  } else {
    const allIds = props.items.map((item) => item[props.rowKey])
    emit('update:selectedKeys', allIds)
  }
}

const toggleSelectRow = (id: string | number) => {
  const current = [...props.selectedKeys]
  const index = current.indexOf(id)
  if (index > -1) {
    current.splice(index, 1)
  } else {
    current.push(id)
  }
  emit('update:selectedKeys', current)
}

const isRowSelected = (id: string | number) => props.selectedKeys.includes(id)

const handleHeaderClick = (col: TableColumn) => {
  if (col.sortable) {
    emit('sort', col.key)
  }
}

const totalColSpan = computed(() => {
  let count = props.columns.length
  if (props.selectable) count++
  if (props.expandable) count++
  return count
})

const getAlignmentClass = (align?: 'left' | 'center' | 'right') => {
  switch (align) {
    case 'center':
      return 'text-center'
    case 'right':
      return 'text-right'
    case 'left':
    default:
      return 'text-left'
  }
}
</script>

<template>
  <div class="w-full overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-soft">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm text-slate-700 dark:text-slate-200">
        <!-- Header -->
        <thead class="bg-slate-50/75 dark:bg-slate-950/50 text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-200/80 dark:border-slate-800/80">
          <tr>
            <!-- Optional Expand Toggle Column Header -->
            <th v-if="expandable" class="w-10 px-3 py-3.5 text-center">
              <span class="sr-only">Expand</span>
            </th>

            <!-- Optional Checkbox Column Header -->
            <th v-if="selectable" class="w-10 px-4 py-3.5 text-center">
              <div
                @click="toggleSelectAll"
                :class="[
                  'w-4 h-4 rounded-md border flex items-center justify-center cursor-pointer transition-colors',
                  isAllSelected
                    ? 'bg-brand-600 border-brand-600 text-white'
                    : isSomeSelected
                    ? 'bg-brand-100 border-brand-500 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                    : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-slate-400',
                ]"
              >
                <Check v-if="isAllSelected" class="w-3 h-3 stroke-[3]" />
                <span v-else-if="isSomeSelected" class="w-2 h-0.5 bg-brand-600 rounded-full" />
              </div>
            </th>

            <!-- Main Data Column Headers -->
            <th
              v-for="col in columns"
              :key="col.key"
              scope="col"
              @click="handleHeaderClick(col)"
              :class="[
                'tracking-wider select-none',
                compact ? 'px-4 py-2.5 text-[11px]' : 'px-5 py-3.5',
                col.sortable ? 'cursor-pointer hover:text-slate-800 dark:hover:text-slate-100' : '',
                getAlignmentClass(col.align),
                col.width || '',
              ]"
            >
              <div
                :class="[
                  'inline-flex items-center gap-1.5',
                  col.align === 'right' ? 'justify-end' : col.align === 'center' ? 'justify-center' : 'justify-start',
                ]"
              >
                <span>{{ col.label }}</span>
                <span v-if="col.sortable" class="text-slate-400">
                  <ChevronUp v-if="sortKey === col.key && sortOrder === 'asc'" class="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 stroke-[2.5]" />
                  <ChevronDown v-else-if="sortKey === col.key && sortOrder === 'desc'" class="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 stroke-[2.5]" />
                  <ChevronsUpDown v-else class="w-3.5 h-3.5 opacity-40 hover:opacity-100 transition-opacity" />
                </span>
              </div>
            </th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody class="divide-y divide-slate-100 dark:divide-slate-800/70">
          <!-- Loading skeleton rows -->
          <template v-if="loading">
            <tr v-for="n in 5" :key="n" class="animate-pulse">
              <td v-if="expandable" class="px-3 py-4">
                <div class="w-4 h-4 bg-slate-200 dark:bg-slate-800 rounded"></div>
              </td>
              <td v-if="selectable" class="px-4 py-4">
                <div class="w-4 h-4 bg-slate-200 dark:bg-slate-800 rounded"></div>
              </td>
              <td v-for="col in columns" :key="col.key" :class="compact ? 'px-4 py-2.5' : 'px-5 py-4'">
                <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4"></div>
              </td>
            </tr>
          </template>

          <!-- Empty State -->
          <tr v-else-if="items.length === 0">
            <td :colspan="totalColSpan" class="px-5 py-12 text-center">
              <slot name="empty">
                <div class="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                  <p class="text-sm font-medium">No records found</p>
                  <p class="text-xs text-slate-400 mt-1">Try adjusting your filters or search query.</p>
                </div>
              </slot>
            </td>
          </tr>

          <!-- Data Rows -->
          <template v-else>
            <template
              v-for="(row, rowIndex) in items"
              :key="row[rowKey] || rowIndex"
            >
              <tr
                @click="$emit('rowClick', row)"
                :class="[
                  'transition-colors',
                  striped ? 'even:bg-slate-50/50 dark:even:bg-slate-800/20' : '',
                  isRowSelected(row[rowKey])
                    ? 'bg-brand-50/40 dark:bg-brand-950/30'
                    : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/40',
                ]"
              >
                <!-- Expand Chevron Cell -->
                <td v-if="expandable" class="w-10 px-3 text-center">
                  <button
                    type="button"
                    @click.stop="toggleExpand(row[rowKey])"
                    class="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-transform duration-200"
                    :class="{ 'rotate-90 text-brand-600 dark:text-brand-400': isExpanded(row[rowKey]) }"
                    aria-label="Toggle row details"
                  >
                    <ChevronRight class="w-4 h-4" />
                  </button>
                </td>

                <!-- Selection Checkbox Cell -->
                <td v-if="selectable" class="w-10 px-4 text-center">
                  <div
                    @click.stop="toggleSelectRow(row[rowKey])"
                    :class="[
                      'w-4 h-4 rounded-md border flex items-center justify-center cursor-pointer transition-colors',
                      isRowSelected(row[rowKey])
                        ? 'bg-brand-600 border-brand-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-slate-400',
                    ]"
                  >
                    <Check v-if="isRowSelected(row[rowKey])" class="w-3 h-3 stroke-[3]" />
                  </div>
                </td>

                <!-- Columns Data -->
                <td
                  v-for="col in columns"
                  :key="col.key"
                  :class="[
                    'whitespace-nowrap',
                    compact ? 'px-4 py-2.5 text-xs' : 'px-5 py-4',
                    getAlignmentClass(col.align),
                  ]"
                >
                  <slot
                    :name="`cell(${col.key})`"
                    :row="row"
                    :value="row[col.key]"
                    :column="col"
                  >
                    <span class="font-normal">{{ row[col.key] ?? '-' }}</span>
                  </slot>
                </td>
              </tr>

              <!-- Expandable Content Sub-Row -->
              <tr
                v-if="expandable && isExpanded(row[rowKey])"
                class="bg-slate-50/80 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800"
              >
                <td :colspan="totalColSpan" class="px-6 py-4">
                  <slot name="expanded" :row="row" />
                </td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Optional Footer / Pagination Slot -->
    <div v-if="$slots.footer" class="border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-950/20 px-4 py-3">
      <slot name="footer" />
    </div>
  </div>
</template>
