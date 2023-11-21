import { getColumns, getUrl } from "../tableRender/tableConfig.js";

export function addUserHandler() {
  const addBtn = document.querySelector(".add__button");

  addBtn.addEventListener("click", addUser);
}

function addUser() {
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
  </tr>`
  );

  const cancel = document.querySelector(".cancel");

  cancel.addEventListener("click", () => {
    const newUser = document.querySelector(".new__user");
    newUser.remove();
  });

  const add = document.querySelector(".add");

  let headers = getColumns();
  let url = getUrl();

  add.addEventListener("click", async () => {
    const newRow = document.querySelector(".new__user");

    let combinedValues = {};

    headers.forEach((header) => {
      const input = newRow.querySelector(`.${header.value}`);

      if (!input.value.trim()) {
        alert(`Please enter a value for ${header.title}`);
        return;
      }

      combinedValues[header.value] = input.value;
    });

    if (Object.keys(combinedValues).length < headers.length) {
      return;
    } else {
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

        renderData();
      } catch (error) {
        console.error("Error: ", error.message);
      }
    }
  });
}
