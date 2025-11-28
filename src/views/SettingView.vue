<template>
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


});
</script>