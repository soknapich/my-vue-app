<template>
    <div>
        <div class="flex flex-column justify-end" v-if="levelOneStore.selected">
            <Button icon="pi pi-plus" title="New" rounded text @click="openModal(true)" />
        </div>
        <ContextMenu ref="cm" :model="menuModel" @hide="selectedItem = null" />
        <DataTable v-model:selection="boqTwoStore.selected" @rowSelect="onRowSelect" contextMenu
            v-model:contextMenuSelection="selectedItem" @rowContextmenu="onRowContextMenu" scrollable
            scrollHeight="300px" selectionMode="single" :value="boqTwoStore.items" size="small"
            v-if="boqTwoStore.items.length > 0">
            <!-- Checkbox Column -->
            <Column>
              <template #body="slotProps">
                <Checkbox v-model="slotProps.data.checked" binary />
              </template>
            </Column>
            <Column style="width:50px">
                <template #body="{ index }">
                    {{ index + 1 }}
                </template>
            </Column>
            <Column field="title"></Column>
            <Column field="count" bodyStyle="text-align:right"></Column>
        </DataTable>
    </div>
    <!-- Create Boq itesm -->
    <Dialog v-model:visible="visibleBtn" maximizable modal :header="dataItem?.id > 0 ? 'Edit' : 'New'"
        :style="{ width: '30rem' }">
        <Form class="w-full">
            <div class="flex flex-col mb-4">
                <div class="flex flex-col gap-2 mb-4">
                    <label for="title" class="font-semibold">Title <span class="text-red-500">*</span></label>
                    <InputText id="title" v-model="dataItem.title" size="small" class="flex-auto" autocomplete="off" />
                    <span class="text-red-500 text-sm">{{ boqTwoStore.errors.title?.[0] }}</span>

                </div>
                <div class="flex gap-2">
                    <Button type="button" size="small" label="Cancel" severity="secondary" @click="visibleBtn = false"
                        class="flex-1"></Button>
                    <Button type="button" size="small" label="Save" @click="submitForm" class="flex-1"></Button>
                </div>

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
import { useLevelOneStore } from '@/stores/boqLevelOne';
import { useLevelTwoStore } from '@/stores/boqLevelTwo';
import { useBoqItemStore } from '@/stores/boqItem';

const levelOneStore = useLevelOneStore();
const boqTwoStore = useLevelTwoStore();
const boqItem = useBoqItemStore();

const confirmDeleteDialog = ref(null);
const confirmCopyDialog = ref(null);

const visibleBtn = ref(false);
let userInfo = ref(null);
let dataItem = ref({
    id: 0,
    parent_id: 0,
    name: '',
});

//Context menu
const cm = ref();
const selectedItem = ref();

let menuModel = ref([]);

const onRowSelect = async (value) => {
    await boqItem.getAll(value.data.id);
};

const openModal = (isNew) => {
    if (isNew) {
        dataItem = {
            id: 0,
            parent_id: boqTwoStore.levelId,
            title: ""
        };
    }

    visibleBtn.value = true;
    boqTwoStore.errors = [];
};

const onRowContextMenu = (event) => {
    cm.value.show(event.originalEvent);
};

const newBoqContext = async (row) => {
    openModal(true);
};

const confirmCopy = async (id, parent_id) => {
    const result = await confirmCopyDialog.value.open({
        title: 'Confirm',
        message: 'Confirm copy?'
    })
    if (result) {
        await boqTwoStore.copyItem(id, parent_id);
    }
};

const copyBoqContext = async (row) => {
    await confirmCopy(row.value.id, row.value.parent_id);
};

const refreshBoqContext = async (row) => {
    await boqTwoStore.getAll(row.value.parent_id);
};

const confirmDelete = async (id, parent_id) => {
    const result = await confirmDeleteDialog.value.open({
        title: 'Delete',
        message: 'Are you sure?'
    })
    if (result) {
        await boqTwoStore.delete(id, parent_id);
    }
};

const deleteBoqContext = async (row) => {
    await confirmDelete(row.value.id, row.value.parent_id);
};

const editBoqContext = async (row) => {
    dataItem = {
        id: row.value.id,
        parent_id: row.value.parent_id,
        title: row.value.title,
    };
    openModal(false);
};

const submitForm = async () => {
    if (dataItem.id > 0) {
        //console.log(dataItem);
        await boqTwoStore.update(dataItem);
    } else {
        await boqTwoStore.create(dataItem);
    }

    if (boqTwoStore.errors.length == 0) {
        visibleBtn.value = false;
    }
};

onMounted(async () => {
    const info = await getUserInfoCookie();
    userInfo = JSON.parse(info || '{}');
    menuModel.value = [
        { label: 'New', icon: 'pi pi-fw pi-file', command: () => newBoqContext(selectedItem), visible: "admin,manger,user".includes(userInfo?.role) ? true : false },
        { label: 'Copy', icon: 'pi pi-fw pi-copy', command: () => copyBoqContext(selectedItem), visible: "admin,manger,user".includes(userInfo?.role) ? true : false },
        { label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => editBoqContext(selectedItem), visible: "admin,manger,user".includes(userInfo?.role) ? true : false },
        { label: 'Refresh', icon: 'pi pi-fw pi-refresh', command: () => refreshBoqContext(selectedItem), visible: "admin,manger,user".includes(userInfo?.role) ? true : false },
        { label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => deleteBoqContext(selectedItem), visible: "admin,manger".includes(userInfo?.role) ? true : false }
    ];
});

</script>
