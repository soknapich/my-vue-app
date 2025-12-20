<template>
    <div class="overflow-x-auto">
        Total : {{ total }}
        <table class="min-w-full border-collapse border border-gray-300">
            <thead class="bg-gray-100">
                <tr>
                    <th class="border border-gray-300 text-center px-2 py-1 text-left">#</th>
                    <th class="border border-gray-300 px-2 py-1 text-left">Project</th>
                    <th class="border border-gray-300 px-2 py-1 text-left">Created At</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(plan, i) in data" :key="plan.id" class="hover:bg-gray-50">
                    <td class="border border-gray-300 text-center px-2 py-1">{{ i + 1 }}</td>
                    <td class="border border-gray-300 px-2 py-1">{{ plan.name }}</td>
                    <td class="border border-gray-300 px-2 py-1">{{ plan.created_at }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { getAll } from "@/apis/plan";

const data = ref([]);
const total = ref(0);

onMounted(async () => {
    const response = await getAll({
        params: {
            per_page: 10,
            order_field: 'created_at',
            order_by: 'asc'
        }
    });


    if (response.data.status) {
        const result = response.data.data;
        data.value = result.data;
        total.value = result.total;
    }
    //data.value = await response.data.data;
});
</script>