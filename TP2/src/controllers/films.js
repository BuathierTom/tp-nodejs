const { v4 : uuidv4 } = require ('uuid');
const { getFilm } = require('../repositories/omdbapi');

const { findOne,  
        insertOne
    } = require("../services/db/crud");

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
    console.log(`Insertion du film : ${search} fait !`)
    return res.send(result)

  } catch (e){
    console.log(e)
  }
}

module.exports = {
  insertFilm,
};