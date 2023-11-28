/* eslint-disable no-use-before-define */
import { renderData } from "../tableRender/dataRenderer";
import processData from "../tableRender/dataProcessor";

export default function deleteUserHandler(url) {
  const deleteButtons = document.querySelectorAll(".delete__button");

  [...deleteButtons].forEach((button) => {
    button.addEventListener("click", () => {
      const toDelete = `${url}/${button.getAttribute("data-id")}`;
      deleteUser(toDelete, url);
    });
  });
}

/**
 * Send "DELETE" request to delete user from table.
 *
 * @param {string} url User url which need to be deleted.
 */
async function deleteUser(toDelete, toRefresh) {
  await fetch(toDelete, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const userObject = await processData("GET", toRefresh);
      renderData(userObject);
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}
