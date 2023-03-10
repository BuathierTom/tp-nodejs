/**
 * @function
 * @param {number} id, id de l'utilisateur a rechercher
 * @param {Array} usersData, tableau contenant la liste des utilisateurs 
 * Retourne les données de l'utilisateur de la liste qui correpondant à l'id 
 */
function getUser(id, usersData) {
  if (typeof id !== "number") {
    throw new Error("L'identifiant doit être un entier positif");
  }if (id < 0) {
    throw new Error("L'identifiant doit être un entier positif");
  } if (!Array.isArray(usersData)) {
    throw new Error("La liste des utilisateur doit être un tableau contenant des utilisateurs");
  } if (!usersData.length){
    throw new Error("La liste des utilisateur est vide");
  } if (!usersData.find(item => item["id"] === id)){
    throw new Error(`L'utilisateur ${id} n'existe pas!`);
  } else {
    return usersData[id-1]
  }
  
 
}

module.exports = {
  getUser,
};
