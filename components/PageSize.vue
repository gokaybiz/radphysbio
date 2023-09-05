<script setup lang="ts">
const emit = defineEmits(["pageSize"]);
const dropdownOpen = ref(false);
const selectedOption = ref("10");
const options = ref(["10", "25", "50", "100", "250"]);
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};
const selectOption = (option: string) => {
  selectedOption.value = option;
  dropdownOpen.value = false;
};
const pageSize = computed(() => {
  return parseInt(selectedOption.value);
});
watch(pageSize, (value) => {
  emit("pageSize", value);
});
</script>
<template>
  <div class="flex justify-center pt-2 mb-4">
    <div class="max-w-1/2">
      <button
        @click="toggleDropdown"
        class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        aria-haspopup="listbox"
        :aria-expanded="dropdownOpen"
      >
        {{ selectedOption }}
        <svg
          class="w-5 h-5 ml-2 -mr-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <transition-group name="fade">
      <ul
        v-if="dropdownOpen"
        class="absolute flex space-x-2 items-center -mt-5 text-base bg-white border border-gray-300 rounded-md shadow-lg"
        role="listbox"
      >
        <li
          v-for="(option, index) in options"
          :key="index"
          @click="selectOption(option)"
          :class="{
            'bg-blue-600 text-white': selectedOption === option,
            'text-gray-900': selectedOption !== option,
          }"
          class="cursor-pointer select-none relative px-4 py-2 rounded-md text-sm font-medium"
          id="listbox-option-0"
          role="option"
          :aria-selected="selectedOption === option"
        >
          {{ option }}
        </li>
      </ul>
    </transition-group>
  </div>
</template>
<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
