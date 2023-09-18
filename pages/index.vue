<script setup lang="ts">
import WorkerService from "@/services/WorkerService";
import Filter from "@/components/Filter/index.vue";

const fields: Ref<any[]> = ref([]);
fields.value = [
  { label: "#ExpID", field: "ExpID0", sort: true },
  { label: "PMID", field: "PMID1", sort: true },
  { label: "#Exp", field: "Exp2", sort: true },
  { label: "Cell Line", field: "CellLine3", sort: true },
  { label: "Tissue", field: "Tissue4", sort: true },
  { label: "Cell Class", field: "CellClass5", sort: true },
  { label: "Cell Cycle", field: "CellCycle6", sort: true },
  {
    label: "Photon Radiation (MeV)",
    field: "PhotonRadiationMeV7",
    sort: true,
  },
  { label: "Energy (MeV)", field: "EnergyMeV8", sort: true },
  { label: "RBE", field: "RBE9", sort: true },
  { label: "LET(keV/μm)", field: "LETkeVm10", sort: true },
  { label: "Dose Rate (Gy/min)", field: "DoseRateGymin11", sort: true },
  { label: "α", field: "Alpha12", sort: true },
  { label: "β", field: "Beta13", sort: true },
  { label: "DSBs/(Gy*Gbp)", field: "DSBsGyGbp14", sort: true },
  {
    label: "non DSBClusters/(Gy*Gbp)",
    field: "nonDSBClustersGyGbp15",
    sort: true,
  },
  { label: "1keV_DSBs_1%O2", field: "keVDSBsO16", sort: true },
  { label: "1keV_Other_1%O2", field: "keVOtherO17", sort: true },
  { label: "1keV_DSBs_20%O2", field: "keVDSBsO18", sort: true },
  { label: "1keV_Other_20%O2", field: "keVOtherO19", sort: true },
  { label: "10keV_DSBs_1%O2", field: "keVDSBsO20", sort: true },
  { label: "10keV_Other_1%O2", field: "keVOtherO21", sort: true },
  { label: "10keV_DSBs_20%O2", field: "keVDSBsO22", sort: true },
  { label: "10keV_Other_20%O2", field: "keVOtherO23", sort: true },
  { label: "Type of Radiation", field: "TypeofRadiation24", sort: true },
  { label: "LET (keV/μm)", field: "LETkeVm26", sort: true },
  {
    label: "Irradiation Conditions",
    field: "IrradiationConditions27",
    sort: true,
  },
  { label: "Dose Rate (Gy/min)", field: "DoseRateGymin28", sort: true },
  { label: "DSBs_1%O2", field: "DSBsO29", sort: true },
  { label: "Other_1%O2", field: "OtherO30", sort: true },
  { label: "DSBs_20%O2", field: "DSBsO31", sort: true },
  { label: "Other_20%O2", field: "OtherO32", sort: true },
  { label: "Source", field: "Source33", sort: true },
];
const workerService = new WorkerService();
const { items, loading, version, page } = workerService;
const updatePage = (page: number) => {
  const element: HTMLElement | null = document.getElementById("filterSection");
  element?.scrollIntoView();

  workerService.page.value = page;
};

const updatePageSize = (pageSize: number) => {
  const element: HTMLElement | null = document.getElementById("filterSection");
  element?.scrollIntoView();
  workerService.pageSize.value = pageSize;
  workerService.page.value = 1;
};

const sortByColumn = ({
  column,
  direction,
}: {
  column: string;
  direction: string;
}) => {
  workerService.sortBy.value = column;
  workerService.direction.value = direction;
};
const filterData = (data: any) => {
  workerService.filters.value = JSON.stringify(
    toRaw(data).filter((d: any) => d.value !== "" && d.selectedColumn !== "")
  );
};

const exportData = (type: string) => {
  workerService.exportData(type);
};

useHead(() => ({
  title: "Homepage",
  meta: [
    {
      hid: "description",
      name: "description",
      content: "Radiation Biology and Physics",
    },
  ],
}));
</script>

<template>
  <div class="contents mx-auto w-full">
    <div class="sticky left-0 p-4 grid grid-cols-2 gap-4">
      <div class="min-w-max">
        <p
          class="text-lg font-medium"
          v-if="loading === false || items?.data?.length > 0"
        >
          Total data count: {{ items.count || 0 }}/2734
        </p>
        <p v-if="version !== ''" class="text-sm text-gray-600 mb-3">
          Last update: {{ version }}
        </p>

        <Filter
          id="filterSection"
          :columns="fields.map((field) => [field.field, field.label])"
          @filter="filterData"
        />
      </div>
      <div class="ml-auto mt-auto" v-if="items.count > 0">
        <Export @export="exportData" />
      </div>
    </div>
    <div class="contents" v-show="loading == false">
      <Table
        v-if="items?.count > 0"
        :data="items.data"
        :columns="fields"
        :total-items="items.count"
        :current-page="page"
        :page-size="workerService.pageSize.value"
        @page-change="updatePage"
        @page-size-change="updatePageSize"
        @sort="sortByColumn"
      >
      </Table>
      <div class="flex items-center justify-center h-1/2 bg-slate-300" v-else>
        <p class="text-xl text-gray-500">No Match</p>
      </div>
    </div>
    <div
      v-show="loading == true"
      class="flex items-center justify-center bg-slate-300 bg-opacity-75 min-h-screen-75 py-5 my-6"
    >
      <ClientOnly>
        <div
          class="w-64 h-64 flex items-center justify-center rounded-lg shadow-lg bg-white bg-opacity-75"
        >
          <div
            class="animate-spin h-16 w-16 border-t-2 border-blue-500 rounded-full border-solid"
          ></div>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 2s linear infinite;
}
</style>
