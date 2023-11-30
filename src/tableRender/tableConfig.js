import functions from "./configFunctions";

import tableconfig from "../tableconfig.json";

function replaceRenderFunctions(config) {
  config.forEach((item) => {
    if (item && item.columns) {
      item.columns.forEach((column) => {
        if (
          typeof column.value === "string" &&
          column.value.startsWith("render")
        ) {
          const functionName = column.value;
          const renderFunction = functions[functionName];

          if (typeof renderFunction === "function") {
            // eslint-disable-next-line no-param-reassign
            column.value = renderFunction;
          } else {
            // eslint-disable-next-line no-console
            console.warn(`Function ${functionName} not found.`);
          }
        }
      });
    }
  });

  return config;
}

export const configs = replaceRenderFunctions(tableconfig);

export function getParent(config) {
  if (Object.prototype.hasOwnProperty.call(config, "parent")) {
    return config.parent;
  }
  return null;
}

export function getColumns(config) {
  if (Object.prototype.hasOwnProperty.call(config, "columns")) {
    return config.columns;
  }
  return null;
}

export function getUrl(config) {
  if (Object.prototype.hasOwnProperty.call(config, "apiUrl")) {
    return config.apiUrl;
  }
  return null;
}
