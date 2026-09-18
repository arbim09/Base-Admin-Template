<script setup lang="ts">
const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
</script>

<template>
  <div class="min-h-screen bg-slate-50/80 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
    <!-- Sidebar -->
    <LayoutAppSidebar />

    <!-- Main Wrapper Offset for Sidebar -->
    <div
      :class="[
        'flex-1 flex flex-col transition-[padding] duration-300 ease-in-out min-w-0',
        themeStore.isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64',
      ]"
    >
      <!-- Top Navigation Header -->
      <LayoutAppHeader />

      <!-- Page Content Area -->
      <main class="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
        <slot />
      </main>

      <!-- Footer Note -->
      <footer class="py-4 px-6 border-t border-slate-200/60 dark:border-slate-800/60 text-center text-xs text-slate-400">
        &copy; {{ new Date().getFullYear() }} Kobokan Admin Base Template — Built with Nuxt 4, Vue 3 & Tailwind CSS
      </footer>
    </div>

    <!-- Global Toast Container -->
    <UiToastContainer />
  </div>
</template>
