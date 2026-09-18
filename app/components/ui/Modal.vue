<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted, useSlots } from 'vue'
import { X } from 'lucide-vue-next'

// ============================================================================
// Module-level shared state: tracks open modals across all instances to prevent
// scrollbar jumps, layout shift flickering, and premature body unlock in nested modals.
// ============================================================================
let openModalsCount = 0
let originalBodyPaddingRight = ''
let originalBodyOverflow = ''

function lockBodyScroll() {
  if (!import.meta.client) return
  openModalsCount++
  if (openModalsCount === 1) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    originalBodyPaddingRight = document.body.style.paddingRight || ''
    originalBodyOverflow = document.body.style.overflow || ''

    // Prevent background layout shift by preserving scrollbar gutter width
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }
    document.body.style.overflow = 'hidden'
  }
}

function unlockBodyScroll() {
  if (!import.meta.client) return
  openModalsCount = Math.max(0, openModalsCount - 1)
  if (openModalsCount === 0) {
    document.body.style.overflow = originalBodyOverflow
    document.body.style.paddingRight = originalBodyPaddingRight
  }
}

// ============================================================================
// Component Props & Emits
// ============================================================================
interface Props {
  modelValue: boolean
  title?: string
  subtitle?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'command'
  position?: 'center' | 'top' | 'drawer-right' | 'drawer-left' | 'bottom-sheet' | 'fullscreen'
  closeOnBackdrop?: boolean
  closeOnEsc?: boolean
  showHeader?: boolean
  showCloseButton?: boolean
  contentClass?: string
  bodyClass?: string
  headerClass?: string
  footerClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  size: 'md',
  position: 'center',
  closeOnBackdrop: true,
  closeOnEsc: true,
  showHeader: undefined,
  showCloseButton: true,
  contentClass: '',
  bodyClass: '',
  headerClass: '',
  footerClass: '',
})

const slots = useSlots()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}>()

const closeModal = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleBackdropClick = (e: MouseEvent) => {
  // Only trigger close when clicking the backdrop itself, not content
  if (props.closeOnBackdrop && (e.target === e.currentTarget)) {
    closeModal()
  }
}

const shouldShowHeader = computed(() => {
  if (props.showHeader !== undefined) return props.showHeader
  return Boolean(props.title || props.subtitle || slots.header)
})

const sizeClasses = computed(() => {
  if (props.position === 'fullscreen') return 'w-full h-full max-w-none'
  if (props.position === 'drawer-right' || props.position === 'drawer-left') {
    switch (props.size) {
      case 'sm':
        return 'max-w-sm'
      case 'lg':
        return 'max-w-xl'
      case 'xl':
        return 'max-w-2xl'
      case 'full':
        return 'max-w-full'
      case 'md':
      default:
        return 'max-w-md'
    }
  }

  switch (props.size) {
    case 'xs':
      return 'max-w-sm'
    case 'sm':
      return 'max-w-md'
    case 'lg':
      return 'max-w-2xl'
    case 'xl':
      return 'max-w-4xl'
    case '2xl':
      return 'max-w-5xl'
    case 'full':
      return 'max-w-[96vw]'
    case 'command':
      return 'max-w-2xl'
    case 'md':
    default:
      return 'max-w-lg'
  }
})

// Layout container and shape classes depending on position
const layoutClasses = computed(() => {
  switch (props.position) {
    case 'top':
      return {
        scroller: 'fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6',
        wrapper: 'min-h-full flex items-start justify-center pt-14 sm:pt-20 pb-6 w-full pointer-events-none',
        card: 'pointer-events-auto rounded-3xl animate-in-top',
      }
    case 'drawer-right':
      return {
        scroller: 'fixed inset-0 z-10 overflow-hidden',
        wrapper: 'h-full w-full flex justify-end pointer-events-none',
        card: 'pointer-events-auto rounded-l-3xl rounded-r-none h-full max-h-screen border-r-0 border-y-0 animate-in-right',
      }
    case 'drawer-left':
      return {
        scroller: 'fixed inset-0 z-10 overflow-hidden',
        wrapper: 'h-full w-full flex justify-start pointer-events-none',
        card: 'pointer-events-auto rounded-r-3xl rounded-l-none h-full max-h-screen border-l-0 border-y-0 animate-in-left',
      }
    case 'bottom-sheet':
      return {
        scroller: 'fixed inset-0 z-10 overflow-hidden flex items-end justify-center',
        wrapper: 'w-full flex justify-center items-end pointer-events-none',
        card: 'pointer-events-auto rounded-t-3xl rounded-b-none border-b-0 max-h-[88vh] animate-in-bottom',
      }
    case 'fullscreen':
      return {
        scroller: 'fixed inset-0 z-10 overflow-hidden',
        wrapper: 'h-full w-full pointer-events-none',
        card: 'pointer-events-auto rounded-none h-full max-h-screen border-none animate-in-fade',
      }
    case 'center':
    default:
      return {
        scroller: 'fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6',
        wrapper: 'min-h-full flex items-center justify-center py-4 w-full pointer-events-none',
        card: 'pointer-events-auto rounded-3xl animate-in-center',
      }
  }
})

// Max height for body content depending on position
const bodyMaxHeight = computed(() => {
  if (props.position === 'fullscreen') return 'flex-1 overflow-y-auto'
  if (props.position === 'drawer-right' || props.position === 'drawer-left') return 'flex-1 overflow-y-auto'
  if (props.position === 'bottom-sheet') return 'overflow-y-auto max-h-[70vh]'
  return 'overflow-y-auto max-h-[75vh]'
})

// Keyboard escape to close
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.modelValue) {
    if (props.closeOnEsc) {
      closeModal()
    }
  }
}

// Track modal open/close to coordinate flicker-free scroll lock
watch(
  () => props.modelValue,
  (isOpen, wasOpen) => {
    if (!import.meta.client) return
    if (isOpen && !wasOpen) {
      lockBodyScroll()
    } else if (!isOpen && wasOpen) {
      unlockBodyScroll()
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('keydown', onKeydown)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('keydown', onKeydown)
    if (props.modelValue) {
      unlockBodyScroll()
    }
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <!-- Root Teleport Container: isolates backdrop from dialog scroller to prevent GPU flick -->
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        <!-- 1. Dedicated Dimmed Backdrop: pure background tint with subtle blur -->
        <div
          class="fixed inset-0 bg-slate-950/60 backdrop-blur-xs will-change-[opacity]"
          aria-hidden="true"
          @click="handleBackdropClick"
        />

        <!-- 2. Transparent Scroller Wrapper: zero background, zero blur to guarantee 60fps rendering -->
        <div
          :class="layoutClasses.scroller"
          @click="handleBackdropClick"
        >
          <div :class="layoutClasses.wrapper">
            <!-- 3. Dialog Card Container: handles hardware-accelerated enter animation -->
            <div
              :class="[
                'relative w-full bg-white dark:bg-slate-900 shadow-soft-2xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden flex flex-col will-change-transform',
                layoutClasses.card,
                sizeClasses,
                contentClass,
              ]"
              @click.stop
            >
              <!-- Bottom Sheet Pull Handle Indicator -->
              <div
                v-if="position === 'bottom-sheet'"
                class="w-full flex items-center justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing"
              >
                <div class="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
              </div>

              <!-- Corner Close Button when Header is Hidden -->
              <button
                v-if="!shouldShowHeader && showCloseButton"
                type="button"
                @click="closeModal"
                class="absolute top-4 right-4 z-20 p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close modal"
              >
                <X class="w-4 h-4" />
              </button>

              <!-- Header -->
              <div
                v-if="shouldShowHeader"
                :class="[
                  'px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between flex-shrink-0',
                  headerClass,
                ]"
              >
                <div class="min-w-0 pr-4">
                  <slot name="header">
                    <h3 v-if="title" class="text-base font-semibold text-slate-900 dark:text-slate-100 truncate">
                      {{ title }}
                    </h3>
                    <p v-if="subtitle" class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                      {{ subtitle }}
                    </p>
                  </slot>
                </div>
                <button
                  v-if="showCloseButton"
                  type="button"
                  @click="closeModal"
                  class="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors flex-shrink-0"
                  aria-label="Close modal"
                >
                  <X class="w-4 h-4" />
                </button>
              </div>

              <!-- Body -->
              <div :class="['px-6 py-5', bodyMaxHeight, bodyClass]">
                <slot />
              </div>

              <!-- Footer -->
              <div
                v-if="$slots.footer"
                :class="[
                  'px-6 py-3.5 bg-slate-50/70 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2.5 flex-shrink-0',
                  footerClass,
                ]"
              >
                <slot name="footer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
@keyframes modalCenterIn {
  from {
    opacity: 0;
    transform: scale(0.96) translateZ(0);
  }
  to {
    opacity: 1;
    transform: scale(1) translateZ(0);
  }
}

@keyframes modalSlideRight {
  from {
    transform: translateX(100%) translateZ(0);
  }
  to {
    transform: translateX(0) translateZ(0);
  }
}

@keyframes modalSlideLeft {
  from {
    transform: translateX(-100%) translateZ(0);
  }
  to {
    transform: translateX(0) translateZ(0);
  }
}

@keyframes modalSlideBottom {
  from {
    transform: translateY(100%) translateZ(0);
  }
  to {
    transform: translateY(0) translateZ(0);
  }
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateZ(0);
  }
  to {
    opacity: 1;
    transform: translateZ(0);
  }
}

.animate-in-center {
  animation: modalCenterIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-in-top {
  animation: modalCenterIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-in-right {
  animation: modalSlideRight 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-in-left {
  animation: modalSlideLeft 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-in-bottom {
  animation: modalSlideBottom 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-in-fade {
  animation: modalFadeIn 0.2s ease-out forwards;
}
</style>
