import type { WorkSheet } from "xlsx/types";
import * as xlsx from "xlsx";

interface JsonObject {
  [key: string]: JsonObject | string | number | boolean;
}

function escapeKeyNames(obj: { [key: string]: any }): { [key: string]: any } {
  const escapedObj: { [key: string]: any } = {};

  for (const key in obj) {
    const escapedKey = key
      .replace(/#/g, "")
      .replace(/"/g, "quote")
      .replace(/\//g, "_slash_")
      .replace(/%/g, "_percent_")
      .replace(/&/g, "ampersand")
      .replace(/'/g, "apostrophe")
      .replace(/µ/g, "micro")
      .replace(/\(/g, "parenthesis_open_")
      .replace(/\)/g, "_parenthesis_close")
      .replace(/\*/g, "_multiply_")
      .replace(/ /g, "_")
      .replace(/1keV/g, "IkeV")
      .replace(/10keV/g, "I0keV");

    escapedObj[escapedKey] = obj[key];
  }

  return escapedObj;
}

function convertJsonToXml(data: JsonObject | JsonObject[]): string {
  const toXml = (json: JsonObject): string => {
    let xml = "";
    json = escapeKeyNames(json);
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        if (typeof json[key] === "object") {
          xml += `<${key}>${toXml(json[key] as JsonObject)}</${key}>`;
        } else {
          xml += `<${key}>${json[key]}</${key}>`;
        }
      }
    }
    return xml;
  };

  const isArray = Array.isArray(data);

  let xmlString = '<?xml version="1.0" encoding="UTF-8" ?>\n';

  if (isArray) {
    const rootElement = "root";
    const items = Array.isArray(data) ? data : [data];
    const xmlStrings = items.map((item) => `<row>${toXml(item)}</row>`);
    xmlString += `<${rootElement}>${xmlStrings.join("")}</${rootElement}>`;
  } else {
    xmlString += `<row>${toXml(data)}</row>`;
  }
  return xmlString;
}

function convertJsonToXsv(
  jsonData: JsonObject[],
  delimiter: "," | "\t" = ","
): string {
  if (jsonData.length === 0) {
    return "";
  }

  const headers = Object.keys(jsonData[0]);
  const rows = jsonData.map((obj) =>
    headers.map((header) => String(obj[header]))
  );

  // Combine headers and rows into a single string
  const xsvData = [
    headers.join(delimiter),
    ...rows.map((row) => row.join(delimiter)),
  ].join("\n");

  return xsvData;
}

function buildColumnsArray(sheet: WorkSheet): string[] {
  const alphaToNum = (alpha: string) => {
    return (
      alpha
        .split("")
        .reduce((acc, letter) => acc * 26 + letter.charCodeAt(0) - 64, 0) - 1
    );
  };

  const numToAlpha = (num: number): string => {
    let alpha = "";
    for (; num >= 0; num = Math.floor(num / 26) - 1) {
      alpha = String.fromCharCode((num % 26) + 65) + alpha;
    }
    return alpha;
  };

  const [start, end] = sheet["!ref"]!.split(":").map((ref) =>
    alphaToNum(ref.replace(/\d/g, ""))
  );

  return Array.from({ length: end - start + 1 }, (_, i) =>
    numToAlpha(start + i)
  );
}

function autoFitColumns(worksheet: WorkSheet): void {
  const columns = buildColumnsArray(worksheet);
  const lastRow = xlsx.utils.decode_range(worksheet["!ref"]!).e.r;

  const columnWidths = columns.map((column) => {
    let maxCellLength = 0;

    for (let row = 1; row <= lastRow + 1; row++) {
      const cell = worksheet[`${column}${row}`];
      if (cell) {
        maxCellLength = Math.max(maxCellLength, Math.ceil(cell.v.length * 1.1));
      }
    }

    return { width: maxCellLength };
  });

  worksheet["!cols"] = columnWidths;
}

function convertJsonToXlsx(jsonData: JsonObject[]): string {
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(jsonData);
    autoFitColumns(ws);
    xlsx.utils.book_append_sheet(wb, ws, "RadPhysBio");
    const wbout = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });
    console.log("resolved");
    return wbout;
}

export { convertJsonToXml, convertJsonToXsv, convertJsonToXlsx };
