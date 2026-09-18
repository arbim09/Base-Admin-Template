<script setup lang="ts">
interface Props {
  modelValue: boolean
  label?: string
  description?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  description: '',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const toggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}
</script>

<template>
  <div class="flex items-start justify-between gap-3 cursor-pointer select-none" @click="toggle">
    <div v-if="label || description" class="flex-1">
      <span class="text-sm font-medium text-slate-900 dark:text-slate-100">{{ label }}</span>
      <p v-if="description" class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
        {{ description }}
      </p>
    </div>

    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :disabled="disabled"
      :class="[
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed',
        modelValue ? 'bg-brand-600' : 'bg-slate-200 dark:bg-slate-700',
      ]"
    >
      <span
        :class="[
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
          modelValue ? 'translate-x-5' : 'translate-x-0',
        ]"
      />
    </button>
  </div>
</template>
