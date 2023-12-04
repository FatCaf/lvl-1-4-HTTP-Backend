import "./styles/style.css";

import {
  renderData,
  renderHeaders,
  renderStructure,
} from "./tableRender/dataRenderer";

import {
  getColumns,
  getUrl,
  getParent,
  configs,
} from "./tableRender/tableConfig";

import processData from "./tableRender/dataProcessor";

import addTableActions from "./tableActions/tableActions";

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Creates and returns unique hash code for each table.
 *
 * @returns unique hash code for table.
 */
async function generateAndTruncateHashCode() {
  const randomValue = Math.random().toString(36).substring(2);

  const encoder = new TextEncoder();
  const data = encoder.encode(randomValue);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  const firstCharacter = hashHex[0].match(/[a-fA-F]/) ? hashHex[0] : "a";

  const truncatedHash = firstCharacter + hashHex.substring(0, 4);

  return truncatedHash;
}

let index = 0;

async function dataTable(config) {
  if (index >= config.length) return;
  const hash = await generateAndTruncateHashCode();

  const columns = getColumns(config[index]);
  const url = getUrl(config[index]);
  const parent = getParent(config[index]);

  const dataObject = await processData("GET", url);

  renderStructure(parent, hash);
  renderHeaders(columns, hash);
  renderData(dataObject, columns, hash);
  addTableActions(hash, columns, url);

  await delay(1000);

  index += 1;

  await dataTable(config);
}

await dataTable(configs);
