<template>
    <!-- Sidebar -->
    <div class="overflow-x-auto">
        <table class="min-w-full border-collapse border border-gray-300">
            <thead class="bg-gray-100">
                <tr>
                    <th class="border border-gray-300 px-2 py-1 text-left">ID</th>
                    <th class="border border-gray-300 px-2 py-1 text-left">Name</th>
                    <th class="border border-gray-300 px-2 py-1 text-left">Email</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in data" :key="user.id" class="hover:bg-gray-50">
                    <td class="border border-gray-300 px-2 py-1">{{ user.id }}</td>
                    <td class="border border-gray-300 px-2 py-1">{{ user.username }}</td>
                    <td class="border border-gray-300 px-2 py-1">{{ user.email }}</td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { getAll } from "@/apis/user";

interface User {
    id: number;
    username: string;
    email: string;
}

export default defineComponent({
    name: "User",
    components: {
    },
    setup() {
        // Fetch data from API
        const data = ref<User[]>([]);
        const getUsers = async () => {
            try {
                const response = await getAll({
                    params: {
                        page: 1,
                        limit: 5,   
                    },
                });
                data.value = response.data.data;
                //console.log(response.data.data);
            } catch (error) {
                console.error("Failed to data:", error);
            }
        };

        onMounted(getUsers);

        return {
            data
        };
    },
});
</script>
