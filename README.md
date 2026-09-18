# Vanguard Admin — Nuxt 4 + Vue 3 Base Template

Base template admin modern, non-kaku (*fluid & contemporary*), modular, dan siap pakai (*production-ready*) untuk berbagai project SaaS atau Dashboard Internal. Dibangun mematuhi spesifikasi penuh pada `.agents/frontend-build/SKILL.md`.

---

## 🚀 Fitur Utama

- **Framework**: [Nuxt 4](https://nuxt.com/) (`^4.5.x`) + [Vue 3](https://vuejs.org/) (Composition API, `<script setup lang="ts">`).
- **Design System Modern**:
  - Tampilan segar, *clean*, dan tidak kaku dengan font **Plus Jakarta Sans**, radius lembut (`rounded-2xl`), *glassmorphism*, dan bayangan bertingkat (*layered soft shadows*).
  - **Dark / Light Mode** bawaan dengan transisi mulus dan persistensi penyimpanan (*local storage*).
  - **Collapsible Sidebar** yang responsif (desktop icon-only collapse + mobile drawer).
  - **Interactive Charts** (SVG Area Chart interaktif dengan *hover points & tooltip* tanpa ketergantungan library berat).
- **Arsitektur Standar Enterprise**:
  - **Services Layer**: API request tersentralisasi (`api.service.ts`, `user.service.ts`, `auth.service.ts`, `dashboard.service.ts`).
  - **State Management**: [Pinia](https://pinia.vuejs.org/) (`auth.store.ts`, `theme.store.ts`).
  - **TypeScript Strict**: Seluruh *domain models*, query, DTO, dan response bertipe eksplisit di `app/types/`.
  - **UI Component Library**: Button, Input, Select, Checkbox, Toggle Switch, Badge, Card, Modal, DataTable, Pagination, dan Toast Notifications.
  - **State Handling Lengkap**: Loading, Empty, dan Error State terisolasi di `app/components/common/`.
- **Halaman Lengkap Siap Pakai**:
  - **Dashboard**: KPI stat cards dengan trend %, interactive revenue growth chart, system capacity gauges, recent activities feed.
  - **User Directory CRUD**: Pencarian realtime (*debounced*), filter role & status, sorting, pagination, add/edit modal dengan validasi, detail modal, delete dialog confirmation, serta quick status toggle.
  - **Table Templates Showcase (`/tables`)**: 4 variasi template tabel siap pakai (Batch Selection, Expandable Master-Detail, Compact Financial Ledger, Card Grid vs Table Switcher).
  - **UI Component Gallery**: Halaman showcase interaktif (`/components-gallery`) untuk menguji dan menyalin komponen ke fitur baru.
  - **Settings**: Pengaturan profil, appearance/theme, security & 2FA, serta notifikasi.
  - **Auth / Login**: Halaman login modern dengan tombol *One-Click Demo Credentials Autofill*.

---

## 📂 Struktur Folder Proyek (Nuxt 4 Standard)

```text
app/
├── assets/
│   └── css/
│       └── main.css           # Tailwind base, utilities & glassmorphism
├── components/
│   ├── ui/                    # Reusable UI primitives
│   │   ├── Button.vue         # Variants: primary, secondary, outline, danger, ghost, loading
│   │   ├── Input.vue          # Prefix/suffix icons, password toggle, error states
│   │   ├── Select.vue         # Styled dropdown select
│   │   ├── Badge.vue          # Status pills & pulsing dots
│   │   ├── Card.vue           # Glass/solid cards with slots
│   │   ├── Modal.vue          # Accessible dialog with transitions & backdrop blur
│   │   ├── Toggle.vue         # Switch toggle
│   │   ├── Checkbox.vue       # Accessible checkbox
│   │   ├── DataTable.vue      # Flexible table with skeleton rows & custom cell slots
│   │   ├── Pagination.vue     # Page navigation & records count
│   │   └── ToastContainer.vue # Floating animated toasts
│   ├── common/                # Standard state components
│   │   ├── LoadingState.vue
│   │   ├── EmptyState.vue
│   │   └── ErrorState.vue
│   ├── layout/                # Shell components
│   │   ├── AppHeader.vue      # Topbar with breadcrumb, search, notifications, theme switch
│   │   ├── AppSidebar.vue     # Responsive collapsible sidebar
│   │   ├── AppBreadcrumb.vue  # Route-aware breadcrumb navigation
│   │   └── UserDropdown.vue   # User menu & quick actions
│   └── feature/               # Domain-specific components
│       ├── Dashboard/         # StatCard, RevenueChart, RecentActivity, QuickStats
│       └── Users/             # UserTable, UserFilter, UserModal, UserDetailModal
├── composables/               # Stateful reusable logic
│   ├── useToast.ts            # Global reactive notifications (success, error, info, warn)
│   ├── useModal.ts            # Modal state controller
│   ├── usePagination.ts       # Pagination computations
│   └── useUsers.ts            # User CRUD, search debounce, and filter management
├── layouts/
│   ├── default.vue            # Main admin dashboard layout with sidebar & header
│   └── auth.vue               # Centered / split layout with ambient gradients
├── middleware/
│   ├── auth.ts                # Route protection middleware
│   └── guest.ts               # Guest-only route middleware
├── pages/
│   ├── index.vue              # Redirects to /dashboard
│   ├── dashboard.vue          # Analytics dashboard
│   ├── users/
│   │   └── index.vue          # User Management CRUD
│   ├── components-gallery.vue # UI components catalog
│   ├── settings/
│   │   └── index.vue          # Settings tabs (Profile, Theme, Security)
│   └── auth/
│       └── login.vue          # Sign-in page with 1-click demo fill
├── services/                  # Centralized HTTP & API communication
│   ├── api.service.ts         # $fetch wrapper with interceptors & runtimeConfig
│   ├── auth.service.ts        # Login, logout, profile
│   ├── user.service.ts        # Users CRUD (Mock/Real toggle)
│   └── dashboard.service.ts   # Metrics, charts, activities
├── stores/                    # Pinia stores
│   ├── auth.store.ts          # Session, user, role checks
│   └── theme.store.ts         # Dark mode & sidebar collapse
├── types/                     # Shared TypeScript interfaces
│   ├── common.ts              # ApiResponse, PaginationMeta, QueryParams
│   ├── auth.ts                # AuthUser, LoginCredentials, UserRole
│   ├── user.ts                # UserItem, UserStatus, CreateUserDto, UpdateUserDto
│   ├── dashboard.ts           # MetricStat, RevenuePoint, ActivityItem
│   └── ui.ts                  # Toast, Breadcrumb, TableColumn
└── utils/                     # Formatting & helper utilities
    ├── formatters.ts          # Currency, dates, compact numbers, debounce
    └── helpers.ts             # ID generator, initials, sleep
```

---

## 🛠️ Menjalankan Project

### 1. Install Dependencies
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
```
Buka browser di `http://localhost:3000`.

### 3. Build untuk Production
```bash
npm run build
```

---

## 🔌 Menghubungkan ke Backend API Asli

Template ini dirancang langsung siap dihubungkan ke backend apapun (Go, Laravel, Node.js, Django, FastAPI, NestJS, dll).

Buat file `.env` di root project:
```env
NUXT_PUBLIC_API_BASE_URL=https://api.domainanda.com/v1
```

Secara otomatis, `app/services/api.service.ts` akan mengarahkan semua panggilan request ke URL tersebut dengan header Bearer Token yang tersimpan di `useAuthStore`.
