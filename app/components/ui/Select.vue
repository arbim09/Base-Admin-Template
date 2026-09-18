<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'

interface SelectOption {
  label: string
  value: string | number
}

interface Props {
  modelValue?: string | number
  label?: string
  id?: string
  options: (SelectOption | string)[]
  placeholder?: string
  error?: string
  hint?: string
  disabled?: boolean
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  id: '',
  placeholder: 'Select an option',
  error: '',
  hint: '',
  disabled: false,
  required: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const defaultId = useId()
const selectId = computed(() => props.id || `select-${defaultId}`)

const normalizedOptions = computed<SelectOption[]>(() => {
  return props.options.map((opt) => {
    if (typeof opt === 'string') {
      return { label: opt, value: opt }
    }
    return opt
  })
})

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="w-full space-y-1.5">
    <label v-if="label" :for="selectId" class="block text-xs font-semibold text-slate-700 dark:text-slate-300">
      {{ label }}
      <span v-if="required" class="text-rose-500">*</span>
    </label>

    <div class="relative rounded-xl shadow-soft-sm">
      <select
        :id="selectId"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        @change="handleChange"
        :class="[
          'block w-full appearance-none rounded-xl text-sm transition-all duration-150',
          'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100',
          'border outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-slate-50 disabled:cursor-not-allowed dark:disabled:bg-slate-800/50',
          'py-2.5 pl-3.5 pr-10',
          error
            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-500'
            : 'border-slate-200 hover:border-slate-300 focus:border-brand-500 focus:ring-brand-500/20 dark:border-slate-800 dark:hover:border-slate-700 dark:focus:border-brand-500',
        ]"
      >
        <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
        <option
          v-for="option in normalizedOptions"
          :key="option.value"
          :value="option.value"
          class="dark:bg-slate-900"
        >
          {{ option.label }}
        </option>
      </select>

      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
        <ChevronDown class="h-4 w-4" />
      </div>
    </div>

    <p v-if="error" class="text-xs text-rose-500 font-medium">
      {{ error }}
    </p>
    <p v-else-if="hint" class="text-xs text-slate-500 dark:text-slate-400">
      {{ hint }}
    </p>
  </div>
</template>
