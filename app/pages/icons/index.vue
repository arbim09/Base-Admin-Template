<script setup lang="ts">
import {
  // Navigation & Shell
  LayoutDashboard,
  LayoutGrid,
  Layers,
  Sidebar,
  Menu,
  Home,
  Folder,
  FolderOpen,
  FolderTree,
  Compass,
  Navigation,
  Columns3,
  Maximize2,
  Minimize2,

  // Users & Identity
  User,
  Users,
  UserCheck,
  UserPlus,
  UserMinus,
  UserX,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  BadgeCheck,

  // Actions & Controls
  Plus,
  Minus,
  Check,
  X,
  Search,
  Filter,
  Trash2,
  Edit,
  Edit2,
  Edit3,
  Copy,
  Download,
  Upload,
  Share2,
  ExternalLink,
  Eye,
  EyeOff,
  RefreshCw,
  RotateCcw,
  MoreHorizontal,
  MoreVertical,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,

  // Finance & Commerce
  DollarSign,
  CreditCard,
  Wallet,
  Receipt,
  ShoppingBag,
  ShoppingCart,
  Tag,
  TrendingUp,
  TrendingDown,
  Coins,
  Banknote,
  Percent,

  // Analytics & Data
  BarChart,
  BarChart2,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Gauge,
  Database,
  Server,
  HardDrive,
  Cpu,

  // Communication & Alerts
  Bell,
  BellRing,
  Mail,
  MessageSquare,
  Send,
  Inbox,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  HelpCircle,

  // Media & System
  Image,
  Camera,
  Video,
  FileText,
  File,
  Files,
  Laptop,
  Smartphone,
  Monitor,
  Printer,
  Wifi,
  Cloud,
  Sliders,
  Calendar,
  Clock,
  Timer,
  Bookmark,
  Star,
  Heart,
  Sparkles,
  Sun,
  Moon,
  Flame,
  TableProperties,
} from 'lucide-vue-next'

definePageMeta({
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Lucide Icons Browser — Vanguard Admin Base',
  description: 'Search, preview, and 1-click copy Lucide icons for your admin projects',
})

const toast = useToast()

interface IconItem {
  name: string
  component: any
  category: string
  tags: string[]
}

const iconsList: IconItem[] = [
  // Navigation & Shell
  { name: 'LayoutDashboard', component: LayoutDashboard, category: 'Navigation', tags: ['dashboard', 'home', 'main'] },
  { name: 'LayoutGrid', component: LayoutGrid, category: 'Navigation', tags: ['grid', 'cards', 'view'] },
  { name: 'Layers', component: Layers, category: 'Navigation', tags: ['layers', 'stack', 'ui', 'components'] },
  { name: 'Sidebar', component: Sidebar, category: 'Navigation', tags: ['sidebar', 'menu', 'panel'] },
  { name: 'Menu', component: Menu, category: 'Navigation', tags: ['menu', 'hamburger', 'drawer'] },
  { name: 'Home', component: Home, category: 'Navigation', tags: ['home', 'main', 'house'] },
  { name: 'Folder', component: Folder, category: 'Navigation', tags: ['folder', 'directory', 'files'] },
  { name: 'FolderOpen', component: FolderOpen, category: 'Navigation', tags: ['folder', 'open', 'directory'] },
  { name: 'FolderTree', component: FolderTree, category: 'Navigation', tags: ['folder', 'tree', 'hierarchy'] },
  { name: 'Compass', component: Compass, category: 'Navigation', tags: ['compass', 'explore', 'discover'] },
  { name: 'Navigation', component: Navigation, category: 'Navigation', tags: ['navigation', 'pointer', 'arrow'] },
  { name: 'Columns3', component: Columns3, category: 'Navigation', tags: ['columns', 'layout', 'kanban'] },
  { name: 'Maximize2', component: Maximize2, category: 'Navigation', tags: ['fullscreen', 'expand', 'maximize'] },
  { name: 'Minimize2', component: Minimize2, category: 'Navigation', tags: ['exit', 'contract', 'minimize'] },
  { name: 'TableProperties', component: TableProperties, category: 'Navigation', tags: ['table', 'grid', 'data'] },

  // Users & Identity
  { name: 'User', component: User, category: 'Users', tags: ['user', 'profile', 'person', 'account'] },
  { name: 'Users', component: Users, category: 'Users', tags: ['users', 'team', 'members', 'people'] },
  { name: 'UserCheck', component: UserCheck, category: 'Users', tags: ['verified', 'user', 'approved'] },
  { name: 'UserPlus', component: UserPlus, category: 'Users', tags: ['invite', 'add user', 'new'] },
  { name: 'UserMinus', component: UserMinus, category: 'Users', tags: ['remove user', 'delete'] },
  { name: 'UserX', component: UserX, category: 'Users', tags: ['block', 'ban', 'remove user'] },
  { name: 'Shield', component: Shield, category: 'Users', tags: ['shield', 'security', 'protection'] },
  { name: 'ShieldCheck', component: ShieldCheck, category: 'Users', tags: ['security', 'verified', 'safe'] },
  { name: 'ShieldAlert', component: ShieldAlert, category: 'Users', tags: ['security', 'warning', 'breach'] },
  { name: 'Lock', component: Lock, category: 'Users', tags: ['lock', 'password', 'private'] },
  { name: 'Unlock', component: Unlock, category: 'Users', tags: ['unlock', 'open', 'public'] },
  { name: 'Key', component: Key, category: 'Users', tags: ['key', 'auth', 'api token'] },
  { name: 'Fingerprint', component: Fingerprint, category: 'Users', tags: ['biometric', 'security', 'identity'] },
  { name: 'BadgeCheck', component: BadgeCheck, category: 'Users', tags: ['badge', 'verified', 'official'] },

  // Actions & Controls
  { name: 'Plus', component: Plus, category: 'Actions', tags: ['add', 'create', 'new'] },
  { name: 'Minus', component: Minus, category: 'Actions', tags: ['minus', 'remove', 'subtract'] },
  { name: 'Check', component: Check, category: 'Actions', tags: ['check', 'done', 'yes', 'confirm'] },
  { name: 'X', component: X, category: 'Actions', tags: ['close', 'cancel', 'cross', 'no'] },
  { name: 'Search', component: Search, category: 'Actions', tags: ['search', 'find', 'query'] },
  { name: 'Filter', component: Filter, category: 'Actions', tags: ['filter', 'sort', 'refine'] },
  { name: 'Trash2', component: Trash2, category: 'Actions', tags: ['delete', 'remove', 'trash', 'bin'] },
  { name: 'Edit', component: Edit, category: 'Actions', tags: ['edit', 'pencil', 'modify'] },
  { name: 'Edit2', component: Edit2, category: 'Actions', tags: ['edit', 'write', 'change'] },
  { name: 'Edit3', component: Edit3, category: 'Actions', tags: ['edit', 'pen', 'update'] },
  { name: 'Copy', component: Copy, category: 'Actions', tags: ['copy', 'duplicate', 'clone'] },
  { name: 'Download', component: Download, category: 'Actions', tags: ['download', 'save', 'export'] },
  { name: 'Upload', component: Upload, category: 'Actions', tags: ['upload', 'import', 'send'] },
  { name: 'Share2', component: Share2, category: 'Actions', tags: ['share', 'social', 'network'] },
  { name: 'ExternalLink', component: ExternalLink, category: 'Actions', tags: ['link', 'external', 'open'] },
  { name: 'Eye', component: Eye, category: 'Actions', tags: ['view', 'show', 'preview'] },
  { name: 'EyeOff', component: EyeOff, category: 'Actions', tags: ['hide', 'hidden', 'invisible'] },
  { name: 'RefreshCw', component: RefreshCw, category: 'Actions', tags: ['refresh', 'reload', 'sync'] },
  { name: 'RotateCcw', component: RotateCcw, category: 'Actions', tags: ['undo', 'reset', 'replay'] },
  { name: 'MoreHorizontal', component: MoreHorizontal, category: 'Actions', tags: ['more', 'options', 'dots'] },
  { name: 'MoreVertical', component: MoreVertical, category: 'Actions', tags: ['more', 'menu', 'options'] },
  { name: 'ChevronDown', component: ChevronDown, category: 'Actions', tags: ['arrow', 'expand', 'dropdown'] },
  { name: 'ChevronUp', component: ChevronUp, category: 'Actions', tags: ['arrow', 'collapse', 'up'] },
  { name: 'ChevronRight', component: ChevronRight, category: 'Actions', tags: ['arrow', 'next', 'forward'] },
  { name: 'ChevronLeft', component: ChevronLeft, category: 'Actions', tags: ['arrow', 'previous', 'back'] },
  { name: 'ArrowRight', component: ArrowRight, category: 'Actions', tags: ['arrow', 'next', 'submit'] },

  // Finance & Commerce
  { name: 'DollarSign', component: DollarSign, category: 'Finance', tags: ['money', 'price', 'usd', 'revenue'] },
  { name: 'CreditCard', component: CreditCard, category: 'Finance', tags: ['card', 'payment', 'checkout'] },
  { name: 'Wallet', component: Wallet, category: 'Finance', tags: ['wallet', 'funds', 'balance'] },
  { name: 'Receipt', component: Receipt, category: 'Finance', tags: ['receipt', 'invoice', 'bill'] },
  { name: 'ShoppingBag', component: ShoppingBag, category: 'Finance', tags: ['store', 'ecommerce', 'bag'] },
  { name: 'ShoppingCart', component: ShoppingCart, category: 'Finance', tags: ['cart', 'order', 'shop'] },
  { name: 'Tag', component: Tag, category: 'Finance', tags: ['tag', 'discount', 'category', 'label'] },
  { name: 'TrendingUp', component: TrendingUp, category: 'Finance', tags: ['growth', 'analytics', 'rise'] },
  { name: 'TrendingDown', component: TrendingDown, category: 'Finance', tags: ['fall', 'loss', 'decrease'] },
  { name: 'Coins', component: Coins, category: 'Finance', tags: ['coins', 'currency', 'crypto'] },
  { name: 'Banknote', component: Banknote, category: 'Finance', tags: ['cash', 'money', 'paper'] },
  { name: 'Percent', component: Percent, category: 'Finance', tags: ['percentage', 'rate', 'discount'] },

  // Analytics & Infrastructure
  { name: 'BarChart', component: BarChart, category: 'Analytics', tags: ['chart', 'analytics', 'stats'] },
  { name: 'BarChart2', component: BarChart2, category: 'Analytics', tags: ['chart', 'bars', 'metrics'] },
  { name: 'BarChart3', component: BarChart3, category: 'Analytics', tags: ['chart', 'growth', 'graph'] },
  { name: 'PieChart', component: PieChart, category: 'Analytics', tags: ['pie', 'distribution', 'percentage'] },
  { name: 'LineChart', component: LineChart, category: 'Analytics', tags: ['line', 'trend', 'history'] },
  { name: 'Activity', component: Activity, category: 'Analytics', tags: ['health', 'pulse', 'realtime', 'status'] },
  { name: 'Gauge', component: Gauge, category: 'Analytics', tags: ['speed', 'limit', 'performance', 'meter'] },
  { name: 'Database', component: Database, category: 'Analytics', tags: ['sql', 'storage', 'data', 'records'] },
  { name: 'Server', component: Server, category: 'Analytics', tags: ['node', 'cloud', 'hosting', 'compute'] },
  { name: 'HardDrive', component: HardDrive, category: 'Analytics', tags: ['disk', 'storage', 'hardware'] },
  { name: 'Cpu', component: Cpu, category: 'Analytics', tags: ['processor', 'hardware', 'load'] },

  // Communication & Alerts
  { name: 'Bell', component: Bell, category: 'Communication', tags: ['notification', 'alert', 'alarm'] },
  { name: 'BellRing', component: BellRing, category: 'Communication', tags: ['active alert', 'ringing', 'notify'] },
  { name: 'Mail', component: Mail, category: 'Communication', tags: ['email', 'message', 'inbox'] },
  { name: 'MessageSquare', component: MessageSquare, category: 'Communication', tags: ['chat', 'comment', 'dialog'] },
  { name: 'Send', component: Send, category: 'Communication', tags: ['send', 'message', 'telegram'] },
  { name: 'Inbox', component: Inbox, category: 'Communication', tags: ['inbox', 'archive', 'box'] },
  { name: 'AlertCircle', component: AlertCircle, category: 'Communication', tags: ['error', 'danger', 'problem'] },
  { name: 'AlertTriangle', component: AlertTriangle, category: 'Communication', tags: ['warning', 'caution', 'alert'] },
  { name: 'Info', component: Info, category: 'Communication', tags: ['info', 'help', 'notice'] },
  { name: 'CheckCircle2', component: CheckCircle2, category: 'Communication', tags: ['success', 'complete', 'approved'] },
  { name: 'HelpCircle', component: HelpCircle, category: 'Communication', tags: ['help', 'faq', 'support', 'question'] },

  // Media & System
  { name: 'Image', component: Image, category: 'Media & Devices', tags: ['photo', 'picture', 'gallery'] },
  { name: 'Camera', component: Camera, category: 'Media & Devices', tags: ['camera', 'capture', 'video'] },
  { name: 'Video', component: Video, category: 'Media & Devices', tags: ['movie', 'record', 'streaming'] },
  { name: 'FileText', component: FileText, category: 'Media & Devices', tags: ['document', 'page', 'pdf', 'txt'] },
  { name: 'File', component: File, category: 'Media & Devices', tags: ['file', 'attachment'] },
  { name: 'Files', component: Files, category: 'Media & Devices', tags: ['multiple files', 'documents'] },
  { name: 'Laptop', component: Laptop, category: 'Media & Devices', tags: ['computer', 'pc', 'device'] },
  { name: 'Smartphone', component: Smartphone, category: 'Media & Devices', tags: ['phone', 'mobile', 'device'] },
  { name: 'Monitor', component: Monitor, category: 'Media & Devices', tags: ['screen', 'display', 'desktop'] },
  { name: 'Printer', component: Printer, category: 'Media & Devices', tags: ['print', 'hardware', 'paper'] },
  { name: 'Wifi', component: Wifi, category: 'Media & Devices', tags: ['internet', 'connection', 'network'] },
  { name: 'Cloud', component: Cloud, category: 'Media & Devices', tags: ['cloud', 'storage', 'backup'] },
  { name: 'Sliders', component: Sliders, category: 'Media & Devices', tags: ['settings', 'filter', 'tune', 'control'] },
  { name: 'Calendar', component: Calendar, category: 'Media & Devices', tags: ['date', 'schedule', 'event'] },
  { name: 'Clock', component: Clock, category: 'Media & Devices', tags: ['time', 'history', 'hour'] },
  { name: 'Timer', component: Timer, category: 'Media & Devices', tags: ['stopwatch', 'countdown', 'speed'] },
  { name: 'Bookmark', component: Bookmark, category: 'Media & Devices', tags: ['favorite', 'save', 'mark'] },
  { name: 'Star', component: Star, category: 'Media & Devices', tags: ['rating', 'favorite', 'featured'] },
  { name: 'Heart', component: Heart, category: 'Media & Devices', tags: ['like', 'love', 'health'] },
  { name: 'Sparkles', component: Sparkles, category: 'Media & Devices', tags: ['ai', 'magic', 'new', 'featured'] },
  { name: 'Sun', component: Sun, category: 'Media & Devices', tags: ['light', 'day', 'brightness'] },
  { name: 'Moon', component: Moon, category: 'Media & Devices', tags: ['dark', 'night', 'theme'] },
  { name: 'Flame', component: Flame, category: 'Media & Devices', tags: ['hot', 'trend', 'fire', 'burn'] },
]

const searchQuery = ref('')
const selectedCategory = ref('All')
const iconSize = ref<'sm' | 'md' | 'lg' | 'xl'>('md')
const iconColor = ref<'brand' | 'slate' | 'emerald' | 'rose' | 'amber'>('brand')

const categories = ['All', 'Navigation', 'Users', 'Actions', 'Finance', 'Analytics', 'Communication', 'Media & Devices']

const filteredIcons = computed(() => {
  let list = iconsList

  if (selectedCategory.value !== 'All') {
    list = list.filter((i) => i.category === selectedCategory.value)
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    list = list.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        i.tags.some((t) => t.includes(q))
    )
  }

  return list
})

const sizeClass = computed(() => {
  switch (iconSize.value) {
    case 'sm':
      return 'w-4 h-4'
    case 'lg':
      return 'w-6 h-6'
    case 'xl':
      return 'w-8 h-8'
    case 'md':
    default:
      return 'w-5 h-5'
  }
})

const colorClass = computed(() => {
  switch (iconColor.value) {
    case 'slate':
      return 'text-slate-700 dark:text-slate-300'
    case 'emerald':
      return 'text-emerald-600 dark:text-emerald-400'
    case 'rose':
      return 'text-rose-600 dark:text-rose-400'
    case 'amber':
      return 'text-amber-600 dark:text-amber-400'
    case 'brand':
    default:
      return 'text-brand-600 dark:text-brand-400'
  }
})

// 1-Click copy to clipboard
const copySnippet = async (icon: IconItem) => {
  const code = `<${icon.name} class="${sizeClass.value}" />`
  if (import.meta.client && navigator?.clipboard) {
    try {
      await navigator.clipboard.writeText(code)
      toast.success(`Copied "${code}" to clipboard!`, icon.name)
    } catch {
      toast.info(`Import as: import { ${icon.name} } from 'lucide-vue-next'`)
    }
  } else {
    toast.info(`Import as: import { ${icon.name} } from 'lucide-vue-next'`)
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 text-xs font-semibold mb-2">
          <Sparkles class="w-3.5 h-3.5" />
          <span>Lucide Icons Directory</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <Sparkles class="w-7 h-7 text-brand-600 dark:text-brand-400" />
          Lucide Icons Browser
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Pilihan ikon Lucide modern yang sering dipakai pada dashboard admin. Klik pada kartu ikon mana saja untuk menyalin kode komponen <code class="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-brand-600 dark:text-brand-400">&lt;IconName /&gt;</code> ke clipboard!
        </p>
      </div>
    </div>

    <!-- Usage Guide Card -->
    <UiCard
      title="Cara Menggunakan Ikon Lucide di Proyek Anda"
      subtitle="Cukup import ikon dari 'lucide-vue-next' ke komponen Vue apa saja"
    >
      <div class="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
        <span class="text-slate-400">// Di dalam &lt;script setup lang="ts"&gt;</span><br />
        <span class="text-indigo-400">import</span> { <span class="text-amber-300">LayoutDashboard</span>, <span class="text-amber-300">Users</span>, <span class="text-amber-300">Settings</span> } <span class="text-indigo-400">from</span> <span class="text-emerald-400">'lucide-vue-next'</span><br /><br />
        <span class="text-slate-400">&lt;!-- Di dalam &lt;template&gt; --&gt;</span><br />
        &lt;<span class="text-brand-400">LayoutDashboard</span> <span class="text-slate-300">class</span>=<span class="text-emerald-400">"w-5 h-5 text-brand-600"</span> /&gt;
      </div>
    </UiCard>

    <!-- Filter & Customization Toolbar -->
    <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-4">
      <!-- Search & Controls row -->
      <div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <!-- Search Input -->
        <div class="w-full md:w-80">
          <UiInput
            v-model="searchQuery"
            placeholder="Cari ikon (cth: user, chart, file, lock)..."
          >
            <template #prefix>
              <Search class="w-4 h-4" />
            </template>
          </UiInput>
        </div>

        <!-- Size & Color Customizer -->
        <div class="flex flex-wrap items-center gap-4 text-xs">
          <!-- Size Selector -->
          <div class="flex items-center gap-1.5">
            <span class="text-slate-400 font-medium">Ukuran:</span>
            <div class="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <button
                v-for="s in (['sm', 'md', 'lg', 'xl'] as const)"
                :key="s"
                type="button"
                @click="iconSize = s"
                :class="[
                  'px-2 py-0.5 rounded-lg text-[11px] font-semibold transition-colors uppercase',
                  iconSize === s ? 'bg-white dark:bg-slate-900 text-brand-600 shadow-soft-sm' : 'hover:text-slate-900 dark:hover:text-slate-100',
                ]"
              >
                {{ s }}
              </button>
            </div>
          </div>

          <!-- Color Selector -->
          <div class="flex items-center gap-1.5">
            <span class="text-slate-400 font-medium">Warna:</span>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="iconColor = 'brand'"
                :class="['w-5 h-5 rounded-full bg-brand-600 ring-2 transition-transform', iconColor === 'brand' ? 'ring-brand-500 scale-110' : 'ring-transparent opacity-70']"
                title="Brand Indigo"
              />
              <button
                type="button"
                @click="iconColor = 'slate'"
                :class="['w-5 h-5 rounded-full bg-slate-700 ring-2 transition-transform', iconColor === 'slate' ? 'ring-slate-500 scale-110' : 'ring-transparent opacity-70']"
                title="Slate Neutral"
              />
              <button
                type="button"
                @click="iconColor = 'emerald'"
                :class="['w-5 h-5 rounded-full bg-emerald-500 ring-2 transition-transform', iconColor === 'emerald' ? 'ring-emerald-400 scale-110' : 'ring-transparent opacity-70']"
                title="Emerald Success"
              />
              <button
                type="button"
                @click="iconColor = 'amber'"
                :class="['w-5 h-5 rounded-full bg-amber-500 ring-2 transition-transform', iconColor === 'amber' ? 'ring-amber-400 scale-110' : 'ring-transparent opacity-70']"
                title="Amber Warning"
              />
              <button
                type="button"
                @click="iconColor = 'rose'"
                :class="['w-5 h-5 rounded-full bg-rose-500 ring-2 transition-transform', iconColor === 'rose' ? 'ring-rose-400 scale-110' : 'ring-transparent opacity-70']"
                title="Rose Danger"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Category Filter Pills -->
      <div class="flex items-center gap-1.5 overflow-x-auto pb-1">
        <button
          v-for="cat in categories"
          :key="cat"
          type="button"
          @click="selectedCategory = cat"
          :class="[
            'px-3 py-1 rounded-xl text-xs font-medium transition-all whitespace-nowrap',
            selectedCategory === cat
              ? 'bg-brand-600 text-white shadow-soft-sm font-semibold'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700',
          ]"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Icons Results Count -->
    <div class="flex items-center justify-between text-xs text-slate-400 px-1">
      <span>Menampilkan <strong class="text-slate-700 dark:text-slate-200">{{ filteredIcons.length }}</strong> ikon Lucide</span>
      <span>Klik kartu ikon untuk copy kode</span>
    </div>

    <!-- Icons Grid -->
    <div v-if="filteredIcons.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
      <div
        v-for="icon in filteredIcons"
        :key="icon.name"
        @click="copySnippet(icon)"
        class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 flex flex-col items-center justify-center text-center shadow-soft hover:shadow-soft-md hover:border-brand-500 dark:hover:border-brand-500 hover:-translate-y-1 transition-all duration-150 cursor-pointer group select-none relative"
        :title="`Klik untuk copy <${icon.name} />`"
      >
        <div class="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
          <component :is="icon.component" :class="[sizeClass, colorClass, 'transition-colors']" />
        </div>

        <p class="font-mono text-[11px] font-semibold text-slate-800 dark:text-slate-200 truncate w-full group-hover:text-brand-600 dark:group-hover:text-brand-400">
          {{ icon.name }}
        </p>

        <span class="text-[9px] uppercase tracking-wider text-slate-400 mt-0.5 block truncate w-full">
          {{ icon.category }}
        </span>

        <!-- Hover copy indicator badge -->
        <div class="absolute inset-x-2 -bottom-2 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
          <span class="bg-brand-600 text-white text-[10px] px-2 py-0.5 rounded-full shadow-soft-sm font-medium">
            Copy
          </span>
        </div>
      </div>
    </div>

    <!-- Empty search state -->
    <CommonEmptyState
      v-else
      title="Ikon tidak ditemukan"
      :description="`Tidak ada ikon yang cocok dengan kata kunci '${searchQuery}' pada kategori '${selectedCategory}'.`"
      action-label="Reset Filter"
      @action="searchQuery = ''; selectedCategory = 'All'"
    />
  </div>
</template>
