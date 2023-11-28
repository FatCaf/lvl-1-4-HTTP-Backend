/* eslint-disable no-use-before-define */
// eslint-disable-next-line import/no-cycle
import { renderData } from "../tableRender/dataRenderer";
import { getUrl } from "../tableRender/tableConfig";

export default function attachDeleteButtonListeners() {
  const deleteButtons = document.querySelectorAll(".delete__button");

  [...deleteButtons].forEach((button) => {
    button.addEventListener("click", () => {
      const toDelete = `${getUrl()}/${button.getAttribute("data-id")}`;
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
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      await renderData();
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}
