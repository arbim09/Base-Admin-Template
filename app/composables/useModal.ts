export function useModal<T = any>() {
  const isOpen = ref(false)
  const data = ref<T | null>(null) as Ref<T | null>

  const open = (payload?: T) => {
    if (payload !== undefined) {
      data.value = payload
    }
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
    data.value = null
  }

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  return {
    isOpen,
    data,
    open,
    close,
    toggle,
  }
}
