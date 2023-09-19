<template>
  <div class="contents bg-white w-full">
    <table
      class="border border-gray-200 rounded bg-white min-w-full text-sm align-middle whitespace-nowrap"
    >
      <thead>
        <tr class="border-b border-neutral-200 dark:border-neutral-500">
          <DataTableColumn
            v-for="(col, index) in props.columns"
            :key="index"
            :column="col"
            @sortColumn="setSortColumn"
            :sortedColumn="sortColumn"
            @sortDirection="setSortDirection"
          />
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <DataTableRow
          v-for="(row, rowIndex) in props.data"
          :key="rowIndex"
          :row="row"
          :columns="props.columns"
        />
      </tbody>
    </table>
    <div class="contents ml-auto mt-auto">
      <div class="sticky left-0">
        <pagination
          :currentPage="props.currentPage"
          :totalPages="totalPages"
          @pageChange="handlePageChange"
        />
        <PageSize @page-size="handlePageSizeChange" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DataTableColumn from "./Columns/index.vue";
import DataTableRow from "./Rows/index.vue";

interface Columns {
  label: string;
  field: string;
  sortable: boolean;
}

const props = defineProps({
  data: Array,
  columns: Array<Columns>,
  currentPage: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 40,
  },
  totalItems: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(["sort", "pageChange", "pageSizeChange"]);
const sortColumn = ref();
const sortDirection = ref();

const setSortColumn = (column: string) => {
  sortColumn.value = column;
};

const setSortDirection = (direction: string) => {
  sortDirection.value = direction;
};

const handlePageChange = (page: number) => {
  emit("pageChange", page);
};
const handlePageSizeChange = (pageSize: number) => {
  emit("pageSizeChange", pageSize);
};

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.pageSize);
});

watch([sortColumn, sortDirection], ([column, direction]) => {
  emit("sort", { column, direction });
});
</script>
