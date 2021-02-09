const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const util = require("util");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");

require("dotenv").config();

app.use(bodyParser.json());
app.use(fileupload());

// Sert pour POST et PUT lors de l'envoi de données au seveur
app.use(express.urlencoded({ extended: true }));

// EJS
app.set("view engine", "ejs");

// Dossier statique
app.use(express.static(path.join(__dirname, "public")));

// MySQL
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PSWD,
  database: process.env.DB,
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connecté au serveur MySQL");
});

// Variable globale pour utiliser mysql
// global.querysql = util.promisify(db.query).bind(db);
const query = util.promisify(db.query).bind(db);
global.db = db;
global.query = query;

// Routes
const articles = require("./routes/articlesRoute");

// Controller
// app.use("/liste-des-articles", articles);
app.use(articles);

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000);
