<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
      <h1 class="text-6xl font-bold text-red-500 mb-2">403</h1>
      <h2 class="text-xl font-semibold text-gray-800 mb-3">
        Unauthorized Access
      </h2>
      <p class="text-gray-500 mb-6">
        You don’t have permission to view this page.
      </p>

      <div class="flex justify-center gap-3">
        <Button label="Go Home" title="Go home" size="small" @click="goHome" />

        <Button label="Go Back" title="Go Back" severity="danger" size="small" @click="goBack" />

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Unauthorized',
  methods: {
    goHome() {
      this.$router.push('/')
    },
    goBack() {
      this.$router.back()
    }
  }
}
</script>
