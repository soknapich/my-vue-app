<template>
    <!-- Sidebar -->
    <div class="overflow-x-auto">
<<<<<<< HEAD
        <table class="min-w-full border-collapse border border-gray-300">
            <thead class="bg-gray-100">
                <tr>
                    <th class="border border-gray-300 px-2 py-1 text-left">ID</th>
                    <th class="border border-gray-300 px-2 py-1 text-left">Full Name</th>
                    <th class="border border-gray-300 px-2 py-1 text-left">Login Name</th>
                    <th class="border border-gray-300 px-2 py-1 text-left">Email</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in data" :key="user.id" class="hover:bg-gray-50">
                    <td class="border border-gray-300 px-2 py-1">{{ user.id }}</td>
                     <td class="border border-gray-300 px-2 py-1">{{ `${user.first_name} ${user.last_name}` }}</td>
                    <td class="border border-gray-300 px-2 py-1">{{ user.name }}</td>
                    <td class="border border-gray-300 px-2 py-1">{{ user.email }}</td>
                </tr>
            </tbody>
        </table>
=======
        <DataTable :value="data" stripedRows size="small" tableStyle="min-width: 50rem">
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="id" header="ID" sortable style="width: 5%"></Column>
            <Column field="name" header="Name" sortable></Column>
            <Column field="email" header="Email" sortable></Column>
        </DataTable>
>>>>>>> ccc220248354705814812fbb9953d29587c36ada
    </div>

    <!-- <div>
        <Tree v-model:selectionKeys="selectedKey" :value="nodes" selectionMode="single" @nodeSelect="onNodeSelect"
            :metaKeySelection="false" :propagateSelectionDown="true" />
    </div> -->

</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { getAll } from "@/apis/user";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { Tree } from "primevue";


interface User {
    id: number;
    name: string;
    email: string;
    first_name: string;
    last_name: string
}

export default defineComponent({
    name: "User",
    components: {
        DataTable,
        Column,
        Tree
    },
    setup() {
        // Fetch data from API
        const data = ref<User[]>([]);
        const getUsers = async () => {
            try {
                const response = await getAll({
                    params: {
<<<<<<< HEAD
                        limit: 5   
=======
                        page: 1,
                        limit: 20,
>>>>>>> ccc220248354705814812fbb9953d29587c36ada
                    },
                });
                const result = response.data.data;
                data.value = result.data;
<<<<<<< HEAD
=======
                //console.log(response.data.data.data);
>>>>>>> ccc220248354705814812fbb9953d29587c36ada
            } catch (error) {
                console.error("Failed to data:", error);
            }
        };

        const nodes = [
            {
                key: '0',
                label: 'Root Node',
                children: [
                    {
                        key: '0-0',
                        label: 'Child 1',
                        children: [
                            { key: '0-0-0', label: 'Grandchild 1' },
                            {
                                key: '0-0-1', label: 'Grandchild 2',
                                children: [
                                    { key: '0-1-2', label: 'Grandchild 2', id: '01' },
                                    {
                                        key: '0-1-3', label: 'Grandchild 3', id: '02',
                                        children: [
                                            { key: '0-1-5', label: 'Grandchild 05', id: '05' },
                                            { key: '0-1-6', label: 'Grandchild 06', id: '06' }
                                        ]

                                    },
                                ]
                            },
                        ]
                    },
                ],
            },
            {
                key: '0-1',
                label: 'Child 2',
                children: [
                    { key: '0-1-0', label: 'Grandchild 3' },
                    { key: '0-1-1', label: 'Grandchild 4' },
                ],
            },

        ];


        const selectedKey = ref(null);

        onMounted(getUsers);

        const onNodeSelect = (node) => {
            console.log({ severity: 'success', summary: 'Node Selected', detail: node.id, life: 3000 });
        };

        return {
            data,
            nodes,
            onNodeSelect,
            selectedKey
        };
    },
});
</script>
