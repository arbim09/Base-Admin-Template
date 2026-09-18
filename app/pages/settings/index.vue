<script setup lang="ts">
import {
  User,
  Shield,
  Palette,
  Bell,
  Check,
  Save,
  Moon,
  Sun,
} from 'lucide-vue-next'

definePageMeta({
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Workspace Settings — Vanguard Admin Base',
  description: 'Manage admin profile, appearance, and system preferences',
})

const authStore = useAuthStore()
const themeStore = useThemeStore()
const toast = useToast()

const activeTab = ref<'profile' | 'appearance' | 'security' | 'notifications'>('profile')

const profileForm = reactive({
  name: authStore.user?.name || 'Alex Vance',
  email: authStore.user?.email || 'alex.vance@company.io',
  department: authStore.user?.department || 'Engineering & Product',
  bio: 'Lead Architect & Administrator. Managing enterprise SaaS projects and UI design infrastructure.',
})

const securityForm = reactive({
  currentPassword: '',
  newPassword: '',
  twoFactorEnabled: true,
})

const notificationSettings = reactive({
  emailWeeklyDigest: true,
  securityAlerts: true,
  memberActivityLogs: false,
})

const isSaving = ref(false)

const handleSaveProfile = () => {
  isSaving.value = true
  setTimeout(() => {
    isSaving.value = false
    if (authStore.user) {
      authStore.user.name = profileForm.name
      authStore.user.email = profileForm.email
      authStore.user.department = profileForm.department
    }
    toast.success('Workspace profile settings saved successfully!')
  }, 500)
}

const handleSaveSecurity = () => {
  toast.success('Security settings and 2FA configuration updated!')
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        Workspace Settings
      </h1>
      <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
        Customize administrative profiles, theme appearance, security protocols, and email notifications.
      </p>
    </div>

    <!-- Main Settings Container with Tabs -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Left Tabs Column -->
      <div class="md:col-span-1 space-y-1">
        <button
          type="button"
          @click="activeTab = 'profile'"
          :class="[
            'w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left',
            activeTab === 'profile'
              ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 font-semibold shadow-soft-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
          ]"
        >
          <User class="w-4 h-4" />
          General Profile
        </button>

        <button
          type="button"
          @click="activeTab = 'appearance'"
          :class="[
            'w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left',
            activeTab === 'appearance'
              ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 font-semibold shadow-soft-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
          ]"
        >
          <Palette class="w-4 h-4" />
          Appearance & Theme
        </button>

        <button
          type="button"
          @click="activeTab = 'security'"
          :class="[
            'w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left',
            activeTab === 'security'
              ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 font-semibold shadow-soft-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
          ]"
        >
          <Shield class="w-4 h-4" />
          Security & Password
        </button>

        <button
          type="button"
          @click="activeTab = 'notifications'"
          :class="[
            'w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left',
            activeTab === 'notifications'
              ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 font-semibold shadow-soft-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
          ]"
        >
          <Bell class="w-4 h-4" />
          Notifications
        </button>
      </div>

      <!-- Right Tab Content Column -->
      <div class="md:col-span-3">
        <!-- Tab 1: Profile -->
        <UiCard
          v-if="activeTab === 'profile'"
          title="Personal Profile"
          subtitle="Your administrator identity across all projects"
        >
          <form @submit.prevent="handleSaveProfile" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <UiInput
                v-model="profileForm.name"
                label="Full Name"
                placeholder="Full name"
                required
              />

              <UiInput
                v-model="profileForm.email"
                type="email"
                label="Email Address"
                placeholder="email@company.io"
                required
              />
            </div>

            <UiInput
              v-model="profileForm.department"
              label="Department / Unit"
              placeholder="e.g. Engineering"
            />

            <div class="pt-4 flex justify-end">
              <UiButton variant="primary" size="md" :loading="isSaving" type="submit">
                <template #icon>
                  <Save class="w-4 h-4 mr-1.5" />
                </template>
                Save Changes
              </UiButton>
            </div>
          </form>
        </UiCard>

        <!-- Tab 2: Appearance & Theme -->
        <UiCard
          v-else-if="activeTab === 'appearance'"
          title="Appearance & Theme"
          subtitle="Customize interface theme and visual preferences"
        >
          <div class="space-y-6">
            <div class="flex items-center justify-between p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                  <Moon v-if="themeStore.isDark" class="w-5 h-5" />
                  <Sun v-else class="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h4 class="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    Dark Color Mode
                  </h4>
                  <p class="text-[11px] text-slate-400">
                    Currently active: <span class="font-medium text-brand-600 dark:text-brand-400 capitalize">{{ themeStore.isDark ? 'Dark Mode' : 'Light Mode' }}</span>
                  </p>
                </div>
              </div>

              <UiButton
                variant="outline"
                size="sm"
                @click="themeStore.toggleTheme"
              >
                Switch to {{ themeStore.isDark ? 'Light' : 'Dark' }}
              </UiButton>
            </div>

            <div class="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <UiToggle
                :model-value="themeStore.isSidebarCollapsed"
                label="Compact Sidebar Layout"
                description="Collapse the left sidebar to icon-only mode by default"
                @update:model-value="themeStore.toggleSidebar"
              />
            </div>
          </div>
        </UiCard>

        <!-- Tab 3: Security -->
        <UiCard
          v-else-if="activeTab === 'security'"
          title="Security Credentials"
          subtitle="Manage passwords and two-factor authentication"
        >
          <form @submit.prevent="handleSaveSecurity" class="space-y-5">
            <UiInput
              v-model="securityForm.currentPassword"
              type="password"
              label="Current Password"
              placeholder="••••••••"
            />

            <UiInput
              v-model="securityForm.newPassword"
              type="password"
              label="New Password"
              placeholder="••••••••"
              hint="Must be at least 8 characters long with numbers and symbols"
            />

            <div class="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <UiToggle
                v-model="securityForm.twoFactorEnabled"
                label="Two-Factor Authentication (2FA)"
                description="Require authenticator OTP code upon every sign in"
              />
            </div>

            <div class="pt-4 flex justify-end">
              <UiButton variant="primary" size="md" type="submit">
                Update Password
              </UiButton>
            </div>
          </form>
        </UiCard>

        <!-- Tab 4: Notifications -->
        <UiCard
          v-else-if="activeTab === 'notifications'"
          title="Notification Preferences"
          subtitle="Choose what events you would like to be notified about"
        >
          <div class="space-y-4">
            <div class="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <UiCheckbox
                v-model="notificationSettings.emailWeeklyDigest"
                label="Weekly Analytics Digest"
                description="Receive a weekly PDF summary of projects performance via email"
              />
            </div>

            <div class="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <UiCheckbox
                v-model="notificationSettings.securityAlerts"
                label="Security & Suspicious Login Alerts"
                description="Instant notifications whenever an unauthorized login attempt is blocked"
              />
            </div>

            <div class="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <UiCheckbox
                v-model="notificationSettings.memberActivityLogs"
                label="Team Member Audit Logs"
                description="Alerts whenever new members join or roles are changed"
              />
            </div>
          </div>
        </UiCard>
      </div>
    </div>
  </div>
</template>
