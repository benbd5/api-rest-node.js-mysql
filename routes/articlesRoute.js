const express = require("express");
const router = express.Router();

const articleController = require("../controllers/articleController");

// Pages des articles
router.get("/", articleController.get_articles_page);
router.get("/:id");

module.exports = router;
