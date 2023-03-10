const usersData = require("./users.json");

/**
 * @function
 * @param {Array} users utilisateurs
 * Retourne les utilisateurs dont l'age est supérieur ou égal à 50 ans
 */
function age(users) {
  if (!Array.isArray(users)) {
    throw new Error("La liste des utilisateur doit être un tableau contenant des utilisateurs");
  } if (!users.length > 0){
    throw new Error("La liste des utilisateur est vide");
  } 
  return users.filter((user) => user.age >= 50);
}


console.log(age(usersData));

module.exports = {
  age,
};