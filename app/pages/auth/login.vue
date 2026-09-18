<script setup lang="ts">
import { ShieldCheck, ArrowRight, Sparkles } from 'lucide-vue-next'

definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
})

useSeoMeta({
  title: 'Sign In — Vanguard Admin Base',
  description: 'Sign in to access your administrative dashboard',
})

const authStore = useAuthStore()
const toast = useToast()

const credentials = reactive({
  email: '',
  password: '',
  rememberMe: true,
})

const errorMsg = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  errorMsg.value = ''

  if (!credentials.email.trim() || !credentials.password.trim()) {
    errorMsg.value = 'Please enter both email and password'
    return
  }

  isLoading.value = true

  try {
    const success = await authStore.login(credentials)
    if (success) {
      toast.success('Welcome back to Vanguard Admin!')
      navigateTo('/dashboard')
    } else {
      errorMsg.value = 'Invalid email or password'
    }
  } catch (err: any) {
    errorMsg.value = err.message || 'Authentication error'
  } finally {
    isLoading.value = false
  }
}

// Auto-fills demo credentials for convenient instant evaluation
const fillDemoCredentials = () => {
  credentials.email = 'alex.vance@company.io'
  credentials.password = 'SuperSecret123!'
  toast.info('Demo administrator credentials filled in')
}
</script>

<template>
  <div class="w-full">
    <!-- Brand Header -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center mb-3">
        <!-- Light Mode Logo -->
        <img
          src="/images/logo.png"
          alt="Kobokan Logo"
          class="h-16 w-auto object-contain drop-shadow-sm dark:hidden"
        />
        <!-- Dark Mode Logo -->
        <img
          src="/images/logo-dark.png"
          alt="Kobokan Logo Dark"
          class="h-16 w-auto object-contain drop-shadow-sm hidden dark:block"
        />
      </div>

      <h1 class="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
        Kobokan Admin
      </h1>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
        Modern Nuxt 4 base administrative template
      </p>
    </div>

    <!-- Login Card -->
    <div class="glass-card rounded-3xl p-6 sm:p-8 shadow-soft-xl border border-slate-200/80 dark:border-slate-800">
      <!-- Demo Autofill Helper Banner -->
      <div class="mb-6 p-3 rounded-2xl bg-brand-50/75 dark:bg-brand-950/40 border border-brand-100 dark:border-brand-900/50 flex items-center justify-between gap-3 text-xs">
        <div class="flex items-center gap-2 text-brand-700 dark:text-brand-300 min-w-0">
          <Sparkles class="w-4 h-4 flex-shrink-0 text-brand-500" />
          <span class="truncate">Quick evaluation?</span>
        </div>
        <button
          type="button"
          @click="fillDemoCredentials"
          class="font-semibold text-brand-600 dark:text-brand-400 hover:underline flex-shrink-0 text-xs"
        >
          Fill Demo Credentials
        </button>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <UiInput
          v-model="credentials.email"
          type="email"
          label="Work Email"
          placeholder="alex.vance@company.io"
          required
        />

        <UiInput
          v-model="credentials.password"
          type="password"
          label="Password"
          placeholder="••••••••"
          required
        />

        <div class="flex items-center justify-between pt-1">
          <UiCheckbox
            v-model="credentials.rememberMe"
            label="Remember me for 30 days"
          />

          <a href="#" class="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">
            Forgot?
          </a>
        </div>

        <p v-if="errorMsg" class="text-xs text-rose-500 font-medium">
          {{ errorMsg }}
        </p>

        <div class="pt-2">
          <UiButton
            type="submit"
            variant="primary"
            size="lg"
            :loading="isLoading"
            class="w-full shadow-soft-md"
          >
            <span>Sign In to Workspace</span>
            <template #iconRight>
              <ArrowRight class="w-4 h-4 ml-1.5" />
            </template>
          </UiButton>
        </div>
      </form>
    </div>

    <!-- Footer Note -->
    <p class="text-center text-xs text-slate-400 mt-6">
      Production-ready template for your multi-project workflows.
    </p>
  </div>
</template>
