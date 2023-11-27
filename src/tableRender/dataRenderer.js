import { getParent, getColumns, getUrl } from "./tableConfig.js";
import { processData } from "./dataProcessor.js";
import { attachDeleteButtonListeners } from "../tableActions/deleteUser.js";

/**
 * Fill the td elements in table with specified data from api url.
 */
export async function renderData() {
  const tableBody = document.querySelector(".table__body");
  const tableHeader = document.querySelector(".table__header");
  tableBody.innerHTML = "";
  let url = getUrl();

  try {
    let userObject = await processData("GET", url);

    for (const user in userObject) {
      tableBody.insertAdjacentHTML(
        "beforeend",
        `
        <tr class="table__body__row" id="${user}"></tr>
        `
      );
      const tableRow = document.querySelector(".table__body__row:last-child");
      for (const key in userObject[user]) {
        if (tableHeader.querySelector(`.${key}`).getAttribute("data-render")) {
          if (isLink(userObject[user][key])) {
            const source = userObject[user][key];
            tableRow.insertAdjacentHTML(
              "beforeend",
              `
          <td><image src="${source}"/></td>`
            );
          } else {
            const date = renderDate(userObject[user][key]);
            tableRow.insertAdjacentHTML(
              "beforeend",
              `
          <td class="date">${date}</td>`
            );
          }
        } else {
          tableRow.insertAdjacentHTML(
            "beforeend",
            `
          <td>${userObject[user][key]}</td>`
          );
        }
      }

      tableRow.insertAdjacentHTML(
        "beforeend",
        `<td class="options"><button class="delete__button"
    data-id="${user}">Delete</button></td>`
      );
    }
    attachDeleteButtonListeners();
  } catch (error) {
    console.log(error.message);
  }
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
export function renderHeaders() {
  const tableHeader = document.querySelector(".table__header");
  let columns = getColumns();

  tableHeader.insertAdjacentHTML(
    "beforeend",
    `<tr class="table__header__row">
      </tr>`
  );

  const header = document.querySelector(".table__header__row");

  for (const item of columns) {
    if (item.hasOwnProperty("render")) {
      header.insertAdjacentHTML(
        "beforeend",
        `
              <th class="${item.value}" data-render="true">${item.title}</th>`
      );
    } else {
      header.insertAdjacentHTML(
        "beforeend",
        `
              <th class="${item.value}">${item.title}</th>`
      );
    }
  }

  header.insertAdjacentHTML("beforeend", `<th class="actions">Дії</th>`);
}

export function renderStructure() {
  let parentElement = getParent();
  const table = document.createElement("table");

  document
    .querySelector(parentElement)
    .insertAdjacentElement("afterbegin", table);

  table.insertAdjacentHTML(
    "afterbegin",
    `
        <thead class="table__header">
        </thead>
        <tbody class="table__body"></tbody>`
  );
}
