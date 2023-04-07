const { v4 : uuidv4 } = require ('uuid');
const { getFilm } = require('../repositories/omdbapi');
const { addLog } = require("../services/logs/logs");

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
      addLog("error", `Error, le film ${search} existe déja`, "films.js")
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
    addLog("info", `Le film ${search} a bien été ajouté`, "films.js")
    return res.send(result)

  } catch (e){
    addLog("error", e, "films.js")
  }
}

module.exports = {
  insertFilm,
};