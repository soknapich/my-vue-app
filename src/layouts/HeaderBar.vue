<template>
  <header class="flex items-center justify-between px-2 py-2 bg-white shadow">
    <!-- Left: Page Title -->
    <div>
      <h1 class="text-xl font-semibold text-gray-800">{{ title }}</h1>
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
          <img src="@/assets/vue.svg" alt="Profile" class="w-10 h-10 rounded-full border" />
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

    <!-- Logout Confirmation Modal -->
    <div v-if="showLogoutConfirm"
      class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow-lg w-80">
        <h2 class="text-lg font-semibold mb-4 text-gray-800">Confirm Logout</h2>
        <p class="text-sm text-gray-600 mb-4">Are you sure you want to log out?</p>
        <div class="flex justify-end space-x-3">
          <button @click="showLogoutConfirm = false" class="px-4 py-2 text-sm rounded bg-gray-200">
            Cancel
          </button>
          <button @click="logout" class="px-4 py-2 text-sm rounded bg-red-600 text-white">
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { setToken, setUserInfoCookie } from '@/services/authentication';

const router = useRouter();
const props = defineProps<{
  title: string
  breadcrumbs: string[]
}>();

const showDropdown = ref(false)
const showLogoutConfirm = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
};

const logout = async () => {
  showDropdown.value = false
  showLogoutConfirm.value = false
  // 🔐 Perform logout logic here (e.g., clear token, redirect)
  console.log('Logging out...');
  await setToken('token', )
  await setToken('refreshToken','');
  await setUserInfoCookie('');

  router.push({ path: '/login' });
};

</script>
