<template>
    <h2 class="text-xl font-semibold text-gray-800 ml-2 m-2">Boq Report</h2>
    <div class="overflow-x-auto">
        <div class="card bg-white text-gray-800 rounded-lg shadow p-2">

            <div class="grid grid-cols-12 gap-1">
                <div class="col-span-12 md:col-span-6">
                    <div class="flex flex-wrap justify-start gap-4 mb-4">
                        <div class="flex items-center gap-2">
                            <Checkbox v-model="estimate_or_actual" inputId="ingredient1" name="estimate_or_actual"
                                value="Estimate" size="small" />
                            <label for="ingredient1"> Estimate </label>
                        </div>
                        <div class="flex items-center gap-2">
                            <Checkbox v-model="estimate_or_actual" inputId="ingredient2" name="estimate_or_actual"
                                value="Actual" size="small" />
                            <label for="ingredient2"> Actual </label>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 md:col-span-6">
                    <div class="flex flex-wrap justify-end gap-4 mb-4">
                        <div class="flex items-center gap-2">
                            <!-- <Button icon="pi pi-plus" title="New" rounded size="small" @click="downloadExcel();" /> -->
                            <Button title="Export Excel" rounded text size="small" @click="downloadExcel();">
                                <i class="pi pi-cloud-download"></i>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Context Menu -->
            <ContextMenu ref="menu" :model="items" />
            <TreeTable :value="nodes" lazy size="small" selectionMode="single" @node-expand="onNodeExpand"
                tableStyle="min-width: 50rem">
                <Column field="title" header="បរិយាយ" expander style="width: 40%">
                    <template #body="{ node }">
                        <div class="flex align-items-center gap-1">
                            <!-- Icon -->
                            <!-- <i :class='node.icon' class="text-success"></i> -->
                            <span v-if="node.icon !== 'pi pi-star'">📁</span>
                            <!-- Text -->
                            <small>{{ node.data.title }}</small>
                        </div>
                    </template>
                </Column>
                <!-- <Column field="spec" header="Spec"></Column>
            <Column field="brand" header="ម៉ាក"></Column>
            <Column field="size" header="ទំហំ"></Column>
            <Column field="unit" header="ឯកតា"></Column> -->
                <Column field="qty" header="បរិមាណ" v-if="estimate_or_actual.includes('Estimate')"></Column>
                <Column field="material" header="តម្លៃសម្ភារ" v-if="estimate_or_actual.includes('Estimate')"></Column>
                <Column field="labor" header="តម្លៃពលកម្ម" v-if="estimate_or_actual.includes('Estimate')"></Column>
                <Column field="total" header="សរុប" v-if="estimate_or_actual.includes('Estimate')"></Column>

                <Column field="actual_qty" header="បរិមាណជាក់ស្តែង"
                v-if="estimate_or_actual.includes('Actual')"></Column>
                <Column field="actual_material" header="តម្លៃសម្ភារជាក់ស្តែង"
                    v-if="estimate_or_actual.includes('Actual')"></Column>
                <Column field="actual_labor" header="តម្លៃពលកម្មជាក់ស្តែង" v-if="estimate_or_actual.includes('Actual')">
                </Column>
                <Column field="actual_total" header="សរុបជាក់ស្តែង" v-if="estimate_or_actual.includes('Actual')">
                </Column>

                <!-- <Column field="material" header="តម្លៃសម្ភារ" v-if="estimate_or_actual.includes('Margin')"></Column>
            <Column field="labor" header="តម្លៃពលកម្ម" v-if="estimate_or_actual.includes('Margin')"></Column>
            <Column field="total" header="សរុប" v-if="estimate_or_actual.includes('Margin')"></Column> -->

                <Column field="export" header="ទាញយក">
                    <template #body="slotProps">
                        <Button icon="pi pi-cloud-download" v-if="slotProps.node.icon !== 'pi pi-star'" rounded text
                            @click="downloadExcelByPlanId(slotProps.node.data.id, slotProps.node.icon, slotProps.node.data.title)" />

                            <Button icon="pi pi-eye" severity="danger" v-if="slotProps.node.icon === 'pi pi-star'" rounded text
                            @click="alert(slotProps.node.data.title)" />
                    </template>
                </Column>

            </TreeTable>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { getAll, getNext } from "@/apis/plan";
import exportExcell from "@/services/download";
const estimate_or_actual = ref(["Estimate", "", ""]);
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
            per_page: 200,
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

        const sumActualMaterial = items.reduce((sum, item) => {
            return sum + toNumber(item.actual_material);
        }, 0).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        const sumActualLabor = items.reduce((sum, item) => {
            return sum + toNumber(item.actual_labor);
        }, 0).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        const sumActualTotal = items.reduce((sum, item) => {
            return sum + toNumber(item.actual_total);
        }, 0).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        nodes.value = [...items,
        {
            "key": 2133,
            "id": 2133,
            "name": "TOTAL:",
            "material": `$ ${sumMaterial}`,
            "labor": `$ ${sumLabor}`,
            "total": `$ ${sumTotal}`,
            "data": {
                "id": 2133,
                "title": "TOTAL:",
                "spec": "",
                "brand": "",
                "size": "",
                "unit": "",
                "qty": "",
                "material": `$ ${sumMaterial}`,
                "labor": `$ ${sumLabor}`,
                "total": `$ ${sumTotal}`,
                "actual_material": `$ ${sumActualMaterial}`,
                "actual_labor": `$ ${sumActualLabor}`,
                "actual_total": `$ ${sumActualTotal}`,
            },
            "url": "",
            "icon": "pi pi-dollar",
            "leaf": true
        }
        ];
    }
};

async function downloadExcel() {
    await exportExcell('plan/export-excell', 'project-export-all');
};

async function downloadExcelByPlanId(pid, icon, title) {
    //console.log(icon);
    if (icon === 'pi pi-th-large') {
        await exportExcell(`house/export-excell?plan_id=${pid}`, `${title}`);
    } else if (icon === 'pi pi-home') {
        await exportExcell(`boq-level-one/export-excell?house_id=${pid}`, `${title}`);
    } else if (icon === 'pi pi-folder') {
        await exportExcell(`boq-level-two/export-excell?parent_id=${pid}`, `${title}`);
    } else if (icon === 'pi pi-book') {
        await exportExcell(`boq-item/export-excell?level_id=${pid}`, `${title}`);
    }

};
</script>
