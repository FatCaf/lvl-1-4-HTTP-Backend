/**
 * Fill the td elements in table with specified data from api url.
 */
export function renderData(dataObject, columns, hash) {
  const tableBody = document.querySelector(`.${hash}__table__body`);
  tableBody.innerHTML = "";

  // eslint-disable-next-line no-restricted-syntax
  for (const dataItem in dataObject) {
    if (Object.prototype.hasOwnProperty.call(dataObject, dataItem)) {
      tableBody.insertAdjacentHTML(
        "beforeend",
        `
          <tr class="${hash}__table__body__row" id="${dataItem}"></tr>
          `,
      );
      const tableRow = document.querySelector(
        `.${hash}__table__body__row:last-child`,
      );
      columns.forEach((item) => {
        if (typeof item.value === "function") {
          tableRow.insertAdjacentHTML(
            "beforeend",
            `
          <td>${item.value(dataObject[dataItem])}</td>`,
          );
        } else {
          tableRow.insertAdjacentHTML(
            "beforeend",
            `
                <td>${dataObject[dataItem][item.value]}</td>`,
          );
        }
      });
      tableRow.insertAdjacentHTML(
        "beforeend",
        `<td class="options"><button class="${hash}__delete__button del__btn"
      data-id="${dataItem}">Delete</button></td>`,
      );
    }
  }

  return true;
}

/**
 * Rendering table header, depends on table configuration.
 */
export function renderHeaders(columns, hash) {
  const tableHeader = document.querySelector(`.${hash}__table__header`);
  tableHeader.insertAdjacentHTML(
    "beforeend",
    `<tr class="${hash}__table__header__row">
      </tr>`,
  );

  const header = document.querySelector(`.${hash}__table__header__row`);

  columns.forEach((item) => {
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
  });

  header.insertAdjacentHTML("beforeend", '<th class="actions">Дії</th>');
}

export function renderStructure(parentElement, hash) {
  const table = document.createElement("table");

  document
    .querySelector(parentElement)
    .insertAdjacentElement("afterbegin", table);
  table.classList.add(`${hash}__table`);
  table.insertAdjacentHTML(
    "afterbegin",
    `
        <thead class="${hash}__table__header">
        </thead>
        <tbody class="${hash}__table__body"></tbody>`,
  );
}
