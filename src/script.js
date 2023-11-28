import "./styles/style.css";

import {
  renderData,
  renderHeaders,
  renderStructure,
} from "./tableRender/dataRenderer";

import { getColumns, getUrl, getParent } from "./tableRender/tableConfig";

import processData from "./tableRender/dataProcessor";

import addUserHandler from "./tableActions/addUser";
import findUserHandler from "./tableActions/findUser";
import deleteUserHandler from "./tableActions/deleteUser";

const columns = getColumns();
const url = getUrl();
const parent = getParent();

const userObject = await processData("GET", url);

renderStructure(parent);
renderHeaders(columns);
if (renderData(userObject)) deleteUserHandler(url);
addUserHandler();
findUserHandler();
