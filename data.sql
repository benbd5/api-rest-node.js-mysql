CREATE DATABASE cours;
USE cours;

CREATE TABLE auteur (
	auteurId INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255)
);

CREATE TABLE article (
	articleId INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(255),
    image VARCHAR(255),
    auteurId INT,
    description VARCHAR (255),
    FOREIGN KEY (auteurId) REFERENCES auteur(auteurId)
);

INSERT INTO auteur (nom) VALUES ('Jeremy'),('Karl'),('Emilien');

SELECT * FROM auteur;

INSERT INTO article (titre,image,auteurId,description)
VALUES ('neige','neige.jpg',4,'La neige');

SELECT * FROM article;

SELECT COUNT(*) FROM article;

SELECT auteur.nom,titre 
FROM article
INNER JOIN auteur ON article.auteurId = auteur.auteurId;

SELECT auteur.nom,articleId,titre,image,description,auteur.auteurId
FROM auteur
INNER JOIN article ON auteur.auteurId= article.auteurId;
-- WHERE article.auteurId=1;
