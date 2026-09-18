<script setup lang="ts">
import {
  FolderGit2,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Users,
} from 'lucide-vue-next'
import type { TableColumn } from '~/types/ui'
import { formatCurrency, formatDate } from '~/utils/formatters'

interface SubTask {
  id: string
  title: string
  assignee: string
  status: 'done' | 'in_progress' | 'blocked'
  dueDate: string
}

interface ProjectItem {
  id: string
  title: string
  client: string
  priority: 'high' | 'medium' | 'low'
  budget: number
  progress: number
  deadline: string
  tasks: SubTask[]
}

const projects = ref<ProjectItem[]>([
  {
    id: 'prj-01',
    title: 'Fintech Mobile App Re-architecture',
    client: 'Apex Capital Inc.',
    priority: 'high',
    budget: 45000,
    progress: 78,
    deadline: '2025-08-30T00:00:00Z',
    tasks: [
      { id: 'st-1', title: 'OAuth2 biometric authentication', assignee: 'Sarah J.', status: 'done', dueDate: 'Jun 10' },
      { id: 'st-2', title: 'Real-time websocket trade ticker', assignee: 'Marcus S.', status: 'in_progress', dueDate: 'Jun 25' },
      { id: 'st-3', title: 'PCI-DSS compliance audit check', assignee: 'Lucas S.', status: 'in_progress', dueDate: 'Jul 15' },
    ],
  },
  {
    id: 'prj-02',
    title: 'E-Commerce Global Logistics Sync',
    client: 'Nordic Retail Group',
    priority: 'medium',
    budget: 28000,
    progress: 45,
    deadline: '2025-09-15T00:00:00Z',
    tasks: [
      { id: 'st-4', title: 'Shopify multi-warehouse API sync', assignee: 'Elena R.', status: 'done', dueDate: 'May 30' },
      { id: 'st-5', title: 'DHL Express barcode generation', assignee: 'David K.', status: 'in_progress', dueDate: 'Jun 28' },
      { id: 'st-6', title: 'Automated VAT tax invoices', assignee: 'Chantelle D.', status: 'blocked', dueDate: 'Jul 05' },
    ],
  },
  {
    id: 'prj-03',
    title: 'AI Customer Support Copilot',
    client: 'Horizon SaaS Corp',
    priority: 'high',
    budget: 62000,
    progress: 92,
    deadline: '2025-07-20T00:00:00Z',
    tasks: [
      { id: 'st-7', title: 'RAG Vector database indexing', assignee: 'Sarah J.', status: 'done', dueDate: 'Jun 01' },
      { id: 'st-8', title: 'Evaluation benchmark testing', assignee: 'Marcus S.', status: 'done', dueDate: 'Jun 14' },
      { id: 'st-9', title: 'Production canary deployment', assignee: 'Lucas S.', status: 'in_progress', dueDate: 'Jul 10' },
    ],
  },
])

const columns: TableColumn[] = [
  { key: 'title', label: 'Project & Client', width: 'w-80' },
  { key: 'priority', label: 'Priority' },
  { key: 'progress', label: 'Completion', width: 'w-48' },
  { key: 'budget', label: 'Allocated Budget', align: 'right' },
  { key: 'deadline', label: 'Target Deadline' },
]

const getPriorityBadge = (p: string) => {
  switch (p) {
    case 'high':
      return 'danger'
    case 'medium':
      return 'warning'
    case 'low':
    default:
      return 'info'
  }
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
      <span>Click the chevron icon (<span class="font-bold text-brand-600 dark:text-brand-400">&gt;</span>) on any row to expand its breakdown sub-tasks.</span>
      <span class="font-medium text-slate-700 dark:text-slate-300">Master-Detail Pattern</span>
    </div>

    <UiDataTable
      :columns="columns"
      :items="projects"
      expandable
    >
      <!-- Custom Cell: Project & Client -->
      <template #cell(title)="{ row }">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-950/60 border border-brand-100 dark:border-brand-900/50 flex items-center justify-center text-brand-600 dark:text-brand-400 flex-shrink-0">
            <FolderGit2 class="w-5 h-5" />
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-900 dark:text-slate-100">
              {{ row.title }}
            </p>
            <p class="text-[11px] text-slate-400">
              Client: {{ row.client }}
            </p>
          </div>
        </div>
      </template>

      <!-- Custom Cell: Priority -->
      <template #cell(priority)="{ value }">
        <UiBadge :variant="getPriorityBadge(value)" dot size="sm" class="uppercase">
          {{ value }}
        </UiBadge>
      </template>

      <!-- Custom Cell: Progress bar -->
      <template #cell(progress)="{ value }">
        <div class="space-y-1">
          <div class="flex items-center justify-between text-[11px]">
            <span class="font-medium text-slate-700 dark:text-slate-300">{{ value }}%</span>
            <span class="text-slate-400">Completed</span>
          </div>
          <div class="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              class="h-full bg-brand-600 rounded-full transition-all duration-300"
              :style="{ width: `${value}%` }"
            />
          </div>
        </div>
      </template>

      <!-- Custom Cell: Budget -->
      <template #cell(budget)="{ value }">
        <span class="font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
          {{ formatCurrency(value) }}
        </span>
      </template>

      <!-- Custom Cell: Deadline -->
      <template #cell(deadline)="{ value }">
        <span class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Calendar class="w-3.5 h-3.5 text-slate-400" />
          {{ formatDate(value) }}
        </span>
      </template>

      <!-- Expanded Row Slot -->
      <template #expanded="{ row }">
        <div class="space-y-3 py-1">
          <div class="flex items-center justify-between">
            <h5 class="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Users class="w-3.5 h-3.5 text-brand-600" />
              Sub-Deliverables & Milestone Tasks ({{ row.tasks.length }})
            </h5>
            <span class="text-[11px] text-slate-400">Project Ref: {{ row.id }}</span>
          </div>

          <div class="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
            <div
              v-for="task in row.tasks"
              :key="task.id"
              class="px-4 py-2.5 flex items-center justify-between text-xs"
            >
              <div class="flex items-center gap-2.5">
                <CheckCircle2 v-if="task.status === 'done'" class="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <Clock v-else-if="task.status === 'in_progress'" class="w-4 h-4 text-amber-500 flex-shrink-0" />
                <AlertCircle v-else class="w-4 h-4 text-rose-500 flex-shrink-0" />

                <span class="font-medium text-slate-800 dark:text-slate-200">
                  {{ task.title }}
                </span>
              </div>

              <div class="flex items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400">
                <span>Lead: <span class="font-medium text-slate-700 dark:text-slate-300">{{ task.assignee }}</span></span>
                <span>Due: <span class="font-medium text-slate-700 dark:text-slate-300">{{ task.dueDate }}</span></span>
                <UiBadge
                  :variant="task.status === 'done' ? 'success' : task.status === 'in_progress' ? 'warning' : 'danger'"
                  size="sm"
                >
                  {{ task.status.replace('_', ' ') }}
                </UiBadge>
              </div>
            </div>
          </div>
        </div>
      </template>
    </UiDataTable>
  </div>
</template>
