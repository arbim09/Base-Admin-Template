<script setup lang="ts">
import {
  ArrowDownLeft,
  ArrowUpRight,
  Filter,
  Layers,
} from 'lucide-vue-next'
import type { TableColumn } from '~/types/ui'
import { formatCurrency, formatDate } from '~/utils/formatters'

interface LedgerEntry {
  id: string
  txRef: string
  date: string
  description: string
  category: string
  type: 'credit' | 'debit'
  amount: number
  balance: number
  status: 'settled' | 'processing'
}

const entries = ref<LedgerEntry[]>([
  {
    id: 'tx-1',
    txRef: 'TXN-94021',
    date: '2025-06-18T16:20:00Z',
    description: 'Enterprise Client Annual Subscription (Plan Tier 3)',
    category: 'Revenue',
    type: 'credit',
    amount: 14500.0,
    balance: 142350.0,
    status: 'settled',
  },
  {
    id: 'tx-2',
    txRef: 'TXN-94022',
    date: '2025-06-18T14:05:00Z',
    description: 'AWS Cloud Infrastructure Cluster Hosting Invoice',
    category: 'Cloud Services',
    type: 'debit',
    amount: 3240.5,
    balance: 127850.0,
    status: 'settled',
  },
  {
    id: 'tx-3',
    txRef: 'TXN-94023',
    date: '2025-06-17T11:45:00Z',
    description: 'OpenAI API Token Usage & Fine-Tuning Quota',
    category: 'AI Infrastructure',
    type: 'debit',
    amount: 1180.0,
    balance: 131090.5,
    status: 'settled',
  },
  {
    id: 'tx-4',
    txRef: 'TXN-94024',
    date: '2025-06-17T09:12:00Z',
    description: 'Stripe Merchant Payout Automatic Transfer',
    category: 'Sales Inflow',
    type: 'credit',
    amount: 8940.0,
    balance: 132270.5,
    status: 'settled',
  },
  {
    id: 'tx-5',
    txRef: 'TXN-94025',
    date: '2025-06-16T15:30:00Z',
    description: 'Freelance UI/UX Specialist Contract Retainer',
    category: 'Contractors',
    type: 'debit',
    amount: 2500.0,
    balance: 123330.5,
    status: 'processing',
  },
])

// Table View Modifiers
const isCompact = ref(true)
const isStriped = ref(true)
const typeFilter = ref<'all' | 'credit' | 'debit'>('all')

const columns: TableColumn[] = [
  { key: 'txRef', label: 'Reference', width: 'w-28' },
  { key: 'date', label: 'Timestamp' },
  { key: 'description', label: 'Transaction Details', width: 'w-72' },
  { key: 'category', label: 'Category' },
  { key: 'amount', label: 'Amount', align: 'right' },
  { key: 'balance', label: 'Running Balance', align: 'right' },
  { key: 'status', label: 'Status' },
]

const filteredEntries = computed(() => {
  if (typeFilter.value === 'all') return entries.value
  return entries.value.filter((e) => e.type === typeFilter.value)
})

const totalCredit = computed(() =>
  entries.value
    .filter((e) => e.type === 'credit')
    .reduce((acc, curr) => acc + curr.amount, 0)
)

const totalDebit = computed(() =>
  entries.value
    .filter((e) => e.type === 'debit')
    .reduce((acc, curr) => acc + curr.amount, 0)
)
</script>

<template>
  <div class="space-y-4">
    <!-- Controls Toolbar & Summary Chips -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft">
      <!-- Inflow / Outflow summary indicators -->
      <div class="flex flex-wrap items-center gap-4 text-xs">
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center">
            <ArrowDownLeft class="w-4 h-4" />
          </div>
          <div>
            <span class="text-slate-400 text-[10px] uppercase font-semibold">Total Inflow</span>
            <p class="font-mono font-bold text-emerald-600 dark:text-emerald-400">{{ formatCurrency(totalCredit) }}</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 flex items-center justify-center">
            <ArrowUpRight class="w-4 h-4" />
          </div>
          <div>
            <span class="text-slate-400 text-[10px] uppercase font-semibold">Total Outflow</span>
            <p class="font-mono font-bold text-rose-600 dark:text-rose-400">{{ formatCurrency(totalDebit) }}</p>
          </div>
        </div>
      </div>

      <!-- Display Toggles -->
      <div class="flex items-center gap-4 text-xs">
        <!-- Filter Pills -->
        <div class="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          <button
            type="button"
            @click="typeFilter = 'all'"
            :class="['px-2.5 py-1 rounded-lg font-medium transition-colors', typeFilter === 'all' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-soft-sm' : '']"
          >
            All
          </button>
          <button
            type="button"
            @click="typeFilter = 'credit'"
            :class="['px-2.5 py-1 rounded-lg font-medium transition-colors', typeFilter === 'credit' ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-soft-sm' : '']"
          >
            Credits
          </button>
          <button
            type="button"
            @click="typeFilter = 'debit'"
            :class="['px-2.5 py-1 rounded-lg font-medium transition-colors', typeFilter === 'debit' ? 'bg-white dark:bg-slate-900 text-rose-600 shadow-soft-sm' : '']"
          >
            Debits
          </button>
        </div>

        <!-- Density & Zebra Toggles -->
        <button
          type="button"
          @click="isCompact = !isCompact"
          :class="['px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors', isCompact ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300' : 'border-slate-200 dark:border-slate-800 text-slate-500']"
          title="Toggle row density"
        >
          {{ isCompact ? 'Compact: On' : 'Compact: Off' }}
        </button>

        <button
          type="button"
          @click="isStriped = !isStriped"
          :class="['px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors', isStriped ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300' : 'border-slate-200 dark:border-slate-800 text-slate-500']"
          title="Toggle zebra striping"
        >
          {{ isStriped ? 'Zebra: On' : 'Zebra: Off' }}
        </button>
      </div>
    </div>

    <!-- Table -->
    <UiDataTable
      :columns="columns"
      :items="filteredEntries"
      :compact="isCompact"
      :striped="isStriped"
    >
      <!-- Reference Code -->
      <template #cell(txRef)="{ value }">
        <span class="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
          {{ value }}
        </span>
      </template>

      <!-- Timestamp -->
      <template #cell(date)="{ value }">
        <span class="text-xs text-slate-500 dark:text-slate-400">
          {{ formatDate(value, true) }}
        </span>
      </template>

      <!-- Description -->
      <template #cell(description)="{ value }">
        <span class="text-xs font-medium text-slate-800 dark:text-slate-200 truncate block">
          {{ value }}
        </span>
      </template>

      <!-- Category -->
      <template #cell(category)="{ value }">
        <UiBadge variant="neutral" size="sm">
          {{ value }}
        </UiBadge>
      </template>

      <!-- Amount (+ / -) -->
      <template #cell(amount)="{ row }">
        <span
          :class="[
            'font-mono text-xs font-bold',
            row.type === 'credit' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400',
          ]"
        >
          {{ row.type === 'credit' ? '+' : '-' }}{{ formatCurrency(row.amount) }}
        </span>
      </template>

      <!-- Balance -->
      <template #cell(balance)="{ value }">
        <span class="font-mono text-xs text-slate-700 dark:text-slate-300 font-semibold">
          {{ formatCurrency(value) }}
        </span>
      </template>

      <!-- Status -->
      <template #cell(status)="{ value }">
        <UiBadge :variant="value === 'settled' ? 'success' : 'warning'" size="sm" dot class="capitalize">
          {{ value }}
        </UiBadge>
      </template>
    </UiDataTable>
  </div>
</template>
