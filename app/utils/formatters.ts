/**
 * Format number into USD or IDR currency
 */
export function formatCurrency(amount: number, currency = 'USD', locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format date string into human readable format
 */
export function formatDate(dateString: string | Date, includeTime = false): string {
  if (!dateString) return '-'
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return '-'

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...(includeTime ? { hour: '2-digit', minute: '2-digit' } : {}),
  }

  return new Intl.DateTimeFormat('en-US', options).format(date)
}

/**
 * Format number into compact representation (e.g. 1.2K, 3.4M)
 */
export function formatCompactNumber(number: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(number)
}

/**
 * Simple debounce utility
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, delayMs = 300) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn(...args)
    }, delayMs)
  }
}
