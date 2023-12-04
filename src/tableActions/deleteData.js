/* eslint-disable no-use-before-define */
import { renderData } from "../tableRender/dataRenderer";
import processData from "../tableRender/dataProcessor";

export default function deleteDataHandler(hash, columns, url) {
  const deleteButtons = document.querySelectorAll(`.${hash}__delete__button`);

  [...deleteButtons].forEach((button) => {
    button.addEventListener("click", () => {
      const toDelete = `${url}/${button.getAttribute("data-id")}`;
      deleteData(toDelete, hash, columns, url);
    });
  });
}

/**
 * Sends DELETE request to delete specified table column, then updates table.
 *
 * @param {String} toDelete url of data which need to be deleted.
 * @param {String} hash unique hash code for table.
 * @param {Array} columns array with column headers.
 * @param {String} toRefresh url for update data after changes.
 */
async function deleteData(toDelete, hash, columns, toRefresh) {
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
      const dataObject = await processData("GET", toRefresh);
      renderData(dataObject, columns, hash);
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}
