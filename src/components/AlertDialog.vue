<template>
  <!--Alert Dialog -->
  <div v-if="modelValue" class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
    <form @submit.prevent="$emit('update:modelValue', false)">
      <div class="bg-white p-6 rounded shadow-lg w-lg w-80">
        <h2 v-if="showCancel" class="text-lg font-semibold mb-4 text-gray-800">{{ header }}</h2>
        <p class="text-lg font-semibold mt-4 mb-4 text-gray-800">
          {{ title }}
        </p>
        <div class="flex justify-end space-x-3">
          <button type="submit" v-if="showCancel"
            class="px-4 py-2 text-sm text-white rounded hover:cursor-pointer" :class="yesButtonColor">
            {{ cancelLabel }}
          </button>
        </div>
      </div>
    </form>
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
  yesButtonColor: {
    type: String,
    default: 'bg-gray-200'
  },
  header: {
    type: String,
    default: "Alert"
  },
  title: {
    type: String,
    default: "info",
  },
});
</script>
