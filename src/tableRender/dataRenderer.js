/**
 * Create and fill td elements with specified data from dataObject.
 * Each element linked to table by hash code.
 *
 * @param {Object} dataObject object with data to render.
 * @param {Array} columns  array with column headers.
 * @param {String} hash unique hash code for table.
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
          <td class="${hash}td">${item.value(dataObject[dataItem])}</td>`,
          );
        } else {
          tableRow.insertAdjacentHTML(
            "beforeend",
            `
                <td class="${hash}td">${dataObject[dataItem][item.value]}</td>`,
          );
        }
      });
      tableRow.insertAdjacentHTML(
        "beforeend",
        `<td class="${hash}options options"><button class="${hash}__delete__button del__btn"
      data-id="${dataItem}">Delete</button>
      <button class="${hash}__edit__button edt__btn" data-id="${dataItem}">Edit</button>
      </td>`,
      );
    }
  }
}

/**
 * Gets an array with headers and hash code and builds table header.
 *
 * @param {Array} columns array with column headers.
 * @param {String} hash unique hash code for table.
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

/**
 * Gets name and hash code and build structure for table.
 *
 * @param {String} parentElement id of html tag where table need to be rendered.
 * @param {String} hash unique hash code for table.
 */
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
