<template>
  <div>
    <div class="flex flex-col items-start justify-start space-y-2">
      <transition-group name="slide-fade" tag="div">
        <template v-for="query in data" :key="query.id">
          <div
            class="flex flex-col md:flex-row md:space-x-2 space-x-0 md:mb-2 mb-4"
          >
            <select
              :name="`column-${query.id}`"
              v-model="query.selectedColumn"
              @change="emitAndUpdate"
              class="border rounded px-2 text-sm h-10 md:mb-1 mb-2"
            >
              <option value="" disabled selected>Select a Column</option>
              <option
                v-for="[columnId, column] in columns"
                :key="columnId"
                :value="columnId"
              >
                {{ column }}
              </option>
            </select>
            <div class="w-full sm:flex-row sm:w-56 space-x-1">
              <input
                :readonly="query.selectedColumn === ''"
                placeholder="Search..."
                v-model="query.value"
                type="text"
                @input="emitAndUpdate"
                class="border rounded px-2 py-1 h-10"
              />
              <button
                @click="removeQuery(query.id)"
                class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                X
              </button>
            </div>
          </div>
        </template>
      </transition-group>
      <button
        @click="addNewQuery"
        class="px-2 py-1 bg-light-blue-600 border text-white rounded hover:bg-light-blue-700"
      >
        {{ data.length > 0 ? "Add another filter" : "Add filter" }}
      </button>
    </div>
    <p class="mt-2 mb-3 text-xs font-light">Filter count: {{ data.length }}</p>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "nuxt/dist/app/compat/capi";

interface Query {
  id: number;
  value: string;
  selectedColumn: string;
}
interface Props {
  columns: string[][];
}

const props = defineProps({
  columns: {
    type: Array as PropType<string[][]>,
    required: true,
  },
});

const { columns }: Props = props;
const emit = defineEmits(["filter"]);
const data = ref<Query[]>([]);

const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  wait: number = 100
) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      if (typeof fn === "function") {
        fn(...args);
      } else {
      }
    }, wait);
  };
};

const addNewQuery = () => {
  const { value: queries }: any = data;

  const nextId = queries[queries.length - 1]?.id + 1 || 1;
  // create a new query and add it to the queries (data) array.
  queries.push({
    id: nextId,
    value: "",
    selectedColumn: "",
  });

  // update url query
  updateURLQuery(data.value);
};

const removeQuery = (id: number) => {
  // Find the index to remove
  const indexToRemove = data.value.findIndex((query) => query.id === id);

  if (indexToRemove !== -1) {
    data.value.splice(indexToRemove, 1);
  }

  // reset ids
  data.value = data.value.map((query, index) => {
    query.id = index + 1;
    return query;
  });

  // update url query
  updateURLQuery(data.value);

  // emit the filter event
  emit("filter", data.value);
};

const updateURLQuery = (queries: Query[]) => {
  const params = new URLSearchParams();
  queries.forEach((query) => {
    if (query.selectedColumn !== "") {
      params.append(query.selectedColumn, query.value);
    }
  });

  if (params.toString() == "") {
    // remove query string from url
    history.pushState({}, "", location.pathname);
  } else {
    // update url with base64 encoded query string
    history.replaceState({}, "", `?${btoa(params.toString())}`);
  }
};

const loadFromURLQuery = () => {
  try {
    const params = new URLSearchParams(atob(location.search.slice(1)));
    const queries: Query[] = [];

    params.forEach((value, key) => {
      queries.push({
        id: queries.length + 1,
        value,
        selectedColumn: key,
      });
    });
    data.value = queries;
    emit("filter", data.value);
  } catch (error) {
    console.log("Filter data seems corrupted", error);
  }
};

const emitAndUpdate = debounce(() => {
  emit("filter", data.value);
  updateURLQuery(data.value);
}, 900);

onMounted(() => {
  loadFromURLQuery();
});
</script>
<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

</style>
