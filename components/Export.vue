<template>
  <div class="relative">
    <div class="bg-slate-400 p-1 pt-2 pb-2 md:p-2 rounded-md">
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        @click="toggleDropdown"
      >
        Export {{ isDropdownOpen ? "↑" : "↓" }}
      </button>

      <Transition name="bounce">
        <div
          v-if="isDropdownOpen"
          class="mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg right-0 hover:border-blue-500"
        >
          <a
            class="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white cursor-pointer"
            v-for="label in exportOptions"
            @click="sendExportRequest(label)"
          >
            {{ label }}
          </a>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["export"]);
const isDropdownOpen = ref(false);
const exportOptions = ["CSV", "TSV", "XLSX", "JSON", "XML"];
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
const sendExportRequest = (type: string) => {
  emit("export", type.toLocaleLowerCase());
  toggleDropdown();
};
</script>
<style lang="scss" scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}
</style>
