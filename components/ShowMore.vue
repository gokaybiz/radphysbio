<template>
  <div>
    <button
      @click="toggleSpoiler"
      class="underline decoration-wavy decoration-cyan-400 text-sm font-bold hover:text-cyan-500"
      :class="{ 'mb-3': showSpoiler }"
    >
      {{ !showSpoiler ? props.textBefore : props.textAfter }}
    </button>
    <transition>
      <div v-if="showSpoiler">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  textBefore: {
    type: String,
    required: true,
  },
  textAfter: {
    type: String,
    required: true,
  },
});
const showSpoiler = ref(false);
const toggleSpoiler = () => (showSpoiler.value = !showSpoiler.value);
</script>
<style lang="scss" scoped>
.v-enter-active, .v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from, .v-leave-to {
  opacity: 0;
}

</style>
