import { processData } from "./dataProcessor.js";
import { renderData, renderHeaders, renderStructure } from "./dataRenderer.js";
import { getUrl } from "./tableConfig.js";

function DataTable() {
  // let userObject;
  // let url = getUrl();
  // try {
  //   userObject = processData("GET", url);
  // } catch (error) {
  //   console.log(error.message);
  // }

  renderStructure();
  renderHeaders();
  renderData();
}

DataTable();
