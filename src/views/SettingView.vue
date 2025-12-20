<template>
<<<<<<< HEAD
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
=======
    <!-- Sidebar -->
    <input type="file" multiple class="mb-3" @change="onOnchangeFile" />
    <button type="button" class="bg-green-700 hover:bg-green-800 text-white font-semibold px-5 py-2 rounded flex items-center cursor-pointer" @click="onUploadFiles()">Upload</button>

    <LoadingDialog v-model="showLoading" title="Working on it..." />

</template>


<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import LoadingDialog from '@/components/LoadingDialog.vue';

const showLoading = ref(false)

const base64Files = [];
const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file); // convert to base64
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};


const onOnchangeFile = async (event) => {
    const files = Array.from(event.target.files);
    base64Files.length = 0; // Clear previous files	
    for (const file of files) {
        const base64 = await toBase64(file);
        const cleanBase64 = base64.replace(/^data:.*;base64,/, "");
        //console.log(cleanBase64);
        base64Files.push({
            file_name: file.name,
            file_data: cleanBase64,
            type: file.type,
            size: file.size,
        });
    }
    console.log("All base64 files:", base64Files.length);
};

const onUploadFiles = (async () => {
    showLoading.value = true;
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InAuc29rbmEiLCJpYXQiOjE3NjQyMTIzNzEsImV4cCI6MzMzMjQyMTIzNzF9.pTOxxndxUg4a9xYPjUji215aa9RxXzwPbATivj38RlE";
    try {
        const api = axios.create({
            baseURL: "http://localhost:8060/v1/api/document",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const response = await api.post("/upload", {
            customer_id: 2,
			files: base64Files
        });
        console.log("Upload successful:", response.data);
        showLoading.value = false;
    } catch (error) {
        console.error("Upload failed:", error);
        showLoading.value = false;
    }
});

onMounted(async () => {


>>>>>>> ccc220248354705814812fbb9953d29587c36ada
});
</script>