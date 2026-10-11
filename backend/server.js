const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");

app.use("/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Backend Server Running");
});

app.listen(5000, () => {
  console.log("Server Running");
});
