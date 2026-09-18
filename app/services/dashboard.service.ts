import type { ApiResponse } from '~/types/common'
import type { MetricStat, ActivityItem, RevenuePoint } from '~/types/dashboard'
import { sleep } from '~/utils/helpers'

export const dashboardService = {
  async getMetrics(): Promise<ApiResponse<MetricStat[]>> {
    await sleep(200)
    return {
      success: true,
      message: 'Dashboard metrics',
      data: [
        {
          id: 'metric-1',
          label: 'Total Revenue',
          value: '$124,592',
          changePercentage: 14.8,
          isPositive: true,
          comparisonText: 'vs last month',
          iconName: 'DollarSign',
          color: 'indigo',
        },
        {
          id: 'metric-2',
          label: 'Active Users',
          value: '18,249',
          changePercentage: 8.2,
          isPositive: true,
          comparisonText: 'vs last week',
          iconName: 'Users',
          color: 'emerald',
        },
        {
          id: 'metric-3',
          label: 'Conversion Rate',
          value: '3.42%',
          changePercentage: -1.4,
          isPositive: false,
          comparisonText: 'vs last month',
          iconName: 'TrendingUp',
          color: 'amber',
        },
        {
          id: 'metric-4',
          label: 'Server Health',
          value: '99.98%',
          changePercentage: 0.2,
          isPositive: true,
          comparisonText: 'last 30 days',
          iconName: 'Activity',
          color: 'rose',
        },
      ],
    }
  },

  async getRevenueChart(): Promise<ApiResponse<RevenuePoint[]>> {
    await sleep(200)
    return {
      success: true,
      message: 'Revenue chart data',
      data: [
        { month: 'Jan', revenue: 42000, expenses: 21000 },
        { month: 'Feb', revenue: 54000, expenses: 24000 },
        { month: 'Mar', revenue: 51000, expenses: 22000 },
        { month: 'Apr', revenue: 68000, expenses: 29000 },
        { month: 'May', revenue: 84000, expenses: 31000 },
        { month: 'Jun', revenue: 92000, expenses: 36000 },
        { month: 'Jul', revenue: 110000, expenses: 40000 },
        { month: 'Aug', revenue: 124592, expenses: 42000 },
      ],
    }
  },

  async getRecentActivities(): Promise<ApiResponse<ActivityItem[]>> {
    await sleep(200)
    return {
      success: true,
      message: 'Recent activity logs',
      data: [
        {
          id: 'act-1',
          user: {
            name: 'Sarah Jenkins',
            email: 'sarah.j@enterprise.com',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
          },
          action: 'deployed new release',
          target: 'v2.4.0 Production',
          timeAgo: '10 minutes ago',
          type: 'create',
        },
        {
          id: 'act-2',
          user: {
            name: 'Marcus Sterling',
            email: 'marcus.s@enterprise.com',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          },
          action: 'updated permission matrix for',
          target: 'Product Managers',
          timeAgo: '45 minutes ago',
          type: 'update',
        },
        {
          id: 'act-3',
          user: {
            name: 'Lucas Silva',
            email: 'lucas.s@enterprise.com',
            avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
          },
          action: 'revoked API key for',
          target: 'Legacy Webhook Service',
          timeAgo: '2 hours ago',
          type: 'delete',
        },
        {
          id: 'act-4',
          user: {
            name: 'Elena Rostova',
            email: 'elena.r@enterprise.com',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
          },
          action: 'logged in from new IP',
          target: 'Frankfurt, Germany',
          timeAgo: '4 hours ago',
          type: 'auth',
        },
      ],
    }
  },
}
