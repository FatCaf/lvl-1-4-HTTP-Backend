/* eslint-disable no-use-before-define */
export default function findUserHandler() {
  const findBtn = document.querySelector(".find__button");

  findBtn.addEventListener("click", findUser);
}

/**
 * Finds user by specified data from input field.
 */
function findUser() {
  const [...userInfo] = document.querySelectorAll(".table__body__row");

  const inputValue = document.querySelector(".find__user").value;

  userInfo.forEach((row) => {
    const tdElements = row.querySelectorAll("td");

    let isExactMatch = false;

    if (parseInt(inputValue, 10)) {
      const dateTDs = document.querySelectorAll(".date");

      dateTDs.forEach((td) => {
        const tdContent = td.textContent.trim();

        const [day, month, year] = tdContent.split(".");

        if (day === inputValue || month === inputValue || year === inputValue) {
          highlightMatchedTD(td);
          isExactMatch = true;
        }
      });
    } else {
      tdElements.forEach((td) => {
        if (
          td.innerHTML.trim().toLowerCase() === inputValue.trim().toLowerCase()
        ) {
          isExactMatch = true;
          highlightMatchedTD(td);
        }
      });
    }

    if (isExactMatch) {
      row.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  });
}

/**
 * Allocates element which was found.
 *
 * @param {HTMLElement} td HTML Element that needs to be highlighted.
 */
function highlightMatchedTD(td) {
  td.classList.add("highlighted");
  setTimeout(() => {
    td.classList.remove("highlighted");
  }, 3000);
}
