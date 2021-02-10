const get_auteur_page = async (req, res) => {
  const listeDesAuteurs = await query("SELECT * FROM auteur");
  res.render("auteurs", { auteurs: listeDesAuteurs });
};

const get_one_auteur = async (req, res) => {
  const id = req.params.id;
  const singleAuteur = await query("SELECT * FROM auteur WHERE auteurID=?", [
    id,
  ]);
  res.render("singleAuteur", { auteur: singleAuteur[0] });
};

const get_add_auteur = (req, res) => {
  res.render("addAuteur");
};

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

const delete_auteur = async (req, res) => {
  const id = req.params.id;
  const deleteAuteur = await query("DELETE FROM auteur WHERE auteurID=?", [id]);
  db.query(deleteAuteur, (err, result) => {
    if (err) console.log(err);
    console.log("Auteur supprimé");
    res.redirect("/liste-des-auteurs");
  });
};

const get_update_auteur = async (req, res) => {
  const id = req.params.id;
  const singleAuteur = await query("SELECT * FROM auteur WHERE auteurID=?", [
    id,
  ]);
  res.render("updateAuteur", { auteur: singleAuteur[0] });
};

const update_auteur = async (req, res) => {
  const id = req.params.id;

  const updateAuteur = await query(
    "UPDATE auteur SET nom = '" + req.body.nom + "' WHERE auteurID=?",
    [id]
  );

  db.query(updateAuteur, (err, result) => {
    if (err) console.log(err);

    res.redirect("/liste-des-auteurs");
  });
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
