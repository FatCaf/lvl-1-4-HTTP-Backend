## Table Rendering and Actions

This repository contains JavaScript code for rendering and managing tables. It includes components for fetching data, rendering tables, configuring table options, and performing user actions.
https://fatcaf.github.io/lvl-1-4-HTTP-Backend/

### Project Structure

- " 'scr':

  - 'styles':

    - `style.css`: Main style file.

  - 'tableActions':

    - `addData.js`: Handles adding new user data to the table.
    - `deleteData.js`: Enables removing selected users from the table.

    - `editData.js`: Enables editing data in table.

    - `editAndAddHelpers.js`: Helper file for creating input block for add or edit data.

    - `findData.js`: Facilitates searching for specific users within the table.

    - `tableActions.js`: Main file of `tableActions` folder, which plugins action functions into the running script.

  - 'tableRender':

    - `configFunctions.js`: Provides a render functions which works with data, color and etc. for config.

    - `dataProcessor.js`: Sends a request to fetch data, processes the response into a JavaScript object, and prepares it for rendering.

    - `dataRenderer.js`: Utilizes the data from `dataProcessor.js` to generate an HTML table structure.

    - `tableConfig.js`: Provides configuration options for customizing the table appearance and behavior.

  - `index.html`: Main page layout.

  - `script.js`: Main script file.

  - `tableconfig.json`: Table config file.
    "

### Usage

Install dependencies: `npm init`.

Development: `npm run dev`.

Production: `npm run prod`.
