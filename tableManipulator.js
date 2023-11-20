import { renderData } from "./dataRenderer.js";
import { getColumns, getUrl } from "./tableConfig.js";

export function attachDeleteButtonListeners() {
  const deleteButtons = document.querySelectorAll(".delete__button");

  [...deleteButtons].forEach((button) => {
    button.addEventListener("click", () => {
      let toDelete = `https://mock-api.shpp.me/mneklesa/users/${button.getAttribute(
        "data-id"
      )}`;
      deleteUser("DELETE", toDelete)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          renderData();
        })
        .catch((error) => {
          console.error("Error: ", error.message);
        });
    });
  });
}

function deleteUser(method, url) {
  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

const findBtn = document.querySelector(".find__button");

findBtn.addEventListener("click", findUser);

function findUser() {
  const [...userInfo] = document.querySelectorAll(".table__body__row");

  // Get the input field value
  const inputValue = document.querySelector(".find__user").value;

  // Iterate through each table row
  userInfo.forEach((row) => {
    // Get all td elements within the current table row
    const tdElements = row.querySelectorAll("td");

    // Array to store inner HTML content of each td in the current row
    const innerHTMLArray = [];

    // Iterate through the td elements and get inner HTML
    tdElements.forEach((td) => {
      innerHTMLArray.push(td.innerHTML);
    });

    // Check if any td content matches the input value
    if (innerHTMLArray.some((content) => content.includes(inputValue))) {
      // Smooth scroll to the matched row
      row.scrollIntoView({
        behavior: "smooth",
        block: "center", // Adjust as needed
        inline: "nearest", // Adjust as needed
      });

      // Highlight the matched td by adding a class
      tdElements.forEach((td) => {
        if (td.innerHTML.includes(inputValue)) {
          td.classList.add("highlighted");
          setTimeout(() => {
            td.removeAttribute("class");
          }, 3000); // Add your CSS class for highlighting
        }
      });
    }
  });
}

const addBtn = document.querySelector(".add__button");

addBtn.addEventListener("click", addUser);

function addUser() {
  const tableBody = document.querySelector(".table__body");

  tableBody.insertAdjacentHTML(
    "afterbegin",
    `<tr class="new__user">
  <td><input class="name" type="text" placeholder="Enter name"/></td>
  <td><input class="surname" type="text" placeholder="Enter surname"/></td>
  <td><input class="avatar" type="text" placeholder="Enter avatar"/></td>
  <td><input class="birthday" type="text" placeholder="Enter birth"/></td>
  <td><button class="add">Add</button></td>
  </tr>`
  );

  const add = document.querySelector(".add");

  let headers = getColumns();
  let url = getUrl();

  //   add.addEventListener("click", () => {
  //     const newRow = document.querySelector(".new__user");

  //     // Select all input elements within the new row
  //     let combinedValues = {};

  //     // Iterate through the headers array
  //     headers.forEach((header) => {
  //       // Find the input element corresponding to the current header
  //       const input = newRow.querySelector(`.${header.value}`);

  //       // Add the key-value pair to the combinedValues object
  //       combinedValues[header.value] = input.value;
  //     });

  //     // Convert the combinedValues object to a JSON string
  //     const jsonString = JSON.stringify(combinedValues);

  //     // Log the JSON string
  //     console.log(jsonString);
  //   });

  add.addEventListener("click", async () => {
    const newRow = document.querySelector(".new__user");

    // Select all input elements within the new row
    let combinedValues = {};

    // Iterate through the headers array
    headers.forEach((header) => {
      // Find the input element corresponding to the current header
      const input = newRow.querySelector(`.${header.value}`);

      // Add the key-value pair to the combinedValues object
      combinedValues[header.value] = input.value;
    });

    // Convert the combinedValues object to a JSON string
    const jsonData = JSON.stringify(combinedValues);

    try {
      // Send a POST request with fetch
      const response = await fetch(getUrl(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Log the success message
      console.log("User added successfully!");
    } catch (error) {
      // Log and handle errors
      console.error("Error: ", error.message);
    }
  });
}
