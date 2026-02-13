<template>
    <div>
        <!-- {{ levelOneStore.items.filter(res=>res.checked).map(res=>res.id) }} -->
        <div class="flex flex-column justify-end gap-1" v-if="levelOneStore.houseId">
           <Button icon="pi pi-ellipsis-v"  rounded text tile="New"
            @click="toggle"
            aria-haspopup="true"
            aria-controls="overlay_menu"/>
            <Menu ref="menuBar" id="overlay_menu" :model="mItems" :popup="true" />

            <!--
              <Button icon="pi pi-copy" severity="danger" v-if="levelOneStore.items.filter(res => res.checked).map(res => res.id).length > 0"
                  title="Duplicate" rounded text
                  @click="copyMultipleBoq(levelOneStore.items.filter(res => res.checked).map(res => res.id), levelOneStore.houseId)" />
              <Button icon="pi pi-plus" title="New" rounded text @click="openModal(true)" />
             -->
        </div>
        <ContextMenu ref="cm" :model="menuModel" @hide="selectedItem = null" />
        <DataTable v-model:selection="levelOneStore.selected" @rowSelect="onRowSelect" contextMenu
            v-model:contextMenuSelection="selectedItem" @rowContextmenu="onRowContextMenu" scrollable
            scrollHeight="300px" selectionMode="single" :value="levelOneStore.items" size="small"
            v-if="levelOneStore.items?.length > 0">
            <!-- Checkbox Column -->
            <Column>
                <template #body="slotProps">
                    <Checkbox v-model="slotProps.data.checked" binary size="small" />
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
    <ConfirmDialog ref="confirmDeleteDialog" />
    <ConfirmDialog ref="confirmCopyDialog" />

</template>

<script setup>
import { ref, onMounted } from "vue";
import { getUserInfoCookie } from '@/services/authentication';
import MoveDialog from "@/views/components/MoveDialog.vue";
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { useLevelOneStore } from '@/stores/boqLevelOne';
import { useLevelTwoStore } from '@/stores/boqLevelTwo';
import { useBoqItemStore } from "@/stores/boqItem";

const levelOneStore = useLevelOneStore();
const levelTwoStore = useLevelTwoStore();
const boqItemStore = useBoqItemStore();

const confirmDeleteDialog = ref(null);
const confirmCopyDialog = ref(null);

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

const confirmCopy = async (id, house_id) => {
    const result = await confirmCopyDialog.value.open({
        title: 'Confirm',
        message: 'Confirm copy?'
    })
    if (result) {
        await levelOneStore.copyItem(id, house_id);
    }
};

const copyBoqContext = async (row) => {
    await confirmCopy(row.value.id, row.value.house_id);
};

const copyMultipleBoq = async (ids, house_id) => {
    const result = await confirmCopyDialog.value.open({
        title: 'Confirm',
        message: 'Confirm copy?'
    })
    if (result) {
        await levelOneStore.copyMultipleItems(ids, house_id);
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

const confirmDelete = async (id, house_id) => {
    const result = await confirmDeleteDialog.value.open({
        title: 'Delete',
        message: 'Are you sure?'
    })
    if (result) {
        await levelOneStore.delete(id, house_id);
    }
};

const deleteBoqContext = async (row) => {
    await confirmDelete(row.value.id, row.value.house_id);
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

//Menu
const menuBar = ref();
const mItems = ref([
  {
    // label: 'Options',
    items: [
      {
        label: 'New',
        icon: 'pi pi-plus',
        command: (ev) => {
          openModal(true);
        },
      },
      {
        label: 'Copy',
        icon: 'pi pi-copy',
        command: (ev) => {
          if(levelOneStore.items.filter(res => res.checked).map(res => res.id).length > 0){
            copyMultipleBoq(levelOneStore.items.filter(res => res.checked).map(res => res.id), levelOneStore.houseId);
          }else{
            alert("Please select item!");
          }
        },
      },
      {
        label: 'Send to',
        icon: 'pi pi-send',
        command: ()=>{
          moveBoqItems(levelOneStore.houseId);
        }
      }

    ],
  },
]);
const toggle = (event) => {
  menuBar.value.toggle(event);
};

</script>
