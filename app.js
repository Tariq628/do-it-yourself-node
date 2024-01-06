const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Place this line here

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const Project = require("./models/Project");

app.set("view engine", "ejs");

app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"));


app.get("/", async (req, res) => {
  const projects = await Project.find();
  res.render("index", { projects });
});
app.get("/categorieen", (req, res) => {
  res.render("categorieen", { pageTitle: "Express HTML Rendering" });
});
app.get("/decoratie", (req, res) => {
  res.render("decoratie", { pageTitle: "Express HTML Rendering" });
});
app.get("/meubels", (req, res) => {
  res.render("meubels", { pageTitle: "Express HTML Rendering" });
});
app.get("/dieren", (req, res) => {
  res.render("dieren", { pageTitle: "Express HTML Rendering" });
});
app.get("/account", (req, res) => {
  res.render("account", { pageTitle: "Express HTML Rendering" });
});
app.get("/favorieten", async (req, res) => {
  const projects = await Project.find();
  res.render("favorieten", { projects });
});
app.get("/DIY-details/:id", (req, res) => {
  res.render("DIY-details", { projectID: req.params.id });
});



app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);



const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Set a longer keep-alive timeout (e.g., 60 seconds)
server.keepAliveTimeout = 60000;
