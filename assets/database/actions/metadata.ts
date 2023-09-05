import db from "..";

// Function to store the latest version in Dexie
async function storeLatestVersion(version: string): Promise<void> {
  try {
    await db.metaData.put({ key: "latest-update", value: version });
  } catch (error) {
    console.error("Error storing the latest update in Dexie:", error);
  }
}

// Function to get the latest version from Dexie
async function getLatestVersion(): Promise<string | null> {
  try {
    const latestUpdate = await db.metaData.get("latest-update");
    return latestUpdate?.value;
  } catch (error) {
    console.error("Error getting the latest update time from Dexie:", error);
    return null;
  }
}

export { storeLatestVersion, getLatestVersion };
