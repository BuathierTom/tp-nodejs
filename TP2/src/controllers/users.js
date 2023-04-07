const { v4 : uuidv4 } = require ('uuid');

const { findOne, 
        find, 
        insertOne, 
        } = require("../services/db/crud");
  
const { addLog } = require("../services/logs/logs");


async function findMultipleUser(req,res, next){
  try {
    const cursor = await find('Utilisateurs', {});
    const result=[]
    await cursor.forEach((item)=>{
      result.push(item)
    });
    addLog("info", `Les utilisateurs ont bien été trouvés`, "users.js")
    return res.send(result)
    } catch (e){
      addLog("error", e, "users.js")
    }
}

async function createUser(req, res, next) {
  try {
    const pseudo = req.body.pseudo
    const age = parseInt(req.body.age)
    const id = uuidv4();

    const verif = await findOne('Utilisateurs', {pseudo: pseudo})
    if (verif) {
      addLog("error", `Error, l'utilisateur ${pseudo} existe déja`, "users.js")
      return res.send({Error: `Error, l'utilisateur ${pseudo} existe déja`});
    }

    const result = await insertOne('Utilisateurs', {id: id, pseudo: pseudo, age: age});
    addLog("info", `L'utilisateur ${pseudo}, qui a pour age : ${age} et l'id : ${id}`, "users.js")
    return res.send(result)
  } catch (e){
    addLog("error", e, "users.js")
  }
}

async function findWatchListUser(req, res, next){
  try {
    const pseudo = req.body.pseudo

    const verif_user = await findOne('Utilisateurs', {pseudo: pseudo})
    // On verifie qu'il y a bien l'utilisateur qui existe
    if (verif_user) {
      const verif_WL = await find('Watchlists', {id_user: verif_user.id});
      const result = []
      await verif_WL.forEach((item)=>{
        result.push(item)
      });
      addLog("info", `L'utilisateur ${pseudo} a bien été trouvé`, "users.js")
      return res.send(result)
    }
    addLog("error", `Error, l'utilisateur ${pseudo} n'existe pas`, "users.js")
    return res.send({Error: `Error, l'utilisateur ${pseudo} n'existe pas`});
  } catch (e){
    addLog("error", e, "users.js")
  }
}

module.exports = {
  findMultipleUser,
  createUser,
  findWatchListUser,
};
