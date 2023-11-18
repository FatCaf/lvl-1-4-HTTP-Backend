export async function processData(method, url) {
  const response = await fetch(url);
  const data = await response.json();

  let userObject = {};

  for (let item in data) {
    userObject = data[item];
  }

  return userObject;
}
