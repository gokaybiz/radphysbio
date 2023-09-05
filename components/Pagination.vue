<template>
  <div class="flex justify-center space-x-1 pt-4 mb-3">
    <button
      v-if="props.currentPage > 3"
      @click="gotoPage(1)"
      class="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-6 rounded-l -ml-px border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow active:bg-white active:border-white active:shadow-none cursor-pointer"
    >
      &lt;&lt;
    </button>
    <button
      v-if="props.currentPage > 1"
      @click="gotoPage(props.currentPage - 1)"
      class="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-6 rounded-l -ml-px border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow active:bg-white active:border-white active:shadow-none cursor-pointer"
    >
      &lt;
    </button>
    <button
      v-for="page in pages.slice(
        props.currentPage > 3 ? props.currentPage - 3 : 0,
        props.currentPage + 2
      )"
      :key="page"
      @click="gotoPage(page)"
      :class="[
        'px-3 py-1 rounded-md',
        props.currentPage === page
          ? 'border-blue-300 bg-blue-200 hover:bg-blue-300 hover:border-blue-400'
          : 'border-gray-300 bg-white hover:bg-gray-100 hover:border-gray-300',
      ]"
      class="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-6 rounded-md -m-px text-gray-800 shadow-sm hover:text-gray-800 hover:shadow active:bg-white active:border-white active:shadow-none cursor-pointer"
    >
      {{ page }}
    </button>
    <button
      v-if="props.currentPage < props.totalPages"
      @click="gotoPage(props.currentPage + 1)"
      class="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-6 rounded-r -mr-px border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow active:bg-white active:border-white active:shadow-none cursor-pointer"
    >
      &gt;
    </button>
    <button
      v-if="props.currentPage < props.totalPages"
      @click="gotoPage(props.totalPages)"
      class="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-6 rounded-r -mr-px border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow active:bg-white active:border-white active:shadow-none cursor-pointer"
    >
      &gt;&gt;
    </button>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps(["currentPage", "totalPages"]);
const emit = defineEmits(["pageChange"]);

const gotoPage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit("pageChange", page);
  } else {
    console.log("Invalid page number", page, props.totalPages);
  }
};

const updatePages = () => {
  return Array.from({ length: props.totalPages }, (_, i) => i + 1);
};
const reactiveTotalPages = computed(() => props.totalPages);
const pages = ref(updatePages());

setTimeout(() => {
  pages.value = updatePages();
}, 1000);

watch(reactiveTotalPages, () => {
  pages.value = updatePages();
});
</script>
