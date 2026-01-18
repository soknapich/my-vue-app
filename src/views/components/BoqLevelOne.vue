<template>
    <div>
        <div class="flex flex-column justify-end" v-if="levelOneStore.houseId">
            <Button icon="pi pi-plus" rounded size="small" @click="openModal(true)" />
        </div>
        <ContextMenu ref="cm" :model="menuModel" @hide="selectedItem = null" />
        <DataTable v-model:selection="levelOneStore.selected" @rowSelect="onRowSelect" contextMenu
            v-model:contextMenuSelection="selectedItem" @rowContextmenu="onRowContextMenu" scrollable
            scrollHeight="300px" selectionMode="single" :value="levelOneStore.items" size="small"
            v-if="levelOneStore.items?.length > 0">
            <Column field="title"></Column>
            <Column field="count"></Column>
        </DataTable>
    </div>
    <!-- Create Boq itesm -->
    <Dialog v-model:visible="visibleBtn" maximizable modal header="Create Item" :style="{ width: '30rem' }">
        <Form class="w-full">
            <div class="flex flex-col mb-4">
                <div class="flex flex-col gap-2 mb-4">
                    <label for="title" class="font-semibold">Title <span class="text-red-500">*</span></label>
                    <InputText id="title" v-model="dataItem.title" size="small" class="flex-auto" autocomplete="off" />
                    <span class="text-red-500">{{ levelOneStore.errors.title?.[0] }}</span>

                </div>
                <div class="flex gap-2">
                    <Button type="button" size="small" label="Cancel" severity="secondary" @click="visibleBtn = false"
                        class="flex-1"></Button>
                    <Button type="button" size="small" label="Save" @click="submitForm" class="flex-1"></Button>
                </div>

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
import ContextMenu from 'primevue/contextmenu';
import Dialog from 'primevue/dialog';
import { useLevelOneStore } from '@/stores/boqLevelOne';
import { useLevelTwoStore } from '@/stores/boqLevelTwo';
import { useBoqItemStore } from "@/stores/boqItem";

const levelOneStore = useLevelOneStore();
const levelTwoStore = useLevelTwoStore();
const boqItemStore = useBoqItemStore();

const visibleBtn = ref(false);

let dataItem = ref({
    id: 0,
    house_id: 0,
    title: '',
});

//Context menu
const cm = ref();
const selectedItem = ref();

const menuModel = ref([
    { label: 'New', icon: 'pi pi-fw pi-file', command: () => newBoqContext(selectedItem) },
    { label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => editBoqContext(selectedItem) },
    { label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => deleteBoqContext(selectedItem) }
]);

const openModal = (isNew) => {
    
    if (isNew) {
        dataItem = {
            id: 0,
            house_id: levelOneStore.houseId,
            title: ""
        };
    }

    visibleBtn.value = true;
    levelOneStore.errors = [];
}

const onRowContextMenu = (event) => {
    cm.value.show(event.originalEvent);
};
const newBoqContext = async (row) => {
    openModal(true);
};

const deleteBoqContext = async (row) => {
    const result = confirm("Are you sure you want to delete this item?");
    if (result) {
        await levelOneStore.delete(row.value.id, row.value.house_id);
    }
};

const editBoqContext = async (row) => {
    dataItem = {
        id: row.value.id,
        house_id: row.value.house_id,
        title: row.value.title,
    };
    openModal(false);
};

const onRowSelect = async (value) => {
    //console.log(value);
    levelTwoStore.items = [];
    boqItemStore.items = [];
    levelTwoStore.selected = null;
    levelTwoStore.levelId = value.data.id;
    await levelTwoStore.getAll(value.data.id);
}

const submitForm = async () => {
    if (dataItem.id > 0) {
        //console.log(dataItem);
        await levelOneStore.update(dataItem);
    } else {
        await levelOneStore.create(dataItem);
    }
    
    if (levelOneStore.errors.length == 0) {
        visibleBtn.value = false;
    }
};
</script>