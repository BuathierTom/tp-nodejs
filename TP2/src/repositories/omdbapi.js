var axios = require("axios").default;
const conf = require("../../conf.json")
const apikey = conf.apikey

async function getFilm(search) {
	const url = 'http://www.omdbapi.com/?t=' + search + '&apikey=' + apikey

	const reponse = await axios.get(url)
  return reponse.data
}

module.exports = {
  getFilm,
}