<script setup lang="ts">
const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-200">
    <!-- Decorative background blobs -->
    <div class="absolute -top-40 -right-40 w-96 h-96 bg-brand-500/15 dark:bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
    <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/15 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

    <div class="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
      <slot />
    </div>

    <UiToastContainer />
  </div>
</template>
