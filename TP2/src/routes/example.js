const express = require("express");
const router = express.Router();
const { 
    findUser,
    insertOneUser,
    insertManyUser,
    updateOneUser,
    updateManyUser,
    replaceUser,
    deleteOneUser,
    deleteManyUser 
} = require("../controllers/example");

router.get("/findOne", findUser);
router.get("/insertOne", insertOneUser);
router.get("/insertMany", insertManyUser);
router.get("/update", updateOneUser);
router.get("/updateMany", updateManyUser);
router.get("/replace", replaceUser);
router.get("/deleteOne", deleteOneUser);
router.get("/deleteMany", deleteManyUser);

module.exports = router;