const express = require("express");
const router = express.Router();
const { 
    insertFilm
    } = require("../controllers/films");

// Insere un film dans la base watchlist
router.post("/addFilm", insertFilm)

module.exports = router;