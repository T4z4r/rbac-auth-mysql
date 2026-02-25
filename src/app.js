const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "RBAC MySQL API running" }));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

module.exports = app;