const express = require("express");
const router = express.Router();
const { 
    insertFilm,
    findMultipleFilms
    } = require("../controllers/films");

// Insere un film dans la base watchlist
router.post("/addFilm", insertFilm)
// Récupère la liste de tous les films
router.get("/findFilms", findMultipleFilms)

module.exports = router;