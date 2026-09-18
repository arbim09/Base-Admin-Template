<script setup lang="ts">
import {
  Type,
  Lock,
  Mail,
  Hash,
  Phone,
  Globe,
  Search,
  Calendar,
  Clock,
  CalendarDays,
  CalendarRange,
  CalendarCheck,
  AlignLeft,
  FileCode,
  KeyRound,
  ShieldCheck,
  DollarSign,
  Percent,
  Sliders,
  Palette,
  FileUp,
  Image as ImageIcon,
  Files,
  UploadCloud,
  CheckSquare,
  CheckCheck,
  CircleDot,
  Radio,
  ToggleLeft,
  ChevronDown,
  Layers,
  ListFilter,
  Sparkles,
  Tag,
  AtSign,
  CreditCard,
  MapPin,
  Compass,
  Star,
  PenTool,
  EyeOff,
  Eye,
  ShieldAlert,
  Ban,
  Terminal,
  Code2,
  Copy,
  Check,
  X,
  Plus,
  Minus,
  Trash2,
  Download,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  SlidersHorizontal,
  FileText,
  HelpCircle,
  CornerDownLeft,
} from 'lucide-vue-next'

useHead({
  title: 'Form Inputs Showcase - Kobokan Admin',
  meta: [
    {
      name: 'description',
      content: '50 production-ready form inputs, selectors, editors, and uploaders for Nuxt 4 admin templates.',
    },
  ],
})

const toast = useToast()

// ----------------------------------------------------
// Navigation & Category Filters
// ----------------------------------------------------
type CategoryType = 'all' | 'text' | 'numbers' | 'datetime' | 'selections' | 'files' | 'editors' | 'specialized'
const activeCategory = ref<CategoryType>('all')
const searchQuery = ref('')

const categoryTabs = [
  { id: 'all' as CategoryType, label: 'All Inputs', icon: Layers },
  { id: 'text' as CategoryType, label: 'Text & Passwords', icon: Type },
  { id: 'numbers' as CategoryType, label: 'Numbers & Finance', icon: DollarSign },
  { id: 'datetime' as CategoryType, label: 'Date & Time', icon: Calendar },
  { id: 'selections' as CategoryType, label: 'Selections & Toggles', icon: CheckSquare },
  { id: 'files' as CategoryType, label: 'Files & Uploads', icon: UploadCloud },
  { id: 'editors' as CategoryType, label: 'Editors & Canvas', icon: PenTool },
  { id: 'specialized' as CategoryType, label: 'States & Specialized', icon: SlidersHorizontal },
]

// Code accordion drawers
const expandedCodeIds = ref<{ [key: string]: boolean }>({})
const toggleCodeDrawer = (id: string) => {
  expandedCodeIds.value[id] = !expandedCodeIds.value[id]
}

// Expand / Collapse all code
const areAllCodeExpanded = computed(() => {
  return filteredItems.value.length > 0 && filteredItems.value.every(item => expandedCodeIds.value[item.id])
})

const toggleAllCode = () => {
  const shouldExpand = !areAllCodeExpanded.value
  filteredItems.value.forEach(item => {
    expandedCodeIds.value[item.id] = shouldExpand
  })
}

// Copied feedback
const copiedCodeId = ref<string | null>(null)
const copyCodeSnippet = (id: string) => {
  const code = codeSnippets[id] || ''
  if (import.meta.client && navigator.clipboard) {
    navigator.clipboard.writeText(code)
    copiedCodeId.value = id
    toast.success(`Input #${id} template code copied to clipboard!`)
    setTimeout(() => {
      if (copiedCodeId.value === id) {
        copiedCodeId.value = null
      }
    }, 2200)
  }
}

// ----------------------------------------------------
// Reactive State for all 50 Inputs
// ----------------------------------------------------
// 1. Text
const val1 = ref('Sarah Jenkins')
// 2. Password
const val2 = ref('SecureP@ssw0rd2026!')
const passwordStrength = computed(() => {
  const pwd = val2.value
  if (!pwd) return { score: 0, text: 'Empty', color: 'bg-slate-200 dark:bg-slate-700' }
  if (pwd.length < 6) return { score: 1, text: 'Weak', color: 'bg-rose-500' }
  if (pwd.length < 10) return { score: 2, text: 'Fair', color: 'bg-amber-500' }
  if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) {
    return { score: 3, text: 'Strong', color: 'bg-emerald-500' }
  }
  return { score: 2, text: 'Moderate', color: 'bg-amber-500' }
})
// 3. Email
const val3 = ref('sarah.jenkins@company.io')
const appendEmailDomain = (domain: string) => {
  const username = val3.value.includes('@') ? val3.value.split('@')[0] : val3.value
  val3.value = `${username}${domain}`
}
// 4. Number
const val4 = ref(42)
// 5. Phone
const phoneCountry = ref('+62')
const val5 = ref('812-3456-7890')
// 6. URL
const val6 = ref('dashboard.company.io/analytics')
// 7. Search
const val7 = ref('invoice-2026-q3')
// 8. Date
const val8 = ref('2026-09-18')
const setDatePreset = (daysOffset: number) => {
  const d = new Date()
  d.setDate(d.getDate() + daysOffset)
  val8.value = d.toISOString().split('T')[0]
}
// 9. Time
const val9 = ref('14:30')
// 10. Datetime
const val10 = ref('2026-09-18T14:30')
// 11. Month
const val11 = ref('2026-09')
// 12. Week
const val12 = ref('2026-W38')
// 13. Textarea
const val13 = ref('This is a multi-line executive summary explaining high availability clustered services across all edge regions.')
// 14. Rich Text Editor
const richText = ref('<strong>Kobokan Admin v2.5</strong> brings <em>ultra-fast</em> modern components with <u>zero layout shift</u>.')
const applyRichFormat = (tag: string) => {
  if (tag === 'b') richText.value += ' <strong>Bold text</strong>'
  if (tag === 'i') richText.value += ' <em>Italic text</em>'
  if (tag === 'u') richText.value += ' <u>Underlined text</u>'
}
// 15. Code Editor
const val15 = ref(`// Nuxt 4 Server Route\nexport default defineEventHandler(async (event) => {\n  return { status: 200, message: "OK" }\n})`)
// 16. OTP
const otpDigits = reactive(['4', '8', '2', '9', '1', '0'])
const otpRefs = ref<HTMLInputElement[]>([])
const handleOtpInput = (index: number, e: Event) => {
  const target = e.target as HTMLInputElement
  const val = target.value.slice(-1)
  otpDigits[index] = val
  if (val && index < 5 && otpRefs.value[index + 1]) {
    otpRefs.value[index + 1].focus()
  }
}
const handleOtpKeydown = (index: number, e: KeyboardEvent) => {
  if (e.key === 'Backspace' && !otpDigits[index] && index > 0 && otpRefs.value[index - 1]) {
    otpRefs.value[index - 1].focus()
  }
}
const pasteOtpSample = () => {
  const sample = '937201'
  sample.split('').forEach((char, idx) => {
    if (idx < 6) otpDigits[idx] = char
  })
}
// 17. PIN
const pinDigits = reactive(['5', '0', '2', '1'])
const showPin = ref(false)
// 18. Currency
const currencyCode = ref<'USD' | 'IDR' | 'EUR'>('USD')
const val18 = ref(1250000)
const formattedCurrency = computed(() => {
  if (currencyCode.value === 'IDR') {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val18.value)
  }
  if (currencyCode.value === 'EUR') {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val18.value)
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val18.value)
})
// 19. Percentage
const val19 = ref(75)
// 20. Decimal
const val20 = ref('0.00849201')
// 21. Range
const val21 = ref(68)
// 22. Color Picker
const val22 = ref('#6366F1')
const colorPresets = ['#6366F1', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#0F172A']
// 23. File Input
const selectedSingleFile = ref('quarterly-audit-report.pdf (2.4 MB)')
// 24. Image Upload
const uploadedImage = ref('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop')
// 25. Multiple File Upload
const multiFiles = ref([
  { name: 'schema-dump.sql', size: '14.2 MB' },
  { name: 'dataset-clean.csv', size: '3.8 MB' },
  { name: 'contract-sign.pdf', size: '890 KB' },
])
const removeMultiFile = (index: number) => {
  multiFiles.value.splice(index, 1)
}
// 26. Drag & Drop
const isDraggingOver = ref(false)
// 27. Checkbox
const val27 = ref(true)
// 28. Checkbox Group
const permissions = reactive({
  read: true,
  write: true,
  delete: false,
  admin: false,
})
const selectAllPermissions = (enable: boolean) => {
  permissions.read = enable
  permissions.write = enable
  permissions.delete = enable
  permissions.admin = enable
}
// 29. Radio
const val29 = ref<'monthly' | 'annually'>('annually')
// 30. Radio Group
const selectedTier = ref('pro')
// 31. Switch / Toggle
const val31 = ref(true)
// 32. Select / Dropdown
const val32 = ref('apac')
// 33. Multi Select
const selectedFrameworks = ref(['Vue 3', 'Nuxt 4', 'TypeScript'])
const availableFrameworks = ['Vue 3', 'Nuxt 4', 'TypeScript', 'Tailwind CSS', 'Vite', 'Pinia', 'Nitro']
const toggleFramework = (fw: string) => {
  if (selectedFrameworks.value.includes(fw)) {
    selectedFrameworks.value = selectedFrameworks.value.filter((item) => item !== fw)
  } else {
    selectedFrameworks.value.push(fw)
  }
}
// 34. Combobox
const comboboxQuery = ref('PostgreSQL')
const comboboxOptions = ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'ClickHouse', 'SQLite']
// 35. Autocomplete
const autocompleteQuery = ref('Singa')
const allCities = ['Singapore', 'Tokyo', 'Seoul', 'Sydney', 'San Francisco', 'London', 'Berlin', 'Jakarta']
const filteredCities = computed(() => {
  if (!autocompleteQuery.value.trim()) return []
  return allCities.filter((c) => c.toLowerCase().includes(autocompleteQuery.value.toLowerCase()))
})
// 36. Tag Chips Input
const tagList = ref(['Frontend', 'Nuxt4', 'Tailwind', 'Production'])
const newTagInput = ref('')
const addTag = () => {
  const t = newTagInput.value.trim()
  if (t && !tagList.value.includes(t)) {
    tagList.value.push(t)
    newTagInput.value = ''
  }
}
const removeTag = (index: number) => {
  tagList.value.splice(index, 1)
}
// 37. Username Input
const val37 = ref('alex_vance')
const isUsernameAvailable = computed(() => val37.value.length >= 4 && val37.value !== 'admin')
// 38. Masked Credit Card
const val38 = ref('4532 8920 1492 8841')
// 39. Address
const addressState = reactive({
  street: '742 Evergreen Terrace',
  city: 'Springfield',
  state: 'Oregon',
  zip: '97477',
})
// 40. Coordinates
const coordinates = reactive({
  lat: '-6.2088',
  lng: '106.8456',
})
const detectLocation = () => {
  toast.info('Detecting GPS from browser sensors...')
  setTimeout(() => {
    coordinates.lat = '-6.1754'
    coordinates.lng = '106.8272'
    toast.success('Location updated: Jakarta Capital District')
  }, 600)
}
// 41. Rating Input
const ratingScore = ref(4)
const hoverRating = ref<number | null>(null)
// 42. Signature Canvas
const signatureCanvas = ref<HTMLCanvasElement | null>(null)
let isDrawing = false
const startDrawing = (e: MouseEvent) => {
  isDrawing = true
  const canvas = signatureCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const rect = canvas.getBoundingClientRect()
  ctx.beginPath()
  ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
}
const draw = (e: MouseEvent) => {
  if (!isDrawing) return
  const canvas = signatureCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const rect = canvas.getBoundingClientRect()
  ctx.lineWidth = 2.5
  ctx.lineCap = 'round'
  ctx.strokeStyle = '#6366F1'
  ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
  ctx.stroke()
}
const stopDrawing = () => {
  isDrawing = false
}
const clearSignature = () => {
  const canvas = signatureCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  toast.info('Signature canvas cleared.')
}
const downloadSignature = () => {
  const canvas = signatureCanvas.value
  if (!canvas) return
  const link = document.createElement('a')
  link.download = 'signature.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
  toast.success('Signature PNG downloaded!')
}
// 43. Hidden Input
const csrfToken = ref('csrftoken_991823abf8194e827104bce')
const showHiddenDemo = ref(false)
// 44. Readonly
const val44 = ref('API-KEY-PROD-99482019-SECRET')
// 45. Disabled
const val45 = ref('Super Admin Privilege (Locked by Organization Policy)')
// 46. Prefix
const val46 = ref('mycompany')
// 47. Suffix
const val47 = ref('250')
// 48. Icon
const val48 = ref('admin@domain.io')
// 49. Clear Button
const val49 = ref('Click the X button on the right to reset this text')
// 50. Password Toggle
const val50 = ref('StrongP@ssw0rd!2026')
const showPassword50 = ref(false)

// Reset all values to factory defaults
const resetAllInputs = () => {
  val1.value = 'Sarah Jenkins'
  val2.value = 'SecureP@ssw0rd2026!'
  val3.value = 'sarah.jenkins@company.io'
  val4.value = 42
  val5.value = '812-3456-7890'
  val6.value = 'dashboard.company.io/analytics'
  val7.value = 'invoice-2026-q3'
  val8.value = '2026-09-18'
  val9.value = '14:30'
  val10.value = '2026-09-18T14:30'
  val11.value = '2026-09'
  val12.value = '2026-W38'
  val13.value = 'This is a multi-line executive summary explaining high availability clustered services across all edge regions.'
  val15.value = `// Nuxt 4 Server Route\nexport default defineEventHandler(async (event) => {\n  return { status: 200, message: "OK" }\n})`
  val18.value = 1250000
  val19.value = 75
  val20.value = '0.00849201'
  val21.value = 68
  val22.value = '#6366F1'
  val27.value = true
  val31.value = true
  val32.value = 'apac'
  val37.value = 'alex_vance'
  val38.value = '4532 8920 1492 8841'
  ratingScore.value = 4
  val46.value = 'mycompany'
  val47.value = '250'
  val48.value = 'admin@domain.io'
  val49.value = 'Click the X button on the right to reset this text'
  val50.value = 'StrongP@ssw0rd!2026'
  toast.success('All 50 form input demo values reset to default!')
}

// ----------------------------------------------------
// Directory of All 50 Inputs
// ----------------------------------------------------
const inputItems = [
  { id: '1', name: 'Text Input', category: 'text', badgeVariant: 'brand' as const, desc: 'Standard single-line text input with floating placeholder.' },
  { id: '2', name: 'Password Input', category: 'text', badgeVariant: 'brand' as const, desc: 'Masked credential entry with dynamic strength scoring bar.' },
  { id: '3', name: 'Email Input', category: 'text', badgeVariant: 'brand' as const, desc: 'RFC email validator with quick domain suggestion chips.' },
  { id: '4', name: 'Number Input', category: 'numbers', badgeVariant: 'warning' as const, desc: 'Numerical field with custom plus & minus increment buttons.' },
  { id: '5', name: 'Phone Input', category: 'text', badgeVariant: 'brand' as const, desc: 'International telephone input with dial code selector.' },
  { id: '6', name: 'URL Input', category: 'text', badgeVariant: 'brand' as const, desc: 'Protocol-badged URL input with direct test link action.' },
  { id: '7', name: 'Search Input', category: 'text', badgeVariant: 'brand' as const, desc: 'Search bar with leading icon, keyboard hint, and clear button.' },
  { id: '8', name: 'Date Input', category: 'datetime', badgeVariant: 'info' as const, desc: 'Calendar date picker with quick relative date presets.' },
  { id: '9', name: 'Time Input', category: 'datetime', badgeVariant: 'info' as const, desc: '24-hour clock selector with quick appointment slots.' },
  { id: '10', name: 'Date & Time Input', category: 'datetime', badgeVariant: 'info' as const, desc: 'Combined datetime-local timestamp for scheduled jobs.' },
  { id: '11', name: 'Month Input', category: 'datetime', badgeVariant: 'info' as const, desc: 'Billing cycle and accounting period calendar month picker.' },
  { id: '12', name: 'Week Input', category: 'datetime', badgeVariant: 'info' as const, desc: 'ISO-8601 weekly sprint cycle and milestone tracker.' },
  { id: '13', name: 'Textarea', category: 'editors', badgeVariant: 'neutral' as const, desc: 'Multi-line text area with live character counter limit.' },
  { id: '14', name: 'Rich Text Editor', category: 'editors', badgeVariant: 'neutral' as const, desc: 'WYSIWYG formatting toolbar with active text styling.' },
  { id: '15', name: 'Code Editor', category: 'editors', badgeVariant: 'neutral' as const, desc: 'Monospace programming code editor with line numbers.' },
  { id: '16', name: 'OTP Input', category: 'numbers', badgeVariant: 'warning' as const, desc: '6-digit individual box verification code with auto-advance.' },
  { id: '17', name: 'PIN Input', category: 'numbers', badgeVariant: 'warning' as const, desc: '4-digit masked financial passcode with visibility toggle.' },
  { id: '18', name: 'Currency Input', category: 'numbers', badgeVariant: 'warning' as const, desc: 'Auto-formatted financial input with currency switcher.' },
  { id: '19', name: 'Percentage Input', category: 'numbers', badgeVariant: 'warning' as const, desc: '0-100% numerical field synced with visual progress track.' },
  { id: '20', name: 'Decimal Input', category: 'numbers', badgeVariant: 'warning' as const, desc: 'High-precision float input with micro-step buttons.' },
  { id: '21', name: 'Range / Slider', category: 'numbers', badgeVariant: 'warning' as const, desc: 'Draggable range tracker with dynamic floating percentage.' },
  { id: '22', name: 'Color Picker', category: 'editors', badgeVariant: 'neutral' as const, desc: 'Visual palette picker with HEX values and preset swatches.' },
  { id: '23', name: 'File Input', category: 'files', badgeVariant: 'success' as const, desc: 'Styled single document selector with file size indicator.' },
  { id: '24', name: 'Image Upload', category: 'files', badgeVariant: 'success' as const, desc: 'Avatar and photo uploader with instant image preview.' },
  { id: '25', name: 'Multiple File Upload', category: 'files', badgeVariant: 'success' as const, desc: 'Multi-document selector with file sizes and deletion chips.' },
  { id: '26', name: 'Drag & Drop Upload', category: 'files', badgeVariant: 'success' as const, desc: 'Large dropzone area with animated cloud icon and border dash.' },
  { id: '27', name: 'Checkbox', category: 'selections', badgeVariant: 'brand' as const, desc: 'Standalone binary toggle checkbox with checkmark animation.' },
  { id: '28', name: 'Checkbox Group', category: 'selections', badgeVariant: 'brand' as const, desc: 'Multi-selection checklist with Select All / Deselect helper.' },
  { id: '29', name: 'Radio', category: 'selections', badgeVariant: 'brand' as const, desc: 'Single circle radio indicator with active state styling.' },
  { id: '30', name: 'Radio Group', category: 'selections', badgeVariant: 'brand' as const, desc: 'Card-based selectable radio tier options for pricing plans.' },
  { id: '31', name: 'Switch / Toggle', category: 'selections', badgeVariant: 'brand' as const, desc: 'Smooth animated iOS-style toggle switch with status badge.' },
  { id: '32', name: 'Select / Dropdown', category: 'selections', badgeVariant: 'brand' as const, desc: 'Styled single-choice dropdown menu with chevron indicator.' },
  { id: '33', name: 'Multi Select', category: 'selections', badgeVariant: 'brand' as const, desc: 'Multi-value picker with removable tags and toggle pills.' },
  { id: '34', name: 'Combobox', category: 'selections', badgeVariant: 'brand' as const, desc: 'Searchable dropdown allowing both predefined and custom values.' },
  { id: '35', name: 'Autocomplete', category: 'selections', badgeVariant: 'brand' as const, desc: 'Predictive input filtering suggestions as the user types.' },
  { id: '36', name: 'Tag / Chips Input', category: 'selections', badgeVariant: 'brand' as const, desc: 'Dynamic tag creator: press Enter to append badges.' },
  { id: '37', name: 'Username Input', category: 'text', badgeVariant: 'brand' as const, desc: 'Social handle input with @ prefix and live availability check.' },
  { id: '38', name: 'Masked Input', category: 'numbers', badgeVariant: 'warning' as const, desc: 'Pattern-formatted credit card field (#### #### #### ####).' },
  { id: '39', name: 'Address Input', category: 'specialized', badgeVariant: 'neutral' as const, desc: 'Composite address form block (street, city, state, postal code).' },
  { id: '40', name: 'Coordinates / Location Input', category: 'specialized', badgeVariant: 'neutral' as const, desc: 'Dual latitude & longitude inputs with GPS auto-detect button.' },
  { id: '41', name: 'Rating Input', category: 'editors', badgeVariant: 'neutral' as const, desc: 'Interactive 5-star rating with hover visual preview.' },
  { id: '42', name: 'Signature Input', category: 'editors', badgeVariant: 'neutral' as const, desc: 'HTML5 digital signature canvas with Clear and PNG export.' },
  { id: '43', name: 'Hidden Input', category: 'specialized', badgeVariant: 'neutral' as const, desc: 'Under-the-hood security token and CSRF nonce input demo.' },
  { id: '44', name: 'Read-only Input', category: 'specialized', badgeVariant: 'neutral' as const, desc: 'Locked display input with one-click copy to clipboard.' },
  { id: '45', name: 'Disabled Input', category: 'specialized', badgeVariant: 'neutral' as const, desc: 'Inactive grayed-out field preventing typing and interaction.' },
  { id: '46', name: 'Input with Prefix', category: 'text', badgeVariant: 'brand' as const, desc: 'Input with fixed leading URL or protocol badge prefix.' },
  { id: '47', name: 'Input with Suffix', category: 'text', badgeVariant: 'text' as const, desc: 'Input with trailing unit measurement or domain suffix.' },
  { id: '48', name: 'Input with Icon', category: 'text', badgeVariant: 'brand' as const, desc: 'Input featuring an embedded leading visual Lucide icon.' },
  { id: '49', name: 'Input with Clear Button', category: 'text', badgeVariant: 'brand' as const, desc: 'Input with interactive (X) icon to wipe input in one click.' },
  { id: '50', name: 'Input with Password Toggle', category: 'text', badgeVariant: 'brand' as const, desc: 'Password field with eye icon to reveal or conceal characters.' },
]

const categoryCounts = computed(() => ({
  all: 50,
  text: inputItems.filter((m) => m.category === 'text').length,
  numbers: inputItems.filter((m) => m.category === 'numbers').length,
  datetime: inputItems.filter((m) => m.category === 'datetime').length,
  selections: inputItems.filter((m) => m.category === 'selections').length,
  files: inputItems.filter((m) => m.category === 'files').length,
  editors: inputItems.filter((m) => m.category === 'editors').length,
  specialized: inputItems.filter((m) => m.category === 'specialized').length,
}))

const filteredItems = computed(() => {
  return inputItems.filter((item) => {
    const matchesCategory =
      activeCategory.value === 'all' || item.category === activeCategory.value
    const matchesSearch =
      searchQuery.value.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.id === searchQuery.value.trim()
    return matchesCategory && matchesSearch
  })
})

const isVisible = (id: string) => {
  return filteredItems.value.some((it) => it.id === id)
}

// ----------------------------------------------------
// Complete Code Snippets for All 50 Inputs
// ----------------------------------------------------
const codeSnippets: Record<string, string> = {
  '1': `<UiInput\n  v-model="name"\n  label="Full Name"\n  placeholder="e.g. Sarah Jenkins"\n  hint="Standard single-line text input"\n/>`,
  '2': `<UiInput\n  v-model="password"\n  type="password"\n  label="Account Password"\n  placeholder="••••••••"\n  hint="Secure credentials input"\n/>`,
  '3': `<UiInput\n  v-model="email"\n  type="email"\n  label="Work Email Address"\n  placeholder="alex@company.io"\n>\n  <template #prefix><Mail class="w-4 h-4 text-slate-400" /></template>\n</UiInput>`,
  '4': `<div class="flex items-center gap-2">\n  <button @click="val = Math.max(1, val - 1)" class="w-10 h-10 rounded-xl bg-slate-100 font-bold">-</button>\n  <input type="number" v-model.number="val" class="flex-1 text-center font-bold border rounded-xl py-2" />\n  <button @click="val++" class="w-10 h-10 rounded-xl bg-slate-100 font-bold">+</button>\n</div>`,
  '5': `<div class="flex items-center gap-2">\n  <select v-model="countryCode" class="px-2.5 py-2 rounded-xl text-xs font-bold border">\n    <option value="+62">🇮🇩 +62</option>\n    <option value="+1">🇺🇸 +1</option>\n  </select>\n  <input v-model="phone" type="tel" class="flex-1 px-3 py-2 text-xs border rounded-xl" />\n</div>`,
  '6': `<div class="flex items-center rounded-xl border overflow-hidden text-xs">\n  <span class="px-3 py-2 bg-slate-100 text-slate-500 font-mono">https://</span>\n  <input v-model="url" type="url" class="flex-1 px-3 py-2 focus:outline-none" />\n</div>`,
  '7': `<div class="relative">\n  <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />\n  <input v-model="query" class="w-full pl-9 pr-8 py-2 text-xs rounded-xl border" />\n  <button v-if="query" @click="query = ''" class="absolute right-2.5 top-1/2 -translate-y-1/2"><X class="w-3.5 h-3.5" /></button>\n</div>`,
  '8': `<input v-model="date" type="date" class="w-full px-3 py-2 rounded-xl text-xs border bg-white dark:bg-slate-900" />`,
  '9': `<input v-model="time" type="time" class="w-full px-3 py-2 rounded-xl text-xs border bg-white dark:bg-slate-900" />`,
  '10': `<input v-model="datetime" type="datetime-local" class="w-full px-3 py-2 rounded-xl text-xs border bg-white dark:bg-slate-900" />`,
  '11': `<input v-model="month" type="month" class="w-full px-3 py-2 rounded-xl text-xs border bg-white dark:bg-slate-900" />`,
  '12': `<input v-model="week" type="week" class="w-full px-3 py-2 rounded-xl text-xs border bg-white dark:bg-slate-900" />`,
  '13': `<textarea v-model="notes" maxlength="300" rows="3" class="w-full p-3 rounded-xl text-xs border resize-none" />`,
  '14': `<div class="rounded-xl border overflow-hidden">\n  <div class="flex gap-1 p-1.5 border-b bg-slate-100">\n    <button @click="format('b')" class="px-2 py-1 font-bold">B</button>\n    <button @click="format('i')" class="px-2 py-1 italic">I</button>\n  </div>\n  <div class="p-3 text-xs" v-html="richText" />\n</div>`,
  '15': `<textarea v-model="code" rows="4" class="w-full p-3 font-mono text-xs bg-slate-950 text-emerald-400 rounded-xl" />`,
  '16': `<div class="flex justify-between gap-1.5">\n  <input v-for="(d, i) in 6" :key="i" maxlength="1" class="w-10 h-11 text-center font-bold border rounded-xl" />\n</div>`,
  '17': `<div class="flex justify-center gap-3 py-1">\n  <div v-for="p in pin" class="w-10 h-10 rounded-2xl bg-slate-100 border flex items-center justify-center font-black">●</div>\n</div>`,
  '18': `<div class="flex items-center rounded-xl border overflow-hidden">\n  <span class="px-3 py-2 bg-slate-100 font-bold text-xs">$ USD</span>\n  <input v-model.number="amount" type="number" class="flex-1 px-3 py-2 text-xs font-bold" />\n</div>`,
  '19': `<div class="flex items-center rounded-xl border overflow-hidden">\n  <input v-model.number="percent" type="number" min="0" max="100" class="flex-1 px-3 py-2 text-xs font-bold" />\n  <span class="px-3 py-2 bg-slate-100 font-bold text-xs">%</span>\n</div>`,
  '20': `<input v-model="decimal" type="text" class="w-full px-3 py-2 rounded-xl text-xs font-mono border" />`,
  '21': `<input v-model.number="sliderVal" type="range" min="0" max="100" class="w-full accent-brand-600 cursor-pointer" />`,
  '22': `<div class="flex items-center gap-2">\n  <input v-model="color" type="color" class="w-10 h-10 rounded-xl cursor-pointer" />\n  <input v-model="color" class="flex-1 px-3 py-2 rounded-xl text-xs font-mono uppercase border" />\n</div>`,
  '23': `<div class="p-3 rounded-2xl border flex items-center justify-between text-xs">\n  <span class="truncate">{{ fileName }}</span>\n  <button class="px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 font-bold">Browse</button>\n</div>`,
  '24': `<div class="flex items-center gap-3">\n  <img :src="avatar" class="w-12 h-12 rounded-2xl object-cover border" />\n  <button class="px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-bold">Replace</button>\n</div>`,
  '25': `<div class="space-y-1.5">\n  <div v-for="(f, i) in files" class="flex justify-between px-2.5 py-1.5 border rounded-xl text-xs">\n    <span>{{ f.name }}</span>\n    <button @click="remove(i)">×</button>\n  </div>\n</div>`,
  '26': `<div @dragover.prevent @drop.prevent="onDrop" class="border-2 border-dashed rounded-2xl p-5 text-center">\n  <UploadCloud class="w-7 h-7 mx-auto text-brand-500 mb-1" />\n  <p class="text-xs font-bold">Drag files directly here</p>\n</div>`,
  '27': `<UiCheckbox v-model="agreed" label="Agree to Terms of Service" />`,
  '28': `<div class="space-y-2">\n  <UiCheckbox v-model="perms.read" label="Read Documents" />\n  <UiCheckbox v-model="perms.write" label="Write Documents" />\n</div>`,
  '29': `<div class="flex items-center gap-2 cursor-pointer" @click="active = !active">\n  <div class="w-4 h-4 rounded-full border-2 border-brand-600 flex items-center justify-center">\n    <div class="w-2 h-2 rounded-full bg-brand-600" />\n  </div>\n  <span class="text-xs font-medium">Monthly Billing</span>\n</div>`,
  '30': `<div class="grid grid-cols-2 gap-2">\n  <div @click="tier = 'starter'" :class="tier === 'starter' ? 'border-brand-500 font-bold' : ''" class="p-2.5 rounded-2xl border cursor-pointer text-xs">Starter ($0)</div>\n  <div @click="tier = 'pro'" :class="tier === 'pro' ? 'border-brand-500 font-bold' : ''" class="p-2.5 rounded-2xl border cursor-pointer text-xs">Pro ($49)</div>\n</div>`,
  '31': `<UiToggle v-model="isEnabled" label="Audio Feedback" description="Play subtle notification chimes" />`,
  '32': `<select v-model="region" class="w-full px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-900">\n  <option value="apac">Asia Pacific (Singapore)</option>\n  <option value="us-east">US East (N. Virginia)</option>\n</select>`,
  '33': `<div class="flex flex-wrap gap-1.5">\n  <button v-for="fw in frameworks" @click="toggle(fw)" :class="selected.includes(fw) ? 'bg-brand-500 text-white' : 'bg-slate-100'" class="px-2.5 py-1 rounded-full text-xs">\n    {{ fw }}\n  </button>\n</div>`,
  '34': `<input v-model="engine" list="engines" class="w-full px-3 py-2 text-xs rounded-xl border" />\n<datalist id="engines">\n  <option value="PostgreSQL" />\n  <option value="MySQL" />\n</datalist>`,
  '35': `<input v-model="search" placeholder="Type city..." class="w-full px-3 py-2 text-xs rounded-xl border" />\n<div v-if="results.length" class="p-1 rounded-xl border shadow-soft-md">\n  <div v-for="c in results" @click="search = c" class="px-2 py-1 text-xs hover:bg-slate-100">{{ c }}</div>\n</div>`,
  '36': `<div class="flex flex-wrap items-center gap-1.5 p-2 rounded-2xl border min-h-[44px]">\n  <span v-for="(tag, i) in tags" class="px-2 py-0.5 rounded-full text-xs bg-brand-50 text-brand-700">{{ tag }} <button @click="remove(i)">×</button></span>\n  <input v-model="newTag" @keydown.enter="addTag" placeholder="Add tag..." class="text-xs bg-transparent" />\n</div>`,
  '37': `<div class="flex items-center rounded-xl border overflow-hidden">\n  <span class="px-3 py-2 bg-slate-100 font-bold text-xs text-slate-400">@</span>\n  <input v-model="handle" class="flex-1 px-3 py-2 text-xs bg-transparent" />\n</div>`,
  '38': `<div class="relative">\n  <CreditCard class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-500" />\n  <input v-model="card" maxlength="19" class="w-full pl-9 pr-3 py-2 text-xs font-mono rounded-xl border" />\n</div>`,
  '39': `<div class="space-y-2">\n  <input v-model="address.street" placeholder="Street Address" class="w-full px-3 py-2 text-xs rounded-xl border" />\n  <div class="grid grid-cols-2 gap-2">\n    <input v-model="address.city" placeholder="City" class="px-3 py-2 text-xs rounded-xl border" />\n    <input v-model="address.zip" placeholder="ZIP" class="px-3 py-2 text-xs rounded-xl border" />\n  </div>\n</div>`,
  '40': `<div class="grid grid-cols-2 gap-2">\n  <input v-model="coords.lat" placeholder="Latitude" class="px-3 py-2 text-xs font-mono border rounded-xl" />\n  <input v-model="coords.lng" placeholder="Longitude" class="px-3 py-2 text-xs font-mono border rounded-xl" />\n</div>`,
  '41': `<div class="flex items-center gap-1">\n  <button v-for="s in 5" :key="s" @click="score = s">\n    <Star class="w-5 h-5" :class="s <= score ? 'text-amber-400 fill-amber-400' : 'text-slate-300'" />\n  </button>\n</div>`,
  '42': `<canvas ref="canvas" width="320" height="100" class="w-full h-24 border border-dashed rounded-2xl" />\n<div class="flex justify-end gap-2 mt-2">\n  <button @click="clear">Clear</button>\n  <button @click="download">Save PNG</button>\n</div>`,
  '43': `<!-- Hidden Input (Secret Nonce) -->\n<input type="hidden" name="_csrf" :value="csrfToken" />`,
  '44': `<div class="flex items-center rounded-xl border bg-slate-100 overflow-hidden">\n  <input :value="apiKey" readonly class="flex-1 px-3 py-2 text-xs font-mono bg-transparent cursor-default" />\n  <button @click="copyApiKey" class="px-3 py-2 text-brand-600 font-bold text-xs">Copy</button>\n</div>`,
  '45': `<UiInput v-model="lockedValue" disabled label="Master Encryption Passphrase" hint="Disabled by IAM security policy" />`,
  '46': `<div class="flex items-center rounded-xl border overflow-hidden">\n  <span class="px-3 py-2 bg-slate-100 text-slate-500 font-mono text-xs">app.</span>\n  <input v-model="subdomain" class="flex-1 px-3 py-2 text-xs bg-transparent" />\n  <span class="px-3 py-2 text-slate-400 text-xs">.cloud</span>\n</div>`,
  '47': `<div class="flex items-center rounded-xl border overflow-hidden">\n  <input v-model="bandwidth" type="number" class="flex-1 px-3 py-2 text-xs font-bold" />\n  <span class="px-3 py-2 bg-slate-100 text-slate-500 font-bold text-xs">MB / sec</span>\n</div>`,
  '48': `<UiInput v-model="contactEmail" label="Collaborator Dispatch Email">\n  <template #prefix><Mail class="w-4 h-4 text-brand-500" /></template>\n</UiInput>`,
  '49': `<div class="relative">\n  <input v-model="text" class="w-full pr-8 pl-3 py-2 text-xs rounded-xl border" />\n  <button v-if="text" @click="text = ''" class="absolute right-2.5 top-1/2 -translate-y-1/2"><X class="w-3.5 h-3.5 text-slate-400" /></button>\n</div>`,
  '50': `<div class="relative">\n  <input :type="show ? 'text' : 'password'" v-model="password" class="w-full pr-10 pl-3 py-2 text-xs rounded-xl border" />\n  <button @click="show = !show" class="absolute right-3 top-1/2 -translate-y-1/2">\n    <EyeOff v-if="show" class="w-4 h-4" /><Eye v-else class="w-4 h-4" />\n  </button>\n</div>`,
}
</script>

<template>
  <div class="space-y-6 pb-24">
    <!-- Header Section -->
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <div class="flex items-center gap-3">
          <div class="p-2.5 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 shadow-soft-xs">
            <Type class="w-6 h-6" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                Form Inputs Showcase
              </h1>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-900">
                50 Types
              </span>
            </div>
            <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Production-ready form inputs, selectors, uploaders, numeric steppers, and interactive signature canvas for Nuxt 4.
            </p>
          </div>
        </div>
      </div>

      <!-- Quick Actions Header -->
      <div class="flex flex-wrap items-center gap-2">
        <button
          type="button"
          @click="toggleAllCode"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
          <Code2 class="w-3.5 h-3.5 text-brand-500" />
          <span>{{ areAllCodeExpanded ? 'Collapse All Code' : 'Expand All Code' }}</span>
        </button>

        <button
          type="button"
          @click="resetAllInputs"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
          <RotateCcw class="w-3.5 h-3.5 text-slate-500" />
          <span>Reset All Inputs</span>
        </button>
      </div>
    </div>

    <!-- Category Filter Bar with Counts & Live Search -->
    <div class="glass-card rounded-2xl p-2.5 sm:p-3 border border-slate-200/80 dark:border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-3 shadow-soft-xs">
      <!-- Horizontal Scrollable Tabs -->
      <div class="flex items-center gap-1.5 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
        <button
          v-for="tab in categoryTabs"
          :key="tab.id"
          type="button"
          @click="activeCategory = tab.id"
          :class="[
            'px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap',
            activeCategory === tab.id
              ? 'bg-brand-500 text-white shadow-soft-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
          ]"
        >
          <component :is="tab.icon" class="w-3.5 h-3.5" />
          <span>{{ tab.label }}</span>
          <span
            class="px-1.5 py-0.2 rounded-full text-[10px] font-bold"
            :class="activeCategory === tab.id ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'"
          >
            {{ categoryCounts[tab.id] }}
          </span>
        </button>
      </div>

      <!-- Live Search Box -->
      <div class="relative w-full lg:w-72">
        <Search class="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search inputs (e.g. otp, rating, currency)..."
          class="w-full pl-9 pr-8 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100 placeholder-slate-400"
        />
        <button
          v-if="searchQuery"
          type="button"
          @click="searchQuery = ''"
          class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
        >
          <X class="w-3 h-3" />
        </button>
      </div>
    </div>

    <!-- Filter Status Header (if filtered) -->
    <div v-if="searchQuery || activeCategory !== 'all'" class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
      <div class="flex items-center gap-1.5">
        <SlidersHorizontal class="w-3.5 h-3.5 text-brand-500" />
        <span>
          Showing <strong>{{ filteredItems.length }}</strong> of 50 inputs
          <span v-if="activeCategory !== 'all'">in <strong>{{ categoryTabs.find(t => t.id === activeCategory)?.label }}</strong></span>
          <span v-if="searchQuery"> matching "<strong>{{ searchQuery }}</strong>"</span>
        </span>
      </div>
      <button
        type="button"
        @click="searchQuery = ''; activeCategory = 'all'"
        class="text-brand-600 dark:text-brand-400 hover:underline font-bold"
      >
        Clear Filters
      </button>
    </div>

    <!-- Empty State -->
    <div v-if="filteredItems.length === 0" class="glass-card rounded-3xl p-12 text-center border border-dashed border-slate-300 dark:border-slate-700 my-8">
      <div class="w-12 h-12 mx-auto mb-3 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
        <Search class="w-6 h-6" />
      </div>
      <h3 class="text-base font-bold text-slate-800 dark:text-slate-200">No matching input found</h3>
      <p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
        No component matches your filter criteria "{{ searchQuery }}". Try searching for another term or switch categories.
      </p>
      <button
        type="button"
        @click="searchQuery = ''; activeCategory = 'all'"
        class="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-brand-500 text-white hover:bg-brand-600 transition shadow-soft-xs"
      >
        Reset All Filters
      </button>
    </div>

    <!-- ============================================================ -->
    <!-- 50 FORM INPUT CARDS (CLEAN 3-COLUMN RESPONSIVE GRID) -->
    <!-- ============================================================ -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch">

      <!-- 1. Text Input -->
      <div v-if="isVisible('1')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#01</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">1. Text Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('1')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600" title="Toggle code"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('1')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600" title="Copy code">
                <Check v-if="copiedCodeId === '1'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Standard single-line text input with clean floating placeholder.</p>
        </div>
        <div v-if="expandedCodeIds['1']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['1'] }}</pre>
        </div>
        <div class="flex-1 space-y-2">
          <UiInput v-model="val1" label="Full Name" placeholder="e.g. Sarah Jenkins" hint="Supports any alphanumeric character set" />
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>v-model value:</span>
          <span class="font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md truncate max-w-[170px]">"{{ val1 }}"</span>
        </div>
      </div>

      <!-- 2. Password Input -->
      <div v-if="isVisible('2')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#02</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">2. Password Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('2')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('2')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '2'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Masked credential entry with dynamic strength scoring bar.</p>
        </div>
        <div v-if="expandedCodeIds['2']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['2'] }}</pre>
        </div>
        <div class="flex-1 space-y-2">
          <UiInput v-model="val2" type="password" label="Account Password" placeholder="Enter password" />
          <div class="space-y-1 pt-0.5">
            <div class="flex justify-between text-[11px]">
              <span class="text-slate-400">Strength:</span>
              <span class="font-bold text-slate-700 dark:text-slate-300">{{ passwordStrength.text }}</span>
            </div>
            <div class="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div class="h-full transition-all duration-300 rounded-full" :class="passwordStrength.color" :style="{ width: `${(passwordStrength.score / 3) * 100}%` }" />
            </div>
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Masked status:</span>
          <span class="font-mono text-xs font-bold text-brand-600">{{ val2.length }} characters entered</span>
        </div>
      </div>

      <!-- 3. Email Input -->
      <div v-if="isVisible('3')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#03</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">3. Email Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('3')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('3')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '3'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">RFC email validator with quick domain suggestion chips.</p>
        </div>
        <div v-if="expandedCodeIds['3']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['3'] }}</pre>
        </div>
        <div class="flex-1 space-y-2">
          <UiInput v-model="val3" type="email" label="Work Email Address" placeholder="alex@company.io">
            <template #prefix><Mail class="w-4 h-4 text-slate-400" /></template>
          </UiInput>
          <div class="flex items-center gap-1.5 pt-0.5">
            <span class="text-[10px] text-slate-400 font-medium">Quick domain:</span>
            <button v-for="dom in ['@gmail.com', '@outlook.com', '@company.io']" :key="dom" type="button" @click="appendEmailDomain(dom)" class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300 hover:text-brand-600 font-mono transition">
              {{ dom }}
            </button>
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>RFC Valid:</span>
          <span class="font-bold text-emerald-600 dark:text-emerald-400">✓ Valid Format</span>
        </div>
      </div>

      <!-- 4. Number Input -->
      <div v-if="isVisible('4')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#04</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">4. Number Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('4')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('4')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '4'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Numerical field with custom plus & minus increment buttons.</p>
        </div>
        <div v-if="expandedCodeIds['4']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['4'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Cluster Worker Nodes</label>
          <div class="flex items-center gap-2">
            <button type="button" @click="val4 = Math.max(1, val4 - 1)" class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition shadow-soft-xs">
              <Minus class="w-4 h-4" />
            </button>
            <input type="number" v-model.number="val4" min="1" max="100" class="flex-1 text-center font-bold text-sm py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 dark:text-slate-100" />
            <button type="button" @click="val4 = Math.min(100, val4 + 1)" class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition shadow-soft-xs">
              <Plus class="w-4 h-4" />
            </button>
          </div>
          <p class="text-[11px] text-slate-400">Bound range: 1 to 100 instances</p>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Active integer:</span>
          <span class="font-mono font-bold text-brand-600">{{ val4 }} units</span>
        </div>
      </div>

      <!-- 5. Phone Input -->
      <div v-if="isVisible('5')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#05</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">5. Phone Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('5')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('5')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '5'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">International telephone input with dial code selector.</p>
        </div>
        <div v-if="expandedCodeIds['5']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['5'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Direct Contact Number</label>
          <div class="flex items-center gap-2">
            <select v-model="phoneCountry" class="px-2.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20">
              <option value="+62">🇮🇩 +62</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+65">🇸🇬 +65</option>
              <option value="+81">🇯🇵 +81</option>
            </select>
            <div class="relative flex-1">
              <Phone class="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input v-model="val5" type="tel" class="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 dark:text-slate-100" />
            </div>
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>International:</span>
          <span class="font-mono font-bold text-slate-700 dark:text-slate-300">{{ phoneCountry }} {{ val5 }}</span>
        </div>
      </div>

      <!-- 6. URL Input -->
      <div v-if="isVisible('6')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#06</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">6. URL Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('6')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('6')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '6'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Protocol-badged URL input with direct test link action.</p>
        </div>
        <div v-if="expandedCodeIds['6']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['6'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Production Webhook Host</label>
          <div class="flex items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden text-xs focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500">
            <span class="px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono text-[11px] border-r border-slate-200 dark:border-slate-800">https://</span>
            <input v-model="val6" type="url" class="flex-1 px-3 py-2 bg-transparent text-xs focus:outline-none text-slate-800 dark:text-slate-100 font-mono" />
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Target URL:</span>
          <span class="font-mono text-brand-600 font-bold truncate max-w-[170px]">https://{{ val6 }}</span>
        </div>
      </div>

      <!-- 7. Search Input -->
      <div v-if="isVisible('7')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#07</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">7. Search Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('7')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('7')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '7'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Search bar with leading icon, keyboard hint, and clear button.</p>
        </div>
        <div v-if="expandedCodeIds['7']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['7'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Catalog Filter Query</label>
          <div class="relative">
            <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input v-model="val7" placeholder="Search orders, clients..." class="w-full pl-9 pr-14 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 dark:text-slate-100" />
            <div class="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button v-if="val7" type="button" @click="val7 = ''" class="text-slate-400 hover:text-slate-600 p-0.5"><X class="w-3.5 h-3.5" /></button>
              <kbd class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-400 font-mono border">⌘K</kbd>
            </div>
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Search term:</span>
          <span class="font-mono font-bold text-slate-700 dark:text-slate-300">"{{ val7 }}"</span>
        </div>
      </div>

      <!-- 8. Date Input -->
      <div v-if="isVisible('8')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#08</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">8. Date Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('8')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('8')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '8'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Calendar date picker with quick relative date presets.</p>
        </div>
        <div v-if="expandedCodeIds['8']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['8'] }}</pre>
        </div>
        <div class="flex-1 space-y-2">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Fiscal Milestone Date</label>
          <input v-model="val8" type="date" class="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20" />
          <div class="flex gap-1.5 pt-0.5">
            <button type="button" @click="setDatePreset(0)" class="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:text-brand-600">Today</button>
            <button type="button" @click="setDatePreset(1)" class="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:text-brand-600">Tomorrow</button>
            <button type="button" @click="setDatePreset(7)" class="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:text-brand-600">+7 Days</button>
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Selected date:</span>
          <span class="font-mono font-bold text-brand-600">{{ val8 }}</span>
        </div>
      </div>

      <!-- 9. Time Input -->
      <div v-if="isVisible('9')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#09</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">9. Time Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('9')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('9')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '9'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">24-hour clock selector with quick appointment slots.</p>
        </div>
        <div v-if="expandedCodeIds['9']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['9'] }}</pre>
        </div>
        <div class="flex-1 space-y-2">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Maintenance Window</label>
          <input v-model="val9" type="time" class="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20" />
          <div class="flex gap-1.5 pt-0.5">
            <button v-for="slot in ['09:00', '13:00', '16:30', '21:00']" :key="slot" type="button" @click="val9 = slot" class="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-300 hover:text-brand-600">
              {{ slot }}
            </button>
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Clock time:</span>
          <span class="font-mono font-bold text-brand-600">{{ val9 }} hrs</span>
        </div>
      </div>

      <!-- 10. Date & Time Input -->
      <div v-if="isVisible('10')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#10</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">10. Date & Time Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('10')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('10')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '10'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Combined datetime-local timestamp for scheduled jobs.</p>
        </div>
        <div v-if="expandedCodeIds['10']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['10'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Scheduled Release Timestamp</label>
          <input v-model="val10" type="datetime-local" class="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20" />
          <p class="text-[11px] text-slate-400">Synchronized local timezone</p>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Timestamp:</span>
          <span class="font-mono font-bold text-slate-700 dark:text-slate-300 truncate max-w-[170px]">{{ val10.replace('T', ' ') }}</span>
        </div>
      </div>

      <!-- 11. Month Input -->
      <div v-if="isVisible('11')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#11</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">11. Month Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('11')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('11')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '11'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Billing cycle and accounting period calendar month picker.</p>
        </div>
        <div v-if="expandedCodeIds['11']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['11'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Accounting Ledger Month</label>
          <input v-model="val11" type="month" class="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20" />
          <p class="text-[11px] text-slate-400">Aggregates all invoices per month</p>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Billing month:</span>
          <span class="font-mono font-bold text-brand-600">{{ val11 }}</span>
        </div>
      </div>

      <!-- 12. Week Input -->
      <div v-if="isVisible('12')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#12</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">12. Week Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('12')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('12')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '12'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">ISO-8601 weekly sprint cycle and milestone tracker.</p>
        </div>
        <div v-if="expandedCodeIds['12']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['12'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Sprint Roadmap Week</label>
          <input v-model="val12" type="week" class="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20" />
          <p class="text-[11px] text-slate-400">Format: YYYY-Www</p>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Sprint:</span>
          <span class="font-mono font-bold text-brand-600">{{ val12 }}</span>
        </div>
      </div>

      <!-- 13. Textarea with Dynamic Counter -->
      <div v-if="isVisible('13')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#13</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">13. Textarea</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('13')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('13')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '13'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Multi-line text area with live character counter limit.</p>
        </div>
        <div v-if="expandedCodeIds['13']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['13'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <div class="flex justify-between items-center">
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Executive Notes</label>
            <span class="text-[11px] font-mono text-slate-400">{{ val13.length }} / 300</span>
          </div>
          <textarea v-model="val13" maxlength="300" rows="3" class="w-full p-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 resize-none focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" />
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Remaining:</span>
          <span class="font-mono font-bold text-slate-700 dark:text-slate-300">{{ 300 - val13.length }} chars left</span>
        </div>
      </div>

      <!-- 14. Rich Text Editor -->
      <div v-if="isVisible('14')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#14</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">14. Rich Text Editor</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('14')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('14')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '14'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">WYSIWYG formatting toolbar with active text styling.</p>
        </div>
        <div v-if="expandedCodeIds['14']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['14'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">WYSIWYG Container</label>
          <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-soft-xs">
            <div class="flex items-center gap-1 p-1.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
              <button type="button" @click="applyRichFormat('b')" class="px-2 py-0.5 rounded hover:bg-white dark:hover:bg-slate-700 text-xs font-bold border border-transparent hover:border-slate-200">B</button>
              <button type="button" @click="applyRichFormat('i')" class="px-2 py-0.5 rounded hover:bg-white dark:hover:bg-slate-700 text-xs italic font-serif border border-transparent hover:border-slate-200">I</button>
              <button type="button" @click="applyRichFormat('u')" class="px-2 py-0.5 rounded hover:bg-white dark:hover:bg-slate-700 text-xs underline border border-transparent hover:border-slate-200">U</button>
            </div>
            <div class="p-2.5 text-xs min-h-[60px] text-slate-800 dark:text-slate-200" v-html="richText" />
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Engine:</span>
          <span class="font-bold text-emerald-600 dark:text-emerald-400">HTML5 DOM Renderer</span>
        </div>
      </div>

      <!-- 15. Code Editor -->
      <div v-if="isVisible('15')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#15</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">15. Code Editor</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('15')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('15')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '15'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Monospace programming code editor with line numbers.</p>
        </div>
        <div v-if="expandedCodeIds['15']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['15'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <div class="flex justify-between items-center">
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Server Handler</label>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-brand-900/30 text-brand-400">TypeScript</span>
          </div>
          <textarea v-model="val15" rows="3" class="w-full p-2.5 rounded-xl font-mono text-[11px] bg-slate-950 text-brand-300 border border-slate-800 resize-none focus:outline-none focus:ring-2 focus:ring-brand-500/20" />
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Lines count:</span>
          <span class="font-mono font-bold text-slate-700 dark:text-slate-300">{{ val15.split('\n').length }} lines</span>
        </div>
      </div>

      <!-- 16. OTP Input -->
      <div v-if="isVisible('16')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#16</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">16. OTP Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('16')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('16')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '16'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">6-digit individual box verification code with auto-advance.</p>
        </div>
        <div v-if="expandedCodeIds['16']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['16'] }}</pre>
        </div>
        <div class="flex-1 space-y-2">
          <div class="flex justify-between items-center">
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">6-Digit 2FA Token</label>
            <button type="button" @click="pasteOtpSample" class="text-[11px] font-bold text-brand-600 hover:underline">Paste Code</button>
          </div>
          <div class="flex justify-between gap-1.5">
            <input
              v-for="(digit, idx) in otpDigits"
              :key="idx"
              :ref="el => { if (el) otpRefs[idx] = el as HTMLInputElement }"
              :value="digit"
              maxlength="1"
              @input="handleOtpInput(idx, $event)"
              @keydown="handleOtpKeydown(idx, $event)"
              class="w-10 h-11 text-center font-bold text-base rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:outline-none text-slate-900 dark:text-slate-100 shadow-soft-xs"
            />
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Entered OTP:</span>
          <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400">{{ otpDigits.join('') }}</span>
        </div>
      </div>

      <!-- 17. PIN Input -->
      <div v-if="isVisible('17')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#17</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">17. PIN Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('17')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('17')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '17'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">4-digit masked financial passcode with visibility toggle.</p>
        </div>
        <div v-if="expandedCodeIds['17']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['17'] }}</pre>
        </div>
        <div class="flex-1 space-y-2">
          <div class="flex justify-between items-center">
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Wallet Authorization PIN</label>
            <button type="button" @click="showPin = !showPin" class="text-[11px] text-slate-400 hover:text-brand-600 font-bold">
              {{ showPin ? 'Mask PIN' : 'Reveal PIN' }}
            </button>
          </div>
          <div class="flex justify-center gap-3 py-1">
            <div v-for="(p, i) in pinDigits" :key="i" class="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-black text-lg text-slate-800 dark:text-slate-100 shadow-soft-xs">
              {{ showPin ? p : '●' }}
            </div>
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Security state:</span>
          <span class="font-bold text-slate-700 dark:text-slate-300">Encrypted in memory</span>
        </div>
      </div>

      <!-- 18. Currency Input -->
      <div v-if="isVisible('18')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#18</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">18. Currency Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('18')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('18')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '18'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Auto-formatted financial input with currency switcher.</p>
        </div>
        <div v-if="expandedCodeIds['18']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['18'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Budget Appropriation</label>
          <div class="flex items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden focus-within:ring-2 focus-within:ring-brand-500/20">
            <select v-model="currencyCode" class="px-2.5 py-2 bg-slate-100 dark:bg-slate-800 font-bold text-xs text-slate-600 dark:text-slate-300 border-r border-slate-200 dark:border-slate-800 focus:outline-none">
              <option value="USD">$ USD</option>
              <option value="IDR">Rp IDR</option>
              <option value="EUR">€ EUR</option>
            </select>
            <input v-model.number="val18" type="number" class="flex-1 px-3 py-2 text-xs bg-transparent font-bold focus:outline-none text-slate-800 dark:text-slate-100" />
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Formatted:</span>
          <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400">{{ formattedCurrency }}</span>
        </div>
      </div>

      <!-- 19. Percentage Input -->
      <div v-if="isVisible('19')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#19</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">19. Percentage Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('19')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('19')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '19'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">0-100% numerical field synced with visual progress track.</p>
        </div>
        <div v-if="expandedCodeIds['19']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['19'] }}</pre>
        </div>
        <div class="flex-1 space-y-2">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Commission Share</label>
          <div class="flex items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden focus-within:ring-2 focus-within:ring-brand-500/20">
            <input v-model.number="val19" type="number" min="0" max="100" class="flex-1 px-3 py-2 text-xs bg-transparent focus:outline-none font-bold text-slate-800 dark:text-slate-100" />
            <span class="px-3 py-2 bg-slate-100 dark:bg-slate-800 font-bold text-xs text-slate-500 border-l border-slate-200 dark:border-slate-800">%</span>
          </div>
          <div class="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div class="h-full bg-brand-500 rounded-full transition-all" :style="{ width: `${val19}%` }" />
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Calculated split:</span>
          <span class="font-mono font-bold text-brand-600">{{ val19 }}% / {{ 100 - val19 }}%</span>
        </div>
      </div>

      <!-- 20. Decimal Input -->
      <div v-if="isVisible('20')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#20</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">20. Decimal Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('20')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('20')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '20'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">High-precision float input with micro-step buttons.</p>
        </div>
        <div v-if="expandedCodeIds['20']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['20'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Crypto Satoshis Unit</label>
          <input v-model="val20" type="text" class="w-full px-3 py-2 rounded-xl text-xs font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-bold" />
          <p class="text-[11px] text-slate-400">8-decimal places precision</p>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Type:</span>
          <span class="font-mono font-bold text-slate-700 dark:text-slate-300">Float ({{ val20 }})</span>
        </div>
      </div>

      <!-- 21. Range / Slider -->
      <div v-if="isVisible('21')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#21</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">21. Range / Slider</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('21')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('21')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '21'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Draggable range tracker with dynamic floating percentage.</p>
        </div>
        <div v-if="expandedCodeIds['21']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['21'] }}</pre>
        </div>
        <div class="flex-1 space-y-2">
          <div class="flex justify-between items-center">
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Compute Allocation</label>
            <span class="text-xs font-bold text-brand-600 font-mono">{{ val21 }}%</span>
          </div>
          <input v-model.number="val21" type="range" min="0" max="100" class="w-full accent-brand-600 cursor-pointer h-2 bg-slate-100 dark:bg-slate-800 rounded-lg" />
          <div class="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>0% Idle</span>
            <span>50%</span>
            <span>100% Boost</span>
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Slider value:</span>
          <span class="font-mono font-bold text-brand-600">{{ val21 }} / 100</span>
        </div>
      </div>

      <!-- 22. Color Picker -->
      <div v-if="isVisible('22')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#22</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">22. Color Picker</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('22')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('22')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '22'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Visual palette picker with HEX values and preset swatches.</p>
        </div>
        <div v-if="expandedCodeIds['22']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['22'] }}</pre>
        </div>
        <div class="flex-1 space-y-2">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Brand Theme Accent</label>
          <div class="flex items-center gap-2">
            <input v-model="val22" type="color" class="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0 p-0 shadow-soft-xs" />
            <input v-model="val22" class="flex-1 px-3 py-2 rounded-xl text-xs font-mono uppercase bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 font-bold" />
          </div>
          <div class="flex items-center gap-1.5 pt-0.5">
            <button v-for="c in colorPresets" :key="c" type="button" @click="val22 = c" class="w-5 h-5 rounded-full border border-black/10 transition-transform hover:scale-110" :style="{ backgroundColor: c }" />
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>HEX Code:</span>
          <span class="font-mono font-bold text-slate-700 dark:text-slate-300">{{ val22 }}</span>
        </div>
      </div>

      <!-- 23. File Input -->
      <div v-if="isVisible('23')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#23</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">23. File Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('23')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('23')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '23'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Styled single document selector with file size indicator.</p>
        </div>
        <div v-if="expandedCodeIds['23']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['23'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Corporate Audit PDF</label>
          <div class="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs shadow-soft-xs">
            <div class="flex items-center gap-2 truncate pr-2">
              <FileText class="w-4 h-4 text-brand-500 flex-shrink-0" />
              <span class="truncate font-medium text-slate-700 dark:text-slate-300">{{ selectedSingleFile }}</span>
            </div>
            <button type="button" @click="toast.info('Triggering file dialog...')" class="px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-bold text-[11px] hover:bg-brand-100 transition">
              Browse
            </button>
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>MIME:</span>
          <span class="font-bold text-slate-700 dark:text-slate-300">application/pdf (Valid)</span>
        </div>
      </div>

      <!-- 24. Image Upload -->
      <div v-if="isVisible('24')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#24</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">24. Image Upload</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('24')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('24')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '24'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Avatar and photo uploader with instant image preview.</p>
        </div>
        <div v-if="expandedCodeIds['24']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['24'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Profile Avatar Photo</label>
          <div class="flex items-center gap-3">
            <img :src="uploadedImage" class="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-soft-xs" />
            <div class="flex-1 flex gap-2">
              <button type="button" @click="toast.info('Choose replacement image...')" class="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition">
                Change
              </button>
              <button type="button" @click="uploadedImage = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300'" class="px-3 py-1.5 rounded-xl text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950/50 text-xs font-bold transition">
                Random
              </button>
            </div>
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Dimensions:</span>
          <span class="font-mono text-slate-700 dark:text-slate-300">300 × 300 px</span>
        </div>
      </div>

      <!-- 25. Multiple File Upload -->
      <div v-if="isVisible('25')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#25</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">25. Multiple File Upload</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('25')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('25')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '25'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Multi-document selector with file sizes and deletion chips.</p>
        </div>
        <div v-if="expandedCodeIds['25']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['25'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <div class="flex justify-between items-center">
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Attached Datasets</label>
            <span class="text-[11px] font-mono text-slate-400">{{ multiFiles.length }} files</span>
          </div>
          <div class="space-y-1.5 max-h-[85px] overflow-y-auto pr-1">
            <div v-for="(f, idx) in multiFiles" :key="f.name" class="flex items-center justify-between px-2.5 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
              <span class="truncate pr-2 font-mono text-[11px] text-slate-700 dark:text-slate-300">{{ f.name }} ({{ f.size }})</span>
              <button type="button" @click="removeMultiFile(idx)" class="text-slate-400 hover:text-rose-500"><X class="w-3.5 h-3.5" /></button>
            </div>
          </div>
          <button type="button" @click="multiFiles.push({ name: `sample-dump-${Date.now().toString().slice(-4)}.csv`, size: '1.2 MB' })" class="w-full py-1 rounded-xl border border-dashed border-brand-500/50 text-xs font-bold text-brand-600 hover:bg-brand-50/50 dark:hover:bg-brand-950/30 transition">
            + Append Document
          </button>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Batch status:</span>
          <span class="font-bold text-emerald-600 dark:text-emerald-400">Ready to ingest</span>
        </div>
      </div>

      <!-- 26. Drag & Drop Upload Zone -->
      <div v-if="isVisible('26')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#26</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">26. Drag & Drop Upload</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('26')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('26')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '26'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Large dropzone area with animated cloud icon and border dash.</p>
        </div>
        <div v-if="expandedCodeIds['26']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['26'] }}</pre>
        </div>
        <div class="flex-1">
          <div
            @dragover.prevent="isDraggingOver = true"
            @dragleave.prevent="isDraggingOver = false"
            @drop.prevent="isDraggingOver = false; toast.success('Files dropped into upload pipeline!')"
            class="border-2 border-dashed rounded-2xl p-4 text-center transition cursor-pointer"
            :class="isDraggingOver ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40' : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40'"
          >
            <UploadCloud class="w-6 h-6 mx-auto text-brand-500 mb-1" />
            <p class="text-xs font-bold text-slate-800 dark:text-slate-200">Drag files directly here</p>
            <p class="text-[10px] text-slate-400 mt-0.5">PDF, PNG, CSV max 25MB</p>
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Dropzone state:</span>
          <span class="font-mono text-slate-700 dark:text-slate-300">{{ isDraggingOver ? 'Hovering' : 'Listening' }}</span>
        </div>
      </div>

      <!-- 27. Checkbox Standalone -->
      <div v-if="isVisible('27')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#27</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">27. Checkbox</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('27')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('27')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '27'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Standalone binary toggle checkbox with checkmark animation.</p>
        </div>
        <div v-if="expandedCodeIds['27']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['27'] }}</pre>
        </div>
        <div class="flex-1 py-1">
          <UiCheckbox v-model="val27" label="Agree to Terms of Service and SLA Agreements" />
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Boolean state:</span>
          <span class="font-mono font-bold" :class="val27 ? 'text-emerald-600' : 'text-rose-500'">{{ val27 }}</span>
        </div>
      </div>

      <!-- 28. Checkbox Group -->
      <div v-if="isVisible('28')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#28</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">28. Checkbox Group</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('28')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('28')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '28'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Multi-selection checklist with Select All / Deselect helper.</p>
        </div>
        <div v-if="expandedCodeIds['28']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['28'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <div class="flex justify-between items-center">
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Role Permissions</label>
            <div class="flex gap-2">
              <button type="button" @click="selectAllPermissions(true)" class="text-[10px] font-bold text-brand-600 hover:underline">All</button>
              <button type="button" @click="selectAllPermissions(false)" class="text-[10px] font-bold text-slate-400 hover:underline">None</button>
            </div>
          </div>
          <div class="space-y-1.5">
            <UiCheckbox v-model="permissions.read" label="Read Documents" />
            <UiCheckbox v-model="permissions.write" label="Write & Edit Records" />
            <UiCheckbox v-model="permissions.delete" label="Delete Clustered Nodes" />
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Granted:</span>
          <span class="font-bold text-slate-700 dark:text-slate-300">{{ Object.values(permissions).filter(Boolean).length }} of 4 roles</span>
        </div>
      </div>

      <!-- 29. Radio Standalone -->
      <div v-if="isVisible('29')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#29</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">29. Radio</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('29')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('29')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '29'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Single circle radio indicator with active state styling.</p>
        </div>
        <div v-if="expandedCodeIds['29']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['29'] }}</pre>
        </div>
        <div class="flex-1 space-y-2 py-1">
          <div class="flex items-center gap-2 cursor-pointer" @click="val29 = 'monthly'">
            <div class="w-4 h-4 rounded-full border-2 flex items-center justify-center" :class="val29 === 'monthly' ? 'border-brand-600' : 'border-slate-300 dark:border-slate-600'">
              <div v-if="val29 === 'monthly'" class="w-2 h-2 rounded-full bg-brand-600" />
            </div>
            <span class="text-xs font-medium text-slate-800 dark:text-slate-200">Monthly Billing ($19/mo)</span>
          </div>
          <div class="flex items-center gap-2 cursor-pointer" @click="val29 = 'annually'">
            <div class="w-4 h-4 rounded-full border-2 flex items-center justify-center" :class="val29 === 'annually' ? 'border-brand-600' : 'border-slate-300 dark:border-slate-600'">
              <div v-if="val29 === 'annually'" class="w-2 h-2 rounded-full bg-brand-600" />
            </div>
            <span class="text-xs font-medium text-slate-800 dark:text-slate-200">Annual Billing (Save 20%)</span>
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Active selection:</span>
          <span class="font-mono font-bold text-brand-600 capitalize">{{ val29 }}</span>
        </div>
      </div>

      <!-- 30. Radio Group (Pricing Tier Cards) -->
      <div v-if="isVisible('30')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#30</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">30. Radio Group</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('30')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('30')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '30'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Card-based selectable radio tier options for pricing plans.</p>
        </div>
        <div v-if="expandedCodeIds['30']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['30'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Select Plan Tier</label>
          <div class="grid grid-cols-2 gap-2">
            <div
              @click="selectedTier = 'starter'"
              class="p-2.5 rounded-xl border cursor-pointer text-xs transition"
              :class="selectedTier === 'starter' ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-500 font-bold text-brand-700 dark:text-brand-300 shadow-soft-xs' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'"
            >
              <div class="font-bold">Starter</div>
              <div class="text-[10px] text-slate-400 font-normal">$0 / mo</div>
            </div>
            <div
              @click="selectedTier = 'pro'"
              class="p-2.5 rounded-xl border cursor-pointer text-xs transition"
              :class="selectedTier === 'pro' ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-500 font-bold text-brand-700 dark:text-brand-300 shadow-soft-xs' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'"
            >
              <div class="font-bold">Pro Edition</div>
              <div class="text-[10px] text-slate-400 font-normal">$49 / mo</div>
            </div>
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Active tier:</span>
          <span class="font-mono font-bold text-brand-600 uppercase">{{ selectedTier }}</span>
        </div>
      </div>

      <!-- 31. Switch / Toggle -->
      <div v-if="isVisible('31')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#31</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">31. Switch / Toggle</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('31')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('31')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '31'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Smooth animated iOS-style toggle switch with status badge.</p>
        </div>
        <div v-if="expandedCodeIds['31']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['31'] }}</pre>
        </div>
        <div class="flex-1 py-1">
          <UiToggle v-model="val31" label="Audio Feedback" description="Play subtle notification chimes on key events" />
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Toggle state:</span>
          <span class="font-bold" :class="val31 ? 'text-emerald-600' : 'text-slate-400'">{{ val31 ? 'Active (ON)' : 'Disabled (OFF)' }}</span>
        </div>
      </div>

      <!-- 32. Select / Dropdown -->
      <div v-if="isVisible('32')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#32</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">32. Select / Dropdown</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('32')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('32')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '32'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Styled single-choice dropdown menu with chevron indicator.</p>
        </div>
        <div v-if="expandedCodeIds['32']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['32'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Target Cloud Region</label>
          <select v-model="val32" class="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20">
            <option value="apac">Asia Pacific (Singapore - ap-southeast-1)</option>
            <option value="us-east">US East (N. Virginia - us-east-1)</option>
            <option value="eu-central">Europe (Frankfurt - eu-central-1)</option>
          </select>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Region ID:</span>
          <span class="font-mono font-bold text-brand-600 uppercase">{{ val32 }}</span>
        </div>
      </div>

      <!-- 33. Multi Select -->
      <div v-if="isVisible('33')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#33</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">33. Multi Select</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('33')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('33')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '33'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Multi-value picker with removable tags and toggle pills.</p>
        </div>
        <div v-if="expandedCodeIds['33']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['33'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Selected Frameworks</label>
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="fw in availableFrameworks"
              :key="fw"
              type="button"
              @click="toggleFramework(fw)"
              class="px-2.5 py-0.5 rounded-full text-xs font-semibold transition"
              :class="selectedFrameworks.includes(fw) ? 'bg-brand-500 text-white shadow-soft-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'"
            >
              {{ fw }}
            </button>
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Active count:</span>
          <span class="font-bold text-slate-700 dark:text-slate-300">{{ selectedFrameworks.length }} selected</span>
        </div>
      </div>

      <!-- 34. Combobox -->
      <div v-if="isVisible('34')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#34</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">34. Combobox</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('34')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('34')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '34'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Searchable dropdown allowing both predefined and custom values.</p>
        </div>
        <div v-if="expandedCodeIds['34']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['34'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Database Engine (Editable)</label>
          <input v-model="comboboxQuery" list="engines-list" placeholder="Type or pick engine..." class="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20" />
          <datalist id="engines-list">
            <option v-for="eng in comboboxOptions" :key="eng" :value="eng" />
          </datalist>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Engine:</span>
          <span class="font-mono font-bold text-slate-700 dark:text-slate-300">"{{ comboboxQuery }}"</span>
        </div>
      </div>

      <!-- 35. Autocomplete -->
      <div v-if="isVisible('35')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#35</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">35. Autocomplete</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('35')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('35')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '35'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Predictive input filtering suggestions as the user types.</p>
        </div>
        <div v-if="expandedCodeIds['35']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['35'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5 relative">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">City Predictor</label>
          <input v-model="autocompleteQuery" placeholder="Type a city name..." class="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20" />
          <div v-if="filteredCities.length" class="absolute z-10 top-full left-0 right-0 mt-1 p-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs shadow-soft-md space-y-0.5">
            <div v-for="c in filteredCities" :key="c" @click="autocompleteQuery = c" class="px-2.5 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer font-medium">
              {{ c }}
            </div>
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Selected city:</span>
          <span class="font-mono font-bold text-brand-600">{{ autocompleteQuery }}</span>
        </div>
      </div>

      <!-- 36. Tag / Chips Input -->
      <div v-if="isVisible('36')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#36</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">36. Tag / Chips Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('36')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('36')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '36'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Dynamic tag creator: press Enter to append badges.</p>
        </div>
        <div v-if="expandedCodeIds['36']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['36'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Topic Tags</label>
          <div class="flex flex-wrap items-center gap-1.5 p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 min-h-[44px]">
            <span v-for="(t, i) in tagList" :key="t" class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-900">
              {{ t }}
              <button type="button" @click="removeTag(i)" class="hover:text-rose-500"><X class="w-3 h-3" /></button>
            </span>
            <input v-model="newTagInput" @keydown.enter.prevent="addTag" placeholder="Press Enter..." class="flex-1 min-w-[70px] bg-transparent text-xs focus:outline-none p-1 text-slate-800 dark:text-slate-100" />
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Active tags:</span>
          <span class="font-bold text-slate-700 dark:text-slate-300">{{ tagList.length }} items</span>
        </div>
      </div>

      <!-- 37. Username Input -->
      <div v-if="isVisible('37')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#37</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">37. Username Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('37')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('37')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '37'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Social handle input with @ prefix and live availability check.</p>
        </div>
        <div v-if="expandedCodeIds['37']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['37'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <div class="flex justify-between items-center">
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Public Handle</label>
            <span class="text-[11px] font-bold" :class="isUsernameAvailable ? 'text-emerald-500' : 'text-rose-500'">
              {{ isUsernameAvailable ? '✓ Available' : '✗ Unavailable' }}
            </span>
          </div>
          <div class="flex items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden focus-within:ring-2 focus-within:ring-brand-500/20">
            <span class="px-3 py-2 bg-slate-100 dark:bg-slate-800 font-bold text-xs text-slate-400 border-r border-slate-200 dark:border-slate-800">@</span>
            <input v-model="val37" class="flex-1 px-3 py-2 text-xs bg-transparent focus:outline-none text-slate-800 dark:text-slate-100" />
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Profile link:</span>
          <span class="font-mono text-brand-600 font-bold">@{{ val37 }}</span>
        </div>
      </div>

      <!-- 38. Masked Input -->
      <div v-if="isVisible('38')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#38</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">38. Masked Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('38')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('38')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '38'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Pattern-formatted credit card field (#### #### #### ####).</p>
        </div>
        <div v-if="expandedCodeIds['38']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['38'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Payment Card Number</label>
          <div class="relative">
            <CreditCard class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-500" />
            <input v-model="val38" maxlength="19" class="w-full pl-9 pr-3 py-2 text-xs font-mono font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-800 dark:text-slate-100" />
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Network:</span>
          <span class="font-bold text-slate-700 dark:text-slate-300">Visa / Mastercard</span>
        </div>
      </div>

      <!-- 39. Address Input -->
      <div v-if="isVisible('39')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#39</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">39. Address Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('39')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('39')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '39'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Composite address form block (street, city, state, postal code).</p>
        </div>
        <div v-if="expandedCodeIds['39']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['39'] }}</pre>
        </div>
        <div class="flex-1 space-y-2">
          <input v-model="addressState.street" placeholder="Street Address" class="w-full px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100" />
          <div class="grid grid-cols-2 gap-2">
            <input v-model="addressState.city" placeholder="City" class="px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100" />
            <input v-model="addressState.zip" placeholder="Postal / ZIP" class="px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100" />
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Composite:</span>
          <span class="font-bold text-slate-700 dark:text-slate-300 truncate max-w-[170px]">{{ addressState.city }}, {{ addressState.zip }}</span>
        </div>
      </div>

      <!-- 40. Coordinates / Location Input -->
      <div v-if="isVisible('40')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#40</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">40. Coordinates Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('40')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('40')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '40'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Dual latitude & longitude inputs with GPS auto-detect button.</p>
        </div>
        <div v-if="expandedCodeIds['40']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['40'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <div class="flex justify-between items-center">
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">GPS Coordinates</label>
            <button type="button" @click="detectLocation" class="text-[11px] text-brand-600 font-bold hover:underline">Detect GPS</button>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <input v-model="coordinates.lat" placeholder="Latitude" class="px-3 py-2 text-xs font-mono font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100" />
            <input v-model="coordinates.lng" placeholder="Longitude" class="px-3 py-2 text-xs font-mono font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100" />
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Lat, Lng:</span>
          <span class="font-mono font-bold text-brand-600">{{ coordinates.lat }}, {{ coordinates.lng }}</span>
        </div>
      </div>

      <!-- 41. Rating Input -->
      <div v-if="isVisible('41')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#41</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">41. Rating Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('41')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('41')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '41'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Interactive 5-star rating with hover visual preview.</p>
        </div>
        <div v-if="expandedCodeIds['41']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['41'] }}</pre>
        </div>
        <div class="flex-1 space-y-2">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Satisfaction Score</label>
          <div class="flex items-center gap-1.5 py-1">
            <button
              v-for="st in 5"
              :key="st"
              type="button"
              @mouseenter="hoverRating = st"
              @mouseleave="hoverRating = null"
              @click="ratingScore = st"
              class="p-1 hover:scale-125 transition"
            >
              <Star
                class="w-5 h-5 transition-colors"
                :class="(hoverRating !== null ? st <= hoverRating : st <= ratingScore) ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-700'"
              />
            </button>
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Rating:</span>
          <span class="font-bold text-amber-500">{{ ratingScore }}.0 / 5.0 Stars</span>
        </div>
      </div>

      <!-- 42. Signature Canvas Input -->
      <div v-if="isVisible('42')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#42</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">42. Signature Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('42')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('42')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '42'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">HTML5 digital signature canvas with Clear and PNG export.</p>
        </div>
        <div v-if="expandedCodeIds['42']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['42'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <div class="flex justify-between items-center">
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Draw Signature</label>
            <div class="flex gap-2">
              <button type="button" @click="clearSignature" class="text-[11px] text-slate-400 hover:text-rose-500 font-bold">Clear</button>
              <button type="button" @click="downloadSignature" class="text-[11px] text-brand-600 font-bold hover:underline">Download PNG</button>
            </div>
          </div>
          <canvas
            ref="signatureCanvas"
            width="320"
            height="90"
            @mousedown="startDrawing"
            @mousemove="draw"
            @mouseup="stopDrawing"
            @mouseleave="stopDrawing"
            class="w-full h-20 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 cursor-crosshair shadow-soft-xs"
          />
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Engine:</span>
          <span class="font-bold text-slate-700 dark:text-slate-300">HTML5 Canvas 2D</span>
        </div>
      </div>

      <!-- 43. Hidden Input -->
      <div v-if="isVisible('43')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#43</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">43. Hidden Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('43')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('43')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '43'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Under-the-hood security token and CSRF nonce input demo.</p>
        </div>
        <div v-if="expandedCodeIds['43']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['43'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <div class="flex justify-between items-center">
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">CSRF Nonce Token</label>
            <button type="button" @click="showHiddenDemo = !showHiddenDemo" class="text-[11px] font-bold text-brand-600 hover:underline">
              {{ showHiddenDemo ? 'Hide DOM' : 'Inspect DOM' }}
            </button>
          </div>
          <div class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-mono text-[11px] text-slate-500 break-all border border-slate-200 dark:border-slate-700">
            <code>&lt;input type="hidden" name="_csrf" value="{{ csrfToken }}" /&gt;</code>
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Visibility:</span>
          <span class="font-bold text-slate-700 dark:text-slate-300">display: none (Form Safe)</span>
        </div>
      </div>

      <!-- 44. Read-only Input -->
      <div v-if="isVisible('44')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#44</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">44. Read-only Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('44')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('44')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '44'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Locked display input with one-click copy to clipboard.</p>
        </div>
        <div v-if="expandedCodeIds['44']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['44'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Provisioned Gateway ID</label>
          <div class="flex items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 overflow-hidden shadow-soft-xs">
            <input :value="val44" readonly class="flex-1 px-3 py-2 text-xs font-mono bg-transparent text-slate-500 focus:outline-none cursor-default font-bold" />
            <button type="button" @click="toast.success('Readonly ID copied!')" class="px-3 py-2 text-brand-600 hover:text-brand-700 font-bold text-xs">
              <Copy class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>State:</span>
          <span class="font-bold text-amber-500">Readonly (Selectable)</span>
        </div>
      </div>

      <!-- 45. Disabled Input -->
      <div v-if="isVisible('45')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#45</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">45. Disabled Input</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('45')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('45')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '45'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Inactive grayed-out field preventing typing and interaction.</p>
        </div>
        <div v-if="expandedCodeIds['45']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['45'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <UiInput v-model="val45" disabled label="Master Encryption Passphrase" hint="Disabled by IAM security policy" />
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>State:</span>
          <span class="font-bold text-rose-500">Disabled (Non-interactive)</span>
        </div>
      </div>

      <!-- 46. Input with Prefix -->
      <div v-if="isVisible('46')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#46</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">46. Input with Prefix</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('46')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('46')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '46'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Input with fixed leading URL or protocol badge prefix.</p>
        </div>
        <div v-if="expandedCodeIds['46']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['46'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Tenant Subdomain</label>
          <div class="flex items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden focus-within:ring-2 focus-within:ring-brand-500/20">
            <span class="px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono text-xs border-r border-slate-200 dark:border-slate-800">app.</span>
            <input v-model="val46" class="flex-1 px-3 py-2 text-xs bg-transparent focus:outline-none text-slate-800 dark:text-slate-100 font-bold" />
            <span class="px-3 py-2 text-slate-400 text-xs font-mono">.cloud</span>
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>FQDN:</span>
          <span class="font-mono font-bold text-brand-600">app.{{ val46 }}.cloud</span>
        </div>
      </div>

      <!-- 47. Input with Suffix -->
      <div v-if="isVisible('47')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#47</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">47. Input with Suffix</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('47')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('47')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '47'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Input with trailing unit measurement or domain suffix.</p>
        </div>
        <div v-if="expandedCodeIds['47']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['47'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Max Payload Limit</label>
          <div class="flex items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden focus-within:ring-2 focus-within:ring-brand-500/20">
            <input v-model="val47" type="number" class="flex-1 px-3 py-2 text-xs bg-transparent focus:outline-none font-bold text-slate-800 dark:text-slate-100" />
            <span class="px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold text-xs border-l border-slate-200 dark:border-slate-800">MB / sec</span>
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Throughput:</span>
          <span class="font-mono font-bold text-slate-700 dark:text-slate-300">{{ val47 }} Megabytes/sec</span>
        </div>
      </div>

      <!-- 48. Input with Icon -->
      <div v-if="isVisible('48')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#48</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">48. Input with Icon</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('48')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('48')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '48'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Input featuring an embedded leading visual Lucide icon.</p>
        </div>
        <div v-if="expandedCodeIds['48']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['48'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <UiInput v-model="val48" label="Collaborator Dispatch Email">
            <template #prefix><Mail class="w-4 h-4 text-brand-500" /></template>
          </UiInput>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Icon set:</span>
          <span class="font-bold text-brand-600">Lucide Vue Next</span>
        </div>
      </div>

      <!-- 49. Input with Clear Button -->
      <div v-if="isVisible('49')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#49</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">49. Input with Clear Button</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('49')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('49')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '49'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Input with interactive (X) icon to wipe input in one click.</p>
        </div>
        <div v-if="expandedCodeIds['49']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['49'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Dynamic Clearable Field</label>
          <div class="relative">
            <input v-model="val49" placeholder="Type something..." class="w-full pr-8 pl-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-800 dark:text-slate-100" />
            <button v-if="val49" type="button" @click="val49 = ''" class="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400">
              <X class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Action:</span>
          <span class="font-bold text-slate-700 dark:text-slate-300">{{ val49 ? 'Click X to reset' : 'Field is empty' }}</span>
        </div>
      </div>

      <!-- 50. Input with Password Toggle -->
      <div v-if="isVisible('50')" class="glass-card rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft-xs hover:border-brand-500/40 dark:hover:border-brand-500/40 transition duration-200 flex flex-col justify-between space-y-3.5">
        <div class="space-y-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#50</span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">50. Password Toggle</h3>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" @click="toggleCodeDrawer('50')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600"><Code2 class="w-3.5 h-3.5" /></button>
              <button type="button" @click="copyCodeSnippet('50')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-600">
                <Check v-if="copiedCodeId === '50'" class="w-3.5 h-3.5 text-emerald-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Password field with eye icon to reveal or conceal characters.</p>
        </div>
        <div v-if="expandedCodeIds['50']" class="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <pre>{{ codeSnippets['50'] }}</pre>
        </div>
        <div class="flex-1 space-y-1.5">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Secret Encryption Key</label>
          <div class="relative">
            <input :type="showPassword50 ? 'text' : 'password'" v-model="val50" class="w-full pr-10 pl-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-mono text-slate-800 dark:text-slate-100 font-bold" />
            <button type="button" @click="showPassword50 = !showPassword50" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <EyeOff v-if="showPassword50" class="w-4 h-4" />
              <Eye v-else class="w-4 h-4" />
            </button>
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>Mode:</span>
          <span class="font-bold text-slate-700 dark:text-slate-300">{{ showPassword50 ? 'Visible plain-text' : 'Masked bullets' }}</span>
        </div>
      </div>

    </div>
  </div>
</template>
