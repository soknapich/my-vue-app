<template>
    <div class="bg-white text-gray-800 rounded-lg shadow p-2"> 
        <div class="flex flex-column justify-end">
            <Button icon="pi pi-plus" rounded size="small" @click="visibleBtn = true" />
        </div>
        <DataTable v-model:selection="levelOneStore.selected" @rowSelect="onRowSelect"
            scrollable
            scrollHeight="300px"
            selectionMode="single" 
            :value="levelOneStore.items"
            size="small" 
            v-if="levelOneStore.items?.length > 0">
            <Column field="name"></Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref } from "vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

import { useLevelOneStore } from '@/stores/boqLevelOne';
import { useLevelTwoStore } from '@/stores/boqLevelTwo';
import { useBoqItemStore } from "@/stores/boqItem";

const levelOneStore = useLevelOneStore();
const levelTwoStore = useLevelTwoStore();
const boqItemStore = useBoqItemStore();

const visibleBtn = ref(false);

const onRowSelect = async (value) => {
    levelTwoStore.items = [];
    boqItemStore.items = [];
    levelTwoStore.selected = null;
    await levelTwoStore.getAll(value.data.id);
}
</script>