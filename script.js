import {
  renderData,
  renderHeaders,
  renderStructure,
} from "./tableRender/dataRenderer.js";

import { addUserHandler } from "./tableActions/addUser.js";
import { findUserHandler } from "./tableActions/findUser.js";

renderStructure();
renderHeaders();
renderData();
addUserHandler();
findUserHandler();
