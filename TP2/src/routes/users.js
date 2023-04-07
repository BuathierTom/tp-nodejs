const express = require("express");
const router = express.Router();
const { createUser, 
        findMultipleUser, 
        findWatchListUser,
        } = require("../controllers/users");

// Récupérer la liste des utilisateurs
router.get("/userList", findMultipleUser)
// Créé un utilisateur
router.post("/createUser", createUser)
// Permet d'afficher les watchlists en fonction d'un utilisateur
router.get("/findWL", findWatchListUser)

module.exports = router;