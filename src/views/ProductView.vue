<template>
    <!-- Sidebar -->
    <div class="overflow-x-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="d in data" :key="d.id" class="bg-white rounded-lg shadow-md hover:shadow-lg p-6 transition-shadow">
            <div class="text-sm text-gray-500 mb-2">
            <img :src="d.image" alt="Product Image" class="w-full h-48 object-contain mb-4" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ d.title }}</h3>
            <p class="text-gray-600 text-sm">{{ d.description }}</p>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from "vue";

const data = ref([]);

onMounted(async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    data.value = await response.json();
});
</script>