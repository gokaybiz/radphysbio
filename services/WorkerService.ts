import { ref, onBeforeUnmount } from "vue";
import MyWorker from "@/assets/workers/dataworker?worker";

interface items {
  data: any[];
  count: number;
}

class WorkerService {
  private readonly runtimeConfig = useRuntimeConfig();
  private readonly worker!: Worker;
  public filters = ref("[]");
  public items: Ref<items> = ref({ data: [], count: 0 });
  public page = ref(1);
  public pageSize = ref(40);
  public sortBy = ref("id");
  public direction = ref("asc");
  public loading = ref(true);
  public version = ref("");
  private isVersionUpdating = ref(false);
  private readonly scrollPos = ref(0);
  constructor() {
    if (process.server) return;

    this.worker = new MyWorker();

    const mainEl = document.getElementById(this.runtimeConfig.app.rootId)
      ?.firstChild as HTMLElement;
    this.worker.onmessage = async (event) => {
      this.scrollPos.value = mainEl?.scrollLeft;
      this.loading.value = true;

      await this.handleWorkerMessage(event.data);

      if (!this.isVersionUpdating.value)
        setTimeout(() => {
          this.loading.value = false;
          if (mainEl != null) {
            setTimeout(() => {
              mainEl.scrollLeft = this.scrollPos.value;
            }, 200);
          }
        }, 300);
    };

    this.worker.postMessage({
      action: "fetchData",
      page: this.page.value,
      pageSize: this.pageSize.value,
      sortBy: this.sortBy.value,
      direction: this.direction.value,
      filters: this.filters.value,
    });

    // Watch for page changes and update the worker
    watch(
      [this.filters, this.page, this.pageSize, this.sortBy, this.direction],
      ([filter], [oldFilter]) => {
        console.log(
          this.sortBy.value,
          this.direction.value,
          this.page.value,
          this.pageSize.value,
          this.filters.value
        );

        const olderFilter = JSON.parse(oldFilter).map((item: any) => [
          item.value,
          item.selectedColumn,
        ]);
        const newerFilter = JSON.parse(filter).map((item: any) => [
          item.value,
          item.selectedColumn,
        ]);

        // Reset the page to 1 when the filter changes
        if (
          oldFilter !== filter &&
          newerFilter.slice(-1)?.[0]?.[0] !== olderFilter.slice(-1)?.[0]?.[0]
        ) {
          this.page.value = 1;
        }

        this.worker.postMessage({
          action: "fetchData",
          page: this.page.value,
          pageSize: this.pageSize.value,
          sortBy: this.sortBy.value,
          direction: this.direction.value,
          filters: this.filters.value,
        });
      }
    );

    // Cleanup on component unmount
    onBeforeUnmount(() => {
      this.loading.value = true;
      this.worker.terminate();
    });
  }

  private async handleWorkerMessage(data: any): Promise<void> {
    const [versionStatus, version] = await this.isLatestVersion(data);
    switch (data.action) {
      case "fetchData": {
        if (!versionStatus) {
          // Fetch and add data to IndexedDB if an update is available
          await this.fetchAndUpdateData(version, 1);
          this.isVersionUpdating.value = true;
        } else {
          if (this.isVersionUpdating.value)
            this.worker.postMessage({
              action: "fetchData",
              page: this.page.value,
              pageSize: this.pageSize.value,
              sortBy: this.sortBy.value,
              direction: this.direction.value,
              filters: this.filters.value,
            });
          this.isVersionUpdating.value = false;
          // No update available
          this.items.value = data.data;
        }
        this.version.value = version;
        break;
      }
      case "destroyDB":
        // old db deleted, fetch and add new data to IndexedDB
        await this.fetchAndUpdateData(version, 2);
        break;
      case "downloadData": {
        const { format, data: output, count } = data.data;
        // check format and download the data as blob obj

        const suffix = ref("");
        if (this.filters.value.length > 2) {
          suffix.value = `_${JSON.parse(this.filters.value).length}_filters`;
        }
        if (this.sortBy.value !== "id") {
          suffix.value += `_${this.sortBy.value}_${this.direction.value}_sort`;
        }
        suffix.value += `_${new Date().toISOString()}`;

        const fileName = `${count}_items${suffix.value}`;

        // mime types
        enum mimeTypes {
          csv = "text/csv",
          xml = "application/xml",
          json = "application/json",
          tsv = "text/tab-separated-values",
          xlsx = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }

        if (Object.keys(mimeTypes).includes(format as mimeTypes)) {
          this.blobDownload(
            output,
            format,
            mimeTypes[format as keyof typeof mimeTypes],
            fileName
          );
        } else {
          console.error("Invalid format");
        }
      }
      default:
        break;
    }
  }

  private async isLatestVersion(data: any): Promise<[boolean, string]> {
    const latestVersion = data.latestVersion;
    const remoteVersion = await useFetch(this.runtimeConfig.app.lastUpdateUrl);
    if (latestVersion !== remoteVersion.data.value) {
      return [false, remoteVersion.data.value as string];
    }
    return [true, latestVersion];
  }

  private async fetchAndUpdateData(
    newVersion: string,
    step: 1 | 2
  ): Promise<void> {
    if (step === 1) {
      if (!this.isVersionUpdating.value) {
        console.log("destroy db triggered");
        // Delete the old db
        this.worker.postMessage({ action: "destroyDB" });
      }
    }
    if (step === 2) {
      const data = await useFetch(this.runtimeConfig.app.dataUrl);

      // Post the fetched data and version to the worker
      this.worker.postMessage({
        action: "storeData",
        data: data.data.value,
        version: newVersion,
      });

      console.log("Update needed");
    }
  }

  public exportData(format: string): void {
    this.worker.postMessage({
      action: "downloadData",
      format,
      sortBy: this.sortBy.value,
      direction: this.direction.value,
      filters: this.filters.value,
    });
  }

  private blobDownload(
    data: string,
    type: string,
    mimeType: string,
    fileName: string
  ): void {
    const blob = new Blob([data], {
      type: `${mimeType};charset=utf-8;`,
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${fileName}.${type}`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export default WorkerService;
