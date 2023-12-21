import db from "..";
import type { Collection } from "dexie";

interface DataTable {
  id?: number;
  ExpID0: number;
  PMID1: number | string;
  Exp2: number;
  CellLine3: number | string;
  Tissue4: string;
  CellClass5: string;
  CellCycle6: string;
  PhotonRadiationMeV7: string | number;
  EnergyMeV8: string | number;
  RBE9: number | string;
  LETkeVm10: string | number;
  DoseRateGymin11: number | string;
  Alpha12: number | string;
  Beta13: number | string;
  DSBsGyGbp14: string;
  FiguresTables: string;
  nonDSBClustersGyGbp15: number | string;
  keVDSBsO16: number | string;
  keVOtherO17: number | string;
  keVDSBsO18: number | string;
  keVOtherO19: number | string;
  keVDSBsO20: number | string;
  keVOtherO21: number | string;
  keVDSBsO22: number | string;
  keVOtherO23: number | string;
  TypeofRadiation24: string;
  IrradiationConditions27: string;
  DSBsO29: string;
  OtherO30: string;
  DSBsO31: string;
  OtherO32: number | string;
  Source33: string;
  "% DSBs at 24h, 1Gy"?: string;
}

interface Filter {
  id: number;
  value: string;
  selectedColumn: string;
}

interface VersionType {
  version: string;
  function: (arg: string) => Promise<void>;
}

const map = [
  { "#ExpID": "ExpID0" },
  { PMID: "PMID1" },
  { "#Exp": "Exp2" },
  { CellLine: "CellLine3" },
  { Tissue: "Tissue4" },
  { CellClass: "CellClass5" },
  { CellCycle: "CellCycle6" },
  { "PhotonRadiation (MeV)": "PhotonRadiationMeV7" },
  { "Energy (MeV)": "EnergyMeV8" },
  { RBE: "RBE9" },
  { "LET (keV/μm)": "LETkeVm10" },
  { "Dose Rate (Gy/min)": "DoseRateGymin11" },
  { α: "Alpha12" },
  { β: "Beta13" },
  { "DSBs/(Gy*Gbp)": "DSBsGyGbp14" },
  { "Figures/Tables": "FiguresTables" },
  { "nonDSBClusters/(Gy*Gbp)": "nonDSBClustersGyGbp15" },
  { "1keV_DSBs_1%O2": "keVDSBsO16" },
  { "1keV_Other_1%O2": "keVOtherO17" },
  { "1keV_DSBs_20%O2": "keVDSBsO18" },
  { "1keV_Other_20%O2": "keVOtherO19" },
  { "10keV_DSBs_1%O2": "keVDSBsO20" },
  { "10keV_Other_1%O2": "keVOtherO21" },
  { "10keV_DSBs_20%O2": "keVDSBsO22" },
  { "10keV_Other_20%O2": "keVOtherO23" },
  { TypeofRadiation: "TypeofRadiation24" },
  { IrradiationConditions: "IrradiationConditions27" },
  { "DSBs_1%O2": "DSBsO29" },
  { "Other_1%O2": "OtherO30" },
  { "DSBs_20%O2": "DSBsO31" },
  { "Other_20%O2": "OtherO32" },
  { Source: "Source33" },
];

// Function to load paginated data from Dexie
const loadPageData = async (
  page: number,
  pageSize: number = 10,
  column: string = "id",
  direction: string = "asc",
  filters: string = "[]",
  isDownload: boolean = false
): Promise<{ data: any[]; count: number }> => {
  try {
    const parsedFilters: Filter[] = JSON.parse(filters);

    let data: Collection<DataTable, number> = db.data.orderBy(column);
    if (parsedFilters.length > 0) {
      // Create a map to store grouped filters
      const groupedFilters = new Map<string, Filter[]>();

      // Group filters by selectedColumn
      parsedFilters.forEach((filter) => {
        const { selectedColumn } = filter;
        if (!groupedFilters.has(selectedColumn)) {
          groupedFilters.set(selectedColumn, []);
        }
        groupedFilters.get(selectedColumn)?.push(filter);
      });

      // Apply filters
      data = data.filter((row: DataTable) => {
        // "and" logic for each group, check if any of the filters in the group match
        return [...groupedFilters.values()].every((group) => {
          // "or" logic for each filter in the group, check if the row value includes the filter value
          return group.some((filter) => {
            const { selectedColumn, value } = filter;
            const rowValue = (row[selectedColumn as keyof DataTable] as string)
              .toString()
              .replaceAll(/[γαβμ]/g, (match) => {
                // Use a map to handle replacements
                const replacements: Record<string, string> = {
                  γ: "gammaγ",
                  α: "alphaα",
                  β: "betaβ",
                  μ: "microμ",
                };
                return replacements[match]?.length > 0
                  ? replacements[match]
                  : match;
              })
              .toLowerCase();
            // Check if the row value includes the filter value
            return rowValue.includes(value.toString().toLowerCase());
          });
        });
      });
    }
    const count = await data.count();
    const startIndex = (page - 1) * pageSize;

    if (direction === "desc") {
      data.reverse();
    }

    if (isDownload) {
      let dataWhole = await data.toArray();

      dataWhole = dataWhole.map((item: any) => {
        const nonSpecialCharKey = new Map();

        // Just for iterating over the flatMap, nothing else related to the map high order function return value
        map.flatMap((dict): null => {
          const [[newKey, key]] = Object.entries(dict);

          // do not include figures/tables in the download
          if (key == "FiguresTables") {
            return null;
          }
          nonSpecialCharKey.set(newKey, item[key]);

          return null;
        });

        return Object.fromEntries(nonSpecialCharKey);
      });
      const response = {
        data: dataWhole,
        count,
      };
      return response;
    }

    const dataPaginated = await data
      .offset(startIndex)
      .limit(pageSize)
      .toArray();
    const response = {
      data: dataPaginated,
      count,
    };
    return response;
  } catch (error) {
    console.error("Error loading paginated data from Dexie:", error);
    return {
      data: [],
      count: 0,
    };
  }
};

// Function to store data in Dexie
async function storeData(
  data: string,
  versioning?: VersionType
): Promise<void> {
  try {
    const parsedData: any[] = JSON.parse(data);
    const normalizedData: any[] = parsedData.map((item) => {
      const nonSpecialCharKey = new Map();
      // Just for iterating over the Map, nothing else related to the map high order function
      map.flatMap((dict): null => {
        const [[key, newKey]] = Object.entries(dict);
        let trimmedValue =
          typeof item[key] === "string" ? item[key].trim() : item[key];

        try {
          if (trimmedValue.startsWith("(-)") === true) {
            trimmedValue = trimmedValue.replace("(-)", "-");
          }
          if (trimmedValue.endsWith("*") === true) {
            trimmedValue = trimmedValue.replace("*", "");
          }
        } catch (_) {}

        if (!isNaN(Number(trimmedValue))) {
          trimmedValue = Number(trimmedValue);
        }

        nonSpecialCharKey.set(newKey, trimmedValue);

        return null;
      });

      return Object.fromEntries(nonSpecialCharKey);
    });
    await db.data.bulkPut(normalizedData);
    if (versioning != null) {
      await versioning.function(versioning.version);
      console.log("Version added to Dexie successfully");
    }
    console.log("Data added to Dexie successfully");
  } catch (error) {
    console.error("Error adding data to Dexie:", error);
  }
}

async function destroyDB(): Promise<void> {
  try {
    await db.delete();
    await db.open();
    console.log("Database deleted successfully");
  } catch (error) {
    console.error("Error deleting database:", error);
  }
}
export { loadPageData, storeData, destroyDB };
