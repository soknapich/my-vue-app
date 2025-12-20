<template>
  <header class="flex items-center justify-between px-2 py-2 bg-white shadow">
    <!-- Left: Page Title -->
    <div class="flex">
      <button @click="toggle" class="p-1 rounded hover:bg-gray-100"
        :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'">
        <component :is="collapsed ? Menu : Menu" class="w-5 h-5 text-gray-600" />
      </button>
      <h1 class="text-xl font-semibold text-gray-800 ml-2">{{ title }}</h1>
    </div>

    <!-- Right: Breadcrumb + Profile -->
    <div class="flex items-center gap-6">
      <!-- Breadcrumb -->
      <nav class="text-sm text-gray-500">
        <ol class="list-none p-0 inline-flex space-x-1">
          <li v-for="(crumb, index) in breadcrumbs" :key="index" class="inline-flex items-center">
            <span v-if="index !== 0">/</span>
            <span class="ml-1 text-gray-700"></span>
          </li>
        </ol>
      </nav>

      <!-- Profile with Dropdown -->
      <div class="relative">
        <button @click="toggleDropdown" class="focus:outline-none hover:cursor-pointer">
          <!-- <img src="@/assets/vue.svg" alt="Profile" class="w-10 h-10 rounded-full border" /> -->
            <UserRound size="32" color="#555" class="rounded-full border"/>
        </button>

        <!-- Dropdown Menu -->
        <div v-if="showDropdown" class="absolute right-0 mt-2 w-36 bg-white border rounded shadow-md z-50">
          <button @click="showLogoutConfirm = true"
            class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:cursor-pointer">
            Logout
          </button>
        </div>
      </div>
    </div>
    <ConfirmationAlert v-model="showLogoutConfirm" confirmationLabel="Logout" cancelLabel="Cancel" :onConfirm="logout"
      confirmationButtonColor="bg-red-600" />

    <!-- <LoadingDialog v-model="showLogoutConfirm" title="Working on it..." /> -->
    <!-- <AlertDialog v-model="showLogoutConfirm" title="Logging out" cancelLabel="Cancel" :showCancel="true" /> -->

  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { setToken, setUserInfoCookie } from '@/services/authentication';
import ConfirmationAlert from '@/components/ConfirmationAlert.vue';
import AlertDialog from '@/components/AlertDialog.vue';
import LoadingDialog from '@/components/LoadingDialog.vue';
import { Menu, UserRound  } from "lucide-vue-next";
const emit = defineEmits(['toggleNav']);

const router = useRouter();

defineProps<{
  title: string
  breadcrumbs: string[]
}>();


const showDropdown = ref(false);
const showLogoutConfirm = ref(false);

const collapsed = ref(false);
const toggle = () => {
  collapsed.value = !collapsed.value;
  emit('toggleNav');
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
};

const logout = async () => {
  showDropdown.value = false
  showLogoutConfirm.value = false
  // 🔐 Perform logout logic here (e.g., clear token, redirect)
  console.log('Logging out...');
  await setToken('token', '')
  await setToken('refreshToken', '');
  await setUserInfoCookie('');

  router.push({ path: '/login' });
};

</script>
