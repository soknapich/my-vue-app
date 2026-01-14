<template>
    <div class="card mb-2">
        <div class="grid grid-cols-12 gap-1">
            <div class="col-span-6">
                <Select v-model="selectedPlan" :options="plans" filter optionLabel="name" size="small"
                    placeholder="Select a Plan" class="w-full" @update:modelValue="onPlanChange">
                    <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex items-center">
                            <div>{{ slotProps.value.name }}</div>
                        </div>
                        <span v-else>
                            {{ slotProps.placeholder }}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div class="flex items-center">
                            <div>{{ slotProps.option.name }}</div>
                        </div>
                    </template>
                </Select>
            </div>
            <div class="col-span-6">
                <Select v-model="selectedHouse" :options="houses" filter optionLabel="name" size="small"
                    placeholder="Select a House" class="w-full" @update:modelValue="onHouseChange">
                    <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex items-center">
                            <div>{{ slotProps.value.name }}</div>
                        </div>
                        <span v-else>
                            {{ slotProps.placeholder }}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div class="flex items-center">
                            <div>{{ slotProps.option.name }}</div>
                        </div>
                    </template>
                </Select>
            </div>
        </div>

    </div>

    <div class="card">
        <div class="grid grid-cols-12 gap-1">
            <div class="col-span-6 bg-white text-gray-800 rounded-lg shadow p-2">
                <div class="flex flex-column justify-end" v-if="selectedHouse">
                    <Button icon="pi pi-plus" rounded size="small" @click="visible3 = true" />
                </div>
                <DataTable v-if="boqLevel1?.length > 0" v-model:selection="selectedLevel1" @rowSelect="onRowSelect"
                    selectionMode="single" :value="boqLevel1" size="small">
                    <Column field="name"></Column>
                </DataTable>
                <div class="p-3" v-if="boqLevel1?.length == 0">No data</div>
            </div>
            <div class="col-span-6 bg-white text-gray-800 rounded-lg shadow p-2">
                <div class="flex flex-column justify-end" v-if="selectedLevel1">
                    <Button icon="pi pi-plus" rounded size="small" @click="visible2 = true" />
                </div>
                <DataTable v-if="boqLevel2?.length > 0" v-model:selection="selectedLevel2" @rowSelect="onRowSelect2"
                    selectionMode="single" :value="boqLevel2" size="small">
                    <Column field="name"></Column>
                </DataTable>
                <div class="p-3" v-if="boqLevel2?.length == 0">No data</div>
            </div>
            <div class="col-span-12 bg-white text-gray-800 rounded-lg shadow p-2">
                <div class="flex flex-column justify-end" v-if="selectedLevel2">
                    <Button icon="pi pi-plus" rounded size="small" @click="visibleBtn = true" />
                </div>
                <ContextMenu ref="cm" :model="menuModel" @hide="selectedItem = null" />
                <DataTable v-if="items?.length > 0" scrollable contextMenu v-model:contextMenuSelection="selectedItem"
                    @rowContextmenu="onRowContextMenu" selectionMode="single" :value="items" size="small">
                    <Column field="id">
                    </Column>
                    <Column field="name" header="Title"></Column>
                    <Column field="spec" header="Spec"></Column>
                    <Column field="brand" header="Brand"></Column>
                    <Column field="size" header="Size"></Column>
                    <Column field="unit" header="Unit_Cost"></Column>
                    <Column field="qty" header="Qty"></Column>
                    <Column field="material_unit" header="Material_Unit_Rate"></Column>
                    <Column field="labor_unit" header="Labor_Unit_Rate"></Column>
                </DataTable>
                <div class="p-3" v-if="items?.length == 0">No data</div>
            </div>
        </div>
    </div>

    <!-- Create Boq level 1 -->
    <Dialog v-model:visible="visible3" modal header="Create Item Level 1" :style="{ width: '25rem' }">
        <div class="flex flex-col mb-4">
            <div class="flex flex-col gap-2">
                <label for="title1" class="font-semibold">Title</label>
                <InputText id="title1" v-model="title1" :invalid="true" size="small" placeholder="Title"
                    autocomplete="off" />

            </div>
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" size="small" label="Cancel" severity="secondary" @click="visible3 = false"></Button>
            <Button type="button" size="small" label="Save" @click="submitFormL1"></Button>
        </div>
    </Dialog>

    <!-- Create Boq level 2 -->
    <Dialog v-model:visible="visible2" modal header="Create Item Level 2" :style="{ width: '25rem' }">
        <div class="flex flex-col mb-4">
            <div class="flex flex-col gap-2">
                <label for="title2" class="font-semibold">Title</label>
                <InputText id="title2" v-model="title2" :invalid="true" size="small" placeholder="Title"
                    class="flex-auto" autocomplete="off" />
            </div>
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" size="small" label="Cancel" severity="secondary" @click="visible2 = false"></Button>
            <Button type="button" size="small" label="Save" @click="submitForm2"></Button>
        </div>
    </Dialog>

    <!-- Create Boq itesm -->
    <Dialog v-model:visible="visibleBtn" modal header="Create Item" :style="{ width: '25rem' }">
        <div class="flex flex-col mb-4">
            <div class="flex flex-col gap-2">
                <label for="title" class="font-semibold">Title</label>
                <InputText id="title" v-model="dataItem.name" :invalid="true" size="small" placeholder="Title"
                    class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex flex-col gap-2 mt-2">
                <label for="spec" class="font-semibold">Spec</label>
                <InputText id="spec" v-model="dataItem.spec" :invalid="true" size="small" placeholder="Spec"
                    class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex flex-col gap-2 mt-2">
                <label for="brand" class="font-semibold">Brand</label>
                <InputText id="brand" v-model="dataItem.brand" :invalid="true" size="small" placeholder="Brand"
                    class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex flex-col gap-2 mt-2">
                <label for="size" class="font-semibold">Size</label>
                <InputText id="size" v-model="dataItem.size" :invalid="true" size="small" placeholder="Size"
                    class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex flex-col gap-2 mt-2">
                <label for="qty" class="font-semibold">Qty</label>
                <InputText id="qty" v-model="dataItem.qty" :invalid="true" size="small" placeholder="Qty"
                    class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex flex-col gap-2 mt-2">
                <label for="unit" class="font-semibold">Unit</label>
                <InputText id="unit" v-model="dataItem.unit" :invalid="true" size="small" placeholder="Unit"
                    class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex flex-col gap-2 mt-2">
                <label for="material_unit" class="font-semibold">Material Unit</label>
                <InputText id="material_unit" v-model="dataItem.material_unit" :invalid="true" size="small" placeholder="Material Unit"
                    class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex flex-col gap-2 mt-2">
                <label for="labor_unit" class="font-semibold">Labor Unit</label>
                <InputText id="labor_unit" v-model="dataItem.labor_unit" :invalid="true" size="small" placeholder="Labor Unit"
                    class="flex-auto" autocomplete="off" />
            </div>
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" size="small" label="Cancel" severity="secondary" @click="visibleBtn = false"></Button>
            <Button type="button" size="small" label="Save" @click="submitForm"></Button>
        </div>
    </Dialog>

</template>


<script setup>
import { ref, onMounted } from "vue";
import Select from 'primevue/select';
import { getAll, getNext, createItem, deletItem } from "@/apis/plan";
import { createBoqLevel1 } from "@/apis/boq-level-one";
import { createBoqLevel2 } from "@/apis/boq-level-two";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import ContextMenu from 'primevue/contextmenu'
import BoqItem from "./components/BoqItem.vue";

//get store
//Context menu
const cm = ref();
const selectedItem = ref();

const menuModel = ref([
    { label: 'Delete', icon: 'pi pi-fw pi-times', command: () => deleteBoqContext(selectedItem) },
    { label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => editBoqContext(selectedItem) }
]);
const onRowContextMenu = (event) => {
    cm.value.show(event.originalEvent);
};
const deleteBoqContext = async (row) => {
    const result = confirm("Are you sure you want to delete this item?");
    if (result) {
        await deletItem(row.value.id);
        const levelId = selectedLevel2.value?.id;
        if (levelId) {
            await getItems(levelId);
        }
    }
    //toast.add({severity: 'info', summary: 'Product Selected', detail: product.value.name, life: 3000});
};
const editBoqContext = (row) => {
    alert(row.value.id);
    //products.value = products.value.filter((p) => p.id !== product.value.id);
    //toast.add({severity: 'error', summary: 'Product Deleted', detail: product.value.name, life: 3000});
    //selectedItem.value = null;
};

//Create level 1
const visible3 = ref(false);
const title1 = ref('');

const submitFormL1 = async () => {
    const hId = selectedHouse.value.id;
    //console.log(selectedHouse.value.id);
    const response = await createBoqLevel1({
        params: {
            house_id: hId,
            name: title1.value,
            created_by: 1
        }
    });


    if (response.data?.status) {
        title1.value = '';
        visible3.value = false;
        await getItemsLevel1(hId);
    } else {
        //console.log(response.errors?.name[0]);
    }
};

//Create items
const visible2 = ref(false);
const title2 = ref('');

const submitForm2 = async () => {
    const levelId = selectedLevel1.value.id;
    const response = await createBoqLevel2({
        params: {
            parent_id: levelId,
            name: title2.value,
            created_by: 1
        }
    });

    if (response.data?.status) {
        title2.value = '';
        visible2.value = false;
        await getItemsLevel2(levelId);
    } else {

    }
};

//Create items
const visibleBtn = ref(false);
const dataItem = ref({
    name: '',
    spec: '',
    brand: '',
    size: '',
    unit: '',
    qty: '',
    material_unit: '',
    labor_unit: ''
});

const submitForm = async () => {
    //console.log(selectedLevel2.value.id);
    const levelId = selectedLevel2.value.id;
    const response = await createItem({
        params: { level_id: selectedLevel2.value.id, ...dataItem.value }
    });
    if (response.data?.status) {
        title.value = '';
        visibleBtn.value = false;
        await getItems(levelId);
    } else {

    }
};
//
const selectedLevel1 = ref();
const selectedLevel2 = ref();

const selectedPlan = ref();
const selectedHouse = ref();

let plans = ref([]);
let houses = ref([]);

let boqLevel1 = ref([]);
let boqLevel2 = ref([]);
let items = ref([]);

const onRowSelect = async (value) => {
    //console.log(value.data.id);
    getItemsLevel2(value.data.id);
    items.value = [];
    selectedLevel2.value = null;
};

const getItemsLevel2 = async (id) => {
    const response = await getNext(`/boq-level-two?parent_id=${id}`, {
        params: {
            per_page: 20,
            order_field: 'id',
            order_by: 'desc'
        }
    });

    if (response.data.status) {
        const result = response.data.data;
        boqLevel2.value = result;
    }
}

const onRowSelect2 = async (value) => {
    //alert(event.data.name);
    await getItems(value.data.id);
};

const getItems = async (id) => {

    const response = await getNext(`/boq-item?level_id=${id}`, {
        params: {
            per_page: 20,
            order_field: 'id',
            order_by: 'desc'
        }
    });

    if (response.data.status) {
        const result = response.data.data;
        items.value = result;
    }
}

const onPlanChange = async (value) => {
    boqLevel1.value = [];
    boqLevel2.value = [];
    items.value = [];
    selectedLevel1.value = null;
    selectedLevel2.value = null;
    const response = await getNext(`/house?plan_id=${value.id}`, {
        params: {
            per_page: 20,
            order_field: 'name',
            order_by: 'asc'
        }
    });

    selectedHouse.value = null;
    //console.log( response.data.data)
    houses.value = response.data.data;
    boqLevel1.value = [];
    boqLevel2.value = [];

};

const onHouseChange = async (value) => {
    boqLevel1.value = [];
    boqLevel2.value = [];
    items.value = [];
    selectedLevel1.value = null;
    selectedLevel2.value = null;
    getItemsLevel1(value.id);
};

const getItemsLevel1 = async (value) => {
    const response = await getNext(`/boq-level-one?house_id=${value}`, {
        params: {
            per_page: 20,
            order_field: 'id',
            order_by: 'desc'
        }
    });

    if (response.data.status) {
        const result = response.data.data;
        boqLevel1.value = result;
    }
}

onMounted(async () => {
    const response = await getAll({
        params: {
            per_page: 20,
            order_field: 'created_at',
            order_by: 'asc'
        }
    });
    if (response.data.status) {
        plans.value = response.data.data.data;
    }

});

</script>