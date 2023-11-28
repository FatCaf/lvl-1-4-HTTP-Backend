/* eslint-disable no-use-before-define */
import { getColumns, getUrl } from "../tableRender/tableConfig";
import processData from "../tableRender/dataProcessor";
import { renderData } from "../tableRender/dataRenderer";

export default function addUserHandler() {
  const addBtn = document.querySelector(".add__button");

  addBtn.addEventListener("click", addUserInputs);
}

/**
 * Adds functionality for being able to add new user to table.
 */
function addUserInputs() {
  const tableBody = document.querySelector(".table__body");

  tableBody.insertAdjacentHTML(
    "afterbegin",
    `<tr class="new__user">
  <td><input class="name" type="text" placeholder="Enter name"/></td>
  <td><input class="surname" type="text" placeholder="Enter surname"/></td>
  <td><input class="avatar" type="text" placeholder="Enter avatar"/></td>
  <td><input class="birthday" type="text" placeholder="Enter birth"/></td>
  <td class="options"><button class="add">Add</button>
  <button class="cancel">Cancel</button></td>
  </tr>`,
  );

  const cancel = document.querySelector(".cancel");

  cancel.addEventListener("click", () => {
    const newUser = document.querySelector(".new__user");
    newUser.remove();
  });

  const add = document.querySelector(".add");

  add.addEventListener("click", addUser);
}

/**
 * Send "POST" request to add new user to table.
 *
 * @returns nothing.
 */
async function addUser() {
  const headers = getColumns();
  const newRow = document.querySelector(".new__user");

  const combinedValues = {};

  headers.forEach((header) => {
    const input = newRow.querySelector(`.${header.value}`);

    if (!input.value.trim()) {
      // eslint-disable-next-line no-alert
      alert(`Please enter a value for ${header.title}`);
      return;
    }

    combinedValues[header.value] = input.value;
  });

  if (Object.keys(combinedValues).length < headers.length) {
    return;
  }
  const jsonData = JSON.stringify(combinedValues);

  try {
    const response = await fetch(getUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const userObject = await processData("GET", getUrl());
    renderData(userObject);
  } catch (error) {
    throw new Error(error.message);
  }
}
