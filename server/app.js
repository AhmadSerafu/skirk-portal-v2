require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routers");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

// app.listen(port, () => {
//   console.log(`Skirk Portal running on http://localhost:${port}`);
// });

module.exports = app;
