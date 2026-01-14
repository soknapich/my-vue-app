<template>
    <div class="card mb-2">
        <div class="grid grid-cols-12 gap-1">
            <div class="col-span-6">
                <Select v-model="selectedPlan" :options="plans" filter optionLabel="name" size="small"
                    placeholder="Select a Plan" class="w-full" @update:modelValue="onPlanChange">
                    <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex items-center">
                            <div>{{ slotProps.value.name }}</div>
                        </div>
                        <span v-else>
                            {{ slotProps.placeholder }}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div class="flex items-center">
                            <div>{{ slotProps.option.name }}</div>
                        </div>
                    </template>
                </Select>
            </div>
            <div class="col-span-6">
                <Select v-model="selectedHouse" :options="houses" filter optionLabel="name" size="small"
                    placeholder="Select a House" class="w-full" @update:modelValue="onHouseChange">
                    <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex items-center">
                            <div>{{ slotProps.value.name }}</div>
                        </div>
                        <span v-else>
                            {{ slotProps.placeholder }}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div class="flex items-center">
                            <div>{{ slotProps.option.name }}</div>
                        </div>
                    </template>
                </Select>
            </div>
        </div>

    </div>

    <div class="card">
        <div class="grid grid-cols-12 gap-1">
            <div class="col-span-6" style="height: 350px;">
                <BoqLevelOne />
            </div>
            <div class="col-span-6" style="height: 350px;">
                <BoqLevelTwo/>
            </div>
            <div class="col-span-12">
                <BoqItem/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Select from 'primevue/select';
import { getAll, getNext } from "@/apis/plan";
import BoqItem from "@/views/components/BoqItem.vue";
import BoqLevelOne from "@/views/components/BoqLevelOne.vue";
import BoqLevelTwo from "@/views/components/BoqLevelTwo.vue";
import { useLevelOneStore } from '@/stores/boqLevelOne';
import { useLevelTwoStore } from "@/stores/boqLevelTwo";
import { useBoqItemStore } from "@/stores/boqItem";


const levelOneStore = useLevelOneStore();
const levelTwoStore = useLevelTwoStore();
const boqItemStore = useBoqItemStore();


const selectedPlan = ref();
const selectedHouse = ref();

let plans = ref([]);
let houses = ref([]);



const onPlanChange = async (value) => {
    //Clear all table befor call
    levelOneStore.items = [];
    levelTwoStore.items = [];
    boqItemStore.items = [];

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
    levelTwoStore.items = [];
    boqItemStore.items = [];
    await levelOneStore.getAll(value.id);
};

onMounted(async () => {
    const response = await getAll({
        params: {
            per_page: 20,
            order_field: 'created_at',
            order_by: 'asc'
        }
    });
    if (response.data.status) {
        plans.value = response.data.data.data;
    }
});

</script>