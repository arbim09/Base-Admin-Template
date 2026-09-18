<script setup lang="ts">
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-vue-next'

const { toasts, remove } = useToast()

const getIcon = (type: string) => {
  switch (type) {
    case 'success':
      return CheckCircle2
    case 'error':
      return AlertCircle
    case 'warning':
      return AlertTriangle
    case 'info':
    default:
      return Info
  }
}

const getStyles = (type: string) => {
  switch (type) {
    case 'success':
      return {
        bg: 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800/80',
        text: 'text-emerald-900 dark:text-emerald-100',
        icon: 'text-emerald-500 dark:text-emerald-400',
      }
    case 'error':
      return {
        bg: 'bg-rose-50 dark:bg-rose-950/80 border-rose-200 dark:border-rose-800/80',
        text: 'text-rose-900 dark:text-rose-100',
        icon: 'text-rose-500 dark:text-rose-400',
      }
    case 'warning':
      return {
        bg: 'bg-amber-50 dark:bg-amber-950/80 border-amber-200 dark:border-amber-800/80',
        text: 'text-amber-900 dark:text-amber-100',
        icon: 'text-amber-500 dark:text-amber-400',
      }
    case 'info':
    default:
      return {
        bg: 'bg-brand-50 dark:bg-brand-950/80 border-brand-200 dark:border-brand-800/80',
        text: 'text-brand-900 dark:text-brand-100',
        icon: 'text-brand-500 dark:text-brand-400',
      }
  }
}
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none p-2 sm:p-0"
    >
      <TransitionGroup
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 translate-y-3 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-90"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="[
            'pointer-events-auto rounded-2xl border p-4 shadow-soft-lg backdrop-blur-md flex items-start gap-3 transition-all',
            getStyles(toast.type).bg,
          ]"
        >
          <component
            :is="getIcon(toast.type)"
            :class="['w-5 h-5 flex-shrink-0 mt-0.5', getStyles(toast.type).icon]"
          />

          <div class="flex-1 min-w-0">
            <h4
              v-if="toast.title"
              :class="['text-xs font-semibold uppercase tracking-wider', getStyles(toast.type).text]"
            >
              {{ toast.title }}
            </h4>
            <p :class="['text-xs mt-0.5 leading-relaxed', getStyles(toast.type).text]">
              {{ toast.message }}
            </p>
            <button
              v-if="toast.action"
              type="button"
              @click="toast.action.onClick(); remove(toast.id)"
              class="mt-2 inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-900 shadow-soft-2xs transition-all active:scale-95"
            >
              {{ toast.action.label }}
            </button>
          </div>

          <button
            type="button"
            @click="remove(toast.id)"
            class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md transition-colors"
          >
            <X class="w-3.5 h-3.5" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
