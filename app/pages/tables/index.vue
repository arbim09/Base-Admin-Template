<script setup lang="ts">
import {
  Table as TableIcon,
  Users,
  CheckSquare,
  ChevronsUpDown,
  FileSpreadsheet,
  LayoutGrid,
  Info,
} from 'lucide-vue-next'

definePageMeta({
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Table Templates — Vanguard Admin Base',
  description: 'Collection of different modern table templates and patterns',
})

const activeTab = ref<'crud' | 'selection' | 'expandable' | 'financial' | 'grid-switcher'>('crud')
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 text-xs font-semibold mb-2">
          <TableIcon class="w-3.5 h-3.5" />
          <span>Table Design Patterns</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Template Tabel Admin
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Pilihan variasi template tabel siap pakai untuk kebutuhan berbeda: dari CRUD standar lengkap dengan modal & filter, multi-selection batch action, master-detail expandable, ledger compact finansial, hingga toggle card-grid vs tabel.
        </p>
      </div>
    </div>

    <!-- Navigation Tabs for Table Types -->
    <div class="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200/80 dark:border-slate-800">
      <!-- Tab 1: Standard CRUD -->
      <button
        type="button"
        @click="activeTab = 'crud'"
        :class="[
          'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap',
          activeTab === 'crud'
            ? 'bg-brand-600 text-white shadow-soft-sm'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
        ]"
      >
        <Users class="w-4 h-4" />
        1. Standard CRUD Table
      </button>

      <!-- Tab 2: Batch Selection -->
      <button
        type="button"
        @click="activeTab = 'selection'"
        :class="[
          'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap',
          activeTab === 'selection'
            ? 'bg-brand-600 text-white shadow-soft-sm'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
        ]"
      >
        <CheckSquare class="w-4 h-4" />
        2. Batch Selection & Bulk Actions
      </button>

      <!-- Tab 3: Expandable -->
      <button
        type="button"
        @click="activeTab = 'expandable'"
        :class="[
          'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap',
          activeTab === 'expandable'
            ? 'bg-brand-600 text-white shadow-soft-sm'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
        ]"
      >
        <ChevronsUpDown class="w-4 h-4" />
        3. Expandable Master-Detail
      </button>

      <!-- Tab 4: Financial Ledger -->
      <button
        type="button"
        @click="activeTab = 'financial'"
        :class="[
          'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap',
          activeTab === 'financial'
            ? 'bg-brand-600 text-white shadow-soft-sm'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
        ]"
      >
        <FileSpreadsheet class="w-4 h-4" />
        4. Compact Financial Ledger
      </button>

      <!-- Tab 5: Grid Switcher -->
      <button
        type="button"
        @click="activeTab = 'grid-switcher'"
        :class="[
          'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap',
          activeTab === 'grid-switcher'
            ? 'bg-brand-600 text-white shadow-soft-sm'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
        ]"
      >
        <LayoutGrid class="w-4 h-4" />
        5. Card Grid vs Table Switcher
      </button>
    </div>

    <!-- Tab 1: Standard CRUD Table -->
    <div v-if="activeTab === 'crud'" class="space-y-4">
      <div class="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex items-start gap-3">
        <Info class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <div class="text-xs text-blue-950 dark:text-blue-200 leading-relaxed">
          <p class="font-bold">Template Tabel Pertama (Standard CRUD)</p>
          <p class="text-blue-800/90 dark:text-blue-300 mt-0.5">
            Ini adalah template tabel standar lengkap: pencarian debounced, dropdown filter peran & status, sorting, pagination, toggle status cepat, dialog modal Add/Edit dengan validasi, modal View Profile, dan konfirmasi hapus data. Halaman khususnya juga dapat diakses langsung via menu samping <NuxtLink to="/users" class="underline font-semibold">User Directory (/users)</NuxtLink>.
          </p>
        </div>
      </div>

      <FeatureTablesStandardCrudTable />
    </div>

    <!-- Tab 2: Batch Selection & Bulk Actions Table -->
    <div v-else-if="activeTab === 'selection'" class="space-y-4">
      <div class="p-4 rounded-2xl bg-brand-50/60 dark:bg-brand-950/40 border border-brand-100 dark:border-brand-900/50 flex items-start gap-3">
        <Info class="w-5 h-5 text-brand-600 dark:text-brand-400 flex-shrink-0 mt-0.5" />
        <div class="text-xs text-brand-950 dark:text-brand-200 leading-relaxed">
          <p class="font-bold">Kapan menggunakan template ini?</p>
          <p class="text-brand-800/90 dark:text-brand-300 mt-0.5">
            Sangat ideal untuk pesanan e-commerce, manajemen invoice, atau data yang membutuhkan aksi massal (pilih beberapa baris, lalu export CSV, ubah status serentak, atau hapus bersamaan). Klik kolom untuk mengurutkan (sort).
          </p>
        </div>
      </div>

      <FeatureTablesSelectionTable />
    </div>

    <!-- Tab 3: Expandable Master-Detail Table -->
    <div v-else-if="activeTab === 'expandable'" class="space-y-4">
      <div class="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/50 flex items-start gap-3">
        <Info class="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div class="text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
          <p class="font-bold">Kapan menggunakan template ini?</p>
          <p class="text-amber-800/90 dark:text-amber-300 mt-0.5">
            Cocok untuk data hierarkis (Master-Detail) seperti project dengan sub-tugas/milestones, invoice dengan rincian item barang, atau log audit yang memiliki metadata terperinci di balik setiap baris tanpa harus membuka halaman baru.
          </p>
        </div>
      </div>

      <FeatureTablesExpandableTable />
    </div>

    <!-- Tab 4: Compact Financial Ledger Table -->
    <div v-else-if="activeTab === 'financial'" class="space-y-4">
      <div class="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 flex items-start gap-3">
        <Info class="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
        <div class="text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed">
          <p class="font-bold">Kapan menggunakan template ini?</p>
          <p class="text-emerald-800/90 dark:text-emerald-300 mt-0.5">
            Cocok untuk laporan mutasi kas, transaksi perbankan, riwayat saldo kredit/debit, atau data analitik berskala padat. Dilengkapi tombol penyesuaian kepadatan baris (Compact On/Off) dan Zebra Striping untuk kemudahan membaca baris panjang.
          </p>
        </div>
      </div>

      <FeatureTablesFinancialLedgerTable />
    </div>

    <!-- Tab 5: Card Grid vs Table Switcher -->
    <div v-else-if="activeTab === 'grid-switcher'" class="space-y-4">
      <div class="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex items-start gap-3">
        <Info class="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
        <div class="text-xs text-indigo-950 dark:text-indigo-200 leading-relaxed">
          <p class="font-bold">Kapan menggunakan template ini?</p>
          <p class="text-indigo-800/90 dark:text-indigo-300 mt-0.5">
            Sangat disukai untuk katalog produk, server node, armada aset, atau galeri media digital. Pengguna dapat memilih antara mode Tabel ringkas atau mode Kartu Grid responsif dengan satu klik.
          </p>
        </div>
      </div>

      <FeatureTablesCardGridTableSwitcher />
    </div>
  </div>
</template>
