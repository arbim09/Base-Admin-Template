import type { ToastNotification, ToastType } from '~/types/ui'
import { generateId } from '~/utils/helpers'

export const useToast = () => {
  const toasts = useState<ToastNotification[]>('app_toasts', () => [])

  const add = (
    message: string,
    type: ToastType = 'info',
    options?: {
      title?: string
      duration?: number
      action?: { label: string; onClick: () => void }
    }
  ) => {
    const id = generateId('toast')
    const duration = options?.duration ?? 4000

    const newToast: ToastNotification = {
      id,
      message,
      type,
      title: options?.title,
      duration,
      action: options?.action,
    }

    toasts.value.push(newToast)

    if (duration > 0) {
      setTimeout(() => {
        remove(id)
      }, duration)
    }

    return id
  }

  const remove = (id: string) => {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  const success = (message: string, title?: string, duration?: number) =>
    add(message, 'success', { title: title || 'Success', duration })

  const error = (message: string, title?: string, duration?: number) =>
    add(message, 'error', { title: title || 'Error', duration: duration || 5000 })

  const warning = (message: string, title?: string, duration?: number) =>
    add(message, 'warning', { title: title || 'Warning', duration })

  const info = (message: string, title?: string, duration?: number) =>
    add(message, 'info', { title: title || 'Info', duration })

  return {
    toasts,
    add,
    remove,
    success,
    error,
    warning,
    info,
  }
}
