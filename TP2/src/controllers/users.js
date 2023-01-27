const { findOne, find, insertOne, insertMany } = require("../services/db/crud");

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
      // const result = await insertOne('users', docs);
      // return res.send(result)
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
};
