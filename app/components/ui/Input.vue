<script setup lang="ts">
import { Eye, EyeOff } from 'lucide-vue-next'

interface Props {
  modelValue?: string | number
  label?: string
  id?: string
  type?: string
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
  type: 'text',
  placeholder: '',
  error: '',
  hint: '',
  disabled: false,
  required: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const defaultId = useId()
const inputId = computed(() => props.id || `input-${defaultId}`)
const showPassword = ref(false)
const computedType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="w-full space-y-1.5">
    <div v-if="label" class="flex items-center justify-between">
      <label :for="inputId" class="block text-xs font-semibold text-slate-700 dark:text-slate-300">
        {{ label }}
        <span v-if="required" class="text-rose-500">*</span>
      </label>
      <slot name="labelRight" />
    </div>

    <div class="relative rounded-xl shadow-soft-sm">
      <div
        v-if="$slots.prefix"
        class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500"
      >
        <slot name="prefix" />
      </div>

      <input
        :id="inputId"
        :type="computedType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        @input="handleInput"
        :class="[
          'block w-full rounded-xl text-sm transition-all duration-150',
          'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500',
          'border outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed dark:disabled:bg-slate-800/50',
          $slots.prefix ? 'pl-10' : 'pl-3.5',
          $slots.suffix || type === 'password' ? 'pr-10' : 'pr-3.5',
          'py-2.5',
          error
            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-500'
            : 'border-slate-200 hover:border-slate-300 focus:border-brand-500 focus:ring-brand-500/20 dark:border-slate-800 dark:hover:border-slate-700 dark:focus:border-brand-500',
        ]"
      />

      <div
        v-if="type === 'password'"
        class="absolute inset-y-0 right-0 pr-3.5 flex items-center cursor-pointer text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
        @click="showPassword = !showPassword"
      >
        <component :is="showPassword ? EyeOff : Eye" class="w-4 h-4" />
      </div>

      <div
        v-else-if="$slots.suffix"
        class="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400"
      >
        <slot name="suffix" />
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
