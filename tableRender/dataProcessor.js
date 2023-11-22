/**
 * Send "GET" request and returns object with data if possible.
 *
 * @param {string} url Source of data.
 * @returns parsed object with data.
 */
export async function processData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    let userObject = {};

    for (let item in data) {
      userObject = data[item];
    }

    return userObject;
  } catch (error) {
    console.log(error.message);
  }
}
