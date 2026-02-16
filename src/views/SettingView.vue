<template>
  <h2 class="text-xl font-semibold text-gray-800 ml-2 m-2">Allow User</h2>
  <div class="overflow-x-auto">
    <div class="card mb-2">
      <div class="grid grid-cols-12 gap-1">
        <div class="col-span-12">
          <div class="bg-white text-gray-800 rounded-lg shadow p-2">

            <DataTable v-model:filters="filters" scrollHeight="400px" scrollable selectionMode="single" :value="users" size="small"
            :globalFilterFields="['name','email','role']">
              <template #header>
                  <div class="flex justify-between">
                      <Button type="button" icon="pi pi-filter-slash" size="small" label="Clear" variant="outlined" @click="clearFilter()" />
                      <IconField>
                          <InputIcon>
                              <i class="pi pi-search" />
                          </InputIcon>
                          <InputText v-model="filters['global'].value" placeholder="Keyword Search" size="small"/>
                      </IconField>
                  </div>
              </template>
              <Column field="id" header="#" style="width:50px" sortable>
                <template #body="{ index }">
                  {{ index + 1 }}
                </template>
              </Column>
              <Column field="name" header="Name" sortable></Column>
              <Column field="email" header="Email" sortable></Column>
              <Column field="role" header="Role" sortable></Column>
              <Column field="is_allow" header="Allow" sortable>
                <template #body="slotProps">
                  <Button label="Enabled" @click="confirmDisable(slotProps?.data?.id, slotProps?.data?.is_allow)"
                    size="small" severity="success" text v-if="slotProps?.data?.is_allow" />
                  <Button label="Disabled" @click="confirmDisable(slotProps?.data?.id, slotProps?.data?.is_allow)"
                    size="small" severity="danger" text v-if="!slotProps?.data?.is_allow" />
                </template>
              </Column>

            </DataTable>

          </div>
        </div>
      </div>
    </div>
  </div>
  <ConfirmDialog ref="confirmDialog" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { getAllUsers, createUserConcept, deleteUserConcept } from '@/apis/user';

const filters = ref();

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};
const clearFilter = () => {
    initFilters();
};
initFilters();

const confirmDialog = ref(null);

let users = ref([]);

const confirmDisable = async (user_id, disabled) => {
  const result = await confirmDialog.value.open({
    title: 'Enabled / Disabled',
    message: 'Do you really want?'
  })

  if (result) {
    const response = await createUserConcept({
      params: {
        "user_id": user_id,
        "is_allow": disabled ? 0 : 1
      }
    });
    if (response.status) {
      const resId = response.data?.data?.user_id;
      const isAllow = response.data?.data?.is_allow;
      if (resId) {
        users.value = users.value.map((user) => {
          if (user.id === resId) {
            user.is_allow = isAllow == 1 ? true : false;
          }
          return user;
        });
      }
      //console.log(resId == 1);
    }

    //Refresh users
    //const response = await getAllUsers({});
    //users.value = response.data?.data;
  }
};

onMounted(async () => {
  const response = await getAllUsers({});
  users.value = response.data?.data;
});

</script>
