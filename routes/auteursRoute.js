const express = require("express");
const router = express.Router();

const auteurController = require("../controllers/auteurController");

router.get("/liste-des-auteurs", auteurController.get_auteur_page);
router.get("/liste-des-auteurs/:id", auteurController.get_one_auteur);
router.get("/add-auteur", auteurController.get_add_auteur);
router.post("/send-auteur", auteurController.post_add_auteur);
router.delete("/delete-auteur/:id", auteurController.delete_auteur);
router.get("/updateAuteur/:id", auteurController.get_update_auteur);
router.put("/update-auteur/:id", auteurController.update_auteur);

module.exports = router;
