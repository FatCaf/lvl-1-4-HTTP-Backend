import { getParent, getColumns, getUrl } from "./tableConfig.js";
import { processData } from "./dataProcessor.js";
import { attachDeleteButtonListeners } from "../tableActions/deleteUser.js";

export async function renderData() {
  const table__body = document.querySelector(".table__body");
  table__body.innerHTML = "";
  let url = getUrl();

  try {
    let userObject = await processData("GET", url);

    for (const user in userObject) {
      table__body.insertAdjacentHTML(
        "beforeend",
        `
        <tr class="table__body__row" id="${user}"></tr>
        `
      );
      const content = document.querySelector(".table__body__row:last-child");
      for (const key in userObject[user]) {
        if (key === "birthday") {
          const date = renderDate(userObject[user][key]);
          content.insertAdjacentHTML(
            "beforeend",
            `
          <td class="date">${date}</td>`
          );
        } else if (key === "avatar") {
          const source = userObject[user][key];
          content.insertAdjacentHTML(
            "beforeend",
            `
          <td><image src="${source}"/></td>`
          );
        } else {
          content.insertAdjacentHTML(
            "beforeend",
            `
          <td>${userObject[user][key]}</td>`
          );
        }
      }

      content.insertAdjacentHTML(
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

export function renderHeaders() {
  const table__header = document.querySelector(".table__header");
  let columns = getColumns();

  table__header.insertAdjacentHTML(
    "beforeend",
    `<tr class="table__header__row">
      </tr>`
  );

  const header = document.querySelector(".table__header__row");

  for (const item of columns) {
    header.insertAdjacentHTML(
      "beforeend",
      `
            <th class="${item.value}">${item.title}</th>`
    );
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
