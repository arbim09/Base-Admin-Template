<script setup lang="ts">
import {
  Sparkles,
  Download,
  Plus,
  RefreshCw,
  ExternalLink,
} from 'lucide-vue-next'
import { dashboardService } from '~/services/dashboard.service'
import type { MetricStat, RevenuePoint, ActivityItem } from '~/types/dashboard'

definePageMeta({
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Dashboard — Vanguard Admin Base',
  description: 'Executive analytics and system overview',
})

const authStore = useAuthStore()
const toast = useToast()

const metrics = ref<MetricStat[]>([])
const revenueData = ref<RevenuePoint[]>([])
const activities = ref<ActivityItem[]>([])

const loading = ref(true)
const error = ref<string | null>(null)

const loadDashboard = async () => {
  loading.value = true
  error.value = null

  try {
    const [mRes, rRes, aRes] = await Promise.all([
      dashboardService.getMetrics(),
      dashboardService.getRevenueChart(),
      dashboardService.getRecentActivities(),
    ])

    metrics.value = mRes.data
    revenueData.value = rRes.data
    activities.value = aRes.data
  } catch (err: any) {
    error.value = err.message || 'Failed to load dashboard metrics'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadDashboard()
})

const handleExport = () => {
  toast.success('Analytics report download initialized')
}
</script>

<template>
  <div class="space-y-6">
    <!-- Welcome Header Banner -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-600 to-indigo-700 p-6 sm:p-8 text-white shadow-soft-lg">
      <!-- Decorative background pattern -->
      <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div class="absolute right-32 -top-10 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none" />

      <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-medium text-white mb-3">
            <Sparkles class="w-3.5 h-3.5 text-amber-300" />
            <span>Nuxt 4 Admin Base Template</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {{ authStore.user?.name || 'Administrator' }}! 👋
          </h1>
          <p class="text-white/80 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
            All systems are functioning within normal operational parameters. Here is your enterprise performance overview.
          </p>
        </div>

        <div class="flex items-center gap-2.5">
          <UiButton
            variant="secondary"
            size="md"
            @click="handleExport"
            class="bg-white/15 text-white hover:bg-white/25 border-transparent backdrop-blur-sm"
          >
            <template #icon>
              <Download class="w-4 h-4 mr-1.5" />
            </template>
            Export Report
          </UiButton>

          <UiButton
            to="/users"
            variant="secondary"
            size="md"
            class="bg-white text-brand-600 hover:bg-white/90 border-transparent shadow-sm"
          >
            <template #icon>
              <Plus class="w-4 h-4 mr-1.5" />
            </template>
            New Member
          </UiButton>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <CommonErrorState
      v-if="error"
      title="Dashboard synchronization issue"
      :message="error"
      @retry="loadDashboard"
    />

    <!-- Main Content -->
    <template v-else>
      <!-- Stat Cards Row -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <template v-if="loading">
          <div
            v-for="n in 4"
            :key="n"
            class="h-32 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-5 animate-pulse flex flex-col justify-between"
          >
            <div class="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
            <div class="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
            <div class="h-2 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
          </div>
        </template>

        <template v-else>
          <FeatureDashboardStatCard
            v-for="stat in metrics"
            :key="stat.id"
            :stat="stat"
          />
        </template>
      </div>

      <!-- Charts & Resource Gauges Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Revenue Chart Card (2 cols) -->
        <div class="lg:col-span-2">
          <UiCard
            title="Revenue Trajectory"
            subtitle="Monthly net revenue tracking with interactive hover data"
          >
            <template #headerAction>
              <button
                type="button"
                @click="loadDashboard"
                class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                title="Refresh chart"
              >
                <RefreshCw class="w-4 h-4" />
              </button>
            </template>

            <FeatureDashboardRevenueChart :data="revenueData" />
          </UiCard>
        </div>

        <!-- Resource Quotas Card (1 col) -->
        <div class="lg:col-span-1">
          <UiCard
            title="System Resources"
            subtitle="Real-time capacity utilization across services"
          >
            <FeatureDashboardQuickStats />

            <div class="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span class="text-slate-500">Need more capacity?</span>
              <NuxtLink
                to="/settings"
                class="font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
              >
                Manage Plan <ExternalLink class="w-3 h-3" />
              </NuxtLink>
            </div>
          </UiCard>
        </div>
      </div>

      <!-- Activity & Quick Actions Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Recent Activities (2 cols) -->
        <div class="lg:col-span-2">
          <UiCard
            title="Recent Activity Log"
            subtitle="Audit trail of key events and team modifications"
          >
            <template #headerAction>
              <NuxtLink
                to="/users"
                class="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                View Directory
              </NuxtLink>
            </template>

            <FeatureDashboardRecentActivity :activities="activities" />
          </UiCard>
        </div>

        <!-- Template Highlights / Quick Start Guide (1 col) -->
        <div class="lg:col-span-1">
          <UiCard
            title="Quick Shortcuts"
            subtitle="Frequently accessed tools & configurations"
          >
            <div class="space-y-3">
              <NuxtLink
                to="/users"
                class="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group"
              >
                <div>
                  <h4 class="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                    User Directory CRUD
                  </h4>
                  <p class="text-[11px] text-slate-400">Search, filter, edit, delete</p>
                </div>
                <UiBadge variant="brand" size="sm">Live</UiBadge>
              </NuxtLink>

              <NuxtLink
                to="/components-gallery"
                class="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group"
              >
                <div>
                  <h4 class="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                    UI Design System
                  </h4>
                  <p class="text-[11px] text-slate-400">Buttons, inputs, modals, toasts</p>
                </div>
                <UiBadge variant="success" size="sm">Gallery</UiBadge>
              </NuxtLink>

              <NuxtLink
                to="/settings"
                class="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group"
              >
                <div>
                  <h4 class="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                    Workspace Settings
                  </h4>
                  <p class="text-[11px] text-slate-400">Theme, profile & security</p>
                </div>
                <UiBadge variant="neutral" size="sm">Config</UiBadge>
              </NuxtLink>
            </div>
          </UiCard>
        </div>
      </div>
    </template>
  </div>
</template>
