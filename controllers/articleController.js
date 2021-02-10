const fileupload = require("express-fileupload");
const path = require("path");
const express = require("express");
const app = express();

// FileUpload
app.use(fileupload());

const get_articles_page = async (req, res) => {
  const listeDesArticles = await query("SELECT * FROM article");
  res.render("articles", { articles: listeDesArticles });
};

const get_one_article = async (req, res) => {
  const id = req.params.id;
  // "?" permet de sécuriser lkes requetes sql
  const singleArticle = await query("SELECT * FROM article WHERE articleId=?", [
    id,
  ]);
  res.render("singleArticle", { article: singleArticle[0] });
  console.log(singleArticle);
};

const get_post_articles = async (req, res) => {
  res.render("post");
};

const post_articles = async (req, res) => {
  const image = req.files.image;
  const imageName = image.name;

  const fileUpload = path.resolve(
    __dirname,
    "..",
    "public/uploads/",
    imageName
  );

  const upload = image.mv(fileUpload);

  const query =
    "INSERT INTO article (titre,image,auteurId,description) VALUES ('" +
    req.body.titre +
    "', '" +
    imageName +
    "', " +
    req.body.auteurId +
    ",'" +
    req.body.description +
    "');";
  console.log(req.body);

  db.query(query, upload, (err, result) => {
    if (err) {
      return res.send(err);
    }
    res.send("Ok");
  });
};

module.exports = {
  get_articles_page,
  post_articles,
  get_post_articles,
  get_one_article,
};
