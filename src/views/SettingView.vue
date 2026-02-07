<template>
  <h2 class="text-xl font-semibold text-gray-800 ml-2 m-2">Allow User</h2>
  <div class="overflow-x-auto">
    <div class="card mb-2">
      <div class="grid grid-cols-12 gap-1">
        <div class="col-span-12">
          <div class="bg-white text-gray-800 rounded-lg shadow p-2">

            <DataTable scrollHeight="400px" scrollable selectionMode="single" :value="users" size="small">
              <Column header="#" style="width:50px">
                <template #body="{ index }">
                  {{ index + 1 }}
                </template>
              </Column>
              <Column field="name" header="Name"></Column>
              <Column field="email" header="Email"></Column>
              <Column field="role" header="Role"></Column>
              <Column field="is_allow" header="Allow">
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
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { getAllUsers, createUserConcept, deleteUserConcept } from '@/apis/user';

const confirmDialog = ref(null);

let users = ref([]);

const confirmDisable = async (user_id, disabled) => {
  const result = await confirmDialog.value.open({
    title: 'Enabled / Disabled',
    message: 'Do you really want?'
  })

  if (result) {
    await createUserConcept({
      params: {
        "user_id": user_id,
        "is_allow": disabled ? 0 : 1
      }
    });

    //Refresh users
    const response = await getAllUsers({});
    users.value = response.data?.data;
  }
};

onMounted(async () => {
  const response = await getAllUsers({});
  users.value = response.data?.data;
});

</script>
