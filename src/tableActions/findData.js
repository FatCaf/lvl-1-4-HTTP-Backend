/* eslint-disable no-use-before-define */
export default function findDataHandler(hash) {
  const findBtn = document.querySelector(`.${hash}__find__button`);

  findBtn.addEventListener("click", () => findData(hash));
}

/**
 * Finds specified info in specified table.
 *
 * @param {String} hash unique hash code for table.
 */
function findData(hash) {
  const inputValue = document.querySelector(`.${hash}__find__user`).value;

  if (inputValue) {
    const [...tdElements] = document.querySelectorAll(`.${hash}td`);
    let isExactMatch = false;

    tdElements.forEach((element) => {
      if (
        element.textContent.toLowerCase().includes(inputValue.toLowerCase())
      ) {
        if (!isExactMatch) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          isExactMatch = true;
        }

        element.classList.add("highlighted");

        setTimeout(() => {
          element.classList.remove("highlighted");
        }, 10000);
      }
    });
  }
}
