import processData from "../tableRender/dataProcessor";
import { renderData } from "../tableRender/dataRenderer";

/**
 * Send "POST" request to add new user to table.
 *
 * @returns nothing.
 */
async function addUser(hash, columns, url) {
  const newRow = document.querySelector(".new__user");

  const combinedValues = {};

  columns.forEach((column) => {
    const className =
      typeof column.value !== "function" ? column.value : column.input.name;
    const input = newRow.querySelector(`.${className}`);

    combinedValues[className] = input.value;
  });

  if (Object.keys(combinedValues).length < columns.length) {
    return;
  }
  const jsonData = JSON.stringify(combinedValues);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const dataObject = await processData("GET", url);
    renderData(dataObject, columns, hash);
  } catch (error) {
    throw new Error(error.message);
  }
}

function addSelect(input) {
  const options = [...input.options];
  const select = document.createElement("select");

  options.forEach((option) => {
    select.insertAdjacentHTML("afterbegin", `<option>${option}</option>`);
  });

  return select;
}

function combineInputs(inputArray) {
  return inputArray
    .map((i) => {
      if (i.type === "select" && Array.isArray(i.options)) {
        const selectElement = addSelect(i);
        return selectElement.outerHTML;
      }
      return `${i.label} <input class="${i.name}" type="${i.type}" required="${i.required}"/>`;
    })
    .join("");
}

function addUserInputs(columns, insertPos) {
  columns.forEach((item) => {
    if (Object.prototype.hasOwnProperty.call(item, "input")) {
      if (Array.isArray(item.input)) {
        const combinedInputs = combineInputs(item.input);

        insertPos.insertAdjacentHTML(
          "beforeend",
          `
                <td>${combinedInputs}</td>`,
        );
      } else {
        insertPos.insertAdjacentHTML(
          "beforeend",
          `
        <td>${item.title ? item.title : item.input.label}<input class="${
          item.input.name ? item.input.name : item.value
        }" type="${item.input.type}" required="${item.input.required}"/></td>`,
        );
      }
    }
  });
}

/**
 * Adds functionality for being able to add new user to table.
 */
function addUserTableRow(hash, columns, url) {
  const tableBody = document.querySelector(`.${hash}__table__body`);

  tableBody.insertAdjacentHTML(
    "afterbegin",
    `<tr class="new__user">
  </tr>`,
  );

  const newUser = document.querySelector(".new__user");

  addUserInputs(columns, newUser);

  newUser.insertAdjacentHTML(
    "beforeend",
    `<td class="options"><button class="add">Add</button>
  <button class="cancel">Cancel</button></td>
  `,
  );

  const cancel = document.querySelector(".cancel");

  cancel.addEventListener("click", () => {
    newUser.remove();
  });

  const add = document.querySelector(".add");

  add.addEventListener("click", () => addUser(hash, columns, url));
}

export default function addUserHandler(hash, columns, url) {
  const addBtn = document.querySelector(`.${hash}__add__button`);

  addBtn.addEventListener("click", () => addUserTableRow(hash, columns, url));
}
