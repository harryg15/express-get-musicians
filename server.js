const express = require("express");
const app = express();
const {sequelize} = require("./db");
const port = 3000;
const musicianRoutes = require("./routes/musicians")

app.use("/musicians", musicianRoutes)

app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})