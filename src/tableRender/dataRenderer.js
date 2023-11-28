/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */

/**
 * Fill the td elements in table with specified data from api url.
 */
export function renderData(userObject) {
  const tableBody = document.querySelector(".table__body");
  const tableHeader = document.querySelector(".table__header");
  tableBody.innerHTML = "";

  // eslint-disable-next-line guard-for-in
  for (const user in userObject) {
    tableBody.insertAdjacentHTML(
      "beforeend",
      `
        <tr class="table__body__row" id="${user}"></tr>
        `,
    );

    const tableRow = document.querySelector(".table__body__row:last-child");

    for (const key in userObject[user]) {
      if (tableHeader.querySelector(`.${key}`).getAttribute("data-render")) {
        if (isLink(userObject[user][key])) {
          const source = userObject[user][key];
          tableRow.insertAdjacentHTML(
            "beforeend",
            `
          <td><img src="${source}"/></td>`,
          );
        } else {
          const date = renderDate(userObject[user][key]);
          tableRow.insertAdjacentHTML(
            "beforeend",
            `
          <td class="date">${date}</td>`,
          );
        }
      } else {
        tableRow.insertAdjacentHTML(
          "beforeend",
          `
          <td>${userObject[user][key]}</td>`,
        );
      }
    }

    tableRow.insertAdjacentHTML(
      "beforeend",
      `<td class="options"><button class="delete__button"
    data-id="${user}">Delete</button></td>`,
    );
  }
  return true;
}

function renderDate(value) {
  const date = new Date(value);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth()}` : date.getMonth();
  return `${day}.${month}.${date.getFullYear()}`;
}

function isLink(link) {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  return urlRegex.test(link);
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
    if (Object.prototype.hasOwnProperty.call(item, "render")) {
      header.insertAdjacentHTML(
        "beforeend",
        `
              <th class="${item.value}" data-render="true">${item.title}</th>`,
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
