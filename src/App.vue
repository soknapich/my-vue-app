<template>
  <Loading class="loading-overlay" v-if="loadingStore.loading" />
  <router-view />
</template>

<script setup>
import { useLoadingStore } from '@/stores/loading';

import Loading from '@/components/Loading.vue';
const loadingStore = useLoadingStore();

</script>


<style scoped>
.loading-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 99999; /* higher than Dialog */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* example spinner */
.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #eee;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
