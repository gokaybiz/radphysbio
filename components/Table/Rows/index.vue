<template>
  <tr>
    <td v-for="(row, rowIndex) in row" :key="rowIndex" class="px-6 py-4 whitespace-nowrap text-center">{{ row }}</td>
  </tr>
</template>

<script setup>
const { row } = defineProps(['row']);
</script>