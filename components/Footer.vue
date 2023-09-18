<template>
  <footer class="bg-neutral-100 text-center dark:bg-neutral-600 lg:text-left">
    <div class="container p-6 mx-auto text-neutral-800 dark:text-neutral-200">
      <div class="grid gap-2 lg:grid-cols-1">
        <div class="mb-6 md:mb-0">
          <h5 class="mb-2 uppercase font-semibold">
            Tips for searching our Database
          </h5>
          <p class="mb-4">
            Our database has a user-friendly interface, and can be searched by
            using the type of radiation, or the combination of more than one
            types of radiation. It includes five different types of radiation,
            X-rays, γ-rays, protons, carbon ions and α-particles. More
            specifically, it contains 2.734 experiments conducted in human cells
            and it combines physical and biophysical characteristics of
            radiation, expressing at the same time the induced biological
            damage.
          </p>
        </div>
      </div>
      <ShowMore text-before="Show column descriptions" text-after="Hide column descriptions">
        <div class="grid gap-4 lg:grid-cols-2">
          <div class="mb-6 md:mb-0" v-for="(_, i) in descriptions.length">
            <div
              class="mb-6 md:mb-0"
              v-for="([title, desc], id) in Object.entries(descriptions[i])"
              :key="id"
            >
              <h5 class="mb-2 font-semibold">{{ title }}:</h5>
              <p class="mb-4">{{ desc }}.</p>
            </div>
          </div>
        </div>
      </ShowMore>
    </div>

    <div
      class="bg-slate-300 p-4 text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200"
    >
      © 2023
      <a
        class="text-neutral-800 dark:text-neutral-400"
        href="http://physics.ntua.gr/index_en.html"
        target="_blank"
        >RadPhysBio</a
      >
    </div>
  </footer>
</template>
<script lang="ts" setup>
const descriptions = [
  {
    "#ExpID": "Running number labelling the database entry",
    PMID: "Running number labelling the publication",
    "#Exp":
      "Running number labelling the irradiation experiments within a publication",
    CellLine: "Name of the irradiated cell line",
    Tissue: "Name of cell tissue",
    CellClass: "Tumor cells (t) or normal cells (n)",
    CellCycle:
      "Cell cycle phase (phases are given explicitly in each case, or noted by ‘a’ for ‘asynchronous’ cell lines)",
    Source: "Type of radioactive source",
    "PhotonRadiation (MeV)":
      "Maximum photon energy of X-ray tubes or linear accelerators",
    "Energy (MeV)": "Specific radiation energy, evaluated at the target",
    RBE: "Relative Biological Effectiveness",
    "LET (keV/μm)": "Linear Energy Transfer in water",
    IrradiationConditions:
      "Mono-energetic radiation (‘m’), or spread out Bragg peak (‘s’)",
    "DoseRate (Gy/min)": "Quantity of radiation delivered per minute of time",
    α: "Linear coefficient of the LQ model (in Gy-1) for response to radiation as given in the corresponding publication, or else from fitting to raw data",
    β: "Quadratic coefficient of the LQ model (in Gy-2) for response to radiation as given in the corresponding publication, or else from fitting to raw data",
  },
  {
    "DSBs/(Gbp*Gy)":
      "Number of initial DSB per Gbp per Gy, as given in the corresponding publication",
    "nonDSBClusters/(Gbp*Gy)":
      "Number of initial non-DSB clusters per Gbp per Gy, as given in the corresponding publication",
    "DSBs_1%O2":
      "Number of initial DSB per Gbp per Gy calculated by the MCDS simulation code, for the specific energy of each experiment and 1% oxygen concentration in the cell",
    "Other_1%O2":
      "Number of initial non-DSB clusters per Gbp per Gy calculated by the MCDS simulation code, for the specific energy of each experiment and 1% oxygen concentration in the cell",
    "DSBs_20%O2":
      "Number of initial DSB per Gbp per Gy calculated by the MCDS simulation code, for the specific energy of each experiment and 20% oxygen concentration in the cell",
    "Other_20%O2":
      "Number of initial non-DSB clusters per Gbp per Gy calculated by the MCDS simulation code, for the specific energy of each experiment and 20% oxygen concentration in the cell",
    "1keV_DSBs_1%O2":
      "Number of initial DSB per Gbp per Gy calculated by the MCDS simulation code, for 1keV energy and 1% oxygen concentration in the cell",
    "1keV_Other_1%O2":
      "Number of initial non-DSB clusters per Gbp per Gy calculated by the MCDS simulation code, for 1keV energy and 1% oxygen concentration in the cell",
    "1keV_DSBs_20%O2":
      "Number of initial DSB per Gbp per Gy calculated by the MCDS simulation code, for 1keV energy and 20% oxygen concentration in the cell",
    "1keV_Other_20%O2":
      "Number of initial non-DSB clusters per Gbp per Gy calculated by the MCDS simulation code, for 1keV energy and 20% oxygen concentration in the cell",
    "10keV_DSBs_1%O2":
      "Number of DSB per Gbp per Gy calculated by the MCDS simulation code, for 10keV energy and 1% oxygen concentration in the cell",
    "10keV_Other_1%O2":
      "Number of initial non-DSB clusters per Gbp per Gy calculated by the MCDS simulation code, for 10keV energy and 1% oxygen concentration in the cell",
    "10keV_DSBs_20%O2":
      "Number of initial DSB per Gbp per Gy calculated by the MCDS simulation code, for 10keV energy and 20% oxygen concentration in the cell",
    "10keV_Other_20%O2":
      "Number of initial non-DSB clusters per Gbp per Gy calculated by the MCDS simulation code, for 10keV energy and 20% oxygen concentration in the cell",
  },
];
</script>
