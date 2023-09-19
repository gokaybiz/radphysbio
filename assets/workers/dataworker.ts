import {
  storeLatestVersion,
  getLatestVersion,
} from "../database/actions/metadata";

import {
  convertJsonToXml,
  convertJsonToXsv,
  convertJsonToXlsx,
} from "../database/actions/converter";
import { storeData, loadPageData, destroyDB } from "../database/actions/data";

self.addEventListener(
  "message",
  async function (event: MessageEvent): Promise<void> {
    const { action } = event.data;

    switch (action) {
      case "storeData":
        await handleStoreData(event.data);
        break;
      case "fetchData":
        await handleFetchData(event.data);
        break;
      case "destroyDB":
        await handleDestroyDB();
        break;
      case "downloadData":
        await handleDownloadData(event.data);
        break;
      default:
        break;
    }
  }
);

async function handleStoreData(data: any): Promise<void> {
  try {
    await storeData(data.data, {
      version: data.version,
      function: storeLatestVersion,
    });
    const latestVersion = await getLatestVersion();
    const pageData = await loadPageData(
      data.page ?? 1,
      data.pageSize,
      data.sortBy,
      data.direction,
      data.filters
    );
    self.postMessage({ action: "fetchData", data: pageData, latestVersion });
  } catch (error) {
    console.error("Error storing data in Dexie:", error);
  }
}

async function handleFetchData(data: any): Promise<void> {
  const latestVersion = await getLatestVersion();
  const pageData = await loadPageData(
    data.page ?? 1,
    data.pageSize,
    data.sortBy,
    data.direction,
    data.filters
  );
  self.postMessage({
    action: "fetchData",
    data: pageData,
    latestVersion,
  });
}

async function handleDestroyDB(): Promise<void> {
  await destroyDB();
  self.postMessage({ action: "destroyDB" });
}

async function handleDownloadData(data: any): Promise<void> {
  const pageData = await loadPageData(
    data.page ?? 1,
    data.pageSize,
    data.sortBy,
    data.direction,
    data.filters,
    true
  );

  let ret: string = "";
  switch (data.format) {
    case "xml":
      ret = convertJsonToXml(pageData.data);
      break;
    case "csv":
      ret = convertJsonToXsv(pageData.data, ",");
      break;
    case "tsv":
      ret = convertJsonToXsv(pageData.data, "\t");
      break;
    case "xlsx":
      ret = convertJsonToXlsx(pageData.data);
      break;
    default:
      ret = JSON.stringify(pageData.data);
      break;
  }

  self.postMessage({
    action: "downloadData",
    data: { data: ret, count: pageData.count, format: data.format },
  });
}
