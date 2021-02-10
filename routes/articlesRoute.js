const express = require("express");
const router = express.Router();

const articleController = require("../controllers/articleController");

router.get("/", articleController.get_articles_page);

// Pages des articles
router.get("/liste-des-articles", articleController.get_articles_page);
router.get("/add-article", articleController.get_post_articles);
router.get("/liste-des-articles/:id", articleController.get_one_article);
router.post("/send", articleController.post_articles);
router.delete("/delete/:id", articleController.delete_articles);
router.get("/updateArticle/:id", articleController.get_update_article);
router.put("/update-article/:id", articleController.update_article);

module.exports = router;
