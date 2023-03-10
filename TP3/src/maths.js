/**
 * @function
 * @param {number} a
 * @param {number} b
 * Retourne la somme de a et b
 */
function addition(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Mauvais type!");
  } else {
    return a + b;
  }
}

/**
 * @function
 * @param {number} a
 * @param {number} b
 * Retourne le quotient de a et b
 */
function quotient(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Mauvais type!");
  }if (b === 0) {
    throw new Error("Il est impossible de diviser par 0!");
  } else {
  return a / b;
  }
}

module.exports = {
  addition,
  quotient,
};
