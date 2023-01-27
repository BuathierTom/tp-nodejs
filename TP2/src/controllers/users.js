const { findOne } = require("../services/db/crud");

async function findUser(req,res, next){
  try {
      const result = await findOne('users', {name: "Tom"});
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
};
