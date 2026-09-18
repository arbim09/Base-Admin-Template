export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastNotification {
  id: string
  title?: string
  message: string
  type: ToastType
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

export interface BreadcrumbItem {
  label: string
  to?: string
}

export interface NavItem {
  label: string
  to: string
  icon?: string
  badge?: string | number
  badgeColor?: string
  children?: NavItem[]
}

export type SortOrder = 'asc' | 'desc' | null

export interface TableSortState {
  key: string
  order: SortOrder
}

export interface TableColumn<T = any> {
  key: string
  label: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  width?: string
  render?: (row: T) => unknown
}

