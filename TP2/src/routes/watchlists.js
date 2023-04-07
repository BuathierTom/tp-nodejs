const express = require("express");
const router = express.Router();
const { 
    createWachtList,
    insertWachtList,
    deleteWatchList,
    favorisWatchList,
    favorisList,
    findFilmWL,
    noteWatchList,
    updateItemWL,
    deleteFilmWL
    } = require("../controllers/watchlists");   

// Créé une watchlist pour un utilisateur
router.post("/createWL", createWachtList)
// Insere un film la watchlist d'un utilisateur
router.post("/addFilmWL", insertWachtList) // Pour la note on doit mettre "note : "N/A" " dans insominia
// Supprimer une watchlist d'un utilisateur
router.post("/deleteWL", deleteWatchList)
// Ajouter une WatchList en favoris
router.post("/favorisWL", favorisWatchList)
// Permet d'afficher les watchlists en favoris en fonction d'un utilisateur
router.get("/favList", favorisList)
// Permet d'afficher les films d'une watchlist
router.get("/findFilmWL", findFilmWL)
// Permet d'écrire une note sur une watchlist (Une sorte de description) 
router.post("/noteWL", noteWatchList)
// Permet de modifier le statut d'un item dans une watchlist
router.post("/updateItemWL", updateItemWL)
// Supprimer un film d'une watchlist
router.post("/deleteFilmWL", deleteFilmWL)

module.exports = router;