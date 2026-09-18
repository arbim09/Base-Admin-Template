import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)
  const isSidebarCollapsed = ref(false)
  const isMobileSidebarOpen = ref(false)

  // Initialize theme on client mount
  function initTheme() {
    if (import.meta.client) {
      const stored = localStorage.getItem('theme-mode')
      if (stored) {
        isDark.value = stored === 'dark'
      } else {
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      applyTheme()
    }
  }

  function toggleTheme() {
    isDark.value = !isDark.value
    if (import.meta.client) {
      localStorage.setItem('theme-mode', isDark.value ? 'dark' : 'light')
      applyTheme()
    }
  }

  function applyTheme() {
    if (import.meta.client) {
      if (isDark.value) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  function toggleSidebar() {
    isSidebarCollapsed.value = !isSidebarCollapsed.value
  }

  function toggleMobileSidebar() {
    isMobileSidebarOpen.value = !isMobileSidebarOpen.value
  }

  function closeMobileSidebar() {
    isMobileSidebarOpen.value = false
  }

  return {
    isDark,
    isSidebarCollapsed,
    isMobileSidebarOpen,
    initTheme,
    toggleTheme,
    toggleSidebar,
    toggleMobileSidebar,
    closeMobileSidebar,
  }
})
