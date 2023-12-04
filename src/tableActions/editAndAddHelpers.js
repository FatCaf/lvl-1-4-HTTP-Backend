/**
 * Extracts data from inputs and format it to json.
 *
 * @param {String} hash unique hash code for table.
 * @returns extracted data in json format.
 */
export function extractInputValues(hash) {
  const newRow = document.querySelector(`.${hash}__new__user`);
  const nodeList = newRow.querySelectorAll("td input, td select");

  const combinedValues = {};

  nodeList.forEach((node) => {
    const className = node.classList.value;

    const input = newRow.querySelector(`.${className}`);

    if (input.getAttribute("type") === "date") {
      const date = new Date(input.value);
      combinedValues[className] = date.toISOString();
    } else if (input.getAttribute("type") === "number") {
      combinedValues[className] = parseInt(input.value, 10);
    } else combinedValues[className] = input.value;
  });

  if (Object.keys(combinedValues).length < nodeList.length) {
    return null;
  }

  return JSON.stringify(combinedValues);
}

/**
 * Creates and returns select HTML element.
 *
 * @param {String} input input field form columns array.
 * @returns select HTML element with options inside.
 */
function addSelect(input) {
  const options = [...input.options];
  const select = document.createElement("select");
  select.classList.add(input.name);

  options.forEach((option) => {
    select.insertAdjacentHTML("afterbegin", `<option>${option}</option>`);
  });

  return select;
}

/**
 * Combines inputs into one element for inserting into DOM.
 *
 * @param {Array} inputArray array with input configs.
 * @returns two or more inputs combined in one element.
 */
function combineInputs(inputArray) {
  return inputArray
    .map((i) => {
      if (i.type === "select" && Array.isArray(i.options)) {
        const selectElement = addSelect(i);
        return selectElement.outerHTML;
      }
      return `${i.label} <input class="${i.name}" type="${i.type}" ${
        i.required ? "required" : ""
      }/> `;
    })
    .join("");
}

/**
 * Adds input elements before specified HTML element.
 *
 * @param {Array} columns array with column headers.
 * @param {HTMLElement} insertPos specified HTML element from which new elements should be inserted.
 */
export function addDataInputs(columns, insertPos) {
  columns.forEach((item) => {
    if (Object.prototype.hasOwnProperty.call(item, "input")) {
      if (Array.isArray(item.input)) {
        const combinedInputs = combineInputs(item.input);

        insertPos.insertAdjacentHTML(
          "beforeend",
          `
                  <td>${combinedInputs}</td>`,
        );
      } else if (item.type === "select" && Array.isArray(item.options)) {
        insertPos.insertAdjacentHTML(
          "beforeend",
          `<td>${addSelect(item)}</td>`,
        );
      } else {
        insertPos.insertAdjacentHTML(
          "beforeend",
          `
            <td>${item.title ? item.title : item.input.label}<input class="${
              item.input.name ? item.input.name : item.value
            }" type="${item.input.type}" ${
              item.input.required ? "required" : ""
            }/></td>`,
        );
      }
    }
  });
}
