const config1 = {
  parent: "#usersTable",
  columns: [
    { title: "Ім’я", value: "name" },
    { title: "Прізвище", value: "surname" },
    { title: "Аватар", value: "avatar" },
    { title: "Дата Народження", value: "birthday" },
  ],

  apiURL: "https://mock-api.shpp.me/mneklesa/users",
};

export function getParent() {
  if (config1.hasOwnProperty("parent")) {
    return config1.parent;
  }
}

export function getColumns() {
  if (config1.hasOwnProperty("columns")) {
    return config1.columns;
  }
}

export function getUrl() {
  if (config1.hasOwnProperty("apiURL")) {
    return config1.apiURL;
  }
}
