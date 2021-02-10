const fileupload = require("express-fileupload");
const path = require("path");
const express = require("express");
const app = express();

// FileUpload
app.use(fileupload());

// Page pour tous les articles
const get_articles_page = async (req, res) => {
  const listeDesArticles = await query("SELECT * FROM article");
  res.render("articles", { articles: listeDesArticles });
};

// Page pour un seul article
const get_one_article = async (req, res) => {
  const id = req.params.id;
  // "?" permet de sécuriser lkes requetes sql
  const singleArticle = await query("SELECT * FROM article WHERE articleId=?", [
    id,
  ]);
  res.render("singleArticle", { article: singleArticle[0] });
};

// Page posts
const get_post_articles = async (req, res) => {
  res.render("post");
};

// Poster les articles
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
  // console.log(req.body);

  db.query(query, upload, (err, result) => {
    if (err) {
      return res.send(err);
    }
    res.redirect("/");
  });
};

// Supprimer un articles
const delete_articles = async (req, res) => {
  const id = req.params.id;
  /* const deleteArticle = await query("DELETE FROM article WHERE articleId=?", [
    id,
  ]); */
  db.query("DELETE FROM article WHERE articleId=?", [id], (err, results) => {
    if (err) console.log(err);
    console.log("Supprimé");
    res.redirect("/");
  });
};

const get_update_article = async (req, res) => {
  const id = req.params.id;
  const singleArticle = await query("SELECT * FROM article WHERE articleId=?", [
    id,
  ]);
  res.render("updateArticle", { article: singleArticle[0] });
};
const update_article = async (req, res) => {
  const id = req.params.id;

  const updateArticle = await query(
    "UPDATE article SET titre = '" +
      req.body.titre +
      "', auteurId='" +
      req.body.auteurId +
      "', description='" +
      req.body.description +
      "' WHERE articleId=?",
    [id]
  );

  db.query(updateArticle, (err, result) => {
    if (err) console.log(err);
    res.redirect("/liste-des-articles");
  });
};

module.exports = {
  get_articles_page,
  post_articles,
  get_post_articles,
  get_one_article,
  delete_articles,
  get_update_article,
  update_article,
};
