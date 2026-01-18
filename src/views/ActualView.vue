<template>
    <h2 class="text-xl font-semibold text-gray-800 ml-2">Actual</h2>
    <div class="overflow-x-auto">
        <div class="card">
            <TreeTable :value="nodes" lazy size="small" @node-expand="onNodeExpand" selectionMode="single"
                tableStyle="min-width: 50rem">
                <Column field="title" header="បរិយាយ" expander style="width: 40%">
                    <template #body="{ node }">
                        <div class="flex align-items-center gap-1">
                            <!-- Icon -->
                            <i :class='node.icon' class="text-success"></i>
                            <!-- Text -->
                            <small>{{ node.data.title }}</small>
                        </div>
                    </template>
                </Column>
                <Column field="spec" header="Spec"></Column>
                <Column field="brand" header="ម៉ាក"></Column>
                <Column field="size" header="ទំហំ"></Column>
                <Column field="unit" header="ឯកតា"></Column>
            </TreeTable>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import TreeTable from 'primevue/treetable';
import Column from 'primevue/column';

import { getAll, getNext } from "@/apis/plan";

const data = ref([]);
const total = ref(0);
let nodes = ref([]);

const onNodeExpand = async (node) => {

    if (node.children) return;

    const response = await getNext(node.url, {
        params: {
            per_page: 20,
            order_field: 'id',
            order_by: 'desc'
        }
    });

    node.children = response.data.data;
    // console.log(response.data.data);
};

onMounted(async () => {
    loadRoot();
});

const loadRoot = async () => {
    const response = await getAll({
        params: {
            per_page: 20,
            order_field: 'created_at',
            order_by: 'asc'
        }
    });
    if (response.data.status) {
        const result = response.data.data;
        nodes.value = result.data;
    }
}
</script>