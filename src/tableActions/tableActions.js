import addDataHandler from "./addData";
import deleteDataHandler from "./deleteData";
import editDataHandler from "./editData";
import findDataHandler from "./findData";

/**
 * Adds adding, finding, deleting and editing possibilities for table.
 *
 * @param {String} hash unique hash code for table.
 * @param {Array} columns array with column headers.
 * @param {String} url link for requesting data.
 */
export default function addTableActions(hash, columns, url) {
  const table = document.querySelector(`.${hash}__table`);

  table.insertAdjacentHTML(
    "beforebegin",
    `
  <div class="action__panel">
          <input class="${hash}__find__user find" type="text" name="find" />
          <button class="${hash}__find__button find__btn">Find</button>
          <button class="${hash}__add__button add__btn">Add</button>
        </div>`,
  );
  addDataHandler(hash, columns, url);
  findDataHandler(hash);
  deleteDataHandler(hash, columns, url);
  editDataHandler(hash, columns, url);
}
