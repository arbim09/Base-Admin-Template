<script setup lang="ts">
import { User, Settings, LogOut, ChevronDown } from 'lucide-vue-next'
import { getInitials } from '~/utils/helpers'

const authStore = useAuthStore()
const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const handleLogout = () => {
  closeDropdown()
  authStore.logout()
  navigateTo('/auth/login')
}

// Click outside handler
const handleClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    closeDropdown()
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
  <div ref="dropdownRef" class="relative">
    <button
      type="button"
      @click="toggleDropdown"
      class="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors focus:outline-none"
    >
      <div class="relative">
        <img
          v-if="authStore.user?.avatar"
          :src="authStore.user.avatar"
          :alt="authStore.user.name"
          class="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/20"
        />
        <div
          v-else
          class="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold ring-2 ring-brand-500/20"
        >
          {{ getInitials(authStore.user?.name || 'User') }}
        </div>
        <span class="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
      </div>

      <div class="hidden md:block text-left">
        <p class="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-none">
          {{ authStore.user?.name || 'Administrator' }}
        </p>
        <p class="text-[11px] text-slate-400 capitalize mt-1 leading-none">
          {{ authStore.user?.role || 'Admin' }}
        </p>
      </div>

      <ChevronDown class="w-3.5 h-3.5 text-slate-400 transition-transform duration-150" :class="{ 'rotate-180': isOpen }" />
    </button>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95 -translate-y-1"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 -translate-y-1"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 shadow-soft-xl border border-slate-200/80 dark:border-slate-800 py-1.5 z-50 text-slate-700 dark:text-slate-200"
      >
        <div class="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
          <p class="text-xs font-semibold text-slate-900 dark:text-slate-100">
            {{ authStore.user?.name || 'Admin User' }}
          </p>
          <p class="text-xs text-slate-400 truncate">
            {{ authStore.user?.email || 'admin@company.io' }}
          </p>
        </div>

        <div class="py-1">
          <NuxtLink
            to="/settings"
            @click="closeDropdown"
            class="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
          >
            <User class="w-4 h-4 text-slate-400" />
            Profile Info
          </NuxtLink>

          <NuxtLink
            to="/settings"
            @click="closeDropdown"
            class="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
          >
            <Settings class="w-4 h-4 text-slate-400" />
            Account Settings
          </NuxtLink>
        </div>

        <div class="pt-1 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            @click="handleLogout"
            class="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          >
            <LogOut class="w-4 h-4 text-rose-500" />
            Sign Out
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
