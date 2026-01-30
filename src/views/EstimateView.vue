<template>
    <h2 class="text-xl font-semibold text-gray-800 ml-2 m-2">Estimate</h2>
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
                <Column field="qty" header="បរិមាណ"></Column>
                <Column field="material" header="តម្លៃសម្ភារ"></Column>
                <Column field="labor" header="តម្លៃពលកម្ម"></Column>
                <Column field="total" header="សរុប"></Column>
            </TreeTable>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
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
const toNumber = (val) => Number(val.replace(/,/g, ""));

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
        const items = result.data;

        const sumMaterial = items.reduce((sum, item) => {
            return sum + toNumber(item.material);
        }, 0).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        const sumLabor = items.reduce((sum, item) => {
            return sum + toNumber(item.labor);
        }, 0).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        const sumTotal = items.reduce((sum, item) => {
            return sum + toNumber(item.total);
        }, 0).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        nodes.value = [...items,
        {
            "key": 2133,
            "id": 2133,
            "name": "TOTAL:",
            "material": sumMaterial,
            "labor": sumLabor,
            "total": sumTotal,
            "data": {
                "id": 2133,
                "title": "TOTAL:",
                "spec": "",
                "brand": "",
                "size": "",
                "unit": "",
                "qty": "",
                "material": sumMaterial,
                "labor": sumLabor,
                "total": sumTotal,
            },
            "url": "",
            "icon": "pi pi-dollar",
            "leaf": true
        }
        ];
    }
}
</script>