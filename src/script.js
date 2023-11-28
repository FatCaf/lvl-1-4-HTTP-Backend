import "./styles/style.css";

import {
  renderData,
  renderHeaders,
  renderStructure,
} from "./tableRender/dataRenderer";

import addUserHandler from "./tableActions/addUser";
import findUserHandler from "./tableActions/findUser";

renderStructure();
renderHeaders();
renderData();
addUserHandler();
findUserHandler();
