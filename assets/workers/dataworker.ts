import {
  storeLatestVersion,
  getLatestVersion,
} from "../database/actions/metadata";

import {
  convertJsonToXml,
  convertJsonToXsv,
  convertJsonToXlsx
} from "../database/actions/converter";
import { storeData, loadPageData, destroyDB } from "../database/actions/data";

self.addEventListener(
  "message",
  async function (event: MessageEvent): Promise<void> {
    const { action, version, page, pageSize, sortBy, direction, filters } =
      event.data;

    switch (action) {
      case "storeData":
        try {
          await storeData(event.data.data, {
            version,
            function: storeLatestVersion,
          });
          const latestVersion = await getLatestVersion();
          const data = await loadPageData(
            page ?? 1,
            pageSize,
            sortBy,
            direction,
            filters
          );
          this.self.postMessage({ action: "fetchData", data, latestVersion });
        } catch (error) {
          console.error("Error storing data in Dexie:", error);
        }
        break;
      case "fetchData": {
        const latestVersion = await getLatestVersion();
        const data = await loadPageData(
          page ?? 1,
          pageSize,
          sortBy,
          direction,
          filters
        );
        self.postMessage({
          action: "fetchData", // Send data to the main thread
          data,
          latestVersion,
        });
        break;
      }
      case "destroyDB": {
        await destroyDB();
        self.postMessage({ action: "destroyDB" });
        break;
      }
      case "downloadData": {
        const { format } = event.data;

        const data = await loadPageData(
          page ?? 1,
          pageSize,
          sortBy,
          direction,
          filters,
          true
        );

        let ret: string = "";
        if (format === "xml") {
          ret = convertJsonToXml(data.data);
        } else if (format === "csv") {
          ret = convertJsonToXsv(data.data, ",");
        } else if (format === "tsv") {
          ret = convertJsonToXsv(data.data, "\t");
        } else if (format === "xlsx") {
          ret = await convertJsonToXlsx(data.data);
        } else {
          ret = JSON.stringify(data.data);
        }

        self.postMessage({
          action: "downloadData",
          data: { data: ret, count: data.count, format },
        });
        break;
      }
      default:
        break;
    }
  }
);
