import { extractInputValues, addDataInputs } from "./editAndAddHelpers";
import { renderData } from "../tableRender/dataRenderer";
import processData from "../tableRender/dataProcessor";

/**
 * Sends PUT request to edit specified data, then if data edited
 * update table.
 *
 * @param {String} toEdit url for edit specified data.
 * @param {String} hash unique hash code for table.
 * @param {Array} columns array with column headers.
 * @param {String} toRefresh url for update data after editing.
 */
async function editData(toEdit, hash, columns, toRefresh) {
  const jsonData = extractInputValues(hash);
  try {
    await fetch(toEdit, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });

    const dataObject = await processData("GET", toRefresh);
    renderData(dataObject, columns, hash);
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * Fills the inputs with the initial data of the table column to be edited.
 *
 * @param {String} toEdit url for edit specified data.
 */
async function fillInputs(toEdit) {
  const dataObject = await processData("GET", toEdit);

  const inputs = document.querySelectorAll("td input, td select");

  inputs.forEach((input) => {
    const inputName = input.className;

    if (
      inputName &&
      Object.prototype.hasOwnProperty.call(dataObject, inputName)
    ) {
      if (input.type === "date") {
        const dateValue = new Date(dataObject[inputName]);
        const formattedDate = dateValue.toISOString().split("T")[0];
        // eslint-disable-next-line no-param-reassign
        input.value = formattedDate;
      } else {
        // eslint-disable-next-line no-param-reassign
        input.value = dataObject[inputName];
      }
    }
  });
}

/**
 * Adds editing block for specified table column.
 *
 * @param {Number} id unique id of table row.
 * @param {String} toEdit url for edit specified data.
 * @param {String} hash unique hash code for table.
 * @param {Array} columns array with column headers.
 * @param {String} toRefresh url for update data after changes.
 */
function addDataEditRow(id, toEdit, hash, columns, toRefresh) {
  const [...tableRows] = document.querySelectorAll(
    `.${hash}__table__body__row`,
  );

  tableRows.forEach((row) => {
    if (row.id === id) {
      row.insertAdjacentHTML(
        "afterend",
        `<tr class="${hash}__new__user"></tr>`,
      );
    }
  });

  const newUser = document.querySelector(`.${hash}__new__user`);

  addDataInputs(columns, newUser);
  fillInputs(toEdit);

  newUser.insertAdjacentHTML(
    "beforeend",
    `<td class="${hash}options options"><button class="${hash}confirm confirm">Confirm</button>
  <button class="${hash}cancel cancel">Cancel</button></td>
  `,
  );

  const cancel = document.querySelector(`.${hash}cancel`);

  cancel.addEventListener("click", () => {
    newUser.remove();
  });

  const confirm = document.querySelector(`.${hash}confirm`);

  confirm.addEventListener("click", () =>
    editData(toEdit, hash, columns, toRefresh),
  );
}

export default function editDataHandler(hash, columns, url) {
  const editButtons = document.querySelectorAll(`.${hash}__edit__button`);

  [...editButtons].forEach((button) => {
    button.addEventListener("click", () => {
      const elementId = button.getAttribute("data-id");
      const toEdit = `${url}/${elementId}`;
      addDataEditRow(elementId, toEdit, hash, columns, url);
    });
  });
}
