<script setup lang="ts">
const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
</script>

<template>
  <div id="app" class="font-sans antialiased selection:bg-brand-500/20 selection:text-brand-700 dark:selection:text-brand-300">
    <NuxtLoadingIndicator color="#4f46e5" :height="3" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
/* Smooth page transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.18s ease-out;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(4px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.18s ease-out;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>
