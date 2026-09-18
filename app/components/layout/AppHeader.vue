<script setup lang="ts">
import {
  Menu,
  Sun,
  Moon,
  Bell,
  Search,
  CheckCheck,
} from 'lucide-vue-next'

const themeStore = useThemeStore()
const showNotifications = ref(false)
const notificationRef = ref<HTMLElement | null>(null)

const notifications = ref([
  { id: 1, title: 'System deployment finished', time: '12m ago', read: false },
  { id: 2, title: 'New team member joined: Elena', time: '1h ago', read: false },
  { id: 3, title: 'Database backup verified', time: '3h ago', read: true },
])

const unreadCount = computed(() => notifications.value.filter((n) => !n.read).length)

const markAllRead = () => {
  notifications.value.forEach((n) => (n.read = true))
}

const handleClickOutside = (e: MouseEvent) => {
  if (notificationRef.value && !notificationRef.value.contains(e.target as Node)) {
    showNotifications.value = false
  }
}

onMounted(() => {
  if (import.meta.client) {
    document.addEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    document.removeEventListener('click', handleClickOutside)
  }
})
</script>

<template>
  <header class="sticky top-0 z-30 h-16 glass-header transition-colors px-4 sm:px-6 flex items-center justify-between gap-4">
    <!-- Left: Hamburger toggle + Breadcrumb -->
    <div class="flex items-center gap-3 min-w-0">
      <button
        type="button"
        @click="themeStore.toggleMobileSidebar"
        class="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Toggle navigation menu"
      >
        <Menu class="w-5 h-5" />
      </button>

      <LayoutAppBreadcrumb />
    </div>

    <!-- Center/Right: Global Search + Actions -->
    <div class="flex items-center gap-2 sm:gap-3">
      <!-- Search Input (Desktop) -->
      <div class="relative hidden md:block w-64 lg:w-72">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Search class="w-4 h-4" />
        </div>
        <input
          type="search"
          placeholder="Quick search... (Ctrl+K)"
          class="w-full pl-9 pr-8 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-transparent focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none transition-all duration-150"
        />
        <div class="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
          <kbd class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200/60 dark:bg-slate-700/60 text-slate-400">⌘K</kbd>
        </div>
      </div>

      <!-- Theme Switcher -->
      <button
        type="button"
        @click="themeStore.toggleTheme"
        class="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        :title="themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        aria-label="Toggle theme"
      >
        <Moon v-if="themeStore.isDark" class="w-4 h-4 text-brand-400" />
        <Sun v-else class="w-4 h-4 text-amber-500" />
      </button>

      <!-- Notifications -->
      <div ref="notificationRef" class="relative">
        <button
          type="button"
          @click="showNotifications = !showNotifications"
          class="relative p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="View notifications"
        >
          <Bell class="w-4 h-4" />
          <span
            v-if="unreadCount > 0"
            class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900"
          />
        </button>

        <!-- Notifications Dropdown -->
        <Transition
          enter-active-class="transition duration-150 ease-out"
          enter-from-class="opacity-0 scale-95 -translate-y-1"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 -translate-y-1"
        >
          <div
            v-if="showNotifications"
            class="absolute right-0 mt-2 w-80 rounded-2xl bg-white dark:bg-slate-900 shadow-soft-xl border border-slate-200/80 dark:border-slate-800 py-2 z-50 overflow-hidden"
          >
            <div class="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div class="flex items-center gap-1.5">
                <span class="text-xs font-semibold text-slate-900 dark:text-slate-100">Notifications</span>
                <UiBadge v-if="unreadCount > 0" variant="brand" size="sm">{{ unreadCount }} new</UiBadge>
              </div>
              <button
                v-if="unreadCount > 0"
                type="button"
                @click="markAllRead"
                class="text-[11px] font-medium text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
              >
                <CheckCheck class="w-3 h-3" /> Mark read
              </button>
            </div>

            <div class="divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto">
              <div
                v-for="item in notifications"
                :key="item.id"
                class="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start gap-2.5 cursor-pointer"
                @click="item.read = true"
              >
                <div
                  :class="[
                    'w-2 h-2 rounded-full mt-1.5 flex-shrink-0',
                    item.read ? 'bg-slate-300 dark:bg-slate-700' : 'bg-brand-500',
                  ]"
                />
                <div class="flex-1 min-w-0">
                  <p :class="['text-xs', item.read ? 'text-slate-500 dark:text-slate-400' : 'font-medium text-slate-800 dark:text-slate-200']">
                    {{ item.title }}
                  </p>
                  <span class="text-[10px] text-slate-400 mt-0.5 block">{{ item.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Divider -->
      <div class="h-5 w-[1px] bg-slate-200 dark:bg-slate-800" />

      <!-- User Profile Dropdown -->
      <LayoutUserDropdown />
    </div>
  </header>
</template>
