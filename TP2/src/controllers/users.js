const { v4 : uuidv4 } = require ('uuid');
const { getFilm } = require('../repositories/omdbapi');

const { findOne, 
        find, 
        insertOne, 
        insertMany, 
        updateOne, 
        updateMany, 
        replace, 
        deleteOne, 
        deleteMany } = require("../services/db/crud");

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

async function insertFilm(req, res, next) {
  try {
    const search = req.body.search
    const film = await getFilm(search)
    const id = uuidv4();

    const verif = await findOne('Films', {Title: search})
    if (verif) {
      return res.send({Error: `Error, le film ${search} existe déja`});
    }

    const result = await insertOne('Films', {
      id: id,
      Title: film.Title,
      Released: film.Released,
      Genre: film.Genre,
      Runtime: film.Runtime,
      Writer: film.Writer,
      Actors: film.Actors,
      Language: film.Language,
      Plot: film.Plot,
      Type: film.Type       
    });
    console.log(`Insertion du film ${search} fait !`)
    return res.send(result)

  } catch (e){
    console.log(e)
  }
}

// Fonctions que je réutiliserai plus tard


async function findUser(req,res, next){
  try {
      const result = await findOne('users', {name: "Zob"});
      return res.send(result)
  } catch (e){
    console.log(e)
  }
}

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

async function insertOneUser(req,res, next){
  try {
      const result = await insertOne('users', {name: "Evan", age: "18"});
      console.log("L'insertion a bien eu lieu")
      return res.send(result)
  } catch (e){
    console.log(e)
  }
}

async function insertManyUser(req,res, next){
  try {
    const docs = [
      { name: "Analtole", age: 16 },
      { name: "Zob", age: 3 },
      { name: "Respirateur", age: 19 }
    ];
        const result = await insertMany("users", docs)
        console.log("Les insertions ont bien eu lieu")
        return res.send(result);
  } catch (e){
    console.log(e)
  }
}

async function updateOneUser(req,res, next){
  try {
      const filter = { name: "Respirateur" };

      const updateDoc = {
        $set: {
          age: `${Math.random()}`
        },
      };

      const result = await updateOne('users', filter, updateDoc);
      console.log("L'update a bien eu lieu")
      return res.send(result)
  } catch (e){
    console.log(e)
  }
}

async function updateManyUser(req,res, next){
  try {
      const filter = { age: "19" };

      const updateDoc = {
        $set: {
          age: "32"
        },
      };

      const result = await updateMany('users', filter, updateDoc);
      console.log("Les updates ont bien eu lieu")
      return res.send(result)
  } catch (e){
    console.log(e)
  }
}

async function replaceUser(req,res, next){
  try {

    const query = { name:  "Tom"};

    const replacement = {
      name: "Xx_Tom_xX",
    };

      const result = await replace('users', query, replacement);
      console.log("Le grand remplacement a bien eu lieu")
      return res.send(result)
  } catch (e){
    console.log(e)
  }
}

async function deleteOneUser(req,res, next){
  try {
      const result = await deleteOne('users', { name: "Respirateur" });
      console.log("Le grand delete a bien eu lieu")
      return res.send(result)
  } catch (e){
    console.log(e)
  }
}

async function deleteManyUser(req,res, next){
  try {
      const result = await deleteMany('users', { age: "32" });
      console.log("Le grand delete a bien eu lieu")
      return res.send(result)
  } catch (e){
    console.log(e)
  }
}

module.exports = {
  createUser,
  findUser,
  findMultipleUser,
  insertOneUser,
  insertManyUser,
  updateOneUser,
  updateManyUser,
  replaceUser,
  deleteOneUser,
  deleteManyUser,
  insertFilm
};
