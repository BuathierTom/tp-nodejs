const { v4 : uuidv4 } = require ('uuid');

const { findOne, 
        find, 
        insertOne, 
        } = require("../services/db/crud");


async function findMultipleUser(req,res, next){
  try {
    const cursor = await find('Utilisateurs', {});
    const result=[]
    await cursor.forEach((item)=>{
      result.push(item)
    });
          
    return res.send(result)
    } catch (e){
      console.log(e)
    }
}

async function createUser(req, res, next) {
  try {
    const pseudo = req.body.pseudo
    const age = parseInt(req.body.age)
    const id = uuidv4();

    const verif = await findOne('Utilisateurs', {pseudo: pseudo})
    if (verif) {
      return res.send({Error: `Error, l'utilisateur ${pseudo} existe déja`});
    }

    const result = await insertOne('Utilisateurs', {id: id, pseudo: pseudo, age: age});
    console.log(`L'utilisateur ${pseudo}, qui a pour age : ${age} et l'id : ${id}`)
    return res.send(result)
  } catch (e){
    console.log(e)
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
      return res.send(result)
    }
    return res.send({Error: `Error, l'utilisateur ${pseudo} n'existe pas`});
  } catch (e){
    console.log(e)
  }
}

module.exports = {
  findMultipleUser,
  createUser,
  findWatchListUser,
};
