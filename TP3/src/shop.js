/**
 * @function
 * @param {number} id, id de l'utilisateur a rechercher
 * @param {Array} usersData, tableau contenant la liste des utilisateurs 
 * Retourne les données de l'utilisateur de la liste qui correpondant à l'id 
 */
function getUser(id, usersData) {
  return usersData[id-1]
}

module.exports = {
  getUser,
};
