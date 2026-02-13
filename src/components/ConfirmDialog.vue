<template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
    <div class="bg-white rounded-lg shadow-lg w-96 p-6">
      <h3 class="text-lg font-semibold mb-3">
        {{ title }}
      </h3>

      <p class="text-gray-600 mb-6">
        {{ message }}
      </p>

      <!-- Center + Full width buttons -->
      <!-- <div class="flex justify-center gap-3">
        <button class="flex-1 px-4 py-2 rounded border text-center" @click="cancel">
          No
        </button>

        <button class="flex-1 px-4 py-2 rounded bg-green-700 text-white text-center" @click="confirm">
          Yes
        </button>
      </div> -->
      <div class="flex gap-2">
        <Button type="button" size="small" label="No" severity="secondary" @click="cancel" class="flex-1"></Button>
        <Button type="button" size="small" label="Yes" @click="confirm" class="flex-1"></Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false);
const title = ref('');
const message = ref('');

let resolver = null;

const open = (options = {}) => {
  title.value = options.title || 'Confirm'
  message.value = options.message || 'Are you sure?'
  visible.value = true

  return new Promise((resolve) => {
    resolver = resolve
  })
};

const confirm = () => {
  visible.value = false
  resolver(true)
};

const cancel = () => {
  visible.value = false
  resolver(false)
};

defineExpose({ open });
</script>
