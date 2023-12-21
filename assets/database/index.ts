// Import Dexie
import { Dexie } from "dexie";

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
  LETkeVm26: number | string;
  IrradiationConditions27: string;
  "DoseRate (Gy/min)": number | string;
  DSBsO29: string;
  OtherO30: string;
  DSBsO31: string;
  OtherO32: number | string;
  Source33: string;
  "% DSBs at 24h, 1Gy"?: string;
}

// Create a Dexie database instance
const dbName = "data_table";

class Database extends Dexie {
  data: Dexie.Table<DataTable, number>;
  metaData: Dexie.Table<any, string>;

  constructor() {
    super(dbName);
    this.version(0.1).stores({
      data: "++id,ExpID0,PMID1,Exp2,CellLine3,Tissue4,CellClass5,CellCycle6,PhotonRadiationMeV7,EnergyMeV8,RBE9,LETkeVm10,DoseRateGymin11,Alpha12,Beta13,DSBsGyGbp14,FiguresTables,nonDSBClustersGyGbp15,keVDSBsO16,keVOtherO17,keVDSBsO18,keVOtherO19,keVDSBsO20,keVOtherO21,keVDSBsO22,keVOtherO23,TypeofRadiation24,LETkeVm26,IrradiationConditions27,DoseRateGymin28,DSBsO29,OtherO30,DSBsO31,OtherO32,Source33", // data store here with auto-increment primary key and other columns as indexes
      metaData: "key", // meta-data store
    });
    // FData store
    this.data = this.table("data");
    // Metadata store
    this.metaData = this.table("metaData");
  }
}

const db = new Database();

export default db;
