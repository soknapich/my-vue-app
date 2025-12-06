<template>
  <Loading v-if="loadingStore.loading" />
  <router-view />
</template>

<script setup>
import { useLoadingStore } from '@/stores/loading';

import Loading from '@/components/Loading.vue';
const loadingStore = useLoadingStore();

</script>

<style scoped>
#app {
  background: #ebedef;
}
</style>
