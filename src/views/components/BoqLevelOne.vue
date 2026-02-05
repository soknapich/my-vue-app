<template>
    <div>
        <div class="flex flex-column justify-end gap-2" v-if="levelOneStore.houseId">
            <Button icon="pi pi-copy" title="Copy All" rounded size="small"
                @click="moveBoqItems(levelOneStore.houseId)" />
            <Button icon="pi pi-plus" title="New" rounded size="small" @click="openModal(true)" />
        </div>
        <ContextMenu ref="cm" :model="menuModel" @hide="selectedItem = null" />
        <DataTable v-model:selection="levelOneStore.selected" @rowSelect="onRowSelect" contextMenu
            v-model:contextMenuSelection="selectedItem" @rowContextmenu="onRowContextMenu" scrollable
            scrollHeight="300px" selectionMode="single" :value="levelOneStore.items" size="small"
            v-if="levelOneStore.items?.length > 0">
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
                    <span class="text-red-500 text-sm">{{ levelOneStore.errors.title?.[0] }}</span>

                </div>
                <div class="flex gap-2">
                    <Button type="button" size="small" label="Cancel" severity="secondary" @click="visibleBtn = false"
                        class="flex-1"></Button>
                    <Button type="button" size="small" label="Save" @click="submitForm" class="flex-1"></Button>
                </div>

            </div>
        </Form>
    </Dialog>

    <MoveDialog v-if="levelOneStore.openDailog" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getUserInfoCookie } from '@/services/authentication';
import MoveDialog from "@/views/components/MoveDialog.vue";
import { useLevelOneStore } from '@/stores/boqLevelOne';
import { useLevelTwoStore } from '@/stores/boqLevelTwo';
import { useBoqItemStore } from "@/stores/boqItem";

const levelOneStore = useLevelOneStore();
const levelTwoStore = useLevelTwoStore();
const boqItemStore = useBoqItemStore();

const visibleBtn = ref(false);
let userInfo = ref(null);
let dataItem = ref({
    id: 0,
    house_id: 0,
    title: '',
});

//Context menu
const cm = ref();
const selectedItem = ref();


let menuModel = ref([]);

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

const copyBoqContext = async (row) => {
    //alert('Under contruction: ' + row.value.id);
    const result = confirm("Confirm copy!");
    if (result) {
        await levelOneStore.copyItem(row.value.id, row.value.house_id);
    }
};

const moveBoqItems = async (house_id) => {
    //alert('Under contruction: ' + row.value.id);
    levelOneStore.openDailog = true;
    levelOneStore.selected = house_id;
    //alert(house_id);
    // const result = confirm("Confirm copy!");
    // if (result) {
    //     await levelOneStore.copyItem(row.value.id, row.value.house_id);
    // }
};

const refreshBoqContext = async (row) => {
    await levelOneStore.getAll(row.value.house_id);
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