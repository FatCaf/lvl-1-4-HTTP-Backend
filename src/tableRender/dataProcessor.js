/* eslint-disable no-restricted-syntax */
/**
 * Send "GET" request and returns object with data if possible.
 *
 * @param {string} url Source of data.
 * @returns parsed object with data.
 */
export default async function processData(method, url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    let userObject = {};

    for (const item in data) {
      if (Object.prototype.hasOwnProperty.call(data, item)) {
        userObject = data[item];
      }
    }

    return userObject;
  } catch (error) {
    throw new Error(error.message);
  }
}
