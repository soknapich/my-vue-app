<template>
    <div class="overflow-x-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="d in data" :key="d.id"
                class="bg-white rounded-lg shadow-md hover:shadow-lg p-6 transition-shadow">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ d.first_name }} {{ d.last_name }}</h3>
                <p class="text-gray-600 text-sm">{{ d.phone }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const data = ref([]);

onMounted(async () => {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiMWU0YjYyYzFmYmVlNjRmZjM1N2M3NWI1MWViZjIwM2VkM2VlMTk5YzgzYjQwYzVkMzk5NGZjZjk1Y2FjMDg2ZjhmZjRjMzc0ODc0NmM0NDYiLCJpYXQiOjE3NjQyNzg5NTgsIm5iZiI6MTc2NDI3ODk1OCwiZXhwIjoxNzk1ODE0OTU4LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.cFndH5m4vMFHMpQhyRKuQQbKreuesKvE6BVTRvjcO6_cweylScmblkZAuDifKzGnnhizyMnTgAh2SLbBBMAOJkHv1nRseLWWe0N40HCj4EFKrBSQr4CRPMWD-QIw92ajxHfLBafHxzfp3kpsxvjMSfIYzEF2IeUcMCmU7eUh-u8RFKUbfC5xMTpTg_tniPAbIWaDwWjEomNFOcw0vZtu-Dne5IvPtz54Kvel9eQgxImMoWK02KpcUkE-yJ-u5G74xDbz8FH_FZcEJsyLN-rWg15dGYCPpesI54ZbQ4q-3guKU0WxLYv6OQkeROcNKwI8csiA2IIbGPxJKv5zAw7-bfmcC5gtLg1dj3YC1IinsCnJcrLVGwFLx39bZGE8XpU-OdyMzs8yCEKJ4pqZ8kXjc1vsqXxXKVWnKV3NQ2fkgQd08KL2Re8XWjgidy3FBNGX6IcUFmFL-imS2ndszmCbMPsXSdVtaxc3yB53_JFV2qS9Zx3meIS67aLRjfJeaTTWRF1T8h5Ue-KKKuUr1fGj5ar6obesYMz4jLSI444Oup6Uo0lbguDo8CcWsGQk5bLZEmHBMJsT1BdoR48g3cgCmU2HPmv-4fYHj8WVJyWfWVrqIEdFTFV4Qm_cdzGS9oxV-T26m61kg1eQM53MNALVrq4dT5ShaNG2Nmxm8odRjrs';

    // Create an Axios instance with default headers
    const api = axios.create({
        baseURL: 'https://onc168.cloud/api', // Replace with your API base URL
        headers: {
            Authorization: `Bearer ${token}`, // Set the auth token
            'Content-Type': 'application/json'
        },
    });

    // Example GET request
    api.get('/verify-token')
        .then(response => {
            //console.log('User profile:', response.data);
            data.value = response.data.worker.data;
        })
        .catch(error => {
            console.error('Error:', error.response?.data || error.message);
        });
});
</script>