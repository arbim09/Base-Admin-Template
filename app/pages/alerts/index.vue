<script setup lang="ts">
import {
  BellRing,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  ShieldAlert,
  Trash2,
  HelpCircle,
  RefreshCw,
  Clock,
  Radio,
  FileUp,
  X,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Code2,
  ExternalLink,
  Sliders,
  Sparkles,
  Lock,
  Server,
  WifiOff,
  Database,
  UploadCloud,
  Pause,
  Play,
  ArrowRight,
  LogOut,
  FileText,
  Activity,
  Layers,
  Search,
  Maximize2,
  Minimize2,
} from 'lucide-vue-next'

useHead({
  title: 'Alerts & Popups Showcase - Kobokan Admin',
  meta: [
    {
      name: 'description',
      content: '15 complete production-ready notification, dialog, and popup patterns for Nuxt 4 admin templates.',
    },
  ],
})

const toast = useToast()

// ----------------------------------------------------
// Navigation & Filtering
// ----------------------------------------------------
type CategoryType = 'all' | 'in-page' | 'dialogs' | 'toasts' | 'system'
const activeCategory = ref<CategoryType>('all')
const searchQuery = ref('')

// Track active code accordion drawers per pattern
const expandedCodeIds = ref<{ [key: string]: boolean }>({})
const toggleCodeDrawer = (id: string) => {
  expandedCodeIds.value[id] = !expandedCodeIds.value[id]
}

// Copied feedback
const copiedCodeId = ref<string | null>(null)
const copyCodeSnippet = (id: string) => {
  const code = codeSnippets[id] || ''
  if (import.meta.client && navigator.clipboard) {
    navigator.clipboard.writeText(code)
    copiedCodeId.value = id
    toast.success('Vue code snippet copied to clipboard!')
    setTimeout(() => {
      if (copiedCodeId.value === id) copiedCodeId.value = null
    }, 2500)
  }
}

// ----------------------------------------------------
// Reusable Code Snippets for Developers
// ----------------------------------------------------
const codeSnippets: Record<string, string> = {
  'code-1': `<!-- In-Page Alert Notification -->
<div class="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 flex items-start justify-between gap-3">
  <div class="flex items-start gap-3">
    <CheckCircle2 class="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
    <div>
      <h4 class="text-sm font-bold">Backup Created</h4>
      <p class="text-xs text-emerald-700 dark:text-emerald-300">Snapshot archived to cloud storage.</p>
    </div>
  </div>
  <button @click="dismissAlert" class="text-emerald-600 hover:text-emerald-800 p-1"><X class="w-4 h-4" /></button>
</div>`,

  'code-2': `<!-- Toast with Undo Action -->
const toast = useToast()
toast.add("Item 'annual-report.pdf' moved to trash.", "info", {
  title: "File Deleted",
  duration: 6000,
  action: {
    label: "Undo Action",
    onClick: () => restoreItem()
  }
})`,

  'code-3': `<!-- Viewport Modal Dialog -->
<UiModal v-model="isOpen" title="Workspace Settings" subtitle="Configure team parameters">
  <div class="space-y-4 py-2">
    <input v-model="name" class="w-full px-3 py-2 rounded-xl text-sm border" />
  </div>
  <template #footer>
    <UiButton variant="ghost" @click="isOpen = false">Cancel</UiButton>
    <UiButton variant="primary" @click="save">Save Changes</UiButton>
  </template>
</UiModal>`,

  'code-4': `<!-- Confirmation Prompt Dialog -->
<UiModal v-model="isConfirmOpen" size="sm" :showHeader="false">
  <div class="text-center py-4">
    <CheckCircle2 class="w-12 h-12 text-brand-600 mx-auto mb-3" />
    <h3 class="text-lg font-bold">Approve Batch Settlement?</h3>
    <p class="text-xs text-slate-500 mt-2">Approve transaction batch #TX-9948 for $24,980.00?</p>
  </div>
  <template #footer>
    <div class="grid grid-cols-2 gap-3 w-full">
      <UiButton variant="outline" @click="isConfirmOpen = false">Cancel</UiButton>
      <UiButton variant="primary" :loading="loading" @click="confirm">Approve</UiButton>
    </div>
  </template>
</UiModal>`,

  'code-5': `<!-- Destructive Danger Dialog with Keyword Safeguard -->
<UiModal v-model="isDangerOpen" size="sm" :showHeader="false">
  <div class="text-center py-3">
    <ShieldAlert class="w-14 h-14 text-rose-600 mx-auto mb-3" />
    <h3 class="text-lg font-bold">Permanently Delete Cluster?</h3>
    <p class="text-xs text-slate-500 mt-2">Type 'DELETE' to confirm destruction:</p>
    <input v-model="confirmKeyword" placeholder="DELETE" class="mt-3 w-full px-3 py-1.5 border rounded-lg" />
  </div>
  <template #footer>
    <UiButton variant="danger" :disabled="confirmKeyword !== 'DELETE'" @click="destroy">Delete Cluster</UiButton>
  </template>
</UiModal>`,

  'code-6': `<!-- Top Announcement Banner -->
<div v-if="isVisible" class="rounded-2xl border p-3.5 bg-amber-500/10 border-amber-500/30 flex items-center justify-between">
  <div class="flex items-center gap-2">
    <Radio class="w-4 h-4 text-amber-500 animate-pulse" />
    <span><strong>Maintenance:</strong> Migrations scheduled Saturday 02:00 UTC.</span>
  </div>
  <button @click="isVisible = false"><X class="w-4 h-4" /></button>
</div>`,

  'code-7': `<!-- Contextual Popover with Outside Click Guard -->
<div class="relative" ref="popoverRef">
  <button @click.stop="isOpen = !isOpen">Open Profile</button>
  <div v-if="isOpen" class="absolute left-0 mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 border p-4 shadow-xl z-30">
    <h4>Sarah Jenkins</h4>
    <p class="text-xs text-slate-500">sarah.j@company.io</p>
  </div>
</div>`,

  'code-8': `<!-- Tooltip with CSS Caret Arrow -->
<div class="relative group">
  <button>Hover for Tooltip</button>
  <div class="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 opacity-0 group-hover:opacity-100 transition-all z-30">
    <div class="relative px-2.5 py-1.5 rounded-xl bg-slate-950 text-white text-[11px] whitespace-nowrap">
      Save to favorites <kbd class="px-1 py-0.5 rounded bg-slate-800">⌘S</kbd>
      <span class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 rotate-45" />
    </div>
  </div>
</div>`,

  'code-9': `<!-- Authentication Session Timeout Guard -->
<UiModal v-model="isAuthAlert" size="sm" :showHeader="false" :showCloseButton="false" :closeOnBackdrop="false" :closeOnEsc="false">
  <div class="text-center py-4">
    <Clock class="w-12 h-12 text-amber-500 mx-auto mb-3" />
    <h3 class="text-lg font-bold">Session Inactivity Warning</h3>
    <div class="mt-3 p-3 bg-slate-100 rounded-2xl text-2xl font-mono text-amber-600">{{ countdown }}</div>
  </div>
  <template #footer>
    <UiButton variant="ghost" @click="logout">Log Out</UiButton>
    <UiButton variant="primary" @click="extend">Extend Session</UiButton>
  </template>
</UiModal>`,

  'code-10': `<!-- API / Server Error Alert with Retry -->
<div class="rounded-2xl border border-rose-200 bg-rose-50/50 p-5 space-y-3">
  <div class="flex items-center justify-between">
    <div>
      <h4 class="font-bold">HTTP 503: Service Unavailable</h4>
      <p class="text-xs text-slate-500">Upstream gateway handshake timed out.</p>
    </div>
    <UiButton variant="danger" size="sm" :loading="retrying" @click="retry">Retry Connection</UiButton>
  </div>
</div>`,

  'code-11': `<!-- Loading & Stepped Progress Overlay -->
<UiModal v-model="isLoading" size="sm" :showHeader="false" :showCloseButton="false" :closeOnBackdrop="false" :closeOnEsc="false">
  <div class="py-4 text-center space-y-3">
    <div class="text-xl font-black text-brand-600">{{ progress }}%</div>
    <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
      <div class="bg-brand-500 h-full transition-all" :style="{ width: progress + '%' }"></div>
    </div>
    <p class="text-xs text-slate-500">Replicating data across 4 global regions...</p>
  </div>
</UiModal>`,

  'code-12': `<!-- Form Validation Error Summary Block -->
<div v-if="errors.length" class="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1">
  <h4 class="text-xs font-bold">{{ errors.length }} validation errors found:</h4>
  <ul class="list-disc pl-5 text-xs">
    <li v-for="err in errors" :key="err">{{ err }}</li>
  </ul>
</div>`,

  'code-13': `<!-- Unsaved Changes Navigation Guard -->
<UiModal v-model="isUnsavedOpen" size="md" :showHeader="false">
  <div class="py-2 flex items-start gap-3.5">
    <AlertTriangle class="w-6 h-6 text-amber-500" />
    <div>
      <h3 class="font-bold">You have unsaved changes</h3>
      <p class="text-xs text-slate-500 mt-1">Leaving without saving will discard your edits.</p>
    </div>
  </div>
  <template #footer>
    <UiButton variant="ghost" @click="discard">Discard Changes</UiButton>
    <UiButton variant="outline" @click="isUnsavedOpen = false">Keep Editing</UiButton>
    <UiButton variant="primary" @click="save">Save & Continue</UiButton>
  </template>
</UiModal>`,

  'code-14': `<!-- Background File Transfer Widget -->
<div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border shadow-md space-y-2">
  <div class="flex justify-between items-center text-xs">
    <span class="font-bold">annual-report-2026.pdf</span>
    <span>{{ progress }}%</span>
  </div>
  <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
    <div class="bg-sky-500 h-full" :style="{ width: progress + '%' }"></div>
  </div>
</div>`,

  'code-15': `<!-- System Health & Uptime Status -->
<div class="rounded-2xl border overflow-hidden">
  <div class="p-4 bg-emerald-500/10 flex items-center justify-between text-xs font-bold text-emerald-900">
    <span>● All Core Systems Operational</span>
    <span>99.98% 30-day Uptime</span>
  </div>
</div>`,
}

// ----------------------------------------------------
// 1. In-Page Alerts State
// ----------------------------------------------------
const dismissedAlerts = ref<{ [key: string]: boolean }>({
  info: false,
  success: false,
  warning: false,
  error: false,
})

const allInPageDismissed = computed(() => {
  return (
    dismissedAlerts.value.info &&
    dismissedAlerts.value.success &&
    dismissedAlerts.value.warning &&
    dismissedAlerts.value.error
  )
})

const resetInPageAlerts = () => {
  dismissedAlerts.value = {
    info: false,
    success: false,
    warning: false,
    error: false,
  }
  toast.info('All in-page alerts have been restored.')
}

// ----------------------------------------------------
// 2. Toasts & Snackbars Custom Triggers
// ----------------------------------------------------
const triggerActionToast = () => {
  toast.add('Item "annual-report-2026.pdf" moved to Trash.', 'info', {
    title: 'File Deleted',
    duration: 6000,
    action: {
      label: 'Undo Action',
      onClick: () => {
        toast.success('Action undone. "annual-report-2026.pdf" restored!')
      },
    },
  })
}

// ----------------------------------------------------
// 3. Modal / Standard Dialog State
// ----------------------------------------------------
const isStandardModalOpen = ref(false)
const modalForm = reactive({
  name: 'Global Enterprise Plan',
  description: 'Shared production workspace for data pipelines and audit services.',
})
const saveStandardModal = () => {
  isStandardModalOpen.value = false
  toast.success('Workspace parameters updated successfully!')
}

// ----------------------------------------------------
// 4. Confirmation Dialog State
// ----------------------------------------------------
const isConfirmDialogOpen = ref(false)
const isConfirmLoading = ref(false)
const handleConfirmAction = () => {
  isConfirmLoading.value = true
  setTimeout(() => {
    isConfirmLoading.value = false
    isConfirmDialogOpen.value = false
    toast.success('Batch transaction of 1,250 records approved successfully.')
  }, 1000)
}

// ----------------------------------------------------
// 5. Destructive Alert Dialog State
// ----------------------------------------------------
const isDestructiveDialogOpen = ref(false)
const destructiveInput = ref('')
const isDestructiveDeleting = ref(false)
const handleDestructiveAction = () => {
  if (destructiveInput.value !== 'DELETE') return
  isDestructiveDeleting.value = true
  setTimeout(() => {
    isDestructiveDeleting.value = false
    isDestructiveDialogOpen.value = false
    destructiveInput.value = ''
    toast.error('Database cluster has been permanently deleted.', 'Cluster Terminated')
  }, 1200)
}

// ----------------------------------------------------
// 6. Top Banner / Notification Bar State
// ----------------------------------------------------
const isBannerVisible = ref(true)
const bannerVariant = ref<'maintenance' | 'promo'>('maintenance')

// ----------------------------------------------------
// 7. Popover State & Click-Outside Handling
// ----------------------------------------------------
const isProfilePopoverOpen = ref(false)
const isSettingsPopoverOpen = ref(false)
const profilePopoverRef = ref<HTMLElement | null>(null)
const settingsPopoverRef = ref<HTMLElement | null>(null)

const popoverSettings = reactive({
  emailAlerts: true,
  audioFeedback: false,
  compactMode: true,
})

const toggleProfilePopover = () => {
  isProfilePopoverOpen.value = !isProfilePopoverOpen.value
  if (isProfilePopoverOpen.value) isSettingsPopoverOpen.value = false
}

const toggleSettingsPopover = () => {
  isSettingsPopoverOpen.value = !isSettingsPopoverOpen.value
  if (isSettingsPopoverOpen.value) isProfilePopoverOpen.value = false
}

const handleGlobalClick = (e: MouseEvent) => {
  if (profilePopoverRef.value && !profilePopoverRef.value.contains(e.target as Node)) {
    isProfilePopoverOpen.value = false
  }
  if (settingsPopoverRef.value && !settingsPopoverRef.value.contains(e.target as Node)) {
    isSettingsPopoverOpen.value = false
  }
}

// ----------------------------------------------------
// 9. Authentication Alert / Session Expiration
// ----------------------------------------------------
const isAuthAlertOpen = ref(false)
const sessionCountdown = ref(180)
let authTimer: any = null

const formattedCountdown = computed(() => {
  const m = Math.floor(sessionCountdown.value / 60)
  const s = sessionCountdown.value % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
})

const openAuthAlert = () => {
  sessionCountdown.value = 120
  isAuthAlertOpen.value = true
  if (authTimer) clearInterval(authTimer)
  authTimer = setInterval(() => {
    if (sessionCountdown.value > 0) {
      sessionCountdown.value--
    } else {
      clearInterval(authTimer)
    }
  }, 1000)
}

const extendSession = () => {
  if (authTimer) clearInterval(authTimer)
  sessionCountdown.value = 180
  isAuthAlertOpen.value = false
  toast.success('Session extended for another 60 minutes.', 'Session Extended')
}

const logoutFromAuthAlert = () => {
  if (authTimer) clearInterval(authTimer)
  isAuthAlertOpen.value = false
  toast.info('Logged out securely.', 'Session Ended')
}

// ----------------------------------------------------
// 10. API / Server Alert State
// ----------------------------------------------------
const showApiDetails = ref(false)
const isRetryingApi = ref(false)
const apiStatus = ref<'outage' | 'operational'>('outage')

const retryApiCall = () => {
  isRetryingApi.value = true
  setTimeout(() => {
    isRetryingApi.value = false
    apiStatus.value = 'operational'
    toast.success('Connection re-established with API Gateway: HTTP 200 OK')
  }, 1200)
}

const simulateApiOutage = () => {
  apiStatus.value = 'outage'
  toast.warning('Simulating upstream Gateway Timeout error (HTTP 503).')
}

// ----------------------------------------------------
// 11. Loading Dialog State
// ----------------------------------------------------
const isLoadingDialogOpen = ref(false)
const loadingProgress = ref(15)
let loadingInterval: any = null

const startLoadingSimulation = () => {
  isLoadingDialogOpen.value = true
  loadingProgress.value = 15
  if (loadingInterval) clearInterval(loadingInterval)
  loadingInterval = setInterval(() => {
    if (loadingProgress.value < 100) {
      loadingProgress.value += Math.floor(Math.random() * 15) + 10
      if (loadingProgress.value > 100) loadingProgress.value = 100
    } else {
      clearInterval(loadingInterval)
      setTimeout(() => {
        isLoadingDialogOpen.value = false
        toast.success('Data replication across 4 regions completed 100%!', 'Sync Complete')
      }, 500)
    }
  }, 450)
}

// ----------------------------------------------------
// 12. Form Validation Alert State & Interactive Demo
// ----------------------------------------------------
const formValidationFields = reactive({
  email: 'admin-invalid',
  password: '123',
  termsAccepted: false,
})

const activeValidationErrors = ref<string[]>([
  'Work email address format is invalid (missing @domain.com).',
  'Password must be at least 8 characters.',
  'You must accept the Terms of Service to proceed.',
])

const formSubmitted = ref(false)

const handleFormValidationSubmit = () => {
  formSubmitted.value = true
  const errors: string[] = []

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formValidationFields.email || !emailRegex.test(formValidationFields.email)) {
    errors.push('Work email address format is invalid (e.g. user@company.io).')
  }

  if (!formValidationFields.password || formValidationFields.password.length < 8) {
    errors.push('Password must be at least 8 characters long.')
  }

  if (!formValidationFields.termsAccepted) {
    errors.push('You must accept the Terms of Service to proceed.')
  }

  activeValidationErrors.value = errors

  if (errors.length === 0) {
    toast.success('Form validated and submitted successfully! No errors.')
  } else {
    toast.error(`Validation failed with ${errors.length} errors. Please review fields.`)
  }
}

const autofillValidForm = () => {
  formValidationFields.email = 'alex.vance@company.io'
  formValidationFields.password = 'SuperSecret123!'
  formValidationFields.termsAccepted = true
  activeValidationErrors.value = []
  toast.info('Valid test credentials filled into form.')
}

// ----------------------------------------------------
// 13. Unsaved Changes Dialog State
// ----------------------------------------------------
const isUnsavedChangesOpen = ref(false)
const unsavedDraftTitle = ref('Organization Security Policy v2 (Draft Modified)')

const confirmDiscardChanges = () => {
  unsavedDraftTitle.value = 'Organization Security Policy v1 (Published)'
  isUnsavedChangesOpen.value = false
  toast.warning('Draft changes discarded. Original settings preserved.')
}

const confirmSaveAndExit = () => {
  isUnsavedChangesOpen.value = false
  toast.success('Modifications saved successfully before exit.')
}

// ----------------------------------------------------
// 14. Upload / Download Notification State
// ----------------------------------------------------
const transferProgress = ref(74)
const isTransferPaused = ref(false)
const isTransferDocked = ref(false)
let transferInterval: any = null

const toggleTransferPause = () => {
  isTransferPaused.value = !isTransferPaused.value
  if (!isTransferPaused.value) {
    resumeTransferSim()
  } else {
    if (transferInterval) clearInterval(transferInterval)
  }
}

const startNewDownload = () => {
  transferProgress.value = 5
  isTransferPaused.value = false
  resumeTransferSim()
  toast.info('Starting simulated background download: annual-report-2026.pdf')
}

const resumeTransferSim = () => {
  if (transferInterval) clearInterval(transferInterval)
  transferInterval = setInterval(() => {
    if (!isTransferPaused.value && transferProgress.value < 100) {
      transferProgress.value += 3
      if (transferProgress.value >= 100) {
        transferProgress.value = 100
        clearInterval(transferInterval)
        toast.success('Download complete: annual-report-2026.pdf (34.2 MB)')
      }
    }
  }, 350)
}

// ----------------------------------------------------
// 15. System Status Alert State
// ----------------------------------------------------
const systemHealth = reactive({
  overall: 'degraded' as 'operational' | 'degraded' | 'outage',
  services: [
    { name: 'Core API Gateway', status: 'operational', latency: '42ms', uptime: '99.98%' },
    { name: 'Authentication & SSO', status: 'operational', latency: '68ms', uptime: '99.99%' },
    { name: 'PostgreSQL Primary Cluster', status: 'operational', latency: '12ms', uptime: '100%' },
    { name: 'S3 Asset Storage & CDN', status: 'degraded', latency: '340ms', uptime: '98.85%' },
  ],
})

// Item count per category
const categoryCounts = computed(() => ({
  all: 15,
  'in-page': 3,
  dialogs: 6,
  toasts: 4,
  system: 2,
}))

const items = [
  { id: '1', title: '1. In-Page Alert & Notification', category: 'in-page', isWide: true },
  { id: '2', title: '2. Toast & Snackbar Notifications', category: 'toasts', isWide: false },
  { id: '3', title: '3. Standard Modal / Dialog', category: 'dialogs', isWide: false },
  { id: '4', title: '4. Confirmation Dialog', category: 'dialogs', isWide: false },
  { id: '5', title: '5. Destructive Danger Alert', category: 'dialogs', isWide: false },
  { id: '6', title: '6. Banner / Top Notification Bar', category: 'in-page', isWide: false },
  { id: '7', title: '7. Interactive Popover', category: 'toasts', isWide: false },
  { id: '8', title: '8. Micro Tooltips (4 Directions)', category: 'toasts', isWide: false },
  { id: '9', title: '9. Authentication / Session Expiration', category: 'dialogs', isWide: false },
  { id: '10', title: '10. API & Server Error Alert', category: 'system', isWide: false },
  { id: '11', title: '11. Loading / Processing Dialog', category: 'dialogs', isWide: false },
  { id: '12', title: '12. Form Validation Error Alert', category: 'in-page', isWide: false },
  { id: '13', title: '13. Unsaved Changes Guard Dialog', category: 'dialogs', isWide: false },
  { id: '14', title: '14. Background Upload / Download Transfer', category: 'toasts', isWide: false },
  { id: '15', title: '15. Live System Health Status Alert', category: 'system', isWide: true },
]

const filteredItems = computed(() => {
  return items.filter((item) => {
    const matchesCategory =
      activeCategory.value === 'all' || item.category === activeCategory.value
    const matchesSearch =
      searchQuery.value.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})

const isItemVisible = (id: string) => {
  return filteredItems.value.some((it) => it.id === id)
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('click', handleGlobalClick)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('click', handleGlobalClick)
  }
  if (authTimer) clearInterval(authTimer)
  if (loadingInterval) clearInterval(loadingInterval)
  if (transferInterval) clearInterval(transferInterval)
})
</script>

<template>
  <div class="space-y-6 pb-20">
    <!-- Top Global Sticky Announcement Banner Preview (Pattern #6 Demo) -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="-translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-full opacity-0"
    >
      <div
        v-if="isBannerVisible"
        class="rounded-2xl border p-3 sm:px-5 flex items-center justify-between gap-3 text-xs sm:text-sm shadow-soft-md transition-colors"
        :class="
          bannerVariant === 'maintenance'
            ? 'bg-amber-500/10 text-amber-900 dark:text-amber-200 border-amber-500/30'
            : 'bg-brand-500/10 text-brand-900 dark:text-brand-200 border-brand-500/30'
        "
      >
        <div class="flex items-center gap-2.5 min-w-0">
          <span
            class="flex h-6 w-6 items-center justify-center rounded-lg flex-shrink-0"
            :class="bannerVariant === 'maintenance' ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400' : 'bg-brand-500/20 text-brand-600 dark:text-brand-400'"
          >
            <Radio v-if="bannerVariant === 'maintenance'" class="w-3.5 h-3.5 animate-pulse" />
            <Sparkles v-else class="w-3.5 h-3.5" />
          </span>
          <span class="truncate">
            <strong class="font-bold">
              {{ bannerVariant === 'maintenance' ? 'Scheduled Maintenance:' : 'Kobokan Admin v2.4:' }}
            </strong>
            {{
              bannerVariant === 'maintenance'
                ? ' Infrastructure upgrades scheduled Saturday 02:00 - 04:00 UTC.'
                : ' 15 production alerts, popups, and dialogs are fully ready to copy.'
            }}
          </span>
        </div>

        <div class="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            @click="bannerVariant = bannerVariant === 'maintenance' ? 'promo' : 'maintenance'"
            class="hidden md:inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800/60 hover:opacity-80 transition"
          >
            Switch to {{ bannerVariant === 'maintenance' ? 'Promo' : 'Maintenance' }}
          </button>
          <button
            type="button"
            @click="isBannerVisible = false"
            class="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition"
            aria-label="Close banner"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
      </div>
    </Transition>

    <!-- Page Header -->
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <div class="flex items-center gap-3">
          <div class="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-soft-xs">
            <BellRing class="w-6 h-6" />
          </div>
          <div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Alerts, Dialogs & Popups
            </h1>
            <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              15 production patterns: in-page banners, toasts, destructive alerts, session guards, and system monitors.
            </p>
          </div>
        </div>
      </div>

      <!-- Quick Action Controls -->
      <div class="flex flex-wrap items-center gap-2">
        <button
          type="button"
          v-if="!isBannerVisible"
          @click="isBannerVisible = true"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
          <Radio class="w-3.5 h-3.5 text-amber-500" />
          Show Top Banner
        </button>

        <button
          type="button"
          @click="resetInPageAlerts"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
          <RefreshCw class="w-3.5 h-3.5 text-brand-500" />
          Reset Dismissed Alerts
        </button>
      </div>
    </div>

    <!-- Category Filter Bar with Count Badges & Search -->
    <div class="glass-card rounded-2xl p-2 sm:p-2.5 border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 shadow-soft-xs">
      <div class="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
        <button
          type="button"
          @click="activeCategory = 'all'"
          :class="[
            'px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5',
            activeCategory === 'all'
              ? 'bg-brand-500 text-white shadow-soft-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
          ]"
        >
          <span>All Patterns</span>
          <span class="px-1.5 py-0.2 rounded-full text-[10px] font-bold" :class="activeCategory === 'all' ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'">
            {{ categoryCounts.all }}
          </span>
        </button>

        <button
          type="button"
          @click="activeCategory = 'dialogs'"
          :class="[
            'px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5',
            activeCategory === 'dialogs'
              ? 'bg-brand-500 text-white shadow-soft-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
          ]"
        >
          <span>Modals & Dialogs</span>
          <span class="px-1.5 py-0.2 rounded-full text-[10px] font-bold" :class="activeCategory === 'dialogs' ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'">
            {{ categoryCounts.dialogs }}
          </span>
        </button>

        <button
          type="button"
          @click="activeCategory = 'toasts'"
          :class="[
            'px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5',
            activeCategory === 'toasts'
              ? 'bg-brand-500 text-white shadow-soft-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
          ]"
        >
          <span>Toasts & Overlays</span>
          <span class="px-1.5 py-0.2 rounded-full text-[10px] font-bold" :class="activeCategory === 'toasts' ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'">
            {{ categoryCounts.toasts }}
          </span>
        </button>

        <button
          type="button"
          @click="activeCategory = 'in-page'"
          :class="[
            'px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5',
            activeCategory === 'in-page'
              ? 'bg-brand-500 text-white shadow-soft-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
          ]"
        >
          <span>In-Page Alerts</span>
          <span class="px-1.5 py-0.2 rounded-full text-[10px] font-bold" :class="activeCategory === 'in-page' ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'">
            {{ categoryCounts['in-page'] }}
          </span>
        </button>

        <button
          type="button"
          @click="activeCategory = 'system'"
          :class="[
            'px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5',
            activeCategory === 'system'
              ? 'bg-brand-500 text-white shadow-soft-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
          ]"
        >
          <span>System & Errors</span>
          <span class="px-1.5 py-0.2 rounded-full text-[10px] font-bold" :class="activeCategory === 'system' ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'">
            {{ categoryCounts.system }}
          </span>
        </button>
      </div>

      <!-- Live Search Box -->
      <div class="relative w-full md:w-64">
        <Search class="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Filter pattern..."
          class="w-full pl-9 pr-8 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100 placeholder-slate-400"
        />
        <button
          v-if="searchQuery"
          type="button"
          @click="searchQuery = ''"
          class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
        >
          <X class="w-3 h-3" />
        </button>
      </div>
    </div>

    <!-- ============================================================ -->
    <!-- 1. FULL WIDTH: IN-PAGE ALERTS -->
    <!-- ============================================================ -->
    <div
      v-if="isItemVisible('1')"
      id="pattern-1"
      class="glass-card rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
    >
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800">
              Pattern 01
            </span>
            <h2 class="text-lg font-bold text-slate-900 dark:text-slate-100">
              Alert / Notification (In-Page)
            </h2>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Contextual static or dismissable in-page alert boxes in 4 distinct semantic variations.
          </p>
        </div>
        <div class="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            @click="toggleCodeDrawer('code-1')"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <Code2 class="w-3.5 h-3.5" />
            <span>{{ expandedCodeIds['code-1'] ? 'Hide Code' : 'View Code' }}</span>
          </button>
          <button
            type="button"
            @click="copyCodeSnippet('code-1')"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-900/60 hover:bg-brand-100 transition"
          >
            <Check v-if="copiedCodeId === 'code-1'" class="w-3.5 h-3.5 text-emerald-500" />
            <Copy v-else class="w-3.5 h-3.5" />
            <span>{{ copiedCodeId === 'code-1' ? 'Copied!' : 'Copy' }}</span>
          </button>
        </div>
      </div>

      <!-- Expandable Code Drawer -->
      <div v-if="expandedCodeIds['code-1']" class="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800 shadow-inner">
        <pre>{{ codeSnippets['code-1'] }}</pre>
      </div>

      <!-- Empty State if all dismissed -->
      <div
        v-if="allInPageDismissed"
        class="p-6 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-2.5 bg-slate-50/50 dark:bg-slate-900/30"
      >
        <div class="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
          <CheckCircle2 class="w-5 h-5 text-emerald-500" />
        </div>
        <p class="text-xs text-slate-600 dark:text-slate-400 font-medium">
          All 4 in-page alert notifications have been dismissed.
        </p>
        <UiButton variant="outline" size="sm" @click="resetInPageAlerts">
          <RefreshCw class="w-3.5 h-3.5 mr-1.5" />
          Restore All Alerts
        </UiButton>
      </div>

      <!-- Live Demos of 4 Variants -->
      <div v-else class="space-y-3 pt-1">
        <!-- Info Alert -->
        <div
          v-if="!dismissedAlerts.info"
          class="p-4 rounded-2xl bg-brand-50/80 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-900/60 text-brand-900 dark:text-brand-200 flex items-start justify-between gap-3 shadow-soft-2xs transition"
        >
          <div class="flex items-start gap-3">
            <Info class="w-5 h-5 flex-shrink-0 text-brand-600 dark:text-brand-400 mt-0.5" />
            <div>
              <h3 class="text-sm font-bold">New Security Protocols Active</h3>
              <p class="text-xs text-brand-700/90 dark:text-brand-300/80 mt-0.5">
                Two-factor authentication will now be required for all privileged accounts during checkout.
              </p>
            </div>
          </div>
          <button
            type="button"
            @click="dismissedAlerts.info = true"
            class="text-brand-600 hover:text-brand-900 dark:text-brand-400 dark:hover:text-brand-200 p-1 rounded-lg hover:bg-brand-100/50 dark:hover:bg-brand-900/40 transition"
            aria-label="Dismiss alert"
          >
            <X class="w-4 h-4" />
          </button>
        </div>

        <!-- Success Alert -->
        <div
          v-if="!dismissedAlerts.success"
          class="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-200 flex items-start justify-between gap-3 shadow-soft-2xs transition"
        >
          <div class="flex items-start gap-3">
            <CheckCircle2 class="w-5 h-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
            <div>
              <h3 class="text-sm font-bold">Database Backup Created</h3>
              <p class="text-xs text-emerald-700/90 dark:text-emerald-300/80 mt-0.5">
                Snapshot <code class="px-1.5 py-0.5 rounded bg-emerald-200/50 dark:bg-emerald-900/50 font-mono text-[11px]">snap-2026-09-18</code> successfully archived to cold storage.
              </p>
            </div>
          </div>
          <button
            type="button"
            @click="dismissedAlerts.success = true"
            class="text-emerald-600 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-200 p-1 rounded-lg hover:bg-emerald-100/50 dark:hover:bg-emerald-900/40 transition"
            aria-label="Dismiss alert"
          >
            <X class="w-4 h-4" />
          </button>
        </div>

        <!-- Warning Alert -->
        <div
          v-if="!dismissedAlerts.warning"
          class="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200 flex items-start justify-between gap-3 shadow-soft-2xs transition"
        >
          <div class="flex items-start gap-3">
            <AlertTriangle class="w-5 h-5 flex-shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div>
              <h3 class="text-sm font-bold">Storage Capacity at 87%</h3>
              <p class="text-xs text-amber-700/90 dark:text-amber-300/80 mt-0.5">
                Your team is approaching the plan limit of 100 GB. Consider upgrading to Enterprise tier.
              </p>
            </div>
          </div>
          <button
            type="button"
            @click="dismissedAlerts.warning = true"
            class="text-amber-600 hover:text-amber-900 dark:text-amber-400 dark:hover:text-amber-200 p-1 rounded-lg hover:bg-amber-100/50 dark:hover:bg-amber-900/40 transition"
            aria-label="Dismiss alert"
          >
            <X class="w-4 h-4" />
          </button>
        </div>

        <!-- Error Alert -->
        <div
          v-if="!dismissedAlerts.error"
          class="p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 text-rose-900 dark:text-rose-200 flex items-start justify-between gap-3 shadow-soft-2xs transition"
        >
          <div class="flex items-start gap-3">
            <AlertCircle class="w-5 h-5 flex-shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
            <div>
              <h3 class="text-sm font-bold">Webhook Delivery Failed</h3>
              <p class="text-xs text-rose-700/90 dark:text-rose-300/80 mt-0.5">
                Endpoint <code class="px-1.5 py-0.5 rounded bg-rose-200/50 dark:bg-rose-900/50 font-mono text-[11px]">https://api.partner.com/events</code> returned HTTP 504 Gateway Timeout.
              </p>
            </div>
          </div>
          <button
            type="button"
            @click="dismissedAlerts.error = true"
            class="text-rose-600 hover:text-rose-900 dark:text-rose-400 dark:hover:text-rose-200 p-1 rounded-lg hover:bg-rose-100/50 dark:hover:bg-rose-900/40 transition"
            aria-label="Dismiss alert"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- ============================================================ -->
    <!-- 2-COLUMN RESPONSIVE BALANCED GRID (PATTERNS 2 to 14) -->
    <!-- ============================================================ -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

      <!-- ========================================== -->
      <!-- COLUMN 1: DIALOGS & FORM GUARDS -->
      <!-- ========================================== -->
      <div class="space-y-6">

        <!-- 3. MODAL / DIALOG -->
        <div
          v-if="isItemVisible('3')"
          id="pattern-3"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800">
                Pattern 03
              </span>
              <h2 class="text-base font-bold text-slate-900 dark:text-slate-100">
                Modal / Dialog
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('code-3')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('code-3')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check v-if="copiedCodeId === 'code-3'" class="w-4 h-4 text-emerald-500" />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <p class="text-xs text-slate-500 dark:text-slate-400">
            High-focus viewport dialog with backdrop blur, keyboard ESC dismissal, and form handling.
          </p>

          <div v-if="expandedCodeIds['code-3']" class="p-3 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
            <pre>{{ codeSnippets['code-3'] }}</pre>
          </div>

          <div class="pt-1">
            <UiButton @click="isStandardModalOpen = true" variant="primary" size="md">
              <Sliders class="w-4 h-4 mr-2" />
              Launch Standard Modal
            </UiButton>
          </div>

          <!-- Standard Modal Definition -->
          <UiModal
            v-model="isStandardModalOpen"
            title="Edit Workspace Settings"
            subtitle="Configure default parameters for team collaborations."
          >
            <div class="space-y-4 py-2">
              <div>
                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Workspace Name
                </label>
                <input
                  v-model="modalForm.name"
                  type="text"
                  class="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-brand-500 focus:outline-none text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Description
                </label>
                <textarea
                  v-model="modalForm.description"
                  rows="3"
                  class="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-brand-500 focus:outline-none text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <template #footer>
              <div class="flex items-center justify-end gap-2.5">
                <UiButton variant="ghost" size="sm" @click="isStandardModalOpen = false">
                  Cancel
                </UiButton>
                <UiButton variant="primary" size="sm" @click="saveStandardModal">
                  Save Changes
                </UiButton>
              </div>
            </template>
          </UiModal>
        </div>

        <!-- 4. CONFIRMATION DIALOG -->
        <div
          v-if="isItemVisible('4')"
          id="pattern-4"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                Pattern 04
              </span>
              <h2 class="text-base font-bold text-slate-900 dark:text-slate-100">
                Confirmation Dialog
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('code-4')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('code-4')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check v-if="copiedCodeId === 'code-4'" class="w-4 h-4 text-emerald-500" />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <p class="text-xs text-slate-500 dark:text-slate-400">
            Action verification dialog preventing unintentional state mutations or operations.
          </p>

          <div v-if="expandedCodeIds['code-4']" class="p-3 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
            <pre>{{ codeSnippets['code-4'] }}</pre>
          </div>

          <div class="pt-1">
            <UiButton @click="isConfirmDialogOpen = true" variant="secondary" size="md">
              <HelpCircle class="w-4 h-4 mr-2 text-brand-500" />
              Open Confirmation Prompt
            </UiButton>
          </div>

          <!-- Confirmation Dialog Definition -->
          <UiModal v-model="isConfirmDialogOpen" size="sm" :showHeader="false">
            <div class="text-center py-4 px-2">
              <div class="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800 mx-auto flex items-center justify-center mb-4 shadow-soft-xs">
                <CheckCircle2 class="w-6 h-6" />
              </div>
              <h3 class="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                Approve Batch Settlement?
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Are you sure you want to approve transaction batch <span class="font-mono text-slate-800 dark:text-slate-200 font-semibold">#TX-9948</span> for a total of <span class="font-bold text-slate-900 dark:text-slate-100">$24,980.00</span>?
              </p>
            </div>

            <template #footer>
              <div class="grid grid-cols-2 gap-3 w-full">
                <UiButton
                  variant="outline"
                  size="md"
                  @click="isConfirmDialogOpen = false"
                  :disabled="isConfirmLoading"
                >
                  Cancel
                </UiButton>
                <UiButton
                  variant="primary"
                  size="md"
                  @click="handleConfirmAction"
                  :loading="isConfirmLoading"
                >
                  Confirm Approval
                </UiButton>
              </div>
            </template>
          </UiModal>
        </div>

        <!-- 5. DESTRUCTIVE ALERT -->
        <div
          v-if="isItemVisible('5')"
          id="pattern-5"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                Pattern 05
              </span>
              <h2 class="text-base font-bold text-slate-900 dark:text-slate-100">
                Destructive Danger Alert
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('code-5')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('code-5')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check v-if="copiedCodeId === 'code-5'" class="w-4 h-4 text-emerald-500" />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <p class="text-xs text-slate-500 dark:text-slate-400">
            High-consequence danger dialog featuring strict keyword safeguards ("DELETE") before proceeding.
          </p>

          <div v-if="expandedCodeIds['code-5']" class="p-3 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
            <pre>{{ codeSnippets['code-5'] }}</pre>
          </div>

          <div class="pt-1">
            <UiButton @click="isDestructiveDialogOpen = true" variant="danger" size="md">
              <Trash2 class="w-4 h-4 mr-2" />
              Delete Database Cluster
            </UiButton>
          </div>

          <!-- Destructive Dialog Definition -->
          <UiModal v-model="isDestructiveDialogOpen" size="sm" :showHeader="false">
            <div class="text-center py-3">
              <div class="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/80 mx-auto flex items-center justify-center mb-4">
                <ShieldAlert class="w-7 h-7" />
              </div>
              <h3 class="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                Permanently Delete Cluster?
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-2">
                This action cannot be undone. All 14 associated databases, daily snapshots, and SSL certificates will be deleted immediately.
              </p>

              <div class="mt-4 p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40 text-left">
                <label class="block text-[11px] font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 mb-1.5">
                  Type <code class="bg-rose-200/60 dark:bg-rose-900/60 px-1 py-0.5 rounded font-mono font-bold">DELETE</code> to confirm:
                </label>
                <input
                  v-model="destructiveInput"
                  type="text"
                  placeholder="DELETE"
                  class="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 dark:text-slate-100 font-mono"
                />
              </div>
            </div>

            <template #footer>
              <div class="grid grid-cols-2 gap-3 w-full">
                <UiButton
                  variant="outline"
                  size="md"
                  @click="isDestructiveDialogOpen = false"
                  :disabled="isDestructiveDeleting"
                >
                  Cancel
                </UiButton>
                <UiButton
                  variant="danger"
                  size="md"
                  @click="handleDestructiveAction"
                  :disabled="destructiveInput !== 'DELETE'"
                  :loading="isDestructiveDeleting"
                >
                  Delete Cluster
                </UiButton>
              </div>
            </template>
          </UiModal>
        </div>

        <!-- 9. AUTHENTICATION ALERT -->
        <div
          v-if="isItemVisible('9')"
          id="pattern-9"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800">
                Pattern 09
              </span>
              <h2 class="text-base font-bold text-slate-900 dark:text-slate-100">
                Authentication Timeout Alert
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('code-9')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('code-9')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check v-if="copiedCodeId === 'code-9'" class="w-4 h-4 text-emerald-500" />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <p class="text-xs text-slate-500 dark:text-slate-400">
            Live security warning modal with real-time countdown timer before auto-logout.
          </p>

          <div v-if="expandedCodeIds['code-9']" class="p-3 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
            <pre>{{ codeSnippets['code-9'] }}</pre>
          </div>

          <div class="pt-1">
            <UiButton @click="openAuthAlert" variant="warning" size="md">
              <Clock class="w-4 h-4 mr-2" />
              Simulate Session Timeout (Countdown)
            </UiButton>
          </div>

          <!-- Auth Alert Definition -->
          <UiModal
            v-model="isAuthAlertOpen"
            size="sm"
            :showHeader="false"
            :showCloseButton="false"
            :closeOnBackdrop="false"
            :closeOnEsc="false"
          >
            <div class="text-center py-4 px-2">
              <div class="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/80 mx-auto flex items-center justify-center mb-4 shadow-soft-xs">
                <Clock class="w-7 h-7" />
              </div>
              <h3 class="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                Session Inactivity Warning
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-2">
                For security compliance, your administrator session will terminate automatically due to inactivity.
              </p>

              <!-- Digital Countdown Display -->
              <div class="mt-4 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60">
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Time Remaining
                </span>
                <span class="text-3xl font-mono font-black text-amber-600 dark:text-amber-400 tracking-wider">
                  {{ formattedCountdown }}
                </span>
              </div>
            </div>

            <template #footer>
              <div class="grid grid-cols-2 gap-3 w-full">
                <UiButton variant="ghost" size="md" @click="logoutFromAuthAlert">
                  <LogOut class="w-4 h-4 mr-1.5" />
                  Log Out Now
                </UiButton>
                <UiButton variant="primary" size="md" @click="extendSession">
                  Extend Session
                </UiButton>
              </div>
            </template>
          </UiModal>
        </div>

        <!-- 11. LOADING DIALOG -->
        <div
          v-if="isItemVisible('11')"
          id="pattern-11"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800">
                Pattern 11
              </span>
              <h2 class="text-base font-bold text-slate-900 dark:text-slate-100">
                Loading & Progress Dialog
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('code-11')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('code-11')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check v-if="copiedCodeId === 'code-11'" class="w-4 h-4 text-emerald-500" />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <p class="text-xs text-slate-500 dark:text-slate-400">
            Non-dismissable blocking overlay with progress bar and staged checklist verification.
          </p>

          <div v-if="expandedCodeIds['code-11']" class="p-3 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
            <pre>{{ codeSnippets['code-11'] }}</pre>
          </div>

          <div class="pt-1">
            <UiButton @click="startLoadingSimulation" variant="primary" size="md">
              <RefreshCw class="w-4 h-4 mr-2" />
              Trigger Processing Overlay
            </UiButton>
          </div>

          <!-- Loading Dialog Definition -->
          <UiModal
            v-model="isLoadingDialogOpen"
            size="sm"
            :showHeader="false"
            :showCloseButton="false"
            :closeOnBackdrop="false"
            :closeOnEsc="false"
          >
            <div class="py-4 px-2 space-y-4">
              <div class="flex items-center justify-center">
                <div class="relative w-16 h-16">
                  <div class="absolute inset-0 rounded-full border-4 border-slate-100 dark:border-slate-800" />
                  <div class="absolute inset-0 rounded-full border-4 border-brand-500 border-t-transparent animate-spin" />
                  <div class="absolute inset-0 flex items-center justify-center font-extrabold text-xs text-brand-600 dark:text-brand-400">
                    {{ loadingProgress }}%
                  </div>
                </div>
              </div>

              <div class="text-center">
                <h3 class="text-base font-extrabold text-slate-900 dark:text-slate-100">
                  Synchronizing Cloud Databases
                </h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Please wait while transaction logs are distributed across global read replicas.
                </p>
              </div>

              <!-- Progress Bar -->
              <div class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  class="bg-brand-500 h-full rounded-full transition-all duration-300 ease-out"
                  :style="{ width: `${loadingProgress}%` }"
                />
              </div>

              <!-- Staged Checklist -->
              <div class="space-y-2 text-xs pt-1">
                <div class="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                  <span class="flex items-center gap-1.5">
                    <CheckCircle2 class="w-3.5 h-3.5" /> Validating schema definitions
                  </span>
                  <span>Done</span>
                </div>
                <div
                  class="flex items-center justify-between font-medium"
                  :class="loadingProgress >= 50 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'"
                >
                  <span class="flex items-center gap-1.5">
                    <CheckCircle2 v-if="loadingProgress >= 50" class="w-3.5 h-3.5" />
                    <RefreshCw v-else class="w-3.5 h-3.5 animate-spin text-brand-500" />
                    Encrypting payload chunk files
                  </span>
                  <span>{{ loadingProgress >= 50 ? 'Done' : 'Processing' }}</span>
                </div>
                <div
                  class="flex items-center justify-between font-medium"
                  :class="loadingProgress >= 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'"
                >
                  <span class="flex items-center gap-1.5">
                    <CheckCircle2 v-if="loadingProgress >= 100" class="w-3.5 h-3.5" />
                    <Clock v-else class="w-3.5 h-3.5" />
                    Finalizing consensus commit
                  </span>
                  <span>{{ loadingProgress >= 100 ? 'Done' : 'Queued' }}</span>
                </div>
              </div>
            </div>
          </UiModal>
        </div>

        <!-- 13. UNSAVED CHANGES DIALOG -->
        <div
          v-if="isItemVisible('13')"
          id="pattern-13"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                Pattern 13
              </span>
              <h2 class="text-base font-bold text-slate-900 dark:text-slate-100">
                Unsaved Changes Guard
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('code-13')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('code-13')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check v-if="copiedCodeId === 'code-13'" class="w-4 h-4 text-emerald-500" />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <p class="text-xs text-slate-500 dark:text-slate-400">
            Navigation interceptor prompting users before discarding modified draft form inputs.
          </p>

          <div v-if="expandedCodeIds['code-13']" class="p-3 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
            <pre>{{ codeSnippets['code-13'] }}</pre>
          </div>

          <div class="p-3.5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 space-y-2.5">
            <div>
              <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Draft Document Title (Simulated Input)
              </label>
              <input
                v-model="unsavedDraftTitle"
                type="text"
                class="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
              />
            </div>

            <UiButton @click="isUnsavedChangesOpen = true" variant="warning" size="sm">
              <FileText class="w-3.5 h-3.5 mr-1.5" />
              Attempt Page Exit (Trigger Guard)
            </UiButton>
          </div>

          <!-- Unsaved Changes Modal Definition -->
          <UiModal v-model="isUnsavedChangesOpen" size="md" :showHeader="false">
            <div class="py-2 px-1">
              <div class="flex items-start gap-3.5">
                <div class="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 flex-shrink-0">
                  <AlertTriangle class="w-6 h-6" />
                </div>
                <div>
                  <h3 class="text-base font-extrabold text-slate-900 dark:text-slate-100">
                    You have unsaved changes
                  </h3>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    You modified the document <strong class="text-slate-800 dark:text-slate-200">"{{ unsavedDraftTitle }}"</strong>. If you leave without saving, your modifications will be lost.
                  </p>
                </div>
              </div>
            </div>

            <template #footer>
              <div class="flex flex-col sm:flex-row items-center justify-end gap-2.5 w-full">
                <UiButton variant="ghost" size="sm" @click="confirmDiscardChanges" class="text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950">
                  Discard Changes
                </UiButton>
                <UiButton variant="outline" size="sm" @click="isUnsavedChangesOpen = false">
                  Keep Editing
                </UiButton>
                <UiButton variant="primary" size="sm" @click="confirmSaveAndExit">
                  Save & Continue
                </UiButton>
              </div>
            </template>
          </UiModal>
        </div>

      </div>

      <!-- ========================================== -->
      <!-- COLUMN 2: TOASTS, OVERLAYS & STATUS -->
      <!-- ========================================== -->
      <div class="space-y-6">

        <!-- 2. TOAST / SNACKBAR -->
        <div
          v-if="isItemVisible('2')"
          id="pattern-2"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                Pattern 02
              </span>
              <h2 class="text-base font-bold text-slate-900 dark:text-slate-100">
                Toast / Snackbar
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('code-2')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('code-2')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check v-if="copiedCodeId === 'code-2'" class="w-4 h-4 text-emerald-500" />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <p class="text-xs text-slate-500 dark:text-slate-400">
            Floating micro-notifications with auto-dismiss timers and interactive action buttons.
          </p>

          <div v-if="expandedCodeIds['code-2']" class="p-3 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
            <pre>{{ codeSnippets['code-2'] }}</pre>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
            <button
              type="button"
              @click="toast.success('Your profile settings were saved successfully!')"
              class="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition shadow-soft-2xs"
            >
              <CheckCircle2 class="w-3.5 h-3.5 text-emerald-500" />
              Success Toast
            </button>

            <button
              type="button"
              @click="toast.error('Failed to connect to authentication cluster.')"
              class="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition shadow-soft-2xs"
            >
              <AlertCircle class="w-3.5 h-3.5 text-rose-500" />
              Error Toast
            </button>

            <button
              type="button"
              @click="toast.warning('Your subscription renews in 3 days.')"
              class="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-amber-700 dark:text-amber-300 text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition shadow-soft-2xs"
            >
              <AlertTriangle class="w-3.5 h-3.5 text-amber-500" />
              Warning Toast
            </button>

            <button
              type="button"
              @click="toast.info('A new build version is ready for deployment.')"
              class="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/80 text-brand-700 dark:text-brand-300 text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition shadow-soft-2xs"
            >
              <Info class="w-3.5 h-3.5 text-brand-500" />
              Info Toast
            </button>

            <button
              type="button"
              @click="triggerActionToast"
              class="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition shadow-soft-2xs col-span-2 sm:col-span-2"
            >
              <Trash2 class="w-3.5 h-3.5 text-indigo-500" />
              Action Snackbar (Click for Undo)
            </button>
          </div>
        </div>

        <!-- 6. BANNER / NOTIFICATION BAR -->
        <div
          v-if="isItemVisible('6')"
          id="pattern-6"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                Pattern 06
              </span>
              <h2 class="text-base font-bold text-slate-900 dark:text-slate-100">
                Banner / Notification Bar
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('code-6')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('code-6')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check v-if="copiedCodeId === 'code-6'" class="w-4 h-4 text-emerald-500" />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <p class="text-xs text-slate-500 dark:text-slate-400">
            Sticky or docked horizontal announcement banners for release notices and platform status.
          </p>

          <div v-if="expandedCodeIds['code-6']" class="p-3 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
            <pre>{{ codeSnippets['code-6'] }}</pre>
          </div>

          <div class="space-y-3 pt-1">
            <UiButton
              variant="secondary"
              size="sm"
              @click="isBannerVisible = !isBannerVisible"
            >
              <Radio class="w-3.5 h-3.5 mr-1.5 text-amber-500" />
              Toggle Global Announcement Bar ({{ isBannerVisible ? 'Active' : 'Closed' }})
            </UiButton>

            <!-- Card Promo Banner Sample -->
            <div class="rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 p-4 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-soft-sm">
              <div class="flex items-center gap-3">
                <span class="p-2 rounded-xl bg-white/20 backdrop-blur-xs flex-shrink-0">
                  <Sparkles class="w-4 h-4 text-white" />
                </span>
                <div>
                  <h4 class="text-xs sm:text-sm font-bold">New AI Assistant Available</h4>
                  <p class="text-[11px] text-white/80 mt-0.5">
                    Generate insights directly from tables.
                  </p>
                </div>
              </div>
              <button
                type="button"
                class="px-3 py-1 rounded-xl bg-white text-brand-700 font-bold text-xs hover:bg-white/90 active:scale-95 transition shadow-soft-2xs self-start sm:self-auto"
              >
                Try Beta
              </button>
            </div>
          </div>
        </div>

        <!-- 7. POPOVER -->
        <div
          v-if="isItemVisible('7')"
          id="pattern-7"
          :class="[
            'glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4 relative transition-all',
            (isProfilePopoverOpen || isSettingsPopoverOpen) ? 'z-40' : 'z-10',
          ]"
        >
          <div class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-fuchsia-50 dark:bg-fuchsia-950 text-fuchsia-600 dark:text-fuchsia-400 border border-fuchsia-200 dark:border-fuchsia-800">
                Pattern 07
              </span>
              <h2 class="text-base font-bold text-slate-900 dark:text-slate-100">
                Popover (Click-Outside Guarded)
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('code-7')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('code-7')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check v-if="copiedCodeId === 'code-7'" class="w-4 h-4 text-emerald-500" />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <p class="text-xs text-slate-500 dark:text-slate-400">
            Contextual floating overlay attached to an anchor trigger with outside-click dismissal.
          </p>

          <div v-if="expandedCodeIds['code-7']" class="p-3 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
            <pre>{{ codeSnippets['code-7'] }}</pre>
          </div>

          <div class="flex flex-wrap items-center gap-3 pt-1">
            <!-- Profile Popover -->
            <div class="relative" ref="profilePopoverRef">
              <button
                type="button"
                @click.stop="toggleProfilePopover"
                class="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition shadow-soft-2xs"
              >
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face" class="w-5 h-5 rounded-full object-cover" />
                <span>User Mini Profile</span>
                <ChevronDown class="w-3.5 h-3.5 text-slate-400" />
              </button>

              <div
                v-if="isProfilePopoverOpen"
                @click.stop
                class="absolute left-0 mt-2.5 w-72 max-w-[calc(100vw-3rem)] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft-2xl p-4 z-50 space-y-3"
              >
                <!-- Pointer Caret Arrow -->
                <span class="absolute -top-1.5 left-6 w-3 h-3 bg-white dark:bg-slate-900 border-t border-l border-slate-200 dark:border-slate-800 rotate-45" />

                <div class="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=face" class="w-10 h-10 rounded-2xl object-cover" />
                  <div class="min-w-0">
                    <h4 class="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">Sarah Jenkins</h4>
                    <p class="text-xs text-slate-500 truncate">sarah.j@company.io</p>
                    <UiBadge variant="brand" size="sm" class="mt-1">Staff Architect</UiBadge>
                  </div>
                </div>
                <div class="border-t border-slate-100 dark:border-slate-800 pt-2 flex items-center justify-between text-xs text-slate-500">
                  <span>Active 2m ago</span>
                  <span class="text-emerald-500 font-semibold">● Online</span>
                </div>
                <UiButton
                  variant="primary"
                  size="sm"
                  class="w-full"
                  @click="toast.info('Viewing Sarah Jenkins complete profile...'); isProfilePopoverOpen = false"
                >
                  View Full Profile
                </UiButton>
              </div>
            </div>

            <!-- Settings Popover -->
            <div class="relative" ref="settingsPopoverRef">
              <button
                type="button"
                @click.stop="toggleSettingsPopover"
                class="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition shadow-soft-2xs"
              >
                <Sliders class="w-3.5 h-3.5 text-brand-500" />
                <span>Preferences Popover</span>
                <ChevronDown class="w-3.5 h-3.5 text-slate-400" />
              </button>

              <div
                v-if="isSettingsPopoverOpen"
                @click.stop
                class="absolute left-0 sm:left-auto sm:right-0 mt-2.5 w-64 max-w-[calc(100vw-3rem)] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft-2xl p-4 z-50 space-y-3"
              >
                <!-- Pointer Caret Arrow -->
                <span class="absolute -top-1.5 left-6 sm:left-auto sm:right-6 w-3 h-3 bg-white dark:bg-slate-900 border-t border-l border-slate-200 dark:border-slate-800 rotate-45" />

                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">Quick Preferences</h4>
                <div class="space-y-3">
                  <UiToggle v-model="popoverSettings.emailAlerts" label="Email Alerts" />
                  <UiToggle v-model="popoverSettings.audioFeedback" label="Sound Effects" />
                  <UiToggle v-model="popoverSettings.compactMode" label="Compact Mode" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 8. TOOLTIPS -->
        <div
          v-if="isItemVisible('8')"
          id="pattern-8"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800">
                Pattern 08
              </span>
              <h2 class="text-base font-bold text-slate-900 dark:text-slate-100">
                Tooltips (4 Directions with Carets)
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('code-8')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('code-8')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check v-if="copiedCodeId === 'code-8'" class="w-4 h-4 text-emerald-500" />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <p class="text-xs text-slate-500 dark:text-slate-400">
            Micro tooltips positioned top, bottom, left, and right with shortcut badges and pointer arrows.
          </p>

          <div v-if="expandedCodeIds['code-8']" class="p-3 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
            <pre>{{ codeSnippets['code-8'] }}</pre>
          </div>

          <div class="flex flex-wrap items-center justify-around gap-4 pt-3 pb-1">
            <!-- Top Tooltip -->
            <div class="relative group">
              <button
                type="button"
                class="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                Tooltip Top
              </button>
              <div class="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-hover:-translate-y-1 transition-all duration-200 z-30">
                <div class="relative px-2.5 py-1.5 rounded-xl bg-slate-950 text-white text-[11px] font-medium shadow-soft-xl whitespace-nowrap flex items-center gap-1.5 border border-slate-800">
                  <span>Save to favorites</span>
                  <kbd class="px-1 py-0.5 rounded bg-slate-800 text-[10px] font-mono">⌘S</kbd>
                  <span class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 border-r border-b border-slate-800 rotate-45" />
                </div>
              </div>
            </div>

            <!-- Bottom Tooltip -->
            <div class="relative group">
              <button
                type="button"
                class="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                Tooltip Bottom
              </button>
              <div class="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2.5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-hover:translate-y-1 transition-all duration-200 z-30">
                <div class="relative px-2.5 py-1.5 rounded-xl bg-slate-950 text-white text-[11px] font-medium shadow-soft-xl whitespace-nowrap flex items-center gap-1.5 border border-slate-800">
                  <span class="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 border-l border-t border-slate-800 rotate-45" />
                  <span>View revisions</span>
                  <kbd class="px-1 py-0.5 rounded bg-slate-800 text-[10px] font-mono">⌥R</kbd>
                </div>
              </div>
            </div>

            <!-- Left Tooltip -->
            <div class="relative group">
              <button
                type="button"
                class="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                Tooltip Left
              </button>
              <div class="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-2.5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-hover:-translate-x-1 transition-all duration-200 z-30">
                <div class="relative px-2.5 py-1.5 rounded-xl bg-slate-950 text-white text-[11px] font-medium shadow-soft-xl whitespace-nowrap border border-slate-800">
                  <span class="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-950 border-t border-r border-slate-800 rotate-45" />
                  <span>Copy invite link</span>
                </div>
              </div>
            </div>

            <!-- Right Tooltip -->
            <div class="relative group">
              <button
                type="button"
                class="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                Tooltip Right
              </button>
              <div class="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2.5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-hover:translate-x-1 transition-all duration-200 z-30">
                <div class="relative px-2.5 py-1.5 rounded-xl bg-slate-950 text-white text-[11px] font-medium shadow-soft-xl whitespace-nowrap border border-slate-800">
                  <span class="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-950 border-b border-l border-slate-800 rotate-45" />
                  <span>Export report</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 10. API / SERVER ALERT -->
        <div
          v-if="isItemVisible('10')"
          id="pattern-10"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                Pattern 10
              </span>
              <h2 class="text-base font-bold text-slate-900 dark:text-slate-100">
                API / Server Error Alert
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('code-10')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('code-10')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check v-if="copiedCodeId === 'code-10'" class="w-4 h-4 text-emerald-500" />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <p class="text-xs text-slate-500 dark:text-slate-400">
            Diagnostic failure block with expandable stack trace payload and animated retry button.
          </p>

          <div v-if="expandedCodeIds['code-10']" class="p-3 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
            <pre>{{ codeSnippets['code-10'] }}</pre>
          </div>

          <!-- If Outage -->
          <div
            v-if="apiStatus === 'outage'"
            class="rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 p-4 space-y-3"
          >
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <div class="p-2 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex-shrink-0">
                  <Server class="w-4 h-4" />
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h4 class="text-xs font-bold text-slate-900 dark:text-slate-100">
                      HTTP 503: Service Unavailable
                    </h4>
                    <span class="px-1.5 py-0.2 rounded bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200 text-[10px] font-mono font-bold">
                      ERR_DOWN
                    </span>
                  </div>
                  <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Upstream payment proxy failed handshake within 5000ms.
                  </p>
                </div>
              </div>

              <UiButton
                variant="danger"
                size="sm"
                @click="retryApiCall"
                :loading="isRetryingApi"
                class="self-start sm:self-auto"
              >
                <RefreshCw class="w-3.5 h-3.5 mr-1.5" />
                Retry
              </UiButton>
            </div>

            <!-- Collapsible Diagnostic Trace -->
            <div class="border-t border-rose-200/60 dark:border-rose-900/40 pt-2">
              <button
                type="button"
                @click="showApiDetails = !showApiDetails"
                class="text-[11px] font-semibold text-rose-700 dark:text-rose-400 hover:underline flex items-center gap-1"
              >
                <span>{{ showApiDetails ? 'Hide' : 'View' }} Technical Trace</span>
                <ChevronDown v-if="!showApiDetails" class="w-3 h-3" />
                <ChevronUp v-else class="w-3 h-3" />
              </button>

              <div v-if="showApiDetails" class="mt-2 p-3 rounded-xl bg-slate-950 text-slate-300 font-mono text-[10px] overflow-x-auto space-y-1">
                <div><span class="text-rose-400">Request ID:</span> req_01j7k8m92p10ax</div>
                <div><span class="text-rose-400">Route:</span> POST https://gateway.company.io/v2/settlement/payout</div>
              </div>
            </div>
          </div>

          <!-- If Resolved -->
          <div
            v-else
            class="rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div class="flex items-center gap-2.5">
              <CheckCircle2 class="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <div>
                <h4 class="text-xs font-bold text-slate-900 dark:text-slate-100">
                  Service Restored (HTTP 200 OK)
                </h4>
                <p class="text-[11px] text-emerald-700 dark:text-emerald-300">
                  Upstream gateway latency is normal (34ms).
                </p>
              </div>
            </div>

            <UiButton variant="outline" size="sm" @click="simulateApiOutage">
              Re-simulate
            </UiButton>
          </div>
        </div>

        <!-- 12. FORM VALIDATION ALERT -->
        <div
          v-if="isItemVisible('12')"
          id="pattern-12"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                Pattern 12
              </span>
              <h2 class="text-base font-bold text-slate-900 dark:text-slate-100">
                Form Validation Error Summary
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('code-12')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('code-12')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check v-if="copiedCodeId === 'code-12'" class="w-4 h-4 text-emerald-500" />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <p class="text-xs text-slate-500 dark:text-slate-400">
            Top-of-form error aggregation box linking directly to invalid fields with live validation.
          </p>

          <div v-if="expandedCodeIds['code-12']" class="p-3 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
            <pre>{{ codeSnippets['code-12'] }}</pre>
          </div>

          <!-- The Validation Alert Box -->
          <div
            v-if="activeValidationErrors.length > 0"
            class="p-3.5 rounded-2xl bg-rose-50/90 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 text-rose-900 dark:text-rose-200 space-y-1.5"
          >
            <div class="flex items-center gap-2">
              <AlertCircle class="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0" />
              <span class="text-xs font-bold">
                {{ activeValidationErrors.length }} errors preventing submission:
              </span>
            </div>

            <ul class="list-disc list-inside space-y-1 pl-5 text-[11px] text-rose-800 dark:text-rose-300">
              <li v-for="(err, idx) in activeValidationErrors" :key="idx">
                <span class="font-medium">{{ err }}</span>
              </li>
            </ul>
          </div>

          <div
            v-else-if="formSubmitted"
            class="p-3.5 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-200 flex items-center gap-2"
          >
            <CheckCircle2 class="w-4 h-4 text-emerald-500" />
            <span class="text-xs font-bold">All form inputs validated successfully!</span>
          </div>

          <!-- Interactive Form Controls for Testing -->
          <div class="p-3.5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 space-y-2.5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Work Email
                </label>
                <input
                  v-model="formValidationFields.email"
                  type="text"
                  class="w-full px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Password
                </label>
                <input
                  v-model="formValidationFields.password"
                  type="password"
                  class="w-full px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div class="flex items-center gap-2 pt-0.5">
              <UiCheckbox
                v-model="formValidationFields.termsAccepted"
                label="I accept the Terms of Service"
              />
            </div>

            <div class="flex items-center gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
              <UiButton variant="primary" size="sm" @click="handleFormValidationSubmit">
                Validate & Submit
              </UiButton>
              <UiButton variant="outline" size="sm" @click="autofillValidForm">
                Autofill Valid
              </UiButton>
            </div>
          </div>
        </div>

        <!-- 14. UPLOAD / DOWNLOAD TRANSFER -->
        <div
          v-if="isItemVisible('14')"
          id="pattern-14"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800">
                Pattern 14
              </span>
              <h2 class="text-base font-bold text-slate-900 dark:text-slate-100">
                Upload / Download Transfer
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('code-14')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('code-14')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check v-if="copiedCodeId === 'code-14'" class="w-4 h-4 text-emerald-500" />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <p class="text-xs text-slate-500 dark:text-slate-400">
            Background file transfer card with live MB/s bandwidth and pause/cancel controls.
          </p>

          <div v-if="expandedCodeIds['code-14']" class="p-3 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
            <pre>{{ codeSnippets['code-14'] }}</pre>
          </div>

          <div class="space-y-3">
            <div class="flex flex-wrap items-center gap-2">
              <UiButton variant="primary" size="sm" @click="startNewDownload">
                <FileUp class="w-3.5 h-3.5 mr-1.5" />
                Simulate Download
              </UiButton>
              <UiButton
                variant="outline"
                size="sm"
                @click="isTransferDocked = !isTransferDocked"
              >
                <Maximize2 v-if="!isTransferDocked" class="w-3.5 h-3.5 mr-1.5" />
                <Minimize2 v-else class="w-3.5 h-3.5 mr-1.5" />
                {{ isTransferDocked ? 'Undock Card' : 'Dock to Screen Corner' }}
              </UiButton>
            </div>

            <!-- Transfer Card Preview -->
            <div
              :class="[
                'p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft-md space-y-3 transition-all',
                isTransferDocked ? 'fixed bottom-6 right-6 z-40 max-w-sm w-full shadow-soft-xl border-brand-500/40' : 'w-full',
              ]"
            >
              <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                  <div class="p-2 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800 flex-shrink-0">
                    <FileUp class="w-4 h-4" />
                  </div>
                  <div class="min-w-0">
                    <h4 class="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                      annual-report-2026.pdf
                    </h4>
                    <p class="text-[11px] text-slate-500">
                      {{ transferProgress < 100 ? `${isTransferPaused ? 'Paused' : 'Transferring'} • 34.2 MB • 4.8 MB/s` : 'Complete • 34.2 MB' }}
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-1 flex-shrink-0">
                  <button
                    type="button"
                    v-if="transferProgress < 100"
                    @click="toggleTransferPause"
                    class="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    :title="isTransferPaused ? 'Resume' : 'Pause'"
                  >
                    <Play v-if="isTransferPaused" class="w-3.5 h-3.5" />
                    <Pause v-else class="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    @click="startNewDownload"
                    class="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    title="Restart download"
                  >
                    <RefreshCw class="w-3.5 h-3.5" />
                  </button>
                  <button
                    v-if="isTransferDocked"
                    type="button"
                    @click="isTransferDocked = false"
                    class="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    title="Undock"
                  >
                    <X class="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <!-- Progress bar -->
              <div class="space-y-1">
                <div class="flex items-center justify-between text-[10px] text-slate-500 font-semibold">
                  <span>{{ transferProgress < 100 ? `${transferProgress}% complete` : '100% Downloaded' }}</span>
                  <span>{{ transferProgress < 100 ? (isTransferPaused ? 'Paused' : '3s left') : 'Ready' }}</span>
                </div>
                <div class="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    class="bg-sky-500 h-full rounded-full transition-all duration-300"
                    :style="{ width: `${transferProgress}%` }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

    <!-- ============================================================ -->
    <!-- 15. FULL WIDTH: LIVE SYSTEM STATUS ALERT -->
    <!-- ============================================================ -->
    <div
      v-if="isItemVisible('15')"
      id="pattern-15"
      class="glass-card rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
    >
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              Pattern 15
            </span>
            <h2 class="text-lg font-bold text-slate-900 dark:text-slate-100">
              System Health & Operational Status Alert
            </h2>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Multi-service uptime status widget with latency breakdown and incident announcement pill.
          </p>
        </div>
        <div class="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            @click="toggleCodeDrawer('code-15')"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <Code2 class="w-3.5 h-3.5" />
            <span>{{ expandedCodeIds['code-15'] ? 'Hide Code' : 'View Code' }}</span>
          </button>
          <button
            type="button"
            @click="copyCodeSnippet('code-15')"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-900/60 hover:bg-brand-100 transition"
          >
            <Check v-if="copiedCodeId === 'code-15'" class="w-3.5 h-3.5 text-emerald-500" />
            <Copy v-else class="w-3.5 h-3.5" />
            <span>{{ copiedCodeId === 'code-15' ? 'Copied!' : 'Copy' }}</span>
          </button>
        </div>
      </div>

      <!-- Expandable Code Drawer -->
      <div v-if="expandedCodeIds['code-15']" class="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800 shadow-inner">
        <pre>{{ codeSnippets['code-15'] }}</pre>
      </div>

      <!-- System Status Box -->
      <div class="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <!-- Overall Status Header -->
        <div class="p-4 bg-amber-500/10 border-b border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div class="flex items-center gap-2.5">
            <span class="relative flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span class="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
            </span>
            <span class="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-200">
              Partial Outage Detected on S3 Asset Storage
            </span>
          </div>
          <span class="text-[11px] text-amber-800 dark:text-amber-300 font-medium">
            Incident #INC-2026-89 • Updated 3m ago
          </span>
        </div>

        <!-- Micro-Services Breakdown Table -->
        <div class="divide-y divide-slate-100 dark:divide-slate-800/80 bg-white/50 dark:bg-slate-900/50">
          <div
            v-for="svc in systemHealth.services"
            :key="svc.name"
            class="p-3.5 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
          >
            <div class="flex items-center gap-2.5">
              <span
                class="w-2 h-2 rounded-full flex-shrink-0"
                :class="svc.status === 'operational' ? 'bg-emerald-500' : 'bg-amber-500'"
              />
              <span class="font-bold text-slate-800 dark:text-slate-200">{{ svc.name }}</span>
            </div>

            <div class="flex items-center gap-4 text-slate-500">
              <span>Latency: <strong class="text-slate-700 dark:text-slate-300">{{ svc.latency }}</strong></span>
              <span>Uptime: <strong class="text-slate-700 dark:text-slate-300">{{ svc.uptime }}</strong></span>
              <UiBadge
                :variant="svc.status === 'operational' ? 'success' : 'warning'"
                size="sm"
              >
                {{ svc.status === 'operational' ? 'Operational' : 'Degraded' }}
              </UiBadge>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
