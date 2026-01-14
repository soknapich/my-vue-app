<template>
    <div class="bg-white text-gray-800 rounded-lg shadow p-2">
        <div class="flex flex-column justify-end" v-if="boqTwoStore.selected">
            <Button icon="pi pi-plus" rounded size="small" @click="visibleBtn = true" />
        </div>

        <ContextMenu ref="cm" :model="menuModel" @hide="selectedItem = null" />
        <DataTable scrollable scrollHeight="400px" contextMenu v-model:contextMenuSelection="selectedItem"
            @rowContextmenu="onRowContextMenu" selectionMode="single" :value="boqItem.items" size="small"
            v-if="boqItem.items?.length > 0">
            <Column field="id"></Column>
            <Column field="name" header="Title"></Column>
            <Column field="spec" header="Spec"></Column>
            <Column field="brand" header="Brand"></Column>
            <Column field="size" header="Size"></Column>
            <Column field="unit" header="Unit_Cost"></Column>
            <Column field="qty" header="Qty"></Column>
            <Column field="material_unit" header="Material_Unit_Rate"></Column>
            <Column field="labor_unit" header="Labor_Unit_Rate"></Column>
        </DataTable>
    </div>

    <!-- Create Boq itesm -->
    <Dialog v-model:visible="visibleBtn" maximizable  modal header="Create Item" :style="{ width: '30rem' }">
        <Form class="w-full">
            <div class="flex flex-col mb-4">
                <div class="flex flex-col gap-2">
                    <label for="title" class="font-semibold">Title</label>
                    <InputText id="title" v-model="dataItem.name"  size="small" placeholder="Title"
                        class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex flex-col gap-2 mt-2">
                    <label for="spec" class="font-semibold">Spec</label>
                    <InputText id="spec" v-model="dataItem.spec"  size="small" placeholder="Spec"
                        class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex flex-col gap-2 mt-2">
                    <label for="brand" class="font-semibold">Brand</label>
                    <InputText id="brand" v-model="dataItem.brand"  size="small" placeholder="Brand"
                        class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex flex-col gap-2 mt-2">
                    <label for="size" class="font-semibold">Size</label>
                    <InputText id="size" v-model="dataItem.size"  size="small" placeholder="Size"
                        class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex flex-col gap-2 mt-2">
                    <label for="qty" class="font-semibold">Qty</label>
                    <InputText id="qty" v-model="dataItem.qty"  size="small" placeholder="Qty"
                        class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex flex-col gap-2 mt-2">
                    <label for="unit" class="font-semibold">Unit</label>
                    <InputText id="unit" v-model="dataItem.unit"  size="small" placeholder="Unit"
                        class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex flex-col gap-2 mt-2">
                    <label for="material_unit" class="font-semibold">Material Unit</label>
                    <InputText id="material_unit" v-model="dataItem.material_unit"  size="small"
                        placeholder="Material Unit" class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex flex-col gap-2 mt-2">
                    <label for="labor_unit" class="font-semibold">Labor Unit</label>
                    <InputText id="labor_unit" v-model="dataItem.labor_unit"  size="small"
                        placeholder="Labor Unit" class="flex-auto" autocomplete="off" />
                </div>
            </div>
            <div class="flex gap-2">
                <Button type="button" size="small" label="Cancel" severity="secondary"
                    @click="visibleBtn = false" class="flex-1"></Button>
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
import Dialog from 'primevue/dialog';
import ContextMenu from 'primevue/contextmenu';
import { useLevelTwoStore } from '@/stores/boqLevelTwo';
import { useBoqItemStore } from '@/stores/boqItem';
const boqTwoStore = useLevelTwoStore();
const boqItem = useBoqItemStore();

//Create new 
const visibleBtn = ref(false);
const dataItem = ref({
    level_id: 0,
    name: 'hello',
    spec: 'aa',
    brand: '3',
    size: '3',
    unit: '4',
    qty: '4',
    material_unit: '3',
    labor_unit: '2'
});

const initialValues = {
    name: ''
};

const resolver = ({ values }) => {
    const errors = { name: [] };

    if (!values.name) {
        errors.name.push({ type: 'required', message: 'Username is required.' });
    }

    return {
        values,
        errors
    };
};

const onFormSubmit = ({ valid, values }) => {
    if (valid) {
        //toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
    }
}
//Context menu
const cm = ref();
const selectedItem = ref();

const menuModel = ref([
    { label: 'New', icon: 'pi pi-fw pi-file', command: () => newBoqContext(selectedItem) },
    { label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => deleteBoqContext(selectedItem) },
    { label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => editBoqContext(selectedItem) }
]);

const onRowContextMenu = (event) => {
    cm.value.show(event.originalEvent);
};

const newBoqContext = async (row) => {
    visibleBtn.value = true;
};

const deleteBoqContext = async (row) => {
    const result = confirm("Are you sure you want to delete this item?");
    if (result) {
        await boqItem.delete(row.value.id, row.value.parent_id);
    }
};

const editBoqContext = (row) => {
    alert(row.value.id);
};

const submitForm = async () => {
    visibleBtn.value = false;
    await boqItem.create({ ...dataItem.value, level_id: boqTwoStore.selected.id });

};

</script>