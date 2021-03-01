// Taken from: https://github.com/ramda/ramda/blob/v0.27.0/source/splitEvery.js
export const splitEvery = function splitEvery(n, list) {
  if (n <= 0) {
    throw new Error('First argument to splitEvery must be a positive integer');
  }

  const result = [];
  let idx = 0;

  while (idx < list.length) {
    result.push(list.slice(idx, idx += n));
  }

  return result;
};
