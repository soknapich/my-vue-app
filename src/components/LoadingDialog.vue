<template>
  <!-- Dialog Modal -->
  <div v-if="modelValue" class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded shadow-lg w-lg">
      <p class="text-lg font-semibold mt-4 mb-4 text-gray-800">
        <div class="loader inline-block w-6 h-6 mr-2 align-middle"></div>
        {{ title }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Loading...",
  },
});
</script>

<style>
.loader {
  width: 40px;
  height: 40px;
  border: 5px solid #eee;
  border-top-color: #42b983;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  margin: auto;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
