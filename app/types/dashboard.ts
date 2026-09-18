export interface MetricStat {
  id: string
  label: string
  value: string | number
  changePercentage: number
  isPositive: boolean
  comparisonText: string
  iconName: string
  color: 'indigo' | 'emerald' | 'amber' | 'rose'
}

export interface ActivityItem {
  id: string
  user: {
    name: string
    avatar?: string
    email: string
  }
  action: string
  target: string
  timeAgo: string
  type: 'create' | 'update' | 'delete' | 'auth'
}

export interface RevenuePoint {
  month: string
  revenue: number
  expenses: number
}
