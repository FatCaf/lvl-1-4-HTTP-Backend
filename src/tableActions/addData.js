import processData from "../tableRender/dataProcessor";
import { renderData } from "../tableRender/dataRenderer";
import { extractInputValues, addDataInputs } from "./editAndAddHelpers";

/**
 * Sends POST request to add new data to table, then update table.
 *
 * @param {String} hash unique hash code for table.
 * @param {Array} columns array with column headers.
 * @param {String} url link for requesting data.
 */
async function addUser(hash, columns, url) {
  const jsonData = extractInputValues(hash);

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });

    const dataObject = await processData("GET", url);
    renderData(dataObject, columns, hash);
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * Adds adding block for specified table column.
 *
 * @param {String} hash unique hash code for table.
 * @param {Array} columns array with column headers.
 * @param {String} url link for requesting data.
 */
function addNewDataTableRow(hash, columns, url) {
  const tableBody = document.querySelector(`.${hash}__table__body`);

  tableBody.insertAdjacentHTML(
    "afterbegin",
    `<tr class="${hash}__new__user">
  </tr>`,
  );

  const newUser = document.querySelector(`.${hash}__new__user`);

  addDataInputs(columns, newUser);

  newUser.insertAdjacentHTML(
    "beforeend",
    `<td class="${hash}options options"><button class="${hash}add add">Add</button>
  <button class="${hash}cancel cancel">Cancel</button></td>
  `,
  );

  const cancel = document.querySelector(`.${hash}cancel`);

  cancel.addEventListener("click", () => {
    newUser.remove();
  });

  const add = document.querySelector(`.${hash}add`);

  add.addEventListener("click", () => addUser(hash, columns, url));
}

export default function addDataHandler(hash, columns, url) {
  const addBtn = document.querySelector(`.${hash}__add__button`);

  addBtn.addEventListener("click", () =>
    addNewDataTableRow(hash, columns, url),
  );
}
