/* eslint-disable no-restricted-syntax */

/**
 * Fill the td elements in table with specified data from api url.
 */
export function renderData(userObject, columns) {
  const tableBody = document.querySelector(".table__body");
  tableBody.innerHTML = "";

  for (const user in userObject) {
    if (Object.prototype.hasOwnProperty.call(userObject, user)) {
      tableBody.insertAdjacentHTML(
        "beforeend",
        `
          <tr class="table__body__row" id="${user}"></tr>
          `,
      );

      const tableRow = document.querySelector(".table__body__row:last-child");
      for (const item of columns) {
        if (typeof item.value === "function") {
          tableRow.insertAdjacentHTML(
            "beforeend",
            `
          <td>${item.value(userObject[user])}</td>`,
          );
        } else {
          tableRow.insertAdjacentHTML(
            "beforeend",
            `
                <td>${userObject[user][item.value]}</td>`,
          );
        }
      }

      tableRow.insertAdjacentHTML(
        "beforeend",
        `<td class="options"><button class="delete__button"
      data-id="${user}">Delete</button></td>`,
      );
    }
  }

  return true;
}

/**
 * Rendering table header, depends on table configuration.
 */
export function renderHeaders(columns) {
  const tableHeader = document.querySelector(".table__header");

  tableHeader.insertAdjacentHTML(
    "beforeend",
    `<tr class="table__header__row">
      </tr>`,
  );

  const header = document.querySelector(".table__header__row");

  for (const item of columns) {
    if (typeof item.value === "function") {
      header.insertAdjacentHTML(
        "beforeend",
        `
              <th class="function">${item.title}</th>`,
      );
    } else {
      header.insertAdjacentHTML(
        "beforeend",
        `
              <th class="${item.value}">${item.title}</th>`,
      );
    }
  }

  header.insertAdjacentHTML("beforeend", '<th class="actions">Дії</th>');
}

export function renderStructure(parentElement) {
  const table = document.createElement("table");

  document
    .querySelector(parentElement)
    .insertAdjacentElement("afterbegin", table);

  table.insertAdjacentHTML(
    "afterbegin",
    `
        <thead class="table__header">
        </thead>
        <tbody class="table__body"></tbody>`,
  );
}
