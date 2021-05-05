const express = require("express");
const app = express();

const entryRouter = require("./routes/entry.routes");
const authRoutes = require("./routes/auth.routes");
const { verifyToken } = require("./middlewares");

app.use(express.json());

app.get("/", (_, res) => {
  res.status(200).send({ message: "Welcome to /" });
});

app.use("/api/v1", authRoutes);
app.use(verifyToken);
app.use("/api/v1/entry", entryRouter);

module.exports = app;
