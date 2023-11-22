import { renderData } from "../tableRender/dataRenderer.js";
import { getUrl } from "../tableRender/tableConfig.js";

export function attachDeleteButtonListeners() {
  const deleteButtons = document.querySelectorAll(".delete__button");

  [...deleteButtons].forEach((button) => {
    button.addEventListener("click", () => {
      let toDelete = `${getUrl()}/${button.getAttribute("data-id")}`;
      deleteUser(toDelete);
    });
  });
}

/**
 * Send "DELETE" request to delete user from table.
 *
 * @param {string} url User url which need to be deleted.
 */
async function deleteUser(url) {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      renderData();
    })
    .catch((error) => {
      console.error("Error: ", error.message);
    });
}
