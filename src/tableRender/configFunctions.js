/**
 * Gets and string value with date and returns proper formatted date string.
 *
 * @param {String} value
 * @returns date in format yyy-mm-dd.
 */
function getAge(value) {
  const dateValue = new Date(value);
  const formattedDate = dateValue.toISOString().split("T")[0];
  return formattedDate;
}

/**
 * Gets an string with color and returns div with this color on background.
 *
 * @param {String} color
 * @returns div element with specified color.
 */
function getColorLabel(color) {
  return `<div style="background-color: ${color}; width: 90%;
     height: 90%;
     position: absolute;
     left:5%;
     top:5%;
     right:5%;
     bottom:0;"></div>`;
}

const renderImage = (user) =>
  `<img src="${user.avatar}" alt="${user.name} ${user.surname}"/>`;

const renderDate = (user) => getAge(user.birthday);

const renderPrice = (product) => `${product.price} ${product.currency}`;

const renderColor = (product) => getColorLabel(product.color);

const functions = {
  renderImage,
  renderColor,
  renderDate,
  renderPrice,
};

export default functions;
