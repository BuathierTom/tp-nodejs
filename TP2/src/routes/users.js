const express = require("express");
const router = express.Router();
const { createUser, 
        findUser, 
        findMultipleUser, 
        insertOneUser, 
        insertManyUser, 
        updateOneUser, 
        updateManyUser, 
        replaceUser, 
        deleteOneUser, 
        deleteManyUser } = require("../controllers/users");



// Créé un utilisateur
router.get("/create", createUser)
// Pour regarder si ils existent
router.get("/findMult", findMultipleUser);



// router.get("/create", createUser);
// router.get("/findOne", findUser);
// router.get("/insertOne", insertOneUser);
// router.get("/insertMany", insertManyUser);
// router.get("/updateOne", updateOneUser);
// router.get("/updateMany", updateManyUser);
// router.get("/replace", replaceUser);
// router.get("/deleteOne", deleteOneUser);
// router.get("/deleteMany", deleteManyUser);



module.exports = router;
