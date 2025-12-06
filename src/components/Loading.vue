<template>
  <div class="loading-overlay">
      <div class="loader inline-block w-6 h-6 mr-2 align-middle"></div>
  </div>
</template>

<style>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.3);
  z-index: 9999;
}

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
