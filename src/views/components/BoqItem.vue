<template>
    <div class="">
        <div class="flex flex-column justify-end" v-if="boqTwoStore.selected">
            <Button icon="pi pi-plus" title="New" rounded size="small" @click="clearData();" />
        </div>

        <ContextMenu ref="cm" :model="menuModel" @hide="selectedItem = null" />
        <DataTable scrollHeight="350px" scrollable contextMenu v-model:contextMenuSelection="selectedItem"
            @rowContextmenu="onRowContextMenu" selectionMode="single" :value="boqItem.items" size="small"
            v-if="boqItem.items?.length > 0">
            <Column header="#" style="width:50px">
                <template #body="{ index }">
                    {{ index + 1 }}
                </template>
            </Column>
            <Column field="title" header="Title"></Column>
            <Column field="spec" header="Spec"></Column>
            <Column field="brand" header="Brand"></Column>
            <Column field="size" header="Size"></Column>
            <Column field="unit" header="Unit"></Column>
            <Column field="qty" header="Qty"></Column>
            <Column field="material_unit" header="Material"></Column>
            <Column field="labor_unit" header="Labor"></Column>
        </DataTable>
    </div>

    <!-- Create Boq itesm -->
    <Dialog v-model:visible="visibleBtn" maximizable modal header="Create Item" :style="{ width: '30rem' }">
        <Form class="w-full">
            <div class="flex flex-col mb-4">
                <div class="flex flex-col gap-2">
                    <label for="title" class="font-semibold">Title <span class="text-red-500">*</span></label>
                    <InputText id="title" v-model="dataItem.title" size="small" class="flex-auto" autocomplete="off" />
                    <span class="text-red-500">{{ boqItem.errors.title?.[0] }}</span>

                </div>
                <div class="flex flex-col gap-2 mt-2">
                    <label for="spec" class="font-semibold">Spec <span class="text-red-500">*</span></label>
                    <InputText id="spec" v-model="dataItem.spec" size="small" class="flex-auto" autocomplete="off" />
                    <span class="text-red-500">{{ boqItem.errors.spec?.[0] }}</span>
                </div>
                <div class="flex flex-col gap-2 mt-2">
                    <label for="brand" class="font-semibold">Brand <span class="text-red-500">*</span></label>
                    <InputText id="brand" v-model="dataItem.brand" size="small" class="flex-auto" autocomplete="off" />
                    <span class="text-red-500">{{ boqItem.errors.brand?.[0] }}</span>
                </div>
                <div class="flex flex-col gap-2 mt-2">
                    <label for="size" class="font-semibold">Size <span class="text-red-500">*</span></label>
                    <InputText id="size" v-model="dataItem.size" size="small" class="flex-auto" autocomplete="off" />
                    <span class="text-red-500">{{ boqItem.errors.size?.[0] }}</span>
                </div>
                <div class="flex flex-col gap-2 mt-2">
                    <label for="unit" class="font-semibold">Unit <span class="text-red-500">*</span></label>
                    <InputText id="unit" v-model="dataItem.unit" size="small" class="flex-auto" autocomplete="off"
                        fluid />
                    <span class="text-red-500">{{ boqItem.errors.unit?.[0] }}</span>
                </div>
                <div class="flex flex-col gap-2 mt-2">
                    <label for="qty" class="font-semibold">Qty <span class="text-red-500">*</span></label>
                    <InputNumber id="qty" v-model="dataItem.qty" size="small" class="flex-auto" autocomplete="off"
                        inputId="locale-us" locale="en-US" :minFractionDigits="1" fluid />
                    <span class="text-red-500">{{ boqItem.errors.qty?.[0] }}</span>
                </div>
                <div class="flex flex-col gap-2 mt-2">
                    <label for="material_unit" class="font-semibold">Material Unit <span
                            class="text-red-500">*</span></label>
                    <InputNumber id="material_unit" v-model="dataItem.material_unit" size="small" class="flex-auto"
                        inputId="locale-us" locale="en-US" :minFractionDigits="2" fluid autocomplete="off" />
                    <span class="text-red-500">{{ boqItem.errors.material_unit?.[0] }}</span>
                </div>
                <div class="flex flex-col gap-2 mt-2">
                    <label for="labor_unit" class="font-semibold">Labor Unit <span class="text-red-500">*</span></label>
                    <InputNumber id="labor_unit" v-model="dataItem.labor_unit" size="small" class="flex-auto"
                        inputId="locale-us" locale="en-US" :minFractionDigits="2" fluid autocomplete="off" />
                    <span class="text-red-500">{{ boqItem.errors.labor_unit?.[0] }}</span>

                </div>
            </div>
            <div class="flex gap-2">
                <Button type="button" size="small" label="Cancel" severity="secondary" @click="visibleBtn = false"
                    class="flex-1"></Button>
                <Button type="button" size="small" label="Save" @click="submitForm" class="flex-1"></Button>
            </div>
        </Form>
    </Dialog>

</template>

<script setup>
import { ref } from "vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dialog from 'primevue/dialog';
import ContextMenu from 'primevue/contextmenu';
import { useLevelTwoStore } from '@/stores/boqLevelTwo';
import { useBoqItemStore } from '@/stores/boqItem';
const boqTwoStore = useLevelTwoStore();
const boqItem = useBoqItemStore();

//Create new 
const visibleBtn = ref(false);
let dataItem = ref({
    id: 0,
    level_id: 0,
    title: '',
    spec: '',
    brand: '',
    unit: '',
    size: '',
    qty: '',
    material_unit: '',
    labor_unit: ''
});

const errors = ref({});

//Context menu
const cm = ref();
const selectedItem = ref();

const menuModel = ref([
    { label: 'New', icon: 'pi pi-fw pi-file', command: () => newBoqContext(selectedItem) },
    { label: 'Copy', icon: 'pi pi-fw pi-copy', command: () => copyBoqContext(selectedItem) },
    { label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => editBoqContext(selectedItem) },
    { label: 'Refresh', icon: 'pi pi-fw pi-refresh', command: () => refreshBoqContext(selectedItem) },
    { label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => deleteBoqContext(selectedItem) }
]);

const clearData = () => {
    dataItem = {
        id: 0,
        level_id: 0,
        title: '',
        spec: '',
        brand: '',
        size: '',
        unit: '',
        qty: '',
        material_unit: '',
        labor_unit: ''
    };

    visibleBtn.value = true;
}

const onRowContextMenu = (event) => {
    cm.value.show(event.originalEvent);
};

const newBoqContext = async (row) => {
    clearData();
};

const copyBoqContext = async (row) => {
    //alert('Under contruction: ' + row.value.id);\
    const result = confirm("Confirm copy!");
    if (result) {
        await boqItem.copyItem(row.value.id, row.value.parent_id);
    }
};

const refreshBoqContext = async (row) => {
    await boqItem.getAll(row.value.parent_id);
};

const deleteBoqContext = async (row) => {
    const result = confirm("Are you sure you want to delete this item?");
    if (result) {
        await boqItem.delete(row.value.id, row.value.parent_id);
    }
};

const editBoqContext = (row) => {
    const result = boqItem.items.find(res => res.id === row.value.id);
    if (result) {
        dataItem = {
            ...dataItem.value,
            id: result.id,
            level_id: result.parent_id,
            title: result.title,
            spec: result.spec,
            brand: result.brand,
            unit: result.unit,
            size: result.size,
            qty: result.qty,
            material_unit: result.material_unit,
            labor_unit: result.labor_unit
        };

        //console.log(dataItem);

        boqItem.errors = [];
        visibleBtn.value = true;

    }
};

const submitForm = async () => {
    if (dataItem.id > 0) {
        //console.log(dataItem);
        await boqItem.update(dataItem);
    } else {
        await boqItem.create({ ...dataItem, level_id: boqTwoStore.selected.id });
    }

    if (boqItem.errors.length == 0) {
        visibleBtn.value = false;
    }
};

</script>