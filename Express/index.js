const express = require("express");
require("dotenv").config();

const errorHandler = require("./middlewares/errorHandler");
const db = require("./models");
const router = require("./routes");
const app = express();
const port = process.env.PORT || 3030;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// const db = require("./app/models");
// db.sequelize.sync();

app.use(router);

app.use(errorHandler);
app.listen(port, async () => {
  console.log(`Express listening on port ${port}`);
});
