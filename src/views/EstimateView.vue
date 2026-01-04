<template>
    <h2 class="text-xl font-semibold text-gray-800 ml-2">Estimate</h2>
    <div class="overflow-x-auto">
        <div class="card">
            <TreeTable :value="nodes" size="small" selectionMode="single" tableStyle="min-width: 50rem"
                @nodeSelect="onNodeSelect">
                <!-- HEADER GROUP -->
                <!-- <ColumnGroup type="header">
                    <Row>
                        <Column header="Product" :colspan="3" />
                        <Column header="Sale Rate" :colspan="3" />
                    </Row>
                    <Row>
                        <Column header="Name" />
                        <Column header="Spec" />
                        <Column header="Brand" />
                        <Column header="Size" />
                        <Column header="Unit" />
                        <Column header="Qty" />
                    </Row>
                </ColumnGroup> -->

                <!-- DATA COLUMNS -->
                <Column field="name" header="បរិយាយ" expander style="width: 30%" />
                <Column field="spec" header="Spec" style="width: 15%" />
                <Column field="brand" header="ម៉ាក" style="width: 15%" />
                <Column field="size" header="ទំហំ" style="width: 10%" />
                <Column field="unit" header="ឯកតា" style="width: 10%" />
                <Column field="qty" header="បរិមាណ" style="width: 10%" />
            </TreeTable>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import TreeTable from 'primevue/treetable';
import Column from 'primevue/column';

import { getAll } from "@/apis/plan";

const data = ref([]);
const total = ref(0);
let nodes = ref([]);

const onNodeSelect = (node) => {
    if (node.level > 0 && node.level + 1 < 5) {
        node.children.push({
            key: node.key + '-' + node.children.length,
            level: node.level + 1,
            data: {
                name: 'New Child ' + (node.level + 1),
                spec: '',
                brand: '',
                size: '',
                unit: '',
                qty: 1
            },
            children: []
        });
    }
};

onMounted(async () => {
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
        //data.value = result.data;
        //total.value = result.total;
    }
    //data.value = await response.data.data;
});
</script>