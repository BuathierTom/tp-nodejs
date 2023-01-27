const { findOne, find, insertOne, insertMany, updateOne, updateMany, replace, deleteOne, deleteMany } = require("../services/db/crud");

async function findUser(req,res, next){
  try {
      const result = await findOne('users', {name: "Tom"});
      return res.send(result)
  } catch (e){
    console.log(e)
  }
}

async function findMultipleUser(req,res, next){
  try {
      const cursor = await find('users', {});
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

async function createUser(req, res, next) {
  console.log("Creation ....");
  res.send("Creation ....");
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
  deleteManyUser
};
