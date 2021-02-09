const express = require("express");
const app = express();
const path = require("path");

// EJS
app.set("view engine", "ejs");

// Dossier statique
app.use(express.static(path.join(__dirname, "public")));

// Routes
const articles = require("./routes/articlesRoute");

// Controller
app.use("/liste-des-articles", articles);

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000);
