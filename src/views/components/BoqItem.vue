<template>
    <div class="">
        <div class="flex flex-column justify-end" v-if="boqTwoStore.selected">
            <!-- <Button icon="pi pi-plus" title="New" rounded text @click="downloadExcel();" /> -->
            <Button icon="pi pi-plus" title="New" rounded text @click="clearData();" />
        </div>

        <div class="card flex flex-wrap justify-center gap-4">
            <div class="flex items-center gap-2">
                <Checkbox v-model="estimate_or_actual" inputId="ingredient1" name="estimate_or_actual" value="Estimate"
                    size="small" />
                <label for="ingredient1"> Estimate </label>
            </div>
            <div class="flex items-center gap-2">
                <Checkbox v-model="estimate_or_actual" inputId="ingredient2" name="estimate_or_actual" value="Actual"
                    size="small" />
                <label for="ingredient2"> Actual </label>
            </div>

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
            <Column field="qty_val" header="Qty" v-if="estimate_or_actual.includes('Estimate')"></Column>
            <Column field="material_val" header="Material Cost" v-if="estimate_or_actual.includes('Estimate')"></Column>
            <Column field="labor_val" header="Labor Cost" v-if="estimate_or_actual.includes('Estimate')"></Column>
            <Column field="actual_qty" header="Actual Qty" v-if="estimate_or_actual.includes('Actual')"></Column>
            <Column field="actual_material" header="Actual Material Cost" v-if="estimate_or_actual.includes('Actual')">
            </Column>
            <Column field="actual_labor" header="Actual Labor Cost" v-if="estimate_or_actual.includes('Actual')"></Column>
        </DataTable>
    </div>

    <!-- Create Boq itesm -->
    <Dialog v-model:visible="visibleBtn" maximizable modal :header="dataItem?.id > 0 ? 'Edit' : 'New'"
        :style="{ width: '30rem' }">
        <Form class="w-full">
            <div class="flex flex-col mb-4">
                <div class="flex flex-col">
                    <label for="title" class="font-semibold">Title <span class="text-red-500">*</span></label>
                    <InputText id="title" v-model="dataItem.title" size="small" class="flex-auto" autocomplete="off"
                        fluid />
                    <span class="text-red-500 text-sm">{{ boqItem.errors.title?.[0] }}</span>

                </div>
                <div class="flex flex-col mt-2">
                    <label for="spec" class="font-semibold">Spec <span class="text-red-500">*</span></label>
                    <InputText id="spec" v-model="dataItem.spec" size="small" class="flex-auto" autocomplete="off"
                        fluid />
                    <span class="text-red-500 text-sm">{{ boqItem.errors.spec?.[0] }}</span>
                </div>
                <div class="flex flex-col gap-2 mt-2">
                    <div class="grid grid-cols-12 gap-2">
                        <div class="col-span-12 md:col-span-6">
                            <label for="brand" class="font-semibold">Brand <span class="text-red-500">*</span></label>
                            <InputText id="brand" v-model="dataItem.brand" size="small" class="flex-auto"
                                autocomplete="off" fluid />
                            <span class="text-red-500 text-sm">{{ boqItem.errors.brand?.[0] }}</span>
                        </div>

                        <div class="col-span-12 md:col-span-6">
                            <label for="size" class="font-semibold">Size <span class="text-red-500">*</span></label>
                            <InputText id="size" v-model="dataItem.size" size="small" class="flex-auto"
                                autocomplete="off" fluid />
                            <span class="text-red-500 text-sm">{{ boqItem.errors.size?.[0] }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-2 mt-2">

                    <div class="grid grid-cols-12 gap-2">
                        <div class="col-span-12 md:col-span-6">
                            <label for="unit" class="font-semibold">Unit <span class="text-red-500">*</span></label>
                            <InputText id="unit" v-model="dataItem.unit" size="small" class="flex-auto"
                                autocomplete="off" fluid />
                            <span class="text-red-500 text-sm">{{ boqItem.errors.unit?.[0] }}</span>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <label for="qty" class="font-semibold">Qty <span class="text-red-500">*</span></label>
                            <InputNumber id="qty" v-model="dataItem.qty" size="small" class="flex-auto"
                                autocomplete="off" inputId="locale-us" locale="en-US" :minFractionDigits="1" fluid />
                            <span class="text-red-500 text-sm">{{ boqItem.errors.qty?.[0] }}</span>

                        </div>
                    </div>

                </div>
                <div class="flex flex-col gap-2 mt-2">
                    <div class="grid grid-cols-12 gap-2">
                        <div class="col-span-12 md:col-span-6">
                            <label for="material" class="font-semibold">Material Cost <span
                                    class="text-red-500">*</span></label>
                            <InputNumber id="material" v-model="dataItem.material" size="small" class="flex-auto"
                                mode="currency" currency="USD" locale="en-US" fluid autocomplete="off" />
                            <span class="text-red-500 text-sm">{{ boqItem.errors.material?.[0] }}</span>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <label for="labor" class="font-semibold">Labor Cost <span
                                    class="text-red-500">*</span></label>
                            <InputNumber id="labor" v-model="dataItem.labor" size="small" class="flex-auto"
                                mode="currency" currency="USD" locale="en-US" fluid autocomplete="off" />
                            <span class="text-red-500 text-sm">{{ boqItem.errors.labor?.[0] }}</span>

                        </div>

                    </div>
                </div>
            </div>
            <div class="flex gap-2">
                <Button type="button" size="small" label="Cancel" severity="secondary" @click="visibleBtn = false"
                    class="flex-1"></Button>
                <Button type="button" size="small" label="Save" @click="submitForm" class="flex-1"></Button>
            </div>
        </Form>
    </Dialog>

    <!-- Create Boq itesm -->
    <Dialog v-model:visible="visibleBtnActual" maximizable modal header="Actual Value" :style="{ width: '30rem' }">
        <Form class="w-full">
            <div class="flex flex-col mb-4">
                <div class="flex gap-2">
                    <Checkbox v-model="isSame" inputId="isSame" binary @change="onChecked" />
                    <label for="agree">Same as Estimate</label>
                </div>
            </div>

            <div class="flex flex-col mb-4">
                <div class="flex flex-col">
                    <label for="title" class="font-semibold">Actual Qty <span class="text-red-500">*</span></label>
                    <InputNumber id="actual_qty" v-model="dataItemActual.actual_qty" size="small" class="flex-auto"
                    autocomplete="off" inputId="locale-us" locale="en-US" :minFractionDigits="1" fluid />
                    <span class="text-red-500 text-sm">{{ boqItem.errors1.actual_qty?.[0] }}</span>
                </div>
            </div>
            <div class="flex flex-col mb-4">
                <div class="flex flex-col">
                    <label for="title" class="font-semibold">Actual Material Cost <span class="text-red-500">*</span></label>
                    <InputNumber id="actual_qty" v-model="dataItemActual.actual_material" size="small" class="flex-auto"
                        mode="currency" currency="USD" locale="en-US" fluid autocomplete="off" />
                    <span class="text-red-500 text-sm">{{ boqItem.errors1.actual_material?.[0] }}</span>
                </div>
            </div>
            <div class="flex flex-col mb-4">
                <div class="flex flex-col">
                    <label for="title" class="font-semibold">Actual Labor Cost <span class="text-red-500">*</span></label>
                    <InputNumber id="actual_qty" v-model="dataItemActual.actual_labor" size="small" class="flex-auto"
                        mode="currency" currency="USD" locale="en-US" fluid autocomplete="off" />
                    <span class="text-red-500 text-sm">{{ boqItem.errors1.actual_labor?.[0] }}</span>
                </div>
            </div>

            <div class="flex gap-2">
                <Button type="button" size="small" label="Cancel" severity="secondary" @click="visibleBtnActual = false"
                    class="flex-1"></Button>
                <Button type="button" size="small" label="Save" @click="submitActualForm" class="flex-1"></Button>
            </div>

        </Form>
    </Dialog>

    <ConfirmDialog ref="confirmDeleteDialog" />
    <ConfirmDialog ref="confirmCopyDialog" />

</template>

<script setup>
import { ref, onMounted } from "vue";
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { getUserInfoCookie } from '@/services/authentication';
import { useLevelTwoStore } from '@/stores/boqLevelTwo';
import { useBoqItemStore } from '@/stores/boqItem';
const boqTwoStore = useLevelTwoStore();
const boqItem = useBoqItemStore();

const estimate_or_actual = ref(["Estimate", ""]);
const isSame = ref(false);
const visibleBtnActual = ref(false);
//Create new
const visibleBtn = ref(false);
let userInfo = ref(null);

const confirmDeleteDialog = ref(null);
const confirmCopyDialog = ref(null);

let dataItemActual = ref({
    id: 0,
    actual_qty: 0,
    actual_material: 0,
    actual_labor: 0,
    row: {}
});

const onChecked = (e) => {
    //alert(isSame.value);
    if (isSame.value) {
        dataItemActual = {
            id: dataItemActual.row.id,
            actual_qty: dataItemActual.row.qty_val,
            actual_material: dataItemActual.row.material_val,
            actual_labor: dataItemActual.row.labor_val,
            row: dataItem.row
        };
    }
};

let dataItem = ref({
    id: 0,
    level_id: 0,
    title: '',
    spec: '',
    brand: '',
    unit: '',
    size: '',
    qty: '',
    material: '',
    labor: ''
});

//Context menu
const cm = ref();
const selectedItem = ref();

let menuModel = ref([]);

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
        material: '',
        labor: ''
    };

    visibleBtn.value = true;
};

const onRowContextMenu = (event) => {
    cm.value.show(event.originalEvent);
};

const newBoqContext = async (row) => {
    clearData();
};

const confirmCopy = async (id, parent_id) => {
    const result = await confirmCopyDialog.value.open({
        title: 'Confirm',
        message: 'Confirm copy?'
    })
    if (result) {
        await boqItem.copyItem(id, parent_id);
    }
};

const copyBoqContext = async (row) => {
    await confirmCopy(row.value.id, row.value.parent_id);
};

const refreshBoqContext = async (row) => {
    await boqItem.getAll(row.value.parent_id);
};

const confirmDelete = async (id, parent_id) => {
    const result = await confirmDeleteDialog.value.open({
        title: 'Delete',
        message: 'Are you sure?'
    })
    if (result) {
        await boqItem.delete(id, parent_id);
    }
};

const deleteBoqContext = async (row) => {
    await confirmDelete(row.value.id, row.value.parent_id);
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
            qty: result.qty_val,
            material: result.material_val,
            labor: result.labor_val
        };
        //console.log(dataItem);
        boqItem.errors = [];
        visibleBtn.value = true;

    }
};

const editBoqActualContext = (row) => {
    isSame.value = false;
    const result = boqItem.items.find(res => res.id === row.value.id);
    dataItemActual = {
        id: result.id,
        actual_qty: result.actual_qty,
        actual_material: result.actual_material,
        actual_labor: result.actual_labor,
        row: result
    };
    visibleBtnActual.value = true;
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

const submitActualForm = async () => {
    await boqItem.updateActual({ ...dataItemActual, level_id: boqTwoStore.selected.id });
    if (boqItem.errors1.length == 0) {
        visibleBtnActual.value = false;
    }
};

onMounted(async () => {
    const info = await getUserInfoCookie();
    userInfo = JSON.parse(info || '{}');
    menuModel.value = [
        { label: 'New', icon: 'pi pi-fw pi-file', command: () => newBoqContext(selectedItem), visible: "admin,manger,user".includes(userInfo?.role) ? true : false },
        { label: 'Copy', icon: 'pi pi-fw pi-copy', command: () => copyBoqContext(selectedItem), visible: "admin,manger,user".includes(userInfo?.role) ? true : false },
        { label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => editBoqContext(selectedItem), visible: "admin,manger,user".includes(userInfo?.role) ? true : false },
        { label: 'Actual', icon: 'pi pi-fw pi-pencil', command: () => editBoqActualContext(selectedItem), visible: "admin,manger".includes(userInfo?.role) ? true : false },
        { label: 'Refresh', icon: 'pi pi-fw pi-refresh', command: () => refreshBoqContext(selectedItem), visible: "admin,manger,user".includes(userInfo?.role) ? true : false },
        { label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => deleteBoqContext(selectedItem), visible: "admin,manger".includes(userInfo?.role) ? true : false }
    ];
});


</script>
