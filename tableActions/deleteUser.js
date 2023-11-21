import { renderData } from "../tableRender/dataRenderer.js";

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
