<script setup lang="ts">
import {
  LayoutDashboard,
  Users,
  Layers,
  TableProperties,
  Sparkles,
  BellRing,
  PanelsTopLeft,
  TextCursorInput,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  X,
} from 'lucide-vue-next'

const route = useRoute()
const themeStore = useThemeStore()

interface NavigationSection {
  title?: string
  items: {
    label: string
    to: string
    icon: any
    badge?: string
    badgeVariant?: 'brand' | 'success' | 'warning'
  }[]
}

const navSections: NavigationSection[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Management',
    items: [
      { label: 'User Directory', to: '/users', icon: Users, badge: 'Live', badgeVariant: 'success' },
    ],
  },
  {
    title: 'Components & UI',
    items: [
      { label: 'Table Templates', to: '/tables', icon: TableProperties, badge: '5 Styles', badgeVariant: 'brand' },
      { label: 'Lucide Icons', to: '/icons', icon: Sparkles, badge: 'Icons', badgeVariant: 'brand' },
      { label: 'Alerts & Popups', to: '/alerts', icon: BellRing, badge: '15 Types', badgeVariant: 'warning' },
      { label: 'Modal Dialogs', to: '/modals', icon: PanelsTopLeft, badge: '30 Types', badgeVariant: 'brand' },
      { label: 'Form Inputs', to: '/inputs', icon: TextCursorInput, badge: '50 Types', badgeVariant: 'success' },
      { label: 'UI Library', to: '/components-gallery', icon: Layers, badge: 'All UI', badgeVariant: 'brand' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { label: 'System Settings', to: '/settings', icon: Settings },
    ],
  },
]

const isActive = (path: string) => {
  if (path === '/dashboard') {
    return route.path === '/' || route.path === '/dashboard'
  }
  return route.path.startsWith(path)
}
</script>

<template>
  <!-- Mobile Backdrop Overlay -->
  <Transition
    enter-active-class="transition-opacity ease-linear duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity ease-linear duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="themeStore.isMobileSidebarOpen"
      class="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
      @click="themeStore.closeMobileSidebar"
    />
  </Transition>

  <!-- Sidebar Container -->
  <aside
    :class="[
      'fixed top-0 bottom-0 left-0 z-40 flex flex-col glass-sidebar transition-[width] duration-300 ease-in-out select-none',
      themeStore.isSidebarCollapsed ? 'lg:w-20' : 'lg:w-64',
      themeStore.isMobileSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0',
    ]"
  >
    <!-- Floating Collapse / Expand Button on Right Border (Desktop) -->
    <button
      type="button"
      @click="themeStore.toggleSidebar"
      class="hidden lg:flex absolute -right-3 top-5 z-50 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-soft items-center justify-center text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-500 transition-all duration-200 hover:scale-110 cursor-pointer"
      :title="themeStore.isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      aria-label="Toggle sidebar collapse"
    >
      <ChevronRight v-if="themeStore.isSidebarCollapsed" class="w-3.5 h-3.5" />
      <ChevronLeft v-else class="w-3.5 h-3.5" />
    </button>

    <!-- Brand Logo / Header -->
    <div class="h-16 flex items-center px-[22px] border-b border-slate-200/70 dark:border-slate-800/70 overflow-hidden flex-shrink-0">
      <NuxtLink
        to="/dashboard"
        class="flex items-center group min-w-0"
        :title="themeStore.isSidebarCollapsed ? 'Kobokan Admin' : undefined"
      >
        <!-- Logo Icon (Static X-position, never shifts) -->
        <div class="w-9 h-9 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
          <!-- Light Mode Icon (dark bowl base) -->
          <img
            src="/images/icon.png"
            alt="Kobokan Logo"
            class="w-8 h-8 object-contain drop-shadow-sm dark:hidden"
          />
          <!-- Dark Mode Icon (white bowl base) -->
          <img
            src="/images/icon-dark.png"
            alt="Kobokan Logo Dark"
            class="w-8 h-8 object-contain drop-shadow-sm hidden dark:block"
          />
        </div>

        <!-- Brand Text with smooth width & opacity transition (no text wrap) -->
        <div
          :class="[
            'overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out',
            themeStore.isSidebarCollapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-xs opacity-100 ml-3',
          ]"
        >
          <span class="text-sm font-extrabold tracking-tight text-slate-900 dark:text-slate-100 block">
            Kobokan<span class="text-amber-500">.</span>
          </span>
          <span class="text-[10px] uppercase font-semibold tracking-wider text-slate-400 block -mt-0.5">
            Admin Base
          </span>
        </div>
      </NuxtLink>

      <!-- Mobile Close Button -->
      <button
        type="button"
        @click="themeStore.closeMobileSidebar"
        class="lg:hidden ml-auto p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        aria-label="Close sidebar"
      >
        <X class="w-5 h-5" />
      </button>
    </div>

    <!-- Navigation Links -->
    <div class="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-5">
      <div v-for="(section, secIdx) in navSections" :key="secIdx" class="space-y-1">
        <!-- Section Title with smooth height & opacity collapse -->
        <div
          :class="[
            'overflow-hidden transition-all duration-300 ease-in-out',
            themeStore.isSidebarCollapsed ? 'max-h-0 opacity-0' : 'max-h-6 opacity-100',
          ]"
        >
          <h4 class="px-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 whitespace-nowrap">
            {{ section.title }}
          </h4>
        </div>

        <!-- Subtle section divider when collapsed -->
        <div
          v-if="themeStore.isSidebarCollapsed && secIdx > 0"
          class="w-8 h-[1px] bg-slate-200/80 dark:bg-slate-800/80 mx-auto my-2"
        />

        <div class="space-y-1">
          <NuxtLink
            v-for="item in section.items"
            :key="item.to"
            :to="item.to"
            @click="themeStore.closeMobileSidebar"
            :class="[
              'group relative h-11 w-full flex items-center rounded-xl transition-colors duration-150 select-none px-2.5 overflow-hidden',
              isActive(item.to)
                ? 'bg-brand-50/90 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 shadow-soft-sm font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100',
            ]"
          >
            <!-- Icon Container (Fixed 36px wide to match header logo perfectly, stays centered in collapsed mode) -->
            <div class="w-9 h-9 flex items-center justify-center flex-shrink-0">
              <component
                :is="item.icon"
                :class="[
                  'w-5 h-5 transition-colors',
                  isActive(item.to)
                    ? 'text-brand-600 dark:text-brand-400'
                    : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300',
                ]"
              />
            </div>

            <!-- Label with smooth horizontal slide & fade (no text wrapping or jumping) -->
            <span
              :class="[
                'whitespace-nowrap overflow-hidden text-xs transition-all duration-300 ease-in-out',
                themeStore.isSidebarCollapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-[140px] opacity-100 ml-2.5',
              ]"
            >
              {{ item.label }}
            </span>

            <!-- Badge with smooth slide -->
            <div
              :class="[
                'ml-auto overflow-hidden transition-all duration-300 ease-in-out',
                themeStore.isSidebarCollapsed ? 'max-w-0 opacity-0 scale-75' : 'max-w-xs opacity-100 scale-100',
              ]"
            >
              <UiBadge
                v-if="item.badge"
                :variant="item.badgeVariant || 'brand'"
                size="sm"
              >
                {{ item.badge }}
              </UiBadge>
            </div>

            <!-- Floating Tooltip on Hover (Collapsed mode only) -->
            <div
              v-if="themeStore.isSidebarCollapsed"
              class="absolute left-full ml-3 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-medium whitespace-nowrap shadow-soft-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50 flex items-center gap-1.5"
            >
              <span>{{ item.label }}</span>
              <span
                v-if="item.badge"
                class="px-1.5 py-0.2 rounded text-[10px] bg-brand-500 text-white font-semibold"
              >
                {{ item.badge }}
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Sidebar Footer with smooth max-height collapse -->
    <div
      :class="[
        'overflow-hidden transition-all duration-300 ease-in-out mx-2',
        themeStore.isSidebarCollapsed
          ? 'max-h-0 opacity-0 p-0 m-0 border-transparent'
          : 'max-h-24 opacity-100 p-3 mb-2 border-t border-slate-200/70 dark:border-slate-800/70 rounded-2xl bg-gradient-to-br from-brand-50/50 to-indigo-50/30 dark:from-slate-800/40 dark:to-brand-950/20',
      ]"
    >
      <div class="flex items-center justify-between text-xs whitespace-nowrap">
        <div>
          <p class="font-semibold text-slate-800 dark:text-slate-200">Nuxt 4 Base</p>
          <p class="text-[10px] text-slate-500 dark:text-slate-400">Production Ready</p>
        </div>
        <UiBadge variant="brand" size="sm">v1.0.0</UiBadge>
      </div>
    </div>
  </aside>
</template>
