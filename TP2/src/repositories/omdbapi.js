var axios = require("axios").default;
const conf = require("../../conf.json")
const { addLog } = require("../services/logs/logs");
const apikey = conf.apikey

/**
 * Récupère les informations d'un film
 * @param {string} search - Le titre du film
 * @returns {object} - Les informations du film
 */
async function getFilm(search) {
	const url = 'http://www.omdbapi.com/?t=' + search + '&apikey=' + apikey

	const reponse = await axios.get(url)
  addLog("info", `Le film ${search} a bien été trouvé`, "omdbapi.js")
  return reponse.data
}

module.exports = {
  getFilm,
}