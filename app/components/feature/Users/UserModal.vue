<script setup lang="ts">
import type { UserItem, CreateUserDto, UpdateUserDto } from '~/types/user'

interface Props {
  modelValue: boolean
  user?: UserItem | null
}

const props = withDefaults(defineProps<Props>(), {
  user: null,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'submit', payload: CreateUserDto | UpdateUserDto): void
}>()

const isEditing = computed(() => !!props.user?.id)

const form = reactive({
  name: '',
  email: '',
  role: 'editor' as any,
  status: 'active' as any,
  phone: '',
  department: '',
})

const errors = reactive({
  name: '',
  email: '',
})

const isSubmitting = ref(false)

// Reset or populate form when modal opens or user prop changes
watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      if (props.user) {
        form.name = props.user.name
        form.email = props.user.email
        form.role = props.user.role
        form.status = props.user.status
        form.phone = props.user.phone || ''
        form.department = props.user.department || ''
      } else {
        form.name = ''
        form.email = ''
        form.role = 'editor'
        form.status = 'active'
        form.phone = ''
        form.department = ''
      }
      errors.name = ''
      errors.email = ''
    }
  },
  { immediate: true }
)

const validate = () => {
  let valid = true
  errors.name = ''
  errors.email = ''

  if (!form.name.trim()) {
    errors.name = 'Full name is required'
    valid = false
  }

  if (!form.email.trim()) {
    errors.email = 'Email address is required'
    valid = false
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = 'Please provide a valid email format'
    valid = false
  }

  return valid
}

const handleSubmit = async () => {
  if (!validate()) return

  isSubmitting.value = true

  const payload = isEditing.value
    ? {
        id: props.user!.id,
        ...form,
      }
    : { ...form }

  emit('submit', payload)
  isSubmitting.value = false
}

const roleOptions = [
  { label: 'Superadmin', value: 'superadmin' },
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
]

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending' },
]
</script>

<template>
  <UiModal
    :model-value="modelValue"
    :title="isEditing ? 'Edit Team Member' : 'Add New Team Member'"
    :subtitle="isEditing ? 'Update profile information and access roles' : 'Invite a new member to your workspace'"
    size="md"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <UiInput
        v-model="form.name"
        label="Full Name"
        placeholder="e.g. Elena Rostova"
        :error="errors.name"
        required
      />

      <UiInput
        v-model="form.email"
        type="email"
        label="Work Email"
        placeholder="e.g. elena.r@enterprise.com"
        :error="errors.email"
        required
      />

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <UiSelect
          v-model="form.role"
          label="Access Role"
          :options="roleOptions"
          required
        />

        <UiSelect
          v-model="form.status"
          label="Account Status"
          :options="statusOptions"
          required
        />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <UiInput
          v-model="form.department"
          label="Department"
          placeholder="e.g. Engineering"
        />

        <UiInput
          v-model="form.phone"
          label="Phone Number"
          placeholder="+1 (555) 000-0000"
        />
      </div>
    </form>

    <template #footer>
      <UiButton
        variant="ghost"
        size="md"
        @click="$emit('update:modelValue', false)"
      >
        Cancel
      </UiButton>

      <UiButton
        variant="primary"
        size="md"
        :loading="isSubmitting"
        @click="handleSubmit"
      >
        {{ isEditing ? 'Save Changes' : 'Create User' }}
      </UiButton>
    </template>
  </UiModal>
</template>
