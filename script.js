const apiURL = "https://mock-api.shpp.me/mneklesa/users";

function sendRequest(method, url) {
  return fetch(url).then((response) => response.json());
}

sendRequest("GET", apiURL).then((data) => {
  const userArray = [];
  for (item in data) {
    for (value in data[item]) {
      userArray.push(data[item][value]);
    }
  }

  processData(userArray);
});

function processData(userArray, table__body) {
  for (const user of userArray) {
    table__body.insertAdjacentHTML(
      "beforeend",
      `
      <tr class="table__body__row"></tr>
      `
    );
    for (const key in user) {
      const content = document.querySelector(".table__body__row:last-child");

      content.insertAdjacentHTML(
        "beforeend",
        `
      <td>${user[key]}</td>`
      );
    }
  }
}

function foo() {}

function DataTable(config = {}) {
  if (Object.keys(config).length === 0 && data.length === 0) return foo;

  if (document.querySelector(config.parent) !== null) {
    const table = document.createElement("table");

    document
      .querySelector(config.parent)
      .insertAdjacentElement("afterbegin", table);

    table.insertAdjacentHTML(
      "afterbegin",
      `
        <thead class="table__header">
        </thead>
        <tbody class="table__body"></tbody>`
    );

    const table__header = document.querySelector(".table__header");

    for (let key in config) {
      if (key === "columns") {
        table__header.insertAdjacentHTML(
          "beforeend",
          `<tr class="table__header__row">
        </tr>`
        );
        for (const column of config.columns) {
          const header = document.querySelector(".table__header__row");
          header.insertAdjacentHTML(
            "beforeend",
            `
          <th class="${column.value}">${column.title}</th>`
          );
        }
      }
    }

    if (config1.apiURL !== null) {
      const table__body = document.querySelector(".table__body");

      sendRequest("GET", apiURL).then((data) => {
        const userArray = [];
        for (item in data) {
          for (value in data[item]) {
            userArray.push(data[item][value]);
          }
        }

        processData(userArray, table__body);
      });
    }
    // const table__body = document.querySelector(".table__body");

    // for (const user of users) {
    //   table__body.insertAdjacentHTML(
    //     "beforeend",
    //     `
    //   <tr class="table__body__row"></tr>
    //   `
    //   );
    //   for (const key in user) {
    //     const content = document.querySelector(".table__body__row:last-child");

    //     content.insertAdjacentHTML(
    //       "beforeend",
    //       `
    //     <td>${user[key]}</td>`
    //     );
    //   }
    // }
  }
}

const config1 = {
  parent: "#usersTable",
  columns: [
    { title: "Ім’я", value: "name" },
    { title: "Прізвище", value: "surname" },
    { title: "Аватар", value: "avatar" },
    { title: "Дата Народження", value: "dob" },
  ],

  apiURL: "https://mock-api.shpp.me/mneklesa/users",
};

DataTable(config1);
