const fileupload = require("express-fileupload");
const path = require("path");
const express = require("express");
const app = express();

// FileUpload
app.use(fileupload());

// Page pour tous les articles
const get_articles_page = async (req, res) => {
  const totalArticles = await query("SELECT COUNT(*) AS 'Total' FROM article");

  // La jointure permet d'afficher les noms des auteurs liés sur les articles
  const listeDesArticles = await query(
    "SELECT auteur.nom, titre, image, description, auteur.auteurId FROM auteur INNER JOIN article ON auteur.auteurId= article.auteurId "
  );

  res.render("articles", {
    articles: listeDesArticles,
    totalArticles: totalArticles[0].Total, // Total = alias (AS) de la requete
  });
};

// Page pour un seul article
const get_one_article = async (req, res) => {
  const id = req.params.id;

  // "?" permet de sécuriser les requetes sql
  const singleArticle = await query(
    "SELECT auteur.nom, titre, image, description, auteur.auteurId FROM auteur INNER JOIN article ON auteur.auteurId= article.auteurId WHERE articleId=?",
    [id]
  );

  res.render("singleArticle", {
    article: singleArticle[0],
  });
};

// Page posts
const get_post_articles = async (req, res) => {
  const listeDesAuteurs = await query("SELECT * FROM auteur");
  res.render("post", { listeDesAuteurs });
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

  try {
    await query(
      "INSERT INTO article (titre,image,auteurId,description) VALUES ('" +
        req.body.titre +
        "', '" +
        imageName +
        "', " +
        req.body.auteurId +
        ",'" +
        req.body.description +
        "');"
    );
    res.redirect("/");
  } catch (error) {
    return res.send(error);
  }
};

// Supprimer un articles
const delete_articles = async (req, res) => {
  const id = req.params.id;
  await query("DELETE FROM article WHERE articleId=?", [id]);
  console.log("Supprimé");
  res.redirect("/");
};

// Affiche la page de modification des articles
const get_update_article = async (req, res) => {
  const id = req.params.id;
  const singleArticle = await query("SELECT * FROM article WHERE articleId=?", [
    id,
  ]);
  res.render("updateArticle", { article: singleArticle[0] });
};

// Modifier les articles
const update_article = async (req, res) => {
  const id = req.params.id;
  const image = req.files.image;
  const imageName = image.name;

  const fileUpload = path.resolve(
    __dirname,
    "..",
    "public/uploads/",
    imageName
  );

  const upload = image.mv(fileUpload);

  await query(
    "UPDATE article SET titre = '" +
      req.body.titre +
      "', auteurId='" +
      req.body.auteurId +
      "', description='" +
      req.body.description +
      "', image='" +
      imageName +
      "' WHERE articleId=?",
    [id]
  );
  res.redirect("/liste-des-articles");
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
