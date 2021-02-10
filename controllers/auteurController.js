// Affiche la liste des auteurs
const get_auteur_page = async (req, res) => {
  const listeDesAuteurs = await query("SELECT * FROM auteur");
  res.render("auteurs", { auteurs: listeDesAuteurs });
};

// Afficher un seul auteur avec son id
const get_one_auteur = async (req, res) => {
  const id = req.params.id;
  const singleAuteur = await query("SELECT * FROM auteur WHERE auteurId=?", [
    id,
  ]);

  // Jointure pour afficher les articles correspondants à l'auteur
  const auteurArticles = await query(
    "SELECT articleId,titre,image,description,auteur.auteurId FROM auteur INNER JOIN article ON auteur.auteurId= article.auteurId WHERE article.auteurId=?",
    [id]
  );

  res.render("singleAuteur", { auteur: singleAuteur[0], auteurArticles });
};

// Aficher la page d'ajout des auteurs
const get_add_auteur = (req, res) => {
  res.render("addAuteur");
};

// Ajouter un auteur
const post_add_auteur = (req, res) => {
  const addAuteur = "INSERT INTO auteur (nom) VALUES ('" + req.body.nom + "');";

  db.query(addAuteur, (err, result) => {
    if (err) {
      return res.send(err);
    }
    console.log(req.body.nom);
    res.redirect("/liste-des-auteurs");
  });
};

// Supprimer un auteur
const delete_auteur = async (req, res) => {
  const id = req.params.id;
  const deleteAuteur = await query("DELETE FROM auteur WHERE auteurId=?", [id]);
  db.query(deleteAuteur, (err, result) => {
    if (err) console.log(err);
    console.log("Auteur supprimé");
    res.redirect("/liste-des-auteurs");
  });
};

// Afficher la page de modification pour les auteurs
const get_update_auteur = async (req, res) => {
  const id = req.params.id;
  const singleAuteur = await query("SELECT * FROM auteur WHERE auteurId=?", [
    id,
  ]);
  res.render("updateAuteur", { auteur: singleAuteur[0] });
};

// Modifier un auteur
const update_auteur = async (req, res) => {
  const id = req.params.id;

  await query(
    "UPDATE auteur SET nom = '" + req.body.nom + "' WHERE auteurId=?",
    [id]
  );
  res.redirect("/liste-des-auteurs");
};

module.exports = {
  get_auteur_page,
  get_one_auteur,
  get_add_auteur,
  post_add_auteur,
  delete_auteur,
  get_update_auteur,
  update_auteur,
};
