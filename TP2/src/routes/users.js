const express = require("express");
const router = express.Router();
const { createUser, findUser, findMultipleUser } = require("../controllers/users");

router.get("/create", createUser);
router.get("/findOne", findUser);
router.get("/findMult", findMultipleUser);


module.exports = router;
