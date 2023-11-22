## Table Rendering and Actions

This repository contains JavaScript code for rendering and managing tables. It includes components for fetching data, rendering tables, configuring table options, and performing user actions.

### Table Rendering

The `tableRender` folder contains three files for rendering tables:

- `dataProcessor.js`: Sends a request to fetch data, processes the response into a JavaScript object, and prepares it for rendering.

- `dataRenderer.js`: Utilizes the data from `dataProcessor.js` to generate an HTML table structure.

- `tableConfig.js`: Provides configuration options for customizing the table appearance and behavior.

### Table Actions

The `tableActions` folder contains three files for managing user actions on the table:

- `addUser.js`: Handles adding new user data to the table.

- `findUser.js`: Facilitates searching for specific users within the table.

- `deleteUser.js`: Enables removing selected users from the table.

### Main Script and Styles

The repository also includes three additional files:

- `script.js`: The main JavaScript file, responsible for integrating the table rendering and action components.

- `style.css`: Defines styles for the table and its elements.

- `index.html`: Provides the HTML layout for the table component.

### Usage

To create your own table, follow these steps:

**Configure table options:** Open the `tableConfig.js` file and modify the `config` object to specify the API link, table columns, and other desired settings. For example:

```javascript
const config1 = {
  parent: "#usersTable",
  columns: [
    { title: "Ім’я", value: "name" },
    { title: "Прізвище", value: "surname" },
    { title: "Аватар", value: "avatar", render: "true" },
    { title: "Дата Народження", value: "birthday", render: "true" },
  ],
  apiUrl: "Your Url",
};
```
