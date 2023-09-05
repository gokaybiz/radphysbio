<script lang="ts" setup></script>

<template>
  <div
    class="text-white min-h-screen flex flex-col justify-center items-center bg"
  >
    <div class="container text-center">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  background-color: #111;
  background-image: radial-gradient(
    rgba(255, 0, 0, 0.2),
    rgba(0, 0, 0, 0.8) 80%
  );
  background-size: cover;
  animation: pulse 10s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
</style>
