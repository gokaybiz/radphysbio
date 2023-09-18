import { ref, onBeforeUnmount, watch } from "vue";
import MyWorker from "@/assets/workers/dataworker?worker";

interface Items {
  data: any[];
  count: number;
}

enum MimeTypes {
  csv = "text/csv",
  xml = "application/xml",
  json = "application/json",
  tsv = "text/tab-separated-values",
  xlsx = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
}

class WorkerService {
  private readonly runtimeConfig = useRuntimeConfig();
  private readonly worker!: Worker;
  public filters = ref("[]");
  public items: Ref<Items> = ref({ data: [], count: 0 });
  public page = ref(1);
  public pageSize = ref(10);
  public sortBy = ref("id");
  public direction = ref("asc");
  public loading = ref(true);
  public version = ref("");
  private isVersionUpdating = ref(false);
  private readonly scrollPos = ref(0);

  constructor() {
    if (process.server) return;

    this.worker = new MyWorker();
    this.setupWorker();
    this.watchPageChanges();
    onBeforeUnmount(() => {
      this.loading.value = true;
      this.worker.terminate();
    });
  }

  private setupWorker(): void {
    const mainEl = this.getMainElement();
    this.worker.onmessage = async (event) => {
      this.handleScroll(mainEl);
      await this.handleWorkerMessage(event.data);
      this.updateLoadingState(mainEl);
    };
    this.fetchData();
  }

  private getMainElement(): HTMLElement | null {
    return document.getElementById(this.runtimeConfig.app.rootId)
      ?.firstChild as HTMLElement;
  }

  private handleScroll(mainEl: HTMLElement | null): void {
    this.scrollPos.value = mainEl?.scrollLeft || 0;
    this.loading.value = true;
  }

  private updateLoadingState(mainEl: HTMLElement | null): void {
    if (!this.isVersionUpdating.value) {
      setTimeout(() => {
        this.loading.value = false;
        if (mainEl) {
          setTimeout(() => {
            mainEl.scrollLeft = this.scrollPos.value;
          }, 200);
        }
      }, 300);
    }
  }

  private watchPageChanges(): void {
    watch(
      [this.filters, this.page, this.pageSize, this.sortBy, this.direction],
      ([filter], [oldFilter]) => this.handlePageChange(filter, oldFilter)
    );
  }

  private handlePageChange(filter: string, oldFilter: string): void {
    this.resetPageOnFilterChange(filter, oldFilter);
    this.fetchData();
  }

  private resetPageOnFilterChange(filter: string, oldFilter: string): void {
    const olderFilter = this.parseFilter(oldFilter);
    const newerFilter = this.parseFilter(filter);
    if (
      oldFilter !== filter &&
      this.isFilterChanged(newerFilter, olderFilter)
    ) {
      this.page.value = 1;
    }
  }

  private parseFilter(filter: string): any[] {
    return JSON.parse(filter).map((item: any) => [
      item.value,
      item.selectedColumn,
    ]);
  }

  private isFilterChanged(newerFilter: any[], olderFilter: any[]): boolean {
    return newerFilter.slice(-1)?.[0]?.[0] !== olderFilter.slice(-1)?.[0]?.[0];
  }

  private fetchData(): void {
    this.worker.postMessage({
      action: "fetchData",
      page: this.page.value,
      pageSize: this.pageSize.value,
      sortBy: this.sortBy.value,
      direction: this.direction.value,
      filters: this.filters.value,
    });
  }

  private async handleWorkerMessage(data: any): Promise<void> {
    const [versionStatus, version] = await this.isLatestVersion(data);
    this.version.value = version;

    switch (data.action) {
      case "fetchData":
        await this.handleFetchDataAction(data, versionStatus);
        break;
      case "destroyDB":
        await this.fetchAndUpdateData(version, 2);
        break;
      case "downloadData":
        this.handleDownloadDataAction(data.data);
        break;
      default:
        break;
    }
  }

  private async handleFetchDataAction(
    data: any,
    versionStatus: boolean
  ): Promise<void> {
    if (!versionStatus) {
      await this.fetchAndUpdateData(data.version, 1);
      this.isVersionUpdating.value = true;
    } else {
      if (this.isVersionUpdating.value) this.fetchData();
      this.isVersionUpdating.value = false;
      this.items.value = data.data;
    }
  }

  private handleDownloadDataAction(data: any): void {
    const fileName = this.generateFileName(data);
    const format = data.format;

    if (Object.keys(MimeTypes).includes(format as MimeTypes)) {
      this.blobDownload(
        data.output,
        format,
        MimeTypes[format as keyof typeof MimeTypes],
        fileName
      );
    } else {
      console.error("Invalid format");
    }
  }

  private generateFileName(data: any): string {
    let suffix = "";
    if (this.filters.value.length > 2) {
      suffix = `_${JSON.parse(this.filters.value).length}_filters`;
    }
    if (this.sortBy.value !== "id") {
      suffix += `_${this.sortBy.value}_${this.direction.value}_sort`;
    }
    suffix += `_${new Date().toISOString()}`;
    return `${data.count}_items${suffix}`;
  }

  private async isLatestVersion(data: any): Promise<[boolean, string]> {
    const remoteVersion = await useFetch(this.runtimeConfig.app.lastUpdateUrl);
    return [
      data.latestVersion === remoteVersion.data.value,
      remoteVersion.data.value as string,
    ];
  }

  private async fetchAndUpdateData(
    newVersion: string,
    step: 1 | 2
  ): Promise<void> {
    if (step === 1 && !this.isVersionUpdating.value) {
      console.log("destroy db triggered");
      this.worker.postMessage({ action: "destroyDB" });
    } else if (step === 2) {
      console.log("Update needed");
      const data = await useFetch(this.runtimeConfig.app.dataUrl);
      this.worker.postMessage({
        action: "storeData",
        data: data.data.value,
        version: newVersion,
      });
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
    const blob = new Blob([data], { type: `${mimeType};charset=utf-8;` });
    const link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", `${fileName}.${type}`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export default WorkerService;
