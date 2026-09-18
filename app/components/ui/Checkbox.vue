<script setup lang="ts">
import { Check } from 'lucide-vue-next'

interface Props {
  modelValue: boolean
  label?: string
  description?: string
  disabled?: boolean
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  description: '',
  disabled: false,
  id: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const defaultId = useId()
const checkboxId = computed(() => props.id || `chk-${defaultId}`)

const handleChange = (e: Event) => {
  if (!props.disabled) {
    const target = e.target as HTMLInputElement
    emit('update:modelValue', target.checked)
  }
}
</script>

<template>
  <label
    :for="checkboxId"
    :class="[
      'inline-flex items-start gap-2.5 select-none transition-opacity',
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    ]"
  >
    <!-- Hidden native input checkbox for accessibility and valid label target -->
    <input
      :id="checkboxId"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      class="sr-only peer"
      @change="handleChange"
    />

    <!-- Visual custom checkbox square -->
    <div
      :class="[
        'w-4 h-4 mt-0.5 rounded-md border flex items-center justify-center transition-all duration-150 flex-shrink-0',
        modelValue
          ? 'bg-brand-600 border-brand-600 text-white shadow-sm'
          : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-slate-400',
        'peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500/40'
      ]"
      aria-hidden="true"
    >
      <Check v-if="modelValue" class="w-3 h-3 stroke-[3]" />
    </div>

    <!-- Text Label & Description -->
    <div v-if="label || description" class="flex-1">
      <span class="text-xs font-medium text-slate-800 dark:text-slate-200 block">
        {{ label }}
      </span>
      <p v-if="description" class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
        {{ description }}
      </p>
    </div>
  </label>
</template>
