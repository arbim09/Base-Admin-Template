<script setup lang="ts">
import {
  LayoutGrid,
  List,
  Server,
  Cpu,
  HardDrive,
  Globe,
  ExternalLink,
  MoreVertical,
  Activity,
} from 'lucide-vue-next'
import type { TableColumn } from '~/types/ui'
import { formatDate } from '~/utils/formatters'

interface ServerNode {
  id: string
  name: string
  ip: string
  region: string
  regionFlag: string
  cpuUsage: number
  ramUsage: number
  diskUsage: string
  status: 'running' | 'warning' | 'stopped'
  uptime: string
}

const nodes = ref<ServerNode[]>([
  {
    id: 'srv-01',
    name: 'prod-api-cluster-01',
    ip: '192.168.1.10',
    region: 'Frankfurt, DE',
    regionFlag: '🇩🇪',
    cpuUsage: 34,
    ramUsage: 62,
    diskUsage: '120 GB / 256 GB',
    status: 'running',
    uptime: '42 days',
  },
  {
    id: 'srv-02',
    name: 'prod-worker-queue-01',
    ip: '192.168.1.12',
    region: 'Singapore, SG',
    regionFlag: '🇸🇬',
    cpuUsage: 88,
    ramUsage: 91,
    diskUsage: '340 GB / 512 GB',
    status: 'warning',
    uptime: '15 days',
  },
  {
    id: 'srv-03',
    name: 'database-read-replica-primary',
    ip: '192.168.1.20',
    region: 'Virginia, US',
    regionFlag: '🇺🇸',
    cpuUsage: 21,
    ramUsage: 45,
    diskUsage: '1.2 TB / 2.0 TB',
    status: 'running',
    uptime: '110 days',
  },
  {
    id: 'srv-04',
    name: 'staging-k8s-master',
    ip: '192.168.2.05',
    region: 'Tokyo, JP',
    regionFlag: '🇯🇵',
    cpuUsage: 12,
    ramUsage: 28,
    diskUsage: '65 GB / 128 GB',
    status: 'running',
    uptime: '8 days',
  },
  {
    id: 'srv-05',
    name: 'backup-cold-archive-01',
    ip: '192.168.3.44',
    region: 'London, UK',
    regionFlag: '🇬🇧',
    cpuUsage: 0,
    ramUsage: 5,
    diskUsage: '4.8 TB / 5.0 TB',
    status: 'stopped',
    uptime: 'Offline',
  },
])

// Current view: 'table' or 'grid'
const viewMode = ref<'table' | 'grid'>('grid')
const searchQuery = ref('')

const filteredNodes = computed(() => {
  if (!searchQuery.value) return nodes.value
  const q = searchQuery.value.toLowerCase()
  return nodes.value.filter(
    (n) => n.name.toLowerCase().includes(q) || n.ip.includes(q) || n.region.toLowerCase().includes(q)
  )
})

const columns: TableColumn[] = [
  { key: 'node', label: 'Cluster Instance', width: 'w-64' },
  { key: 'region', label: 'Region' },
  { key: 'cpuUsage', label: 'CPU Load' },
  { key: 'ramUsage', label: 'Memory' },
  { key: 'uptime', label: 'Uptime' },
  { key: 'status', label: 'Status', align: 'right' },
]

const getStatusBadge = (s: string) => {
  switch (s) {
    case 'running':
      return 'success'
    case 'warning':
      return 'warning'
    case 'stopped':
    default:
      return 'danger'
  }
}
</script>

<template>
  <div class="space-y-4">
    <!-- View Switcher Toolbar -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft">
      <div class="w-full sm:w-72">
        <UiInput
          v-model="searchQuery"
          placeholder="Filter nodes by name or IP..."
        />
      </div>

      <div class="flex items-center gap-3">
        <span class="text-xs text-slate-400 font-medium hidden sm:inline">View Mode:</span>
        <div class="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
          <button
            type="button"
            @click="viewMode = 'table'"
            :class="[
              'p-1.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-colors',
              viewMode === 'table'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-soft-sm'
                : 'hover:text-slate-700 dark:hover:text-slate-200',
            ]"
            title="Switch to Table List View"
          >
            <List class="w-4 h-4" />
            <span>Table</span>
          </button>

          <button
            type="button"
            @click="viewMode = 'grid'"
            :class="[
              'p-1.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-colors',
              viewMode === 'grid'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-soft-sm'
                : 'hover:text-slate-700 dark:hover:text-slate-200',
            ]"
            title="Switch to Card Grid View"
          >
            <LayoutGrid class="w-4 h-4" />
            <span>Grid Cards</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 1. Table View Mode -->
    <template v-if="viewMode === 'table'">
      <UiDataTable
        :columns="columns"
        :items="filteredNodes"
      >
        <template #cell(node)="{ row }">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
              <Server class="w-4 h-4" />
            </div>
            <div>
              <p class="font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
                {{ row.name }}
              </p>
              <p class="font-mono text-[11px] text-slate-400">
                {{ row.ip }}
              </p>
            </div>
          </div>
        </template>

        <template #cell(region)="{ row }">
          <span class="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <span>{{ row.regionFlag }}</span>
            <span>{{ row.region }}</span>
          </span>
        </template>

        <template #cell(cpuUsage)="{ value }">
          <span class="font-mono text-xs font-medium" :class="value > 80 ? 'text-rose-500' : 'text-slate-700 dark:text-slate-300'">
            {{ value }}%
          </span>
        </template>

        <template #cell(ramUsage)="{ value }">
          <span class="font-mono text-xs font-medium" :class="value > 80 ? 'text-amber-500' : 'text-slate-700 dark:text-slate-300'">
            {{ value }}%
          </span>
        </template>

        <template #cell(uptime)="{ value }">
          <span class="text-xs text-slate-500 dark:text-slate-400">
            {{ value }}
          </span>
        </template>

        <template #cell(status)="{ value }">
          <UiBadge :variant="getStatusBadge(value)" dot size="sm" class="capitalize">
            {{ value }}
          </UiBadge>
        </template>
      </UiDataTable>
    </template>

    <!-- 2. Card Grid View Mode -->
    <template v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="node in filteredNodes"
          :key="node.id"
          class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-soft hover:shadow-soft-md transition-all space-y-4 group"
        >
          <!-- Card Header -->
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 border border-brand-100 dark:border-brand-900/40 text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Server class="w-5 h-5" />
              </div>
              <div>
                <h4 class="font-mono text-xs font-bold text-slate-900 dark:text-slate-100 truncate max-w-[160px]">
                  {{ node.name }}
                </h4>
                <span class="text-[11px] font-mono text-slate-400">
                  {{ node.ip }}
                </span>
              </div>
            </div>

            <UiBadge :variant="getStatusBadge(node.status)" dot size="sm" class="capitalize">
              {{ node.status }}
            </UiBadge>
          </div>

          <!-- Gauges -->
          <div class="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
            <div>
              <div class="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                <span class="flex items-center gap-1"><Cpu class="w-3 h-3" /> CPU Utilization</span>
                <span class="font-mono font-medium">{{ node.cpuUsage }}%</span>
              </div>
              <div class="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  :class="['h-full rounded-full transition-all', node.cpuUsage > 80 ? 'bg-rose-500' : 'bg-brand-600']"
                  :style="{ width: `${node.cpuUsage}%` }"
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                <span class="flex items-center gap-1"><Activity class="w-3 h-3" /> RAM Usage</span>
                <span class="font-mono font-medium">{{ node.ramUsage }}%</span>
              </div>
              <div class="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  :class="['h-full rounded-full transition-all', node.ramUsage > 80 ? 'bg-amber-500' : 'bg-emerald-500']"
                  :style="{ width: `${node.ramUsage}%` }"
                />
              </div>
            </div>
          </div>

          <!-- Card Footer Info -->
          <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span class="flex items-center gap-1">
              <span>{{ node.regionFlag }}</span>
              <span>{{ node.region }}</span>
            </span>
            <span>Uptime: {{ node.uptime }}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
