const express = require("express");
const app = express();
const port = 3000;
const users = require("./users");


app.use("/users", users);
// app.use("commandes")

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);    
  });