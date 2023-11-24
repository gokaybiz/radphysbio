import excel from "xlsx";
import {
  writeFile
} from "fs/promises";
import {
  default as glob
} from "fast-glob";

// https://stackoverflow.com/a/175787
function isNumeric(str) {
  if (typeof str != "string") {
    return false;
  }
  return !isNaN(str) && !isNaN(parseFloat(str));
}



(async () => {
  const files = await glob("xlsx/*.xlsx", {
    objectMode: true
  });
  console.log("List of files:");
  console.log(files.map((file) => file.name));

  let allHeaders = [];
  let allData = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const workBook = excel.readFile(file.path);
    const [firstSheet] = workBook.SheetNames;

    // Convert to JSON
    let data = excel.utils.sheet_to_json(workBook.Sheets[firstSheet]);

    // Make different columns equal Gbp*Gy -> Gy*Gbp
    data = data.map((item) => {
      // Remove extra spaces from columns
      Object.entries(item).forEach(([key, value]) => {
        delete item[key];
        item[key.trim()] = value;
        if (typeof value === "string") {
          item[key.trim()] = value.replaceAll(/(\r\n|\n|\r)/g, "").trim();
          const commaToDot = item[key.trim()].replaceAll(',', '.');
          if (isNumeric(commaToDot)) {
            item[key.trim()] = parseFloat(commaToDot);
          }
        }
      });

      if ("DSBs/(Gbp*Gy)" in item) {
        item["DSBs/(Gy*Gbp)"] = item["DSBs/(Gbp*Gy)"];
        delete item["DSBs/(Gbp*Gy)"];
      }
      if ("nonDSBClusters/(Gbp*Gy)" in item) {
        item["nonDSBClusters/(Gy*Gbp)"] = item["nonDSBClusters/(Gbp*Gy)"];
        delete item["nonDSBClusters/(Gbp*Gy)"];
      }

      item["TypeofRadiation"] = file.name.replace(".xlsx", "");
      return item;
    });
    const headers = Object.keys(data[0]);
    await writeFile(
      `./headers/${file.name.replace("xlsx", "txt")}`,
      Buffer.from(headers.join("\n"))
    );

    // Save plain json
    await writeFile(
      `./json/${file.name.replace("xlsx", "json")}`,
      Buffer.from(JSON.stringify(data))
    );

    allHeaders = allHeaders.concat(headers);
    allData = allData.concat(data);
  }
  allHeaders = [...new Set(allHeaders)];

  const checkIfExists = (header, item) =>
    !!Object.keys(item).includes(header);

  allData = allData.map((data) => {
    allHeaders.forEach((header) => {
      if (!checkIfExists(header, data)) {
        data[header] = "N/A";
      }
    });
    return data;
  });
  await writeFile(`./all-json/all.json`, Buffer.from(JSON.stringify(allData)));
  await writeFile('./lastUpdate.txt', Buffer.from(new Date().toISOString()));
})();