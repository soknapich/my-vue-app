<template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
    <div class="bg-white rounded-lg shadow-lg w-96 p-6">
      <h3 class="text-lg font-semibold mb-3">
        {{ title }}
      </h3>

      <p class="text-gray-600 mb-6">
        {{ message }}
      </p>

      <div class="flex justify-end gap-3">
        <button
          class="px-4 py-2 rounded border"
          @click="cancel"
        >
          No
        </button>

        <button
          class="px-4 py-2 rounded bg-green-700 text-white"
          @click="confirm"
        >
          Yes
        </button>
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
