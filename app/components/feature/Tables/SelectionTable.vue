<script setup lang="ts">
import {
  Download,
  CheckCircle2,
  Trash2,
  Printer,
  ShoppingBag,
  ExternalLink,
} from 'lucide-vue-next'
import type { TableColumn, SortOrder } from '~/types/ui'
import { formatCurrency, formatDate } from '~/utils/formatters'
import { getInitials } from '~/utils/helpers'

const toast = useToast()

interface OrderItem {
  id: string
  orderNumber: string
  customer: {
    name: string
    email: string
    avatar?: string
  }
  itemsCount: number
  totalAmount: number
  status: 'paid' | 'pending' | 'refunded'
  paymentMethod: string
  createdAt: string
}

const orders = ref<OrderItem[]>([
  {
    id: 'ord-101',
    orderNumber: '#ORD-8492',
    customer: {
      name: 'Sophia Montgomery',
      email: 'sophia.m@domain.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    itemsCount: 3,
    totalAmount: 489.0,
    status: 'paid',
    paymentMethod: 'Credit Card (Stripe)',
    createdAt: '2025-06-18T10:30:00Z',
  },
  {
    id: 'ord-102',
    orderNumber: '#ORD-8493',
    customer: {
      name: 'Liam Vance',
      email: 'liam.v@domain.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    itemsCount: 1,
    totalAmount: 129.5,
    status: 'pending',
    paymentMethod: 'Bank Transfer',
    createdAt: '2025-06-18T11:15:00Z',
  },
  {
    id: 'ord-103',
    orderNumber: '#ORD-8494',
    customer: {
      name: 'Amina Idris',
      email: 'amina.i@domain.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    },
    itemsCount: 5,
    totalAmount: 1120.0,
    status: 'paid',
    paymentMethod: 'PayPal',
    createdAt: '2025-06-17T14:45:00Z',
  },
  {
    id: 'ord-104',
    orderNumber: '#ORD-8495',
    customer: {
      name: 'Oliver Thorne',
      email: 'oliver.t@domain.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    },
    itemsCount: 2,
    totalAmount: 245.0,
    status: 'refunded',
    paymentMethod: 'Credit Card (Stripe)',
    createdAt: '2025-06-16T09:20:00Z',
  },
  {
    id: 'ord-105',
    orderNumber: '#ORD-8496',
    customer: {
      name: 'Chloe Zhang',
      email: 'chloe.z@domain.com',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    },
    itemsCount: 4,
    totalAmount: 760.0,
    status: 'paid',
    paymentMethod: 'Apple Pay',
    createdAt: '2025-06-15T16:10:00Z',
  },
])

const selectedKeys = ref<(string | number)[]>([])
const sortKey = ref('createdAt')
const sortOrder = ref<SortOrder>('desc')

const columns: TableColumn[] = [
  { key: 'orderNumber', label: 'Order ID', width: 'w-32' },
  { key: 'customer', label: 'Customer', sortable: true },
  { key: 'totalAmount', label: 'Total', sortable: true, align: 'right' },
  { key: 'itemsCount', label: 'Items', align: 'center' },
  { key: 'status', label: 'Status' },
  { key: 'createdAt', label: 'Placed Date', sortable: true },
]

const handleSort = (key: string) => {
  if (sortKey.value === key) {
    if (sortOrder.value === 'asc') sortOrder.value = 'desc'
    else if (sortOrder.value === 'desc') sortOrder.value = null
    else sortOrder.value = 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

const sortedOrders = computed(() => {
  const list = [...orders.value]
  if (!sortOrder.value) return list

  return list.sort((a, b) => {
    let aVal: any = a[sortKey.value as keyof OrderItem]
    let bVal: any = b[sortKey.value as keyof OrderItem]

    if (sortKey.value === 'customer') {
      aVal = a.customer.name
      bVal = b.customer.name
    }

    if (aVal < bVal) return sortOrder.value === 'asc' ? -1 : 1
    if (aVal > bVal) return sortOrder.value === 'asc' ? 1 : -1
    return 0
  })
})

const getStatusBadge = (status: string): 'success' | 'warning' | 'danger' => {
  switch (status) {
    case 'paid':
      return 'success'
    case 'pending':
      return 'warning'
    case 'refunded':
    default:
      return 'danger'
  }
}

// Bulk Actions
const handleBulkExport = () => {
  toast.success(`Exported ${selectedKeys.value.length} orders to CSV format`)
}

const handleBulkMarkPaid = () => {
  orders.value.forEach((o) => {
    if (selectedKeys.value.includes(o.id)) {
      o.status = 'paid'
    }
  })
  toast.success(`Updated ${selectedKeys.value.length} orders as Paid`)
  selectedKeys.value = []
}

const handleBulkDelete = () => {
  const count = selectedKeys.value.length
  orders.value = orders.value.filter((o) => !selectedKeys.value.includes(o.id))
  toast.success(`Deleted ${count} orders from database`)
  selectedKeys.value = []
}
</script>

<template>
  <div class="space-y-4">
    <!-- Floating or Top Bulk Actions Toolbar -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2 scale-98"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 -translate-y-2 scale-98"
    >
      <div
        v-if="selectedKeys.length > 0"
        class="bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800/80 rounded-2xl p-3 px-4 flex flex-wrap items-center justify-between gap-3 shadow-soft"
      >
        <div class="flex items-center gap-2">
          <span class="w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center">
            {{ selectedKeys.length }}
          </span>
          <span class="text-xs font-semibold text-brand-900 dark:text-brand-100">
            items selected across this table
          </span>
        </div>

        <div class="flex items-center gap-2">
          <UiButton variant="outline" size="sm" @click="handleBulkExport">
            <template #icon><Download class="w-3.5 h-3.5 mr-1" /></template>
            Export CSV
          </UiButton>

          <UiButton variant="success" size="sm" @click="handleBulkMarkPaid">
            <template #icon><CheckCircle2 class="w-3.5 h-3.5 mr-1" /></template>
            Mark as Paid
          </UiButton>

          <UiButton variant="danger" size="sm" @click="handleBulkDelete">
            <template #icon><Trash2 class="w-3.5 h-3.5 mr-1" /></template>
            Delete Selected
          </UiButton>
        </div>
      </div>
    </Transition>

    <!-- Table -->
    <UiDataTable
      :columns="columns"
      :items="sortedOrders"
      selectable
      v-model:selected-keys="selectedKeys"
      :sort-key="sortKey"
      :sort-order="sortOrder"
      @sort="handleSort"
    >
      <!-- Custom Cell: Order ID -->
      <template #cell(orderNumber)="{ value }">
        <span class="font-mono text-xs font-bold text-brand-600 dark:text-brand-400">
          {{ value }}
        </span>
      </template>

      <!-- Custom Cell: Customer -->
      <template #cell(customer)="{ row }">
        <div class="flex items-center gap-3">
          <img
            v-if="row.customer.avatar"
            :src="row.customer.avatar"
            :alt="row.customer.name"
            class="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
          />
          <div
            v-else
            class="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold"
          >
            {{ getInitials(row.customer.name) }}
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-900 dark:text-slate-100">
              {{ row.customer.name }}
            </p>
            <p class="text-[11px] text-slate-400">
              {{ row.customer.email }}
            </p>
          </div>
        </div>
      </template>

      <!-- Custom Cell: Total Amount -->
      <template #cell(totalAmount)="{ value }">
        <span class="font-semibold text-slate-900 dark:text-slate-100 font-mono text-xs">
          {{ formatCurrency(value) }}
        </span>
      </template>

      <!-- Custom Cell: Items Count -->
      <template #cell(itemsCount)="{ value }">
        <span class="text-xs font-medium text-slate-600 dark:text-slate-300">
          {{ value }} pcs
        </span>
      </template>

      <!-- Custom Cell: Status -->
      <template #cell(status)="{ value }">
        <UiBadge :variant="getStatusBadge(value)" dot size="sm" class="capitalize">
          {{ value }}
        </UiBadge>
      </template>

      <!-- Custom Cell: Date -->
      <template #cell(createdAt)="{ value }">
        <span class="text-xs text-slate-500 dark:text-slate-400">
          {{ formatDate(value, true) }}
        </span>
      </template>
    </UiDataTable>
  </div>
</template>
