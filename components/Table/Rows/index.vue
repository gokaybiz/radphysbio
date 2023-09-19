<template>
  <tr>
    <td
      v-for="column in columns"
      :key="column.field"
      class="px-6 py-4 whitespace-nowrap text-center"
    >
      {{ row[column.field] }}
    </td>
  </tr>
</template>

<script setup>
const { row, columns } = defineProps(["row", "columns"]);
</script>
