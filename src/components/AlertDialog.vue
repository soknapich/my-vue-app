<template>
  <!--Alert Dialog -->
  <div v-if="modelValue" class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded shadow-lg w-lg w-80">
      <h2 v-if="showCancel" class="text-lg font-semibold mb-4 text-gray-800">Alert</h2>
      <p class="text-lg font-semibold mt-4 mb-4 text-gray-800">
        {{ title }}
      </p>
      <div class="flex justify-end space-x-3">
        <button v-if="showCancel" @click="$emit('update:modelValue', false)"
          class="px-4 py-2 text-sm rounded bg-gray-200 hover:cursor-pointer">
          {{ cancelLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  cancelLabel: {
    type: String,
    default: "OK",
  },
  showCancel: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "info",
  },
});
</script>
