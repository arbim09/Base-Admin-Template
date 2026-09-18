<script setup lang="ts">
import {
  SquareDashedBottom,
  HelpCircle,
  ShieldAlert,
  FileText,
  Eye,
  Maximize2,
  Minimize2,
  Key,
  Sliders,
  PanelBottom,
  Image as ImageIcon,
  UploadCloud,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  MessageSquare,
  ListOrdered,
  Layers,
  Terminal,
  Clock,
  Search,
  Filter,
  FileSpreadsheet,
  Download,
  Calendar as CalendarIcon,
  UserCheck,
  Star,
  Sparkles,
  Wrench,
  Cookie,
  Code2,
  Copy,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  RotateCw,
  ZoomIn,
  ZoomOut,
  ExternalLink,
  Lock,
  Trash2,
  Plus,
  Send,
  Save,
} from "lucide-vue-next";

useHead({
  title: "Modal Dialogs Showcase - Kobokan Admin",
  meta: [
    {
      name: "description",
      content:
        "30 complete production-ready modal dialog, drawer, bottom sheet, and wizard patterns for Nuxt 4.",
    },
  ],
});

const toast = useToast();

// ----------------------------------------------------
// Navigation & Category Filters
// ----------------------------------------------------
type CategoryType = "all" | "core" | "layout" | "forms" | "data" | "feedback";
const activeCategory = ref<CategoryType>("all");
const searchQuery = ref("");

// Code accordion drawers
const expandedCodeIds = ref<{ [key: string]: boolean }>({});
const toggleCodeDrawer = (id: string) => {
  expandedCodeIds.value[id] = !expandedCodeIds.value[id];
};

// Copied feedback
const copiedCodeId = ref<string | null>(null);
const copyCodeSnippet = (id: string) => {
  const code = codeSnippets[id] || "";
  if (import.meta.client && navigator.clipboard) {
    navigator.clipboard.writeText(code);
    copiedCodeId.value = id;
    toast.success("Vue modal template snippet copied to clipboard!");
    setTimeout(() => {
      if (copiedCodeId.value === id) {
        copiedCodeId.value = null;
      }
    }, 2500);
  }
};

// ----------------------------------------------------
// Modals State (30 items)
// ----------------------------------------------------
const m1 = ref(false); // Basic
const m2 = ref(false); // Confirmation
const m3 = ref(false); // Delete / Danger
const m4 = ref(false); // Form
const m5 = ref(false); // Detail / View
const m6 = ref(false); // Fullscreen
const m7 = ref(false); // Center
const m8 = ref(false); // Side Drawer
const m9 = ref(false); // Bottom Sheet
const m10 = ref(false); // Image Preview Lightbox
const m11 = ref(false); // File Upload
const m12 = ref(false); // Loading
const m13 = ref(false); // Success
const m14 = ref(false); // Error
const m15 = ref(false); // Warning
const m16 = ref(false); // Prompt
const m17 = ref(false); // Multi-Step Wizard
const m18_parent = ref(false); // Nested Parent
const m18_child = ref(false); // Nested Child
const m19 = ref(false); // Command ⌘K
const m20 = ref(false); // Session / Auth
const m21 = ref(false); // Search
const m22 = ref(false); // Filter
const m23 = ref(false); // Import
const m24 = ref(false); // Export
const m25 = ref(false); // Calendar / Date Picker
const m26 = ref(false); // Select / Picker
const m27 = ref(false); // Feedback / Rating
const m28 = ref(false); // Announcement
const m29 = ref(false); // Maintenance
const m30 = ref(false); // Cookie / Privacy

// ----------------------------------------------------
// Specific Interactive Data States
// ----------------------------------------------------
// 3. Danger
const dangerKeyword = ref("");
const isDeletingCluster = ref(false);
const confirmDangerAction = () => {
  if (dangerKeyword.value !== "DELETE") return;
  isDeletingCluster.value = true;
  setTimeout(() => {
    isDeletingCluster.value = false;
    dangerKeyword.value = "";
    m3.value = false;
    toast.error(
      "PostgreSQL cluster has been permanently deleted.",
      "Cluster Terminated",
    );
  }, 1000);
};

// 4. Form
const formState = reactive({
  name: "Alex Vance",
  email: "alex.vance@company.io",
  role: "Developer",
  tier: "Enterprise",
  notify: true,
});
const isFormSaving = ref(false);
const saveFormModal = () => {
  isFormSaving.value = true;
  setTimeout(() => {
    isFormSaving.value = false;
    m4.value = false;
    toast.success(`Team member ${formState.name} saved successfully!`);
  }, 800);
};

// 10. Image Preview Lightbox
const imageZoom = ref(1);
const imageRotate = ref(0);
const zoomInImage = () => {
  if (imageZoom.value < 2.5) imageZoom.value += 0.25;
};
const zoomOutImage = () => {
  if (imageZoom.value > 0.5) imageZoom.value -= 0.25;
};
const resetImageTransform = () => {
  imageZoom.value = 1;
  imageRotate.value = 0;
};

// 11. File Upload
const uploadProgressList = ref([
  {
    name: "financial-audit-q3.xlsx",
    size: "2.4 MB",
    progress: 100,
    status: "completed",
  },
  {
    name: "user-telemetry-dump.csv",
    size: "18.7 MB",
    progress: 64,
    status: "uploading",
  },
]);

// 12. Loading Stepped Progress
const loadingProgress = ref(20);
let loadingInterval: any = null;
const triggerLoadingModal = () => {
  m12.value = true;
  loadingProgress.value = 20;
  if (loadingInterval) clearInterval(loadingInterval);
  loadingInterval = setInterval(() => {
    if (loadingProgress.value < 100) {
      loadingProgress.value += 20;
    } else {
      clearInterval(loadingInterval);
      setTimeout(() => {
        m12.value = false;
        toast.success("Production deployment completed successfully!");
      }, 500);
    }
  }, 600);
};

// 16. Prompt Modal
const promptValue = ref("Finance-Q4-Reports");
const savePromptModal = () => {
  if (!promptValue.value.trim()) return;
  m16.value = false;
  toast.success(`New directory "${promptValue.value}" created.`);
};

// 17. Multi-step Wizard
const wizardStep = ref(1);
const wizardTotalSteps = 3;
const wizardData = reactive({
  accountName: "Northwind Logistics",
  region: "us-east-1 (N. Virginia)",
  plan: "Business Pro ($49/mo)",
});
const nextWizardStep = () => {
  if (wizardStep.value < wizardTotalSteps) {
    wizardStep.value++;
  } else {
    m17.value = false;
    wizardStep.value = 1;
    toast.success(
      `Organization ${wizardData.accountName} provisioned successfully!`,
    );
  }
};

// 19. Command Palette ⌘K
const commandSearch = ref("");
const commandActions = [
  {
    id: "dash",
    label: "Go to Main Dashboard",
    category: "Navigation",
    shortcut: "G D",
  },
  {
    id: "user",
    label: "Create New User Directory",
    category: "Quick Action",
    shortcut: "⌘ U",
  },
  {
    id: "tables",
    label: "Browse Table Styles",
    category: "Components",
    shortcut: "⌘ T",
  },
  {
    id: "alerts",
    label: "View 15 Alert Types",
    category: "Components",
    shortcut: "⌘ A",
  },
  {
    id: "settings",
    label: "Open Security & System Settings",
    category: "Preferences",
    shortcut: "⌘ ,",
  },
];
const filteredCommands = computed(() => {
  if (!commandSearch.value.trim()) return commandActions;
  return commandActions.filter((cmd) =>
    cmd.label.toLowerCase().includes(commandSearch.value.toLowerCase()),
  );
});

// 20. Session / Auth Modal
const authCountdown = ref(120);
const authPassword = ref("");
let authTimer: any = null;
const openAuthModal = () => {
  authCountdown.value = 120;
  authPassword.value = "";
  m20.value = true;
  if (authTimer) clearInterval(authTimer);
  authTimer = setInterval(() => {
    if (authCountdown.value > 0) authCountdown.value--;
  }, 1000);
};
const unlockSession = () => {
  if (!authPassword.value) return;
  if (authTimer) clearInterval(authTimer);
  m20.value = false;
  toast.success("Session credentials verified. Workspace unlocked.");
};

// 22. Filter Modal
const filterStatus = reactive({
  active: true,
  pending: true,
  suspended: false,
});
const filterRole = ref("all");

// 25. Calendar Modal
const selectedDate = ref("2026-09-18");
const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);

// 26. Select / Picker Modal
const selectedMemberIds = ref<number[]>([1, 3]);
const teamMembers = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Staff Architect",
    email: "sarah.j@company.io",
  },
  {
    id: 2,
    name: "David Kim",
    role: "Security Engineer",
    email: "david.k@company.io",
  },
  {
    id: 3,
    name: "Amira Patel",
    role: "Frontend Lead",
    email: "amira.p@company.io",
  },
  {
    id: 4,
    name: "Lucas Rossi",
    role: "Product Designer",
    email: "lucas.r@company.io",
  },
];
const toggleMemberSelection = (id: number) => {
  if (selectedMemberIds.value.includes(id)) {
    selectedMemberIds.value = selectedMemberIds.value.filter((i) => i !== id);
  } else {
    selectedMemberIds.value.push(id);
  }
};

// 27. Feedback / Rating Modal
const feedbackRating = ref(5);
const feedbackSentiment = ref<"Great" | "Good" | "Okay" | "Poor">("Great");
const feedbackText = ref("");
const submitFeedback = () => {
  m27.value = false;
  toast.success("Thank you for your rating and feedback!");
};

// 30. Cookie / Privacy Modal
const cookieSettings = reactive({
  essential: true, // locked
  analytics: true,
  marketing: false,
});

// ----------------------------------------------------
// Directory of All 30 Items
// ----------------------------------------------------
const modalItems = [
  {
    id: "1",
    title: "1. Basic Modal",
    category: "core",
    desc: "Standard dialog with title, body, and action buttons.",
  },
  {
    id: "2",
    title: "2. Confirmation Modal",
    category: "core",
    desc: "Action verification dialog before committing transactions.",
  },
  {
    id: "3",
    title: "3. Delete / Danger Modal",
    category: "core",
    desc: "High-consequence destructive alert with text keyword safeguard.",
  },
  {
    id: "4",
    title: "4. Form Modal",
    category: "forms",
    desc: "Interactive form inputs with validation and submission states.",
  },
  {
    id: "5",
    title: "5. Detail / View Modal",
    category: "data",
    desc: "Rich data card presentation modal for records and entities.",
  },
  {
    id: "6",
    title: "6. Fullscreen Modal",
    category: "layout",
    desc: "Maximized view for complex workflows, canvases, and analytics.",
  },
  {
    id: "7",
    title: "7. Center Modal",
    category: "core",
    desc: "Focused center modal for sensitive outputs like API secret tokens.",
  },
  {
    id: "8",
    title: "8. Side Modal / Drawer",
    category: "layout",
    desc: "Off-canvas slide-in right drawer for deep inspections and filters.",
  },
  {
    id: "9",
    title: "9. Bottom Sheet",
    category: "layout",
    desc: "Mobile-responsive bottom sheet with draggable drag indicator.",
  },
  {
    id: "10",
    title: "10. Image / Media Preview Modal",
    category: "feedback",
    desc: "Media lightbox overlay with zoom, rotation, and file metadata.",
  },
  {
    id: "11",
    title: "11. File Upload Modal",
    category: "forms",
    desc: "Drag-and-drop file upload zone with individual progress bars.",
  },
  {
    id: "12",
    title: "12. Loading Modal",
    category: "feedback",
    desc: "Stepped operation modal displaying progression and milestones.",
  },
  {
    id: "13",
    title: "13. Success Modal",
    category: "feedback",
    desc: "Celebratory confirmation modal with receipt breakdown and checks.",
  },
  {
    id: "14",
    title: "14. Error Modal",
    category: "feedback",
    desc: "System failure modal with error code and expandable stack trace.",
  },
  {
    id: "15",
    title: "15. Warning Modal",
    category: "feedback",
    desc: "Threshold warning modal for storage capacity and billing alerts.",
  },
  {
    id: "16",
    title: "16. Prompt Modal",
    category: "core",
    desc: "Single-input modal prompt for renaming or creating folders.",
  },
  {
    id: "17",
    title: "17. Multi-Step / Wizard Modal",
    category: "forms",
    desc: "Multi-stage guided sequence with progress step indicator.",
  },
  {
    id: "18",
    title: "18. Nested Modal",
    category: "core",
    desc: "Hierarchical modal opening a secondary child dialog on top.",
  },
  {
    id: "19",
    title: "19. Command / Action Modal (⌘K)",
    category: "layout",
    desc: "Top-anchored spotlight palette with keyboard-driven commands.",
  },
  {
    id: "20",
    title: "20. Session / Authentication Modal",
    category: "feedback",
    desc: "Security re-authentication dialog preventing data loss on lock.",
  },
  {
    id: "21",
    title: "21. Search Modal",
    category: "data",
    desc: "Global indexed search dialog with recent results and category pills.",
  },
  {
    id: "22",
    title: "22. Filter Modal",
    category: "data",
    desc: "Multi-attribute facet filtering dialog with instant resets.",
  },
  {
    id: "23",
    title: "23. Import Modal",
    category: "forms",
    desc: "Data spreadsheet parser with file validation and row mapping.",
  },
  {
    id: "24",
    title: "24. Export Modal",
    category: "forms",
    desc: "Export format selector (CSV, XLSX, PDF, JSON) with column toggles.",
  },
  {
    id: "25",
    title: "25. Calendar / Date Picker Modal",
    category: "data",
    desc: "Interactive monthly date selector modal with quick presets.",
  },
  {
    id: "26",
    title: "26. Select / Picker Modal",
    category: "data",
    desc: "Multi-user assignment picker with avatars and batch checkboxes.",
  },
  {
    id: "27",
    title: "27. Feedback / Rating Modal",
    category: "feedback",
    desc: "5-star satisfaction rating modal with comments and category tags.",
  },
  {
    id: "28",
    title: "28. Announcement Modal",
    category: "feedback",
    desc: "Feature changelog popup with hero gradient and release notes.",
  },
  {
    id: "29",
    title: "29. Maintenance Modal",
    category: "feedback",
    desc: "Scheduled server downtime notice modal with live countdown clock.",
  },
  {
    id: "30",
    title: "30. Cookie / Privacy Modal",
    category: "feedback",
    desc: "GDPR consent manager with granular category preference switches.",
  },
];

const categoryCounts = computed(() => ({
  all: 30,
  core: modalItems.filter((m) => m.category === "core").length,
  layout: modalItems.filter((m) => m.category === "layout").length,
  forms: modalItems.filter((m) => m.category === "forms").length,
  data: modalItems.filter((m) => m.category === "data").length,
  feedback: modalItems.filter((m) => m.category === "feedback").length,
}));

const filteredModalItems = computed(() => {
  return modalItems.filter((item) => {
    const matchesCategory =
      activeCategory.value === "all" || item.category === activeCategory.value;
    const matchesSearch =
      searchQuery.value.trim() === "" ||
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});

const isVisible = (id: string) => {
  return filteredModalItems.value.some((item) => item.id === id);
};

// ----------------------------------------------------
// Code Snippets for Developers
// ----------------------------------------------------
const codeSnippets: Record<string, string> = {
  "code-1": `<UiModal v-model="isOpen" title="Basic Dialog" subtitle="Simple modal container">
  <p class="text-sm text-slate-600 dark:text-slate-300">Standard body content.</p>
  <template #footer>
    <UiButton variant="ghost" @click="isOpen = false">Cancel</UiButton>
    <UiButton variant="primary" @click="isOpen = false">Confirm</UiButton>
  </template>
</UiModal>`,

  "code-2": `<UiModal v-model="isOpen" size="sm" :showHeader="false">
  <div class="text-center py-3">
    <CheckCircle2 class="w-12 h-12 text-brand-600 mx-auto mb-2" />
    <h3 class="text-lg font-bold">Approve Invoice Payout?</h3>
    <p class="text-xs text-slate-500 mt-1">Release funds of $14,250.00 to vendor?</p>
  </div>
  <template #footer>
    <UiButton variant="outline" @click="isOpen = false">Cancel</UiButton>
    <UiButton variant="primary" @click="approve">Approve</UiButton>
  </template>
</UiModal>`,

  "code-3": `<UiModal v-model="isOpen" size="sm" :showHeader="false">
  <div class="text-center py-3">
    <ShieldAlert class="w-12 h-12 text-rose-600 mx-auto mb-2" />
    <h3 class="text-lg font-bold">Delete Database Cluster?</h3>
    <input v-model="keyword" placeholder="DELETE" class="mt-3 w-full px-3 py-1.5 border rounded-xl" />
  </div>
  <template #footer>
    <UiButton variant="danger" :disabled="keyword !== 'DELETE'" @click="destroy">Delete Cluster</UiButton>
  </template>
</UiModal>`,

  "code-6": `<!-- Fullscreen Modal -->
<UiModal v-model="isOpen" position="fullscreen" title="Report Studio" subtitle="Full workspace view">
  <div class="p-6 h-full">... Canvas Content ...</div>
</UiModal>`,

  "code-8": `<!-- Side Drawer (Right) -->
<UiModal v-model="isOpen" position="drawer-right" size="lg" title="Filters & Facets">
  <div class="space-y-4">... Drawer Content ...</div>
  <template #footer>
    <UiButton variant="primary" @click="isOpen = false">Apply Filters</UiButton>
  </template>
</UiModal>`,

  "code-9": `<!-- Mobile Bottom Sheet -->
<UiModal v-model="isOpen" position="bottom-sheet" size="md">
  <div class="space-y-2 py-2">... Quick Action Options ...</div>
</UiModal>`,

  "code-19": `<!-- Command Palette ⌘K -->
<UiModal v-model="isOpen" position="top" size="command" :showHeader="false">
  <div class="p-2 border-b flex items-center gap-2">
    <Search class="w-4 h-4 text-slate-400" />
    <input placeholder="Type a command or search..." class="w-full bg-transparent focus:outline-none text-sm" />
  </div>
  <div class="p-2 space-y-1">... Command Action Rows ...</div>
</UiModal>`,
};

onUnmounted(() => {
  if (loadingInterval) clearInterval(loadingInterval);
  if (authTimer) clearInterval(authTimer);
});
</script>

<template>
  <div class="space-y-6 pb-24">
    <!-- Header Section -->
    <div
      class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
    >
      <div>
        <div class="flex items-center gap-3">
          <div
            class="p-2.5 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 shadow-soft-xs"
          >
            <SquareDashedBottom class="w-6 h-6" />
          </div>
          <div>
            <h1
              class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight"
            >
              Modal & Drawer Showcase
            </h1>
            <p
              class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5"
            >
              30 production-ready modal dialogs, drawers, bottom sheets,
              fullscreens, wizards, and command palettes.
            </p>
          </div>
        </div>
      </div>

      <!-- Quick Action Buttons -->
      <div class="flex flex-wrap items-center gap-2">
        <button
          type="button"
          @click="m19 = true"
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 transition shadow-soft-xs"
        >
          <Terminal class="w-3.5 h-3.5" />
          <span>Launch Command (⌘K)</span>
          <kbd
            class="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/20 dark:bg-slate-800 dark:text-white"
            >⌘K</kbd
          >
        </button>

        <button
          type="button"
          @click="m8 = true"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
          <Sliders class="w-3.5 h-3.5 text-brand-500" />
          <span>Open Side Drawer</span>
        </button>

        <button
          type="button"
          @click="m9 = true"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
          <PanelBottom class="w-3.5 h-3.5 text-brand-500" />
          <span>Open Bottom Sheet</span>
        </button>
      </div>
    </div>

    <!-- Category Filter Bar with Badges & Live Search -->
    <div
      class="glass-card rounded-2xl p-2 sm:p-2.5 border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 shadow-soft-xs"
    >
      <div class="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
        <button
          type="button"
          @click="activeCategory = 'all'"
          :class="[
            'px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5',
            activeCategory === 'all'
              ? 'bg-brand-500 text-white shadow-soft-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
          ]"
        >
          <span>All Modals</span>
          <span
            class="px-1.5 py-0.2 rounded-full text-[10px] font-bold"
            :class="
              activeCategory === 'all'
                ? 'bg-white/25 text-white'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            "
          >
            {{ categoryCounts.all }}
          </span>
        </button>

        <button
          type="button"
          @click="activeCategory = 'core'"
          :class="[
            'px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5',
            activeCategory === 'core'
              ? 'bg-brand-500 text-white shadow-soft-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
          ]"
        >
          <span>Core & Standard</span>
          <span
            class="px-1.5 py-0.2 rounded-full text-[10px] font-bold"
            :class="
              activeCategory === 'core'
                ? 'bg-white/25 text-white'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            "
          >
            {{ categoryCounts.core }}
          </span>
        </button>

        <button
          type="button"
          @click="activeCategory = 'layout'"
          :class="[
            'px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5',
            activeCategory === 'layout'
              ? 'bg-brand-500 text-white shadow-soft-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
          ]"
        >
          <span>Layout & Drawers</span>
          <span
            class="px-1.5 py-0.2 rounded-full text-[10px] font-bold"
            :class="
              activeCategory === 'layout'
                ? 'bg-white/25 text-white'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            "
          >
            {{ categoryCounts.layout }}
          </span>
        </button>

        <button
          type="button"
          @click="activeCategory = 'forms'"
          :class="[
            'px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5',
            activeCategory === 'forms'
              ? 'bg-brand-500 text-white shadow-soft-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
          ]"
        >
          <span>Forms & Wizards</span>
          <span
            class="px-1.5 py-0.2 rounded-full text-[10px] font-bold"
            :class="
              activeCategory === 'forms'
                ? 'bg-white/25 text-white'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            "
          >
            {{ categoryCounts.forms }}
          </span>
        </button>

        <button
          type="button"
          @click="activeCategory = 'data'"
          :class="[
            'px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5',
            activeCategory === 'data'
              ? 'bg-brand-500 text-white shadow-soft-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
          ]"
        >
          <span>Data & Selectors</span>
          <span
            class="px-1.5 py-0.2 rounded-full text-[10px] font-bold"
            :class="
              activeCategory === 'data'
                ? 'bg-white/25 text-white'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            "
          >
            {{ categoryCounts.data }}
          </span>
        </button>

        <button
          type="button"
          @click="activeCategory = 'feedback'"
          :class="[
            'px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5',
            activeCategory === 'feedback'
              ? 'bg-brand-500 text-white shadow-soft-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
          ]"
        >
          <span>Status & Feedback</span>
          <span
            class="px-1.5 py-0.2 rounded-full text-[10px] font-bold"
            :class="
              activeCategory === 'feedback'
                ? 'bg-white/25 text-white'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            "
          >
            {{ categoryCounts.feedback }}
          </span>
        </button>
      </div>

      <!-- Live Search Box -->
      <div class="relative w-full md:w-64">
        <Search
          class="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Filter 30 modals..."
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

    <!-- ============================================================ -->
    <!-- 30 MODAL PATTERNS GRID (DUAL COLUMN RESPONSIVE) -->
    <!-- ============================================================ -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <!-- ========================================================== -->
      <!-- COLUMN 1: Patterns 1 - 15 -->
      <!-- ========================================================== -->
      <div class="space-y-6">
        <!-- 1. BASIC MODAL -->
        <div
          v-if="isVisible('1')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Pattern 01
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                1. Basic Modal
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('1')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('1')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '1'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Standard clean modal dialog with title, body, and action footer.
          </p>
          <div
            v-if="expandedCodeIds['1']"
            class="p-3 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800"
          >
            <pre>{{ codeSnippets["code-1"] }}</pre>
          </div>
          <div>
            <UiButton @click="m1 = true" variant="secondary" size="md">
              <SquareDashedBottom class="w-4 h-4 mr-2 text-brand-500" />
              Open Basic Modal
            </UiButton>
          </div>
          <!-- Modal 1 -->
          <UiModal
            v-model="m1"
            title="Workspace Parameters"
            subtitle="Configure shared cluster preferences"
          >
            <div
              class="space-y-3 text-sm text-slate-600 dark:text-slate-300 py-1"
            >
              <p>
                This is a standard modal dialog instance featuring rounded-3xl
                container, responsive max-width sizing, and body scroll lock.
              </p>
              <div
                class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-xs"
              >
                Press
                <kbd
                  class="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono"
                  >ESC</kbd
                >
                or click the backdrop to close.
              </div>
            </div>
            <template #footer>
              <UiButton variant="ghost" size="sm" @click="m1 = false"
                >Cancel</UiButton
              >
              <UiButton
                variant="primary"
                size="sm"
                @click="
                  m1 = false;
                  toast.success('Preferences saved!');
                "
                >Save Changes</UiButton
              >
            </template>
          </UiModal>
        </div>

        <!-- 2. CONFIRMATION MODAL -->
        <div
          v-if="isVisible('2')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
              >
                Pattern 02
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                2. Confirmation Modal
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('2')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('2')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '2'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Action verification dialog before committing transactions.
          </p>
          <div
            v-if="expandedCodeIds['2']"
            class="p-3 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800"
          >
            <pre>{{ codeSnippets["code-2"] }}</pre>
          </div>
          <div>
            <UiButton @click="m2 = true" variant="secondary" size="md">
              <HelpCircle class="w-4 h-4 mr-2 text-blue-500" />
              Open Confirmation Modal
            </UiButton>
          </div>
          <!-- Modal 2 -->
          <UiModal v-model="m2" size="sm" :showHeader="false">
            <div class="text-center py-4 px-2">
              <div
                class="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800 mx-auto flex items-center justify-center mb-4"
              >
                <CheckCircle2 class="w-6 h-6" />
              </div>
              <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100">
                Approve Invoice Payout?
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Release total payment of
                <span class="font-bold text-slate-900 dark:text-slate-100"
                  >$14,250.00</span
                >
                for Invoice #INV-9021 to ACME Corp?
              </p>
            </div>
            <template #footer>
              <div class="grid grid-cols-2 gap-3 w-full">
                <UiButton variant="outline" size="md" @click="m2 = false"
                  >Cancel</UiButton
                >
                <UiButton
                  variant="primary"
                  size="md"
                  @click="
                    m2 = false;
                    toast.success('Invoice payout #INV-9021 approved!');
                  "
                  >Confirm Approval</UiButton
                >
              </div>
            </template>
          </UiModal>
        </div>

        <!-- 3. DELETE / DANGER MODAL -->
        <div
          v-if="isVisible('3')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800"
              >
                Pattern 03
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                3. Delete / Danger Modal
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('3')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('3')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '3'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            High-consequence destructive alert with text keyword safeguard.
          </p>
          <div
            v-if="expandedCodeIds['3']"
            class="p-3 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800"
          >
            <pre>{{ codeSnippets["code-3"] }}</pre>
          </div>
          <div>
            <UiButton @click="m3 = true" variant="danger" size="md">
              <Trash2 class="w-4 h-4 mr-2" />
              Open Delete Modal
            </UiButton>
          </div>
          <!-- Modal 3 -->
          <UiModal v-model="m3" size="sm" :showHeader="false">
            <div class="text-center py-3">
              <div
                class="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 mx-auto flex items-center justify-center mb-4"
              >
                <ShieldAlert class="w-7 h-7" />
              </div>
              <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100">
                Permanently Delete Cluster?
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-2">
                All 14 associated databases, daily snapshots, and SSL
                certificates will be purged immediately.
              </p>
              <div
                class="mt-4 p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40 text-left"
              >
                <label
                  class="block text-[11px] font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 mb-1.5"
                >
                  Type
                  <code
                    class="bg-rose-200/60 dark:bg-rose-900/60 px-1 py-0.5 rounded font-mono font-bold"
                    >DELETE</code
                  >
                  to proceed:
                </label>
                <input
                  v-model="dangerKeyword"
                  type="text"
                  placeholder="DELETE"
                  class="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 dark:text-slate-100 font-mono"
                />
              </div>
            </div>
            <template #footer>
              <div class="grid grid-cols-2 gap-3 w-full">
                <UiButton variant="outline" size="md" @click="m3 = false"
                  >Cancel</UiButton
                >
                <UiButton
                  variant="danger"
                  size="md"
                  :disabled="dangerKeyword !== 'DELETE'"
                  :loading="isDeletingCluster"
                  @click="confirmDangerAction"
                >
                  Delete Cluster
                </UiButton>
              </div>
            </template>
          </UiModal>
        </div>

        <!-- 4. FORM MODAL -->
        <div
          v-if="isVisible('4')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800"
              >
                Pattern 04
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                4. Form Modal
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('4')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('4')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '4'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Interactive form inputs with validation and submission states.
          </p>
          <div>
            <UiButton @click="m4 = true" variant="primary" size="md">
              <Plus class="w-4 h-4 mr-2" />
              Open Form Modal
            </UiButton>
          </div>
          <!-- Modal 4 -->
          <UiModal
            v-model="m4"
            title="Create New Team Member"
            subtitle="Add a collaborator to your organization workspace"
          >
            <form @submit.prevent="saveFormModal" class="space-y-4 py-1">
              <div>
                <label
                  class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
                  >Full Name</label
                >
                <input
                  v-model="formState.name"
                  required
                  class="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
              <div>
                <label
                  class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
                  >Email Address</label
                >
                <input
                  v-model="formState.email"
                  type="email"
                  required
                  class="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label
                    class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
                    >Role</label
                  >
                  <select
                    v-model="formState.role"
                    class="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option>Developer</option>
                    <option>Architect</option>
                    <option>Manager</option>
                    <option>Viewer</option>
                  </select>
                </div>
                <div>
                  <label
                    class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1"
                    >Tier</label
                  >
                  <select
                    v-model="formState.tier"
                    class="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option>Enterprise</option>
                    <option>Standard</option>
                  </select>
                </div>
              </div>
              <div class="pt-1">
                <UiCheckbox
                  v-model="formState.notify"
                  label="Send onboarding invitation via email"
                />
              </div>
            </form>
            <template #footer>
              <UiButton variant="ghost" size="sm" @click="m4 = false"
                >Cancel</UiButton
              >
              <UiButton
                variant="primary"
                size="sm"
                :loading="isFormSaving"
                @click="saveFormModal"
                >Save Member</UiButton
              >
            </template>
          </UiModal>
        </div>

        <!-- 5. DETAIL / VIEW MODAL -->
        <div
          v-if="isVisible('5')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
              >
                Pattern 05
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                5. Detail / View Modal
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('5')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('5')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '5'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Rich data card presentation modal for records and entities.
          </p>
          <div>
            <UiButton @click="m5 = true" variant="secondary" size="md">
              <Eye class="w-4 h-4 mr-2 text-emerald-500" />
              Open Detail Modal
            </UiButton>
          </div>
          <!-- Modal 5 -->
          <UiModal
            v-model="m5"
            size="lg"
            title="Account Record #ACC-4029"
            subtitle="Detailed user profile and subscription metadata"
          >
            <div class="space-y-4 py-1">
              <div
                class="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=face"
                  class="w-14 h-14 rounded-2xl object-cover"
                />
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <h4
                      class="text-base font-bold text-slate-900 dark:text-slate-100 truncate"
                    >
                      Sarah Jenkins
                    </h4>
                    <UiBadge variant="success" size="sm">Active Pro</UiBadge>
                  </div>
                  <p class="text-xs text-slate-500 truncate mt-0.5">
                    sarah.jenkins@company.io • Member since Jan 2025
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div
                  class="p-3 rounded-xl border border-slate-100 dark:border-slate-800"
                >
                  <span class="text-slate-400 block text-[11px]"
                    >Monthly Spend</span
                  >
                  <span
                    class="font-bold text-slate-900 dark:text-slate-100 text-sm"
                    >$490.00</span
                  >
                </div>
                <div
                  class="p-3 rounded-xl border border-slate-100 dark:border-slate-800"
                >
                  <span class="text-slate-400 block text-[11px]"
                    >API Calls</span
                  >
                  <span
                    class="font-bold text-slate-900 dark:text-slate-100 text-sm"
                    >1.8M / 5M</span
                  >
                </div>
                <div
                  class="p-3 rounded-xl border border-slate-100 dark:border-slate-800 col-span-2 sm:col-span-1"
                >
                  <span class="text-slate-400 block text-[11px]">Region</span>
                  <span
                    class="font-bold text-slate-900 dark:text-slate-100 text-sm"
                    >ap-southeast-1</span
                  >
                </div>
              </div>
            </div>
            <template #footer>
              <UiButton variant="outline" size="sm" @click="m5 = false"
                >Close</UiButton
              >
              <UiButton
                variant="primary"
                size="sm"
                @click="
                  m5 = false;
                  toast.info('Exporting profile PDF...');
                "
                >Download Profile</UiButton
              >
            </template>
          </UiModal>
        </div>

        <!-- 6. FULLSCREEN MODAL -->
        <div
          v-if="isVisible('6')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800"
              >
                Pattern 06
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                6. Fullscreen Modal
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('6')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('6')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '6'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Maximized view for complex workflows, canvases, and analytics.
          </p>
          <div>
            <UiButton @click="m6 = true" variant="secondary" size="md">
              <Maximize2 class="w-4 h-4 mr-2 text-indigo-500" />
              Open Fullscreen Modal
            </UiButton>
          </div>
          <!-- Modal 6 -->
          <UiModal
            v-model="m6"
            position="fullscreen"
            title="Analytics Studio & Data Canvas"
            subtitle="Fullscreen multi-section dashboard view"
          >
            <div class="p-4 sm:p-8 space-y-6 max-w-7xl mx-auto w-full">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800"
                >
                  <span class="text-xs text-slate-400 font-bold uppercase"
                    >Throughput</span
                  >
                  <div
                    class="text-2xl font-black text-slate-900 dark:text-slate-100 mt-1"
                  >
                    42,910 req/s
                  </div>
                </div>
                <div
                  class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800"
                >
                  <span class="text-xs text-slate-400 font-bold uppercase"
                    >Avg Latency</span
                  >
                  <div class="text-2xl font-black text-emerald-500 mt-1">
                    18.4 ms
                  </div>
                </div>
                <div
                  class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800"
                >
                  <span class="text-xs text-slate-400 font-bold uppercase"
                    >Cache Hit Rate</span
                  >
                  <div class="text-2xl font-black text-brand-500 mt-1">
                    99.4%
                  </div>
                </div>
              </div>
              <div
                class="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3"
              >
                <h4 class="font-bold text-slate-900 dark:text-slate-100">
                  Live Telemetry Streams
                </h4>
                <p class="text-xs text-slate-500">
                  Full viewport area enables large multi-column grids, data
                  tables, and editors without horizontal scroll clipping.
                </p>
              </div>
            </div>
            <template #footer>
              <div class="flex items-center justify-between w-full">
                <span class="text-xs text-slate-400"
                  >Press ESC or click Minimize to exit fullscreen</span
                >
                <UiButton variant="primary" size="sm" @click="m6 = false"
                  >Exit Fullscreen</UiButton
                >
              </div>
            </template>
          </UiModal>
        </div>

        <!-- 7. CENTER MODAL -->
        <div
          v-if="isVisible('7')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
              >
                Pattern 07
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                7. Center Modal
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('7')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('7')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '7'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Focused center modal for sensitive outputs like API secret tokens.
          </p>
          <div>
            <UiButton @click="m7 = true" variant="secondary" size="md">
              <Key class="w-4 h-4 mr-2 text-amber-500" />
              Open Center Modal
            </UiButton>
          </div>
          <!-- Modal 7 -->
          <UiModal
            v-model="m7"
            size="md"
            title="API Secret Token Generated"
            subtitle="Save this token now. It will not be shown again."
          >
            <div class="space-y-3 py-1">
              <div
                class="p-3.5 rounded-2xl bg-slate-950 text-brand-400 font-mono text-xs flex items-center justify-between border border-slate-800"
              >
                <span class="truncate pr-2">thisisapikey</span>
                <button
                  type="button"
                  @click="toast.success('API token copied to clipboard!')"
                  class="text-slate-400 hover:text-white transition"
                >
                  <Copy class="w-4 h-4" />
                </button>
              </div>
              <p class="text-xs text-amber-600 dark:text-amber-400">
                ⚠️ Store this token in your secure environment file (.env).
                Never commit it to public git repositories.
              </p>
            </div>
            <template #footer>
              <UiButton variant="primary" size="sm" @click="m7 = false"
                >I Have Saved My Secret</UiButton
              >
            </template>
          </UiModal>
        </div>

        <!-- 8. SIDE MODAL / DRAWER -->
        <div
          v-if="isVisible('8')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800"
              >
                Pattern 08
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                8. Side Modal / Drawer
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('8')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('8')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '8'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Off-canvas slide-in right drawer for deep inspections and filters.
          </p>
          <div
            v-if="expandedCodeIds['8']"
            class="p-3 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800"
          >
            <pre>{{ codeSnippets["code-8"] }}</pre>
          </div>
          <div>
            <UiButton @click="m8 = true" variant="primary" size="md">
              <Sliders class="w-4 h-4 mr-2" />
              Open Side Drawer
            </UiButton>
          </div>
          <!-- Modal 8 -->
          <UiModal
            v-model="m8"
            position="drawer-right"
            size="lg"
            title="Advanced Filter Panel"
            subtitle="Slide-in side drawer from screen edge"
          >
            <div class="space-y-5 py-2">
              <div>
                <label
                  class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2"
                  >Transaction Status</label
                >
                <div class="space-y-2">
                  <UiCheckbox
                    v-model="filterStatus.active"
                    label="Completed & Settled"
                  />
                  <UiCheckbox
                    v-model="filterStatus.pending"
                    label="Pending Verification"
                  />
                  <UiCheckbox
                    v-model="filterStatus.suspended"
                    label="Failed / Disputed"
                  />
                </div>
              </div>
              <div class="border-t border-slate-100 dark:border-slate-800 pt-4">
                <label
                  class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2"
                  >Date Horizon</label
                >
                <select
                  class="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                >
                  <option>Last 24 Hours</option>
                  <option>Past 7 Days</option>
                  <option>Month to Date</option>
                  <option>Fiscal Year 2026</option>
                </select>
              </div>
            </div>
            <template #footer>
              <div class="flex items-center justify-between w-full">
                <UiButton variant="ghost" size="sm" @click="m8 = false"
                  >Reset All</UiButton
                >
                <UiButton
                  variant="primary"
                  size="sm"
                  @click="
                    m8 = false;
                    toast.success('Filters applied to dataset!');
                  "
                  >Apply 3 Filters</UiButton
                >
              </div>
            </template>
          </UiModal>
        </div>

        <!-- 9. BOTTOM SHEET -->
        <div
          v-if="isVisible('9')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-fuchsia-50 dark:bg-fuchsia-950 text-fuchsia-600 dark:text-fuchsia-400 border border-fuchsia-200 dark:border-fuchsia-800"
              >
                Pattern 09
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                9. Bottom Sheet
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('9')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('9')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '9'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Mobile-responsive bottom sheet with draggable drag indicator.
          </p>
          <div
            v-if="expandedCodeIds['9']"
            class="p-3 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800"
          >
            <pre>{{ codeSnippets["code-9"] }}</pre>
          </div>
          <div>
            <UiButton @click="m9 = true" variant="secondary" size="md">
              <PanelBottom class="w-4 h-4 mr-2 text-fuchsia-500" />
              Open Bottom Sheet
            </UiButton>
          </div>
          <!-- Modal 9 -->
          <UiModal
            v-model="m9"
            position="bottom-sheet"
            size="md"
            :showHeader="false"
          >
            <div class="space-y-3 py-2 px-1 text-slate-900 dark:text-slate-100">
              <h3 class="text-base font-bold text-center">Quick Actions</h3>
              <div class="space-y-1">
                <button
                  type="button"
                  @click="
                    m9 = false;
                    toast.info('Link copied!');
                  "
                  class="w-full text-left px-4 py-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold flex items-center justify-between transition"
                >
                  <span>Share Project Link</span>
                  <ExternalLink class="w-4 h-4 text-slate-400" />
                </button>
                <button
                  type="button"
                  @click="
                    m9 = false;
                    toast.success('Duplicated to drafts!');
                  "
                  class="w-full text-left px-4 py-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold flex items-center justify-between transition"
                >
                  <span>Duplicate Document</span>
                  <Copy class="w-4 h-4 text-slate-400" />
                </button>
                <button
                  type="button"
                  @click="
                    m9 = false;
                    toast.error('Moved to trash!');
                  "
                  class="w-full text-left px-4 py-3 rounded-2xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 text-sm font-semibold flex items-center justify-between transition"
                >
                  <span>Archive & Delete</span>
                  <Trash2 class="w-4 h-4 text-rose-500" />
                </button>
              </div>
              <UiButton
                variant="outline"
                size="md"
                class="w-full mt-2"
                @click="m9 = false"
                >Cancel</UiButton
              >
            </div>
          </UiModal>
        </div>

        <!-- 10. IMAGE / MEDIA PREVIEW MODAL -->
        <div
          v-if="isVisible('10')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800"
              >
                Pattern 10
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                10. Image Preview Lightbox
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('10')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('10')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '10'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Media lightbox overlay with zoom, rotation, and file metadata.
          </p>
          <div>
            <UiButton
              @click="
                m10 = true;
                resetImageTransform();
              "
              variant="secondary"
              size="md"
            >
              <ImageIcon class="w-4 h-4 mr-2 text-sky-500" />
              Open Media Lightbox
            </UiButton>
          </div>
          <!-- Modal 10 -->
          <UiModal
            v-model="m10"
            size="xl"
            title="Media Preview: architecture-diagram.jpg"
            subtitle="Resolution: 2560x1440 • 3.2 MB WebP"
          >
            <div class="space-y-3">
              <div
                class="relative bg-slate-950 rounded-2xl overflow-hidden min-h-[300px] flex items-center justify-center p-4"
              >
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=700&fit=crop"
                  class="max-h-[50vh] rounded-xl object-contain transition-transform duration-200"
                  :style="{
                    transform: `scale(${imageZoom}) rotate(${imageRotate}deg)`,
                  }"
                />
              </div>
              <div class="flex items-center justify-between px-2">
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    @click="zoomInImage"
                    class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition"
                    title="Zoom In"
                  >
                    <ZoomIn class="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    @click="zoomOutImage"
                    class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition"
                    title="Zoom Out"
                  >
                    <ZoomOut class="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    @click="imageRotate += 90"
                    class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition"
                    title="Rotate"
                  >
                    <RotateCw class="w-4 h-4" />
                  </button>
                  <span class="text-xs text-slate-500 font-mono"
                    >{{ Math.round(imageZoom * 100) }}%</span
                  >
                </div>
                <UiButton
                  variant="primary"
                  size="sm"
                  @click="toast.success('Asset downloaded!')"
                  >Download Original</UiButton
                >
              </div>
            </div>
          </UiModal>
        </div>

        <!-- 11. FILE UPLOAD MODAL -->
        <div
          v-if="isVisible('11')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800"
              >
                Pattern 11
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                11. File Upload Modal
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('11')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('11')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '11'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Drag-and-drop file upload zone with individual progress bars.
          </p>
          <div>
            <UiButton @click="m11 = true" variant="primary" size="md">
              <UploadCloud class="w-4 h-4 mr-2" />
              Open File Upload Modal
            </UiButton>
          </div>
          <!-- Modal 11 -->
          <UiModal
            v-model="m11"
            title="Upload Documents & Artifacts"
            subtitle="Supported: CSV, XLSX, PDF, PNG (Max 50MB)"
          >
            <div class="space-y-4 py-1">
              <div
                class="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:bg-slate-50 dark:hover:bg-slate-800/40 transition cursor-pointer"
              >
                <UploadCloud class="w-8 h-8 mx-auto text-brand-500 mb-2" />
                <p class="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Drag & drop files here or click to browse
                </p>
                <p class="text-xs text-slate-400 mt-1">
                  Files are encrypted during transit (AES-256)
                </p>
              </div>
              <div class="space-y-2">
                <div
                  v-for="file in uploadProgressList"
                  :key="file.name"
                  class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs flex items-center justify-between"
                >
                  <div class="min-w-0 pr-3">
                    <span
                      class="font-bold text-slate-800 dark:text-slate-200 block truncate"
                      >{{ file.name }}</span
                    >
                    <span class="text-slate-400 text-[11px]"
                      >{{ file.size }} • {{ file.progress }}%</span
                    >
                  </div>
                  <CheckCircle2
                    v-if="file.progress === 100"
                    class="w-4 h-4 text-emerald-500 flex-shrink-0"
                  />
                  <RefreshCw
                    v-else
                    class="w-4 h-4 text-brand-500 animate-spin flex-shrink-0"
                  />
                </div>
              </div>
            </div>
            <template #footer>
              <UiButton variant="ghost" size="sm" @click="m11 = false"
                >Cancel</UiButton
              >
              <UiButton
                variant="primary"
                size="sm"
                @click="
                  m11 = false;
                  toast.success('2 files uploaded successfully!');
                "
                >Complete Upload</UiButton
              >
            </template>
          </UiModal>
        </div>

        <!-- 12. LOADING MODAL -->
        <div
          v-if="isVisible('12')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800"
              >
                Pattern 12
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                12. Loading Modal
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('12')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('12')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '12'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Stepped operation modal displaying progression and milestones.
          </p>
          <div>
            <UiButton
              @click="triggerLoadingModal"
              variant="secondary"
              size="md"
            >
              <RefreshCw class="w-4 h-4 mr-2 text-brand-500" />
              Open Loading Modal
            </UiButton>
          </div>
          <!-- Modal 12 -->
          <UiModal
            v-model="m12"
            size="sm"
            :showHeader="false"
            :showCloseButton="false"
            :closeOnBackdrop="false"
            :closeOnEsc="false"
          >
            <div class="py-4 text-center space-y-4">
              <div
                class="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 mx-auto flex items-center justify-center"
              >
                <RefreshCw class="w-6 h-6 animate-spin" />
              </div>
              <div>
                <h3
                  class="text-base font-bold text-slate-900 dark:text-slate-100"
                >
                  Replicating Database
                </h3>
                <p class="text-xs text-slate-500 mt-0.5">
                  Synchronizing snapshots across 3 availability zones...
                </p>
              </div>
              <div
                class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden"
              >
                <div
                  class="bg-brand-500 h-full transition-all duration-300"
                  :style="{ width: loadingProgress + '%' }"
                />
              </div>
              <span class="text-xs font-mono font-bold text-brand-600"
                >{{ loadingProgress }}% Finished</span
              >
            </div>
          </UiModal>
        </div>

        <!-- 13. SUCCESS MODAL -->
        <div
          v-if="isVisible('13')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
              >
                Pattern 13
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                13. Success Modal
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('13')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('13')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '13'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Celebratory confirmation modal with receipt breakdown and checks.
          </p>
          <div>
            <UiButton @click="m13 = true" variant="secondary" size="md">
              <Sparkles class="w-4 h-4 mr-2 text-emerald-500" />
              Open Success Modal
            </UiButton>
          </div>
          <!-- Modal 13 -->
          <UiModal v-model="m13" size="sm" :showHeader="false">
            <div class="text-center py-4 px-2 space-y-3">
              <div
                class="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center"
              >
                <CheckCircle2 class="w-8 h-8" />
              </div>
              <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100">
                Payment Processed!
              </h3>
              <p class="text-xs text-slate-500">
                Order #ORD-88219 settled successfully. Receipt delivered to
                billing email.
              </p>
              <div
                class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-left space-y-1 font-mono"
              >
                <div class="flex justify-between">
                  <span>Amount:</span><strong>$249.00</strong>
                </div>
                <div class="flex justify-between">
                  <span>Method:</span><span>Visa ending 4092</span>
                </div>
              </div>
              <UiButton
                variant="primary"
                size="md"
                class="w-full"
                @click="m13 = false"
                >Back to Overview</UiButton
              >
            </div>
          </UiModal>
        </div>

        <!-- 14. ERROR MODAL -->
        <div
          v-if="isVisible('14')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800"
              >
                Pattern 14
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                14. Error Modal
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('14')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('14')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '14'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            System failure modal with error code and expandable stack trace.
          </p>
          <div>
            <UiButton @click="m14 = true" variant="secondary" size="md">
              <AlertCircle class="w-4 h-4 mr-2 text-rose-500" />
              Open Error Modal
            </UiButton>
          </div>
          <!-- Modal 14 -->
          <UiModal v-model="m14" size="md" :showHeader="false">
            <div class="py-3 space-y-3">
              <div class="flex items-start gap-3.5">
                <div
                  class="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950 text-rose-600 border border-rose-200 dark:border-rose-800 flex-shrink-0"
                >
                  <AlertCircle class="w-6 h-6" />
                </div>
                <div>
                  <h3
                    class="text-base font-bold text-slate-900 dark:text-slate-100"
                  >
                    Connection Failed (HTTP 504)
                  </h3>
                  <p class="text-xs text-slate-500 mt-1">
                    The upstream cluster gateway timed out while authenticating
                    token.
                  </p>
                </div>
              </div>
              <div
                class="p-3 rounded-xl bg-slate-950 text-slate-300 font-mono text-[11px] overflow-x-auto"
              >
                <code
                  >ERR_GATEWAY_TIMEOUT: host upstream-api-west.internal:5432
                  unreachable after 15000ms</code
                >
              </div>
            </div>
            <template #footer>
              <UiButton variant="outline" size="sm" @click="m14 = false"
                >Dismiss</UiButton
              >
              <UiButton
                variant="danger"
                size="sm"
                @click="
                  m14 = false;
                  toast.info('Retrying handshake...');
                "
                >Retry Connection</UiButton
              >
            </template>
          </UiModal>
        </div>

        <!-- 15. WARNING MODAL -->
        <div
          v-if="isVisible('15')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
              >
                Pattern 15
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                15. Warning Modal
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('15')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('15')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '15'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Threshold warning modal for storage capacity and billing alerts.
          </p>
          <div>
            <UiButton @click="m15 = true" variant="secondary" size="md">
              <AlertTriangle class="w-4 h-4 mr-2 text-amber-500" />
              Open Warning Modal
            </UiButton>
          </div>
          <!-- Modal 15 -->
          <UiModal v-model="m15" size="sm" :showHeader="false">
            <div class="text-center py-4 space-y-3">
              <div
                class="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-500 mx-auto flex items-center justify-center"
              >
                <AlertTriangle class="w-6 h-6" />
              </div>
              <h3
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                Storage Limit Reached (92%)
              </h3>
              <p class="text-xs text-slate-500">
                You have used 46.2 GB of your 50.0 GB quota. Further uploads
                will be suspended.
              </p>
              <div
                class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden"
              >
                <div class="bg-amber-500 h-full w-[92%]" />
              </div>
            </div>
            <template #footer>
              <UiButton variant="ghost" size="sm" @click="m15 = false"
                >Remind Later</UiButton
              >
              <UiButton
                variant="warning"
                size="sm"
                @click="
                  m15 = false;
                  toast.info('Opening billing upgrade...');
                "
                >Upgrade Quota</UiButton
              >
            </template>
          </UiModal>
        </div>
      </div>

      <!-- ========================================================== -->
      <!-- COLUMN 2: Patterns 16 - 30 -->
      <!-- ========================================================== -->
      <div class="space-y-6">
        <!-- 16. PROMPT MODAL -->
        <div
          v-if="isVisible('16')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Pattern 16
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                16. Prompt Modal
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('16')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('16')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '16'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Single-input modal prompt for renaming or creating folders.
          </p>
          <div>
            <UiButton @click="m16 = true" variant="secondary" size="md">
              <MessageSquare class="w-4 h-4 mr-2 text-brand-500" />
              Open Prompt Modal
            </UiButton>
          </div>
          <!-- Modal 16 -->
          <UiModal
            v-model="m16"
            size="sm"
            title="New Folder Name"
            subtitle="Enter alphanumeric folder label"
          >
            <div class="py-1">
              <input
                v-model="promptValue"
                class="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
            <template #footer>
              <UiButton variant="ghost" size="sm" @click="m16 = false"
                >Cancel</UiButton
              >
              <UiButton variant="primary" size="sm" @click="savePromptModal"
                >Create Directory</UiButton
              >
            </template>
          </UiModal>
        </div>

        <!-- 17. MULTI-STEP / WIZARD MODAL -->
        <div
          v-if="isVisible('17')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800"
              >
                Pattern 17
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                17. Multi-Step / Wizard Modal
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('17')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('17')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '17'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Multi-stage guided sequence with progress step indicator.
          </p>
          <div>
            <UiButton
              @click="
                m17 = true;
                wizardStep = 1;
              "
              variant="primary"
              size="md"
            >
              <ListOrdered class="w-4 h-4 mr-2" />
              Open Wizard Modal
            </UiButton>
          </div>
          <!-- Modal 17 -->
          <UiModal
            v-model="m17"
            size="md"
            :title="`Provision Organization (Step ${wizardStep} of 3)`"
            subtitle="Guided tenant configuration"
          >
            <div class="space-y-4 py-1">
              <!-- Stepper dots -->
              <div class="flex items-center justify-between px-6 pb-2">
                <div
                  v-for="step in 3"
                  :key="step"
                  class="flex items-center gap-2"
                >
                  <div
                    class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    :class="
                      wizardStep >= step
                        ? 'bg-brand-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                    "
                  >
                    {{ step }}
                  </div>
                  <span
                    class="text-xs font-medium"
                    :class="
                      wizardStep >= step
                        ? 'text-slate-800 dark:text-slate-200'
                        : 'text-slate-400'
                    "
                    >Step {{ step }}</span
                  >
                </div>
              </div>

              <!-- Step 1 -->
              <div v-if="wizardStep === 1" class="space-y-3">
                <label
                  class="block text-xs font-bold text-slate-700 dark:text-slate-300"
                  >Account / Organization Name</label
                >
                <input
                  v-model="wizardData.accountName"
                  class="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                />
              </div>
              <!-- Step 2 -->
              <div v-else-if="wizardStep === 2" class="space-y-3">
                <label
                  class="block text-xs font-bold text-slate-700 dark:text-slate-300"
                  >Primary AWS Deployment Region</label
                >
                <select
                  v-model="wizardData.region"
                  class="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                >
                  <option>us-east-1 (N. Virginia)</option>
                  <option>eu-central-1 (Frankfurt)</option>
                  <option>ap-southeast-1 (Singapore)</option>
                </select>
              </div>
              <!-- Step 3 -->
              <div
                v-else
                class="space-y-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs"
              >
                <h4 class="font-bold">Review Organization Parameters</h4>
                <p>
                  Account: <strong>{{ wizardData.accountName }}</strong>
                </p>
                <p>
                  Region: <strong>{{ wizardData.region }}</strong>
                </p>
              </div>
            </div>
            <template #footer>
              <div class="flex items-center justify-between w-full">
                <UiButton
                  variant="outline"
                  size="sm"
                  :disabled="wizardStep === 1"
                  @click="wizardStep--"
                  >Previous</UiButton
                >
                <UiButton variant="primary" size="sm" @click="nextWizardStep">{{
                  wizardStep === 3 ? "Finish & Provision" : "Next Step"
                }}</UiButton>
              </div>
            </template>
          </UiModal>
        </div>

        <!-- 18. NESTED MODAL -->
        <div
          v-if="isVisible('18')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Pattern 18
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                18. Nested Modal
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('18')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('18')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '18'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Hierarchical modal opening a secondary child dialog on top.
          </p>
          <div>
            <UiButton @click="m18_parent = true" variant="secondary" size="md">
              <Layers class="w-4 h-4 mr-2 text-brand-500" />
              Open Nested Parent Modal
            </UiButton>
          </div>
          <!-- Modal 18 Parent -->
          <UiModal
            v-model="m18_parent"
            size="lg"
            title="Parent: Project Settings"
            subtitle="Main system configuration console"
          >
            <div class="space-y-4 py-2">
              <p class="text-sm text-slate-600 dark:text-slate-300">
                This is the primary parent modal. You can trigger a child modal
                stacked directly over it without closing the parent.
              </p>
              <div
                class="p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900/60"
              >
                <UiButton variant="primary" size="sm" @click="m18_child = true"
                  >Launch Child Modal</UiButton
                >
              </div>
            </div>
            <template #footer>
              <UiButton variant="outline" size="sm" @click="m18_parent = false"
                >Close Parent</UiButton
              >
            </template>
          </UiModal>
          <!-- Modal 18 Child -->
          <UiModal
            v-model="m18_child"
            size="sm"
            title="Child: Add Webhook Endpoint"
            subtitle="Stacked nested child dialog"
          >
            <div class="space-y-3 py-1">
              <input
                placeholder="https://api.domain.io/webhooks"
                class="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border"
              />
            </div>
            <template #footer>
              <UiButton variant="ghost" size="sm" @click="m18_child = false"
                >Cancel</UiButton
              >
              <UiButton
                variant="primary"
                size="sm"
                @click="
                  m18_child = false;
                  toast.success('Webhook created!');
                "
                >Save Webhook</UiButton
              >
            </template>
          </UiModal>
        </div>

        <!-- 19. COMMAND / ACTION MODAL (⌘K) -->
        <div
          v-if="isVisible('19')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
              >
                Pattern 19
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                19. Command / Action Modal (⌘K)
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('19')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('19')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '19'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Top-anchored spotlight palette with keyboard-driven commands.
          </p>
          <div
            v-if="expandedCodeIds['19']"
            class="p-3 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800"
          >
            <pre>{{ codeSnippets["code-19"] }}</pre>
          </div>
          <div>
            <UiButton
              @click="
                m19 = true;
                commandSearch = '';
              "
              variant="primary"
              size="md"
            >
              <Terminal class="w-4 h-4 mr-2" />
              Launch Command Palette (⌘K)
            </UiButton>
          </div>
          <!-- Modal 19 -->
          <UiModal
            v-model="m19"
            position="top"
            size="command"
            :showHeader="false"
          >
            <div
              class="p-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3"
            >
              <Search class="w-5 h-5 text-slate-400" />
              <input
                v-model="commandSearch"
                placeholder="Type a command or search action..."
                class="w-full bg-transparent focus:outline-none text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400"
                autofocus
              />
              <kbd
                class="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500"
                >ESC</kbd
              >
            </div>
            <div class="p-2 max-h-64 overflow-y-auto space-y-1">
              <button
                v-for="cmd in filteredCommands"
                :key="cmd.id"
                type="button"
                @click="
                  m19 = false;
                  toast.info(`Executed: ${cmd.label}`);
                "
                class="w-full px-3 py-2.5 rounded-xl hover:bg-brand-50 dark:hover:bg-brand-950/40 text-left flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 transition"
              >
                <span class="flex items-center gap-2">
                  <span
                    class="text-[10px] text-slate-400 font-mono uppercase"
                    >{{ cmd.category }}</span
                  >
                  <span>{{ cmd.label }}</span>
                </span>
                <kbd
                  class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-500"
                  >{{ cmd.shortcut }}</kbd
                >
              </button>
            </div>
          </UiModal>
        </div>

        <!-- 20. SESSION / AUTHENTICATION MODAL -->
        <div
          v-if="isVisible('20')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800"
              >
                Pattern 20
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                20. Session / Auth Modal
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('20')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('20')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '20'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Security re-authentication dialog preventing data loss on lock.
          </p>
          <div>
            <UiButton @click="openAuthModal" variant="secondary" size="md">
              <Lock class="w-4 h-4 mr-2 text-orange-500" />
              Open Session Auth Modal
            </UiButton>
          </div>
          <!-- Modal 20 -->
          <UiModal
            v-model="m20"
            size="sm"
            :showHeader="false"
            :showCloseButton="false"
            :closeOnBackdrop="false"
            :closeOnEsc="false"
          >
            <div class="text-center py-4 space-y-3">
              <div
                class="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950 text-orange-500 mx-auto flex items-center justify-center"
              >
                <Clock class="w-6 h-6" />
              </div>
              <h3
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                Session Lock Verification
              </h3>
              <p class="text-xs text-slate-500">
                Auto-lock in
                <strong class="text-orange-600 font-mono"
                  >{{ authCountdown }}s</strong
                >. Enter your password to resume:
              </p>
              <input
                v-model="authPassword"
                type="password"
                placeholder="••••••••••••"
                class="w-full px-3 py-2 text-center text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border"
              />
            </div>
            <template #footer>
              <UiButton variant="ghost" size="sm" @click="m20 = false"
                >Log Out</UiButton
              >
              <UiButton variant="primary" size="sm" @click="unlockSession"
                >Unlock Workspace</UiButton
              >
            </template>
          </UiModal>
        </div>

        <!-- 21. SEARCH MODAL -->
        <div
          v-if="isVisible('21')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Pattern 21
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                21. Search Modal
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('21')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('21')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '21'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Global indexed search dialog with recent results and category pills.
          </p>
          <div>
            <UiButton @click="m21 = true" variant="secondary" size="md">
              <Search class="w-4 h-4 mr-2" />
              Open Search Modal
            </UiButton>
          </div>
          <!-- Modal 21 -->
          <UiModal v-model="m21" position="top" size="lg" :showHeader="false">
            <div class="p-4 space-y-3">
              <div class="flex items-center gap-2 border-b pb-3">
                <Search class="w-5 h-5 text-slate-400" />
                <input
                  placeholder="Search records, users, invoices, or docs..."
                  class="w-full bg-transparent text-sm focus:outline-none"
                />
              </div>
              <div class="text-xs text-slate-400 font-bold uppercase">
                Recent Searches
              </div>
              <div class="space-y-1">
                <div
                  class="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs flex justify-between cursor-pointer"
                >
                  <span>annual-report-2026.pdf</span>
                  <span class="text-slate-400">Files</span>
                </div>
                <div
                  class="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs flex justify-between cursor-pointer"
                >
                  <span>Sarah Jenkins (Architect)</span>
                  <span class="text-slate-400">Users</span>
                </div>
              </div>
            </div>
          </UiModal>
        </div>

        <!-- 22. FILTER MODAL -->
        <div
          v-if="isVisible('22')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Pattern 22
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                22. Filter Modal
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('22')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('22')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '22'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Multi-attribute facet filtering dialog with instant resets.
          </p>
          <div>
            <UiButton @click="m22 = true" variant="secondary" size="md">
              <Filter class="w-4 h-4 mr-2" />
              Open Filter Modal
            </UiButton>
          </div>
          <!-- Modal 22 -->
          <UiModal
            v-model="m22"
            size="md"
            title="Filter Records"
            subtitle="Refine user and audit table parameters"
          >
            <div class="space-y-4 py-2">
              <div>
                <label class="block text-xs font-bold mb-1">Department</label>
                <select
                  class="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border"
                >
                  <option>All Departments</option>
                  <option>Engineering</option>
                  <option>Product & Design</option>
                  <option>Executive</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold mb-1"
                  >Verification Status</label
                >
                <div class="space-y-2">
                  <UiCheckbox
                    v-model="filterStatus.active"
                    label="2FA Enabled Accounts"
                  />
                  <UiCheckbox
                    v-model="filterStatus.pending"
                    label="Pending Email Confirmation"
                  />
                </div>
              </div>
            </div>
            <template #footer>
              <UiButton variant="ghost" size="sm" @click="m22 = false"
                >Clear</UiButton
              >
              <UiButton
                variant="primary"
                size="sm"
                @click="
                  m22 = false;
                  toast.success('Table filtered!');
                "
                >Apply</UiButton
              >
            </template>
          </UiModal>
        </div>

        <!-- 23. IMPORT MODAL -->
        <div
          v-if="isVisible('23')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
              >
                Pattern 23
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                23. Import Modal
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('23')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('23')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '23'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Data spreadsheet parser with file validation and row mapping.
          </p>
          <div>
            <UiButton @click="m23 = true" variant="primary" size="md">
              <FileSpreadsheet class="w-4 h-4 mr-2" />
              Open Import Modal
            </UiButton>
          </div>
          <!-- Modal 23 -->
          <UiModal
            v-model="m23"
            size="lg"
            title="Import Contacts / Leads (CSV / XLSX)"
            subtitle="Map columns to database entities"
          >
            <div class="space-y-4 py-2">
              <div
                class="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 text-xs"
              >
                File <strong>leads-batch-2026.csv</strong> parsed successfully
                (482 rows detected).
              </div>
              <div class="space-y-2 text-xs">
                <div class="grid grid-cols-2 gap-3 font-bold border-b pb-1">
                  <span>CSV Column</span>
                  <span>Database Target Field</span>
                </div>
                <div class="grid grid-cols-2 gap-3 items-center">
                  <span>"Full_Name"</span>
                  <select class="px-2 py-1 border rounded-lg bg-transparent">
                    <option>user.name</option>
                  </select>
                </div>
                <div class="grid grid-cols-2 gap-3 items-center">
                  <span>"Work_Email"</span>
                  <select class="px-2 py-1 border rounded-lg bg-transparent">
                    <option>user.email</option>
                  </select>
                </div>
              </div>
            </div>
            <template #footer>
              <UiButton variant="ghost" size="sm" @click="m23 = false"
                >Cancel</UiButton
              >
              <UiButton
                variant="primary"
                size="sm"
                @click="
                  m23 = false;
                  toast.success('482 rows imported!');
                "
                >Start Import</UiButton
              >
            </template>
          </UiModal>
        </div>

        <!-- 24. EXPORT MODAL -->
        <div
          v-if="isVisible('24')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Pattern 24
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                24. Export Modal
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('24')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('24')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '24'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Export format selector (CSV, XLSX, PDF, JSON) with column toggles.
          </p>
          <div>
            <UiButton @click="m24 = true" variant="secondary" size="md">
              <Download class="w-4 h-4 mr-2" />
              Open Export Modal
            </UiButton>
          </div>
          <!-- Modal 24 -->
          <UiModal
            v-model="m24"
            size="md"
            title="Export Dataset"
            subtitle="Choose archive format and column selection"
          >
            <div class="space-y-4 py-2 text-xs">
              <div class="grid grid-cols-4 gap-2">
                <button
                  type="button"
                  class="p-3 rounded-xl border border-brand-500 bg-brand-50 dark:bg-brand-950 text-center font-bold text-brand-600"
                >
                  CSV
                </button>
                <button
                  type="button"
                  class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-center font-bold hover:bg-slate-50"
                >
                  Excel
                </button>
                <button
                  type="button"
                  class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-center font-bold hover:bg-slate-50"
                >
                  PDF
                </button>
                <button
                  type="button"
                  class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-center font-bold hover:bg-slate-50"
                >
                  JSON
                </button>
              </div>
              <div
                class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1.5"
              >
                <UiCheckbox
                  :modelValue="true"
                  label="Include audit timestamp headers"
                />
                <UiCheckbox
                  :modelValue="true"
                  label="Mask sensitive PII fields (credit cards, passwords)"
                />
              </div>
            </div>
            <template #footer>
              <UiButton variant="ghost" size="sm" @click="m24 = false"
                >Cancel</UiButton
              >
              <UiButton
                variant="primary"
                size="sm"
                @click="
                  m24 = false;
                  toast.success('Export started! Download will begin shortly.');
                "
                >Generate Export</UiButton
              >
            </template>
          </UiModal>
        </div>

        <!-- 25. CALENDAR / DATE PICKER MODAL -->
        <div
          v-if="isVisible('25')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Pattern 25
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                25. Calendar / Date Picker Modal
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('25')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('25')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '25'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Interactive monthly date selector modal with quick presets.
          </p>
          <div>
            <UiButton @click="m25 = true" variant="secondary" size="md">
              <CalendarIcon class="w-4 h-4 mr-2 text-brand-500" />
              Open Calendar Modal
            </UiButton>
          </div>
          <!-- Modal 25 -->
          <UiModal
            v-model="m25"
            size="sm"
            title="Select Reporting Date"
            subtitle="September 2026"
          >
            <div class="py-2 text-center">
              <div
                class="grid grid-cols-7 gap-1 text-[11px] font-bold text-slate-400 mb-2"
              >
                <span>Su</span><span>Mo</span><span>Tu</span><span>We</span
                ><span>Th</span><span>Fr</span><span>Sa</span>
              </div>
              <div class="grid grid-cols-7 gap-1 text-xs">
                <button
                  v-for="day in calendarDays"
                  :key="day"
                  type="button"
                  class="p-2 rounded-xl transition font-medium"
                  :class="
                    day === 18
                      ? 'bg-brand-500 text-white font-bold'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                  "
                >
                  {{ day }}
                </button>
              </div>
            </div>
            <template #footer>
              <UiButton variant="ghost" size="sm" @click="m25 = false"
                >Cancel</UiButton
              >
              <UiButton
                variant="primary"
                size="sm"
                @click="
                  m25 = false;
                  toast.success('Date set: Sept 18, 2026');
                "
                >Apply Date</UiButton
              >
            </template>
          </UiModal>
        </div>

        <!-- 26. SELECT / PICKER MODAL -->
        <div
          v-if="isVisible('26')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Pattern 26
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                26. Select / Picker Modal
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('26')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('26')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '26'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Multi-user assignment picker with avatars and batch checkboxes.
          </p>
          <div>
            <UiButton @click="m26 = true" variant="primary" size="md">
              <UserCheck class="w-4 h-4 mr-2" />
              Open Select Picker Modal
            </UiButton>
          </div>
          <!-- Modal 26 -->
          <UiModal
            v-model="m26"
            size="md"
            title="Assign Team Collaborators"
            subtitle="Select members to grant deployment permissions"
          >
            <div class="space-y-2 py-1 max-h-72 overflow-y-auto">
              <div
                v-for="user in teamMembers"
                :key="user.id"
                @click="toggleMemberSelection(user.id)"
                class="p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition select-none"
                :class="
                  selectedMemberIds.includes(user.id)
                    ? 'bg-brand-50/70 dark:bg-brand-950/40 border-brand-300 dark:border-brand-800'
                    : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                "
              >
                <div class="min-w-0 pr-3">
                  <h4
                    class="text-xs font-bold text-slate-900 dark:text-slate-100"
                  >
                    {{ user.name }}
                  </h4>
                  <p class="text-[11px] text-slate-400">
                    {{ user.role }} • {{ user.email }}
                  </p>
                </div>
                <UiCheckbox :modelValue="selectedMemberIds.includes(user.id)" />
              </div>
            </div>
            <template #footer>
              <UiButton variant="ghost" size="sm" @click="m26 = false"
                >Cancel</UiButton
              >
              <UiButton
                variant="primary"
                size="sm"
                @click="
                  m26 = false;
                  toast.success(
                    `${selectedMemberIds.length} collaborators assigned!`,
                  );
                "
                >Confirm Assignment</UiButton
              >
            </template>
          </UiModal>
        </div>

        <!-- 27. FEEDBACK / RATING MODAL -->
        <div
          v-if="isVisible('27')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
              >
                Pattern 27
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                27. Feedback / Rating Modal
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('27')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('27')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '27'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            5-star satisfaction rating modal with comments and category tags.
          </p>
          <div>
            <UiButton @click="m27 = true" variant="secondary" size="md">
              <Star class="w-4 h-4 mr-2 text-amber-500" />
              Open Feedback Modal
            </UiButton>
          </div>
          <!-- Modal 27 -->
          <UiModal v-model="m27" size="sm" :showHeader="false">
            <div class="text-center py-3 space-y-3">
              <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100">
                How was your experience?
              </h3>
              <p class="text-xs text-slate-500">
                Your feedback helps us continuously improve Kobokan Admin.
              </p>
              <div class="flex items-center justify-center gap-2 py-2">
                <button
                  v-for="s in 5"
                  :key="s"
                  type="button"
                  @click="feedbackRating = s"
                  class="p-1 transition transform hover:scale-125"
                >
                  <Star
                    class="w-6 h-6"
                    :class="
                      s <= feedbackRating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-300 dark:text-slate-700'
                    "
                  />
                </button>
              </div>
              <textarea
                v-model="feedbackText"
                placeholder="What worked well? What could be improved?"
                rows="3"
                class="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-slate-100"
              />
              <UiButton
                variant="primary"
                size="md"
                class="w-full"
                @click="submitFeedback"
                >Send Feedback</UiButton
              >
            </div>
          </UiModal>
        </div>

        <!-- 28. ANNOUNCEMENT MODAL -->
        <div
          v-if="isVisible('28')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800"
              >
                Pattern 28
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                28. Announcement Modal
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('28')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('28')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '28'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Feature changelog popup with hero gradient and release notes.
          </p>
          <div>
            <UiButton @click="m28 = true" variant="primary" size="md">
              <Sparkles class="w-4 h-4 mr-2" />
              Open Announcement Modal
            </UiButton>
          </div>
          <!-- Modal 28 -->
          <UiModal v-model="m28" size="md" :showHeader="false">
            <div class="space-y-4">
              <div
                class="p-6 rounded-2xl bg-gradient-to-br from-brand-600 to-indigo-700 text-white"
              >
                <UiBadge
                  variant="brand"
                  size="sm"
                  class="bg-white/20 text-white border-white/30 mb-2"
                  >Version 2.5 Release</UiBadge
                >
                <h3 class="text-xl font-black">What's New in Kobokan Admin</h3>
                <p class="text-xs text-white/80 mt-1">
                  30 new modal patterns, responsive side drawers, and instant
                  command palette.
                </p>
              </div>
              <div
                class="space-y-2.5 text-xs text-slate-600 dark:text-slate-300"
              >
                <div class="flex items-start gap-2.5">
                  <CheckCircle2
                    class="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5"
                  />
                  <span
                    >30 Production-ready modal dialogs fully tested in Nuxt
                    4.</span
                  >
                </div>
                <div class="flex items-start gap-2.5">
                  <CheckCircle2
                    class="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5"
                  />
                  <span
                    >Interactive bottom sheets and side drawers with
                    outside-click dismissal.</span
                  >
                </div>
              </div>
              <UiButton
                variant="primary"
                size="md"
                class="w-full"
                @click="
                  m28 = false;
                  toast.success('Welcome to v2.5!');
                "
                >Get Started</UiButton
              >
            </div>
          </UiModal>
        </div>

        <!-- 29. MAINTENANCE MODAL -->
        <div
          v-if="isVisible('29')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
              >
                Pattern 29
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                29. Maintenance Modal
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('29')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('29')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '29'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Scheduled server downtime notice modal with live countdown clock.
          </p>
          <div>
            <UiButton @click="m29 = true" variant="secondary" size="md">
              <Wrench class="w-4 h-4 mr-2 text-amber-500" />
              Open Maintenance Modal
            </UiButton>
          </div>
          <!-- Modal 29 -->
          <UiModal v-model="m29" size="sm" :showHeader="false">
            <div class="text-center py-4 space-y-3">
              <div
                class="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-500 mx-auto flex items-center justify-center"
              >
                <Wrench class="w-6 h-6" />
              </div>
              <h3
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                Scheduled Platform Maintenance
              </h3>
              <p class="text-xs text-slate-500">
                Database cluster migrations scheduled for Saturday 02:00 UTC.
                Service will remain read-only for 45 minutes.
              </p>
              <div
                class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 font-mono text-xs text-amber-600"
              >
                Starts in: 14h 32m 10s
              </div>
            </div>
            <template #footer>
              <UiButton
                variant="outline"
                size="sm"
                class="w-full"
                @click="m29 = false"
                >I Understand</UiButton
              >
            </template>
          </UiModal>
        </div>

        <!-- 30. COOKIE / PRIVACY MODAL -->
        <div
          v-if="isVisible('30')"
          class="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
        >
          <div
            class="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3.5"
          >
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Pattern 30
              </span>
              <h2
                class="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                30. Cookie / Privacy Modal
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                @click="toggleCodeDrawer('30')"
                class="p-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="View Code"
              >
                <Code2 class="w-4 h-4" />
              </button>
              <button
                type="button"
                @click="copyCodeSnippet('30')"
                class="p-1.5 text-xs font-semibold rounded-lg text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition"
                title="Copy Code"
              >
                <Check
                  v-if="copiedCodeId === '30'"
                  class="w-4 h-4 text-emerald-500"
                />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            GDPR consent manager with granular category preference switches.
          </p>
          <div>
            <UiButton @click="m30 = true" variant="primary" size="md">
              <Cookie class="w-4 h-4 mr-2" />
              Open Cookie Consent Modal
            </UiButton>
          </div>
          <!-- Modal 30 -->
          <UiModal
            v-model="m30"
            size="md"
            title="Cookie & Privacy Preferences"
            subtitle="Manage which cookies we store on your device"
          >
            <div class="space-y-3.5 py-1">
              <div
                class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between"
              >
                <div>
                  <h4
                    class="text-xs font-bold text-slate-800 dark:text-slate-200"
                  >
                    Strictly Necessary
                  </h4>
                  <p class="text-[11px] text-slate-400">
                    Required for session authentication and security.
                  </p>
                </div>
                <UiBadge variant="brand" size="sm">Always Active</UiBadge>
              </div>
              <UiToggle
                v-model="cookieSettings.analytics"
                label="Analytics & Performance"
                description="Anonymized telemetry to help improve page load times."
              />
              <UiToggle
                v-model="cookieSettings.marketing"
                label="Marketing & Personalization"
                description="Personalized recommendations and banner campaigns."
              />
            </div>
            <template #footer>
              <div class="flex items-center justify-between w-full">
                <UiButton
                  variant="ghost"
                  size="sm"
                  @click="
                    m30 = false;
                    toast.info('Saved preferences.');
                  "
                  >Save Preferences</UiButton
                >
                <UiButton
                  variant="primary"
                  size="sm"
                  @click="
                    cookieSettings.analytics = true;
                    cookieSettings.marketing = true;
                    m30 = false;
                    toast.success('All cookies accepted!');
                  "
                  >Accept All</UiButton
                >
              </div>
            </template>
          </UiModal>
        </div>
      </div>
    </div>
  </div>
</template>
