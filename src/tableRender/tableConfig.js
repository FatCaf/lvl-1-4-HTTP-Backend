const config1 = {
  parent: "#usersTable",
  columns: [
    { title: "Ім’я", value: "name" },
    { title: "Прізвище", value: "surname" },
    { title: "Аватар", value: "avatar", render: "true" },
    { title: "Дата Народження", value: "birthday", render: "true" },
  ],

  apiURL: "https://mock-api.shpp.me/mneklesa/users",
};

export function getParent() {
  if (Object.prototype.hasOwnProperty.call(config1, "parent")) {
    return config1.parent;
  }
  return null;
}

export function getColumns() {
  if (Object.prototype.hasOwnProperty.call(config1, "columns")) {
    return config1.columns;
  }
  return null;
}

export function getUrl() {
  if (Object.prototype.hasOwnProperty.call(config1, "apiURL")) {
    return config1.apiURL;
  }
  return null;
}
