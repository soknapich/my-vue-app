<template>
    <div class="bg-white text-gray-800 rounded-lg shadow p-2">
        <div class="flex flex-column justify-end">
            <Button icon="pi pi-plus" rounded size="small" @click="visibleBtn = true" />
        </div>
        <DataTable 
            v-model:selection="boqTwoStore.selected"
            @rowSelect="onRowSelect"
            scrollable
            scrollHeight="300px"
            selectionMode="single"
            :value="boqTwoStore.items"
            size="small" 
            v-if="boqTwoStore.items.length > 0">
            <Column field="name"></Column>
        </DataTable>
    </div>

</template>

<script setup>
import { ref, onMounted } from "vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import { useLevelTwoStore } from '@/stores/boqLevelTwo';
import { useBoqItemStore } from '@/stores/boqItem';

const boqTwoStore = useLevelTwoStore();
const boqItem = useBoqItemStore();
const visibleBtn = ref(false);

const onRowSelect = async (value) => {
    await boqItem.getAll(value.data.id);
};

</script>