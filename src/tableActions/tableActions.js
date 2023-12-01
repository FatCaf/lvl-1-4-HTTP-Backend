import addUserHandler from "./addUser";
import deleteUserHandler from "./deleteUser";
import findUserHandler from "./findUser";

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
  deleteUserHandler(url, columns, hash);
  addUserHandler(hash, columns, url);
  findUserHandler(hash);
}
