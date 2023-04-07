var axios = require("axios").default;
const conf = require("../../conf.json")
const apikey = conf.apikey

/**
 * Récupère les informations d'un film
 * @param {string} search - Le titre du film
 * @returns {object} - Les informations du film
 */
async function getFilm(search) {
	const url = 'http://www.omdbapi.com/?t=' + search + '&apikey=' + apikey

	const reponse = await axios.get(url)
  return reponse.data
}

module.exports = {
  getFilm,
}