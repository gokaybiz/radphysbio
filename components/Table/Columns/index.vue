<template>
  <th
    @click="sortColumn"
    class="sticky z-0 top-0 p-3 text-gray-700 bg-gray-100 font-semibold text-sm tracking-wider text-center outline-gray group"
  >
    {{ column.label }}
    <span
      v-if="column.sort"
      class="w-[15px] h-[10px] origin-bottom font-black mr-1 text-neutral-500 group-hover:opacity-100 transition hover:ease-in-out transform ease-linear duration-300 motion-reduce:transition-none dark:text-neutral-400"
      :class="[
        sortDirection === 'asc' ? 'arrow-up' : 'arrow-down',
        sortedColumn == column.field ? 'opacity-100' : 'opacity-0',
      ]"
    ></span>
  </th>
</template>

<script setup>
const { column, sortedColumn } = defineProps({
  column: Object,
  sortedColumn: String,
});

const sortDirection = ref("asc");
const emit = defineEmits(["sortColumn", "sortDirection"]);

const sortColumn = () => {
  if (column.sort) {
    sortDirection.value = sortDirection.value == "asc" ? "desc" : "asc";
    if (sortedColumn == column.field) {
      sortDirection.value = "asc";
    }
    emit("sortDirection", sortDirection.value);
    emit("sortColumn", column.field);
  }
};
</script>

<style lang="scss" scoped>
.arrow-up {
  @apply text-gray-500;
  &:after {
    content: " ↑";
  }
}

.arrow-down {
  @apply text-gray-500;
  &:after {
    content: " ↓";
  }
}
</style>
