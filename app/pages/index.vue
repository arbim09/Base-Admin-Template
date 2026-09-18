<script setup lang="ts">
// Redirect to /dashboard
navigateTo('/dashboard', { replace: true })
</script>

<template>
  <div class="flex items-center justify-center min-h-[60vh]">
    <CommonLoadingState message="Redirecting to dashboard..." />
  </div>
</template>
