<template>
    <h2 class="text-xl font-semibold text-gray-800 ml-2 m-2">User and Role</h2>
    <div class="overflow-x-auto">
        <div class="card mb-2">
            <div class="grid grid-cols-12 gap-1">
                <div class="col-span-12">
                    <div class="bg-white text-gray-800 rounded-lg shadow p-2">
                  
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

const confirmDialog = ref(null);

const deleteItem = async () => {
  const result = await confirmDialog.value.open({
    title: 'Delete item',
    message: 'Do you really want to delete this item?'
  })

  if (result) {
    console.log('YES clicked')
    // delete logic here
  } else {
    console.log('NO clicked')
  }
};

onMounted(async () => {

});

</script>
