<script setup lang="ts">
import {
  Layers,
  Sparkles,
  Send,
  Trash2,
  Check,
  AlertCircle,
  Bell,
  Search,
  Mail,
  User,
} from 'lucide-vue-next'

definePageMeta({
  middleware: ['auth'],
})

useSeoMeta({
  title: 'UI Design System — Vanguard Admin Base',
  description: 'Component library and design system documentation',
})

const toast = useToast()

// Gallery interactive test states
const testInput = ref('Sample text input')
const testSelect = ref('option-1')
const testToggle = ref(true)
const testCheckbox = ref(true)
const isDemoModalOpen = ref(false)
const isBtnLoading = ref(false)

const triggerLoadingBtn = () => {
  isBtnLoading.value = true
  setTimeout(() => {
    isBtnLoading.value = false
    toast.success('Action executed successfully!')
  }, 1500)
}
</script>

<template>
  <div class="space-y-8">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 text-xs font-semibold mb-2">
          <Sparkles class="w-3.5 h-3.5" />
          <span>Reusable Component System</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <Layers class="w-7 h-7 text-brand-600 dark:text-brand-400" />
          UI Component Library
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Pre-built, accessible, and flexible atomic UI components ready for fast copy-pasting into all your new admin dashboards and SaaS projects.
        </p>
      </div>

      <UiButton variant="primary" size="md" @click="isDemoModalOpen = true">
        Open Demo Modal
      </UiButton>
    </div>

    <!-- Section 1: Buttons -->
    <UiCard
      title="Buttons (UiButton)"
      subtitle="Comprehensive variants, sizing, loading animations, and icon slots"
    >
      <div class="space-y-6">
        <div>
          <h4 class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Variants</h4>
          <div class="flex flex-wrap items-center gap-3">
            <UiButton variant="primary">Primary</UiButton>
            <UiButton variant="secondary">Secondary</UiButton>
            <UiButton variant="outline">Outline</UiButton>
            <UiButton variant="ghost">Ghost</UiButton>
            <UiButton variant="danger">Danger</UiButton>
            <UiButton variant="success">Success</UiButton>
          </div>
        </div>

        <div>
          <h4 class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Sizes & States</h4>
          <div class="flex flex-wrap items-center gap-3">
            <UiButton variant="primary" size="sm">Small (sm)</UiButton>
            <UiButton variant="primary" size="md">Medium (md)</UiButton>
            <UiButton variant="primary" size="lg">Large (lg)</UiButton>
            <UiButton variant="primary" :loading="isBtnLoading" @click="triggerLoadingBtn">
              {{ isBtnLoading ? 'Processing...' : 'Click for Loading State' }}
            </UiButton>
            <UiButton variant="primary" disabled>Disabled</UiButton>
          </div>
        </div>

        <div>
          <h4 class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">With Icons</h4>
          <div class="flex flex-wrap items-center gap-3">
            <UiButton variant="primary">
              <template #icon><Send class="w-4 h-4 mr-1.5" /></template>
              Send Message
            </UiButton>
            <UiButton variant="outline">
              <template #icon><Search class="w-4 h-4 mr-1.5" /></template>
              Quick Search
            </UiButton>
            <UiButton variant="danger">
              <template #icon><Trash2 class="w-4 h-4 mr-1.5" /></template>
              Delete Record
            </UiButton>
          </div>
        </div>
      </div>
    </UiCard>

    <!-- Section 2: Form Controls -->
    <UiCard
      title="Form Elements (Inputs, Selects, Toggles)"
      subtitle="Clean styling with labels, placeholder, prefix icons, and error states"
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <UiInput
          v-model="testInput"
          label="Text Input"
          placeholder="Enter text..."
          hint="Supports helper text below the field"
        >
          <template #prefix><User class="w-4 h-4" /></template>
        </UiInput>

        <UiInput
          type="password"
          label="Password Field (With Toggle)"
          placeholder="••••••••"
          hint="Includes show/hide password toggle button"
        />

        <UiInput
          label="Input with Error"
          model-value="invalid_email"
          error="Please provide a valid email format"
        >
          <template #prefix><Mail class="w-4 h-4" /></template>
        </UiInput>

        <UiSelect
          v-model="testSelect"
          label="Select Dropdown"
          :options="[
            { label: 'Option 1 — Standard', value: 'option-1' },
            { label: 'Option 2 — Premium', value: 'option-2' },
            { label: 'Option 3 — Enterprise', value: 'option-3' },
          ]"
        />

        <div class="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-center">
          <UiToggle
            v-model="testToggle"
            label="Push Notifications"
            description="Receive real-time alerts in dashboard"
          />
        </div>

        <div class="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-center">
          <UiCheckbox
            v-model="testCheckbox"
            label="Agree to Terms & Policies"
            description="I accept the administrative compliance agreement"
          />
        </div>
      </div>
    </UiCard>

    <!-- Section 3: Badges & Tags -->
    <UiCard
      title="Badges & Status Indicators (UiBadge)"
      subtitle="Subtle colored pills with optional pulsing status indicators"
    >
      <div class="space-y-4">
        <div>
          <h4 class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Color Variants</h4>
          <div class="flex flex-wrap items-center gap-2.5">
            <UiBadge variant="brand">Brand</UiBadge>
            <UiBadge variant="success">Success</UiBadge>
            <UiBadge variant="warning">Warning</UiBadge>
            <UiBadge variant="danger">Danger</UiBadge>
            <UiBadge variant="info">Information</UiBadge>
            <UiBadge variant="neutral">Neutral</UiBadge>
          </div>
        </div>

        <div>
          <h4 class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">With Status Dots</h4>
          <div class="flex flex-wrap items-center gap-2.5">
            <UiBadge variant="brand" dot>Active Project</UiBadge>
            <UiBadge variant="success" dot>Operational</UiBadge>
            <UiBadge variant="warning" dot>Pending Review</UiBadge>
            <UiBadge variant="danger" dot>Service Outage</UiBadge>
            <UiBadge variant="neutral" dot>Archived</UiBadge>
          </div>
        </div>
      </div>
    </UiCard>

    <!-- Section 4: Toast Notifications -->
    <UiCard
      title="Toast Notification System (useToast)"
      subtitle="Non-intrusive floating feedback messages with auto-dismiss timers"
    >
      <div class="flex flex-wrap items-center gap-3">
        <UiButton
          variant="success"
          @click="toast.success('Your changes have been saved successfully!', 'Success')"
        >
          Trigger Success Toast
        </UiButton>

        <UiButton
          variant="danger"
          @click="toast.error('Could not connect to the remote service. Check network.', 'Connection Error')"
        >
          Trigger Error Toast
        </UiButton>

        <UiButton
          variant="secondary"
          @click="toast.warning('Your subscription will expire in 3 days.', 'Warning')"
        >
          Trigger Warning Toast
        </UiButton>

        <UiButton
          variant="outline"
          @click="toast.info('New platform update v4.5 is now live.', 'System Notice')"
        >
          Trigger Info Toast
        </UiButton>
      </div>
    </UiCard>

    <!-- Section 5: Common States -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UiCard title="Loading State (CommonLoadingState)">
        <CommonLoadingState message="Fetching data..." submessage="Demonstration skeleton" />
      </UiCard>

      <UiCard title="Empty State (CommonEmptyState)">
        <CommonEmptyState
          title="No records found"
          description="Try modifying search query"
          action-label="Create Record"
          @action="toast.info('Action button clicked!')"
        />
      </UiCard>

      <UiCard title="Error State (CommonErrorState)">
        <CommonErrorState
          title="Network Timeout"
          message="Server took too long to reply"
          @retry="toast.info('Retrying connection...')"
        />
      </UiCard>
    </div>

    <!-- Demo Modal Instance -->
    <UiModal
      v-model="isDemoModalOpen"
      title="Interactive Demo Modal"
      subtitle="Clean backdrop blur with spring transition"
      size="md"
    >
      <div class="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>
          This is an instance of <code class="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">&lt;UiModal&gt;</code>. It is accessible, teleports to the document body, responds to Escape key press, and supports arbitrary header, body, and footer slots.
        </p>
        <p>
          Feel free to customize size: <code class="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">'sm' | 'md' | 'lg' | 'xl'</code>.
        </p>
      </div>

      <template #footer>
        <UiButton variant="ghost" size="md" @click="isDemoModalOpen = false">
          Cancel
        </UiButton>
        <UiButton variant="primary" size="md" @click="isDemoModalOpen = false">
          Got It
        </UiButton>
      </template>
    </UiModal>
  </div>
</template>
