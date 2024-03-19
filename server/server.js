require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
const http = require("http");
const router = require("./routes/index");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

const server = http.createServer(app);

app.use(express.json());
app.use("/api", router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.log(error);
  }
};

start();
