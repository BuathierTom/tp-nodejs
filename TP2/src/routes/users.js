const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/users");

router.get("/create", createUser);

module.exports = router;
