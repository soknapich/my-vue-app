<!-- src/layouts/BaseLayout.vue -->
<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside :class="[
      'bg-white border-r shadow-sm flex flex-col transition-all duration-200 overflow-hidden',
      collapsed ? 'w-0 -translate-x-full' : 'w-60 translate-x-0'
    ]" aria-expanded="!collapsed">
      <div class="flex items-center justify-center px-3 py-2">
        <img src="@/assets/logo.png" alt="Profile" class="w-10 h-10 rounded-full border" />
        <!-- Toggle Button -->
        <!-- <button
          @click="toggle"
          class="p-1 rounded hover:bg-gray-100"
          :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        >
          <component :is="collapsed ? Menu : Menu" class="w-5 h-5 text-gray-600" />
        </button> -->
      </div>

      <nav class="flex-1">
        <div v-for="item in menuItems" :key="item.name">
          <RouterLink v-if="item.actived" :to="item.to" :title="collapsed ? item.name : null"
            class="flex items-center px-1 py-2 text-sm font-small transition-colors duration-150" :class="[
              isActive(item.to) ? 'bg-green-700 text-white' : 'hover:bg-green-100 text-gray-800',
              collapsed ? 'justify-center' : 'justify-start'
            ]">
            <component :is="item.icon" class="mr-1 w-5 h-5" />
            <span v-if="!collapsed">{{ item.name }}</span>
          </RouterLink>
        </div>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col bg-gray-50 shadow overflow-hidden">
      <!-- ✅ Integrated Header -->
      <HeaderBar :title="pageTitle" :breadcrumbs="breadcrumbs" @toggleNav="toggle" />

      <!-- Router View (Content Area) -->
      <div class="flex-1 overflow-y-auto p-2">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">

import HeaderBar from "@/layouts/HeaderBar.vue";
import { Menu, Settings, LayoutDashboard, ListTree, Database } from "lucide-vue-next";
import { useRoute } from "vue-router";
import { computed, ref, onMounted } from "vue";
import { getUserInfoCookie } from '@/services/authentication';

const route = useRoute();
let userInfo: any = null;

let menuItems = ref([]);

const collapsed = ref(false);

const toggle = () => {
  collapsed.value = !collapsed.value;
};

const isActive = (to: string) => route.path === to || route.path.startsWith(to + '/');


// Optional: Dynamically generate title/breadcrumb
const pageTitle = computed(() => {
  const match = menuItems.value.find((item) => route.path.startsWith(item.to));
  return match?.name ?? "Dashboard";
});

const breadcrumbs = computed(() => {
  const parts = route.path.split("/").filter(Boolean);
  return parts.map((part) => part.toUpperCase());
});

onMounted(async () => {
  const info = await getUserInfoCookie();
  userInfo = JSON.parse(info || '{}');
  //console.log(userInfo?.role);
  menuItems.value = [
    { name: "Home", to: "/", icon: LayoutDashboard, actived: (['admin', 'user']).includes(userInfo?.role)? true : false },
    { name: "Boq Report", to: "/estimate", icon: ListTree, actived: (['admin', 'manager']).includes(userInfo?.role)? true : false },
    { name: "Boq Input", to: "/boq-input", icon: Database, actived: (['admin', 'manager', 'user']).includes(userInfo?.role)? true : false },
    { name: "Setting", to: "/setting", icon: Settings, actived: (['admin', 'manager']).includes(userInfo?.role)? true : false },
  ];
});

</script>
