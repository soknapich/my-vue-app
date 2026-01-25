<template>
    <!-- ✅ REQUIRED -->
    <Toast position="top-right" />
    <Dialog v-model:visible="levelOneStore.openDailog" maximizable modal header="Copy All Items"
        :style="{ width: '30rem' }">

        <Form class="w-full">
            <div class="flex flex-col mb-4">
                <!-- <div class="border p-2 mb-2 rounded">{{ itemName }}</div> -->
                <div class="flex flex-col gap-2">
                    <label for="to-house" class="font-semibold">គម្រោង {{ }} <span class="text-red-500">*</span></label>
                    <Select id="plan" v-model="selectedPlan" :options="plans" filter optionLabel="name" size="small"
                        placeholder="Select a Plan" class="w-full" @update:modelValue="onPlanChange">
                        <template #value="slotProps">
                            <div v-if="slotProps.value" class="flex items-center">
                                <div>{{plans.findIndex(h => h.id === slotProps.value.id) + 1}} - {{
                                    slotProps.value.name }}</div>
                            </div>
                            <span v-else>
                                {{ slotProps.placeholder }}
                            </span>
                        </template>
                        <template #option="slotProps">
                            <div class="flex items-center">
                                <div>{{ slotProps.index + 1 }} - {{ slotProps.option.name }}</div>
                            </div>
                        </template>
                    </Select>
                </div>
                <div class="flex flex-col gap-2 mt-3 mb-4">
                    <label for="house-no" class="font-semibold">លេខផ្ទះ <span class="text-red-500">*</span></label>
                    <Select id="house-no" v-model="selectedHouse" :options="houses" filter optionLabel="name"
                        size="small" placeholder="Select a House" class="w-full" @update:modelValue="onHouseChange">

                        <template #value="slotProps">
                            <div v-if="slotProps.value" class="flex items-center">
                                <div>{{houses.findIndex(h => h.id === slotProps.value.id) + 1}} - {{
                                    slotProps.value.name }}</div>
                            </div>
                            <span v-else>
                                {{ slotProps.placeholder }}
                            </span>
                        </template>
                        <template #option="slotProps">
                            <div class="flex items-center">
                                <div>{{ slotProps.index + 1 }} - {{ slotProps.option.name }}</div>
                            </div>
                        </template>
                    </Select>
                </div>


                <div class="flex gap-2 mt-2">
                    <Button type="button" size="small" label="Cancel" @click="levelOneStore.openDailog = false"
                        severity="secondary" class="flex-1"></Button>
                    <Button type="button" size="small" label="Save" @click="submitForm" class="flex-1"></Button>
                </div>

            </div>
        </Form>
    </Dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Select from 'primevue/select';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

import { getAll, getNext } from "@/apis/plan";
import { useLevelOneStore } from '@/stores/boqLevelOne';

const levelOneStore = useLevelOneStore();

const itemName = ref();

const selectedPlan = ref();
const selectedHouse = ref();

let plans = ref([]);
let houses = ref([]);

//Toast
const toast = useToast();
const showToast = () => {
    toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Success',
        life: 3000
    })
}

const onPlanChange = async (value) => {
    //call get all houses 
    const response = await getNext(`/house?plan_id=${value.id}`, {
        params: {
            per_page: 20,
            order_field: 'name',
            order_by: 'asc'
        }
    });

    selectedHouse.value = null;
    houses.value = response.data.data;
};

const onHouseChange = async (value) => {
    //alert(value.id);
    //levelTwoStore.items = [];
    //boqItemStore.items = [];
    //levelOneStore.houseId = value.id;
    //await levelOneStore.getAll(value.id);
};

const submitForm = async () => {
    //const item = levelOneStore.items.find(obj => obj.id === levelOneStore.selected);
    const pid = selectedPlan.value;
    const hid = selectedHouse.value;

    await levelOneStore.copyAllItems(pid?.id, hid?.id, levelOneStore.selected);
    showToast();
    setTimeout(() => {
        levelOneStore.openDailog = false;
    }, 1000);
    
  
}

onMounted(async () => {
    itemName.value = levelOneStore.selected;

    const response = await getAll({
        params: {
            per_page: 200,
            order_field: 'created_at',
            order_by: 'asc'
        }
    });

    if (response.data.status) {
        plans.value = response.data.data.data;
    }
});

</script>