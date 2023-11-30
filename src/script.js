/* eslint-disable no-restricted-syntax */
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

import addUserHandler from "./tableActions/addUser";
import findUserHandler from "./tableActions/findUser";
import deleteUserHandler from "./tableActions/deleteUser";

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function dataTable(config) {
  for (const element of config) {
    const columns = getColumns(element);
    const url = getUrl(element);
    const parent = getParent(element);

    // eslint-disable-next-line no-await-in-loop
    const userObject = await processData("GET", url);

    renderStructure(parent);
    renderHeaders(columns);
    if (renderData(userObject, columns)) deleteUserHandler(url);
    addUserHandler();
    findUserHandler();

    // eslint-disable-next-line no-await-in-loop
    await delay(1000);
  }
}

await dataTable(configs);
