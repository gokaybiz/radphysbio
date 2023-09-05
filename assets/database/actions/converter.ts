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

export { convertJsonToXml, convertJsonToXsv };
