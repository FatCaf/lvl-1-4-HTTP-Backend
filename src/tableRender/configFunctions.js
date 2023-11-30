function getAge(value) {
  const date = new Date(value);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth()}` : date.getMonth();
  return `${day}.${month}.${date.getFullYear()}`;
}

function getColorLabel(color) {
  return `<div style="background-color: ${color}; width: 90%;
     height: 90%;
     position: absolute;
     left:0;
     top:0;"></div>`;
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
