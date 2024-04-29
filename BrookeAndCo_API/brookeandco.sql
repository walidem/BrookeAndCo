drop database if exists brookeandco;
Create database brookeandco;
use brookeandco;

-- Table Produits
CREATE TABLE Produits (
    id VARCHAR(20) PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    prix DECIMAL(10, 2) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    quantiteEnStock INT NOT NULL DEFAULT 0,
    quantiteMinStock INT NOT NULL DEFAULT 0,
    etat ENUM('Actif', 'Inactif') NOT NULL
);

-- Table Livres
CREATE TABLE Livres (
    idProduit VARCHAR(20) PRIMARY KEY,
    isbn VARCHAR(13),
    dateParution DATE,
    editeur VARCHAR(50),
    auteurs VARCHAR(50),
	categorie VARCHAR(30),
    FOREIGN KEY (idProduit) REFERENCES Produits(id)
);

-- Table Films
CREATE TABLE Films (
    idProduit VARCHAR(20) PRIMARY KEY,
    acteurs VARCHAR(100),
    realisateur VARCHAR(100),
    format ENUM('DVD', 'Blu-ray') NOT NULL,
    videoExtrait VARCHAR(255),
    categorie VARCHAR(30),
    FOREIGN KEY (idProduit) REFERENCES Produits(id)
);

-- Table Jeux
CREATE TABLE Jeux (
    idProduit VARCHAR(20) PRIMARY KEY,
    auteurs VARCHAR(100),
    collection VARCHAR(50),
    categorie VARCHAR(30),
    FOREIGN KEY (idProduit) REFERENCES Produits(id)
);

CREATE TABLE Users (
	id INT PRIMARY KEY,
    user_type ENUM('Client', 'Employe') NOT NULL
);

-- Table Client
CREATE TABLE Client (
    id INT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    courriel VARCHAR(255) UNIQUE NOT NULL,
    telephone VARCHAR(15),
    adresse VARCHAR(100),
    photo VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (id) REFERENCES Users(id)
);

-- Table Employe
CREATE TABLE Employe (
    matricule INT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    courriel VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (matricule) REFERENCES Users(id)
);

-- Table Commande
CREATE TABLE Commande (
    numero INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    idClient INT NOT NULL,
    etat ENUM('Non Complété', 'Payée', 'Expédiée', 'Livrée') NOT NULL,
    FOREIGN KEY (idClient) REFERENCES Client(id)
);

-- Table LigneCommande
CREATE TABLE LigneCommande (
    idProduit VARCHAR(20),
    numeroCommande INT,
    quantite INT NOT NULL,
    prixReel DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (idProduit, numeroCommande),
    FOREIGN KEY (idProduit) REFERENCES Produits(id),
    FOREIGN KEY (numeroCommande) REFERENCES Commande(numero)
);

-- Table Livraison
CREATE TABLE Livraison (
    numeroCommande INT PRIMARY KEY,
    datePrevue DATE,
    dateReel DATE,
    adresseLivraison TEXT NOT NULL,
    etat ENUM('Livré', 'Non Livré') NOT NULL,
    FOREIGN KEY (numeroCommande) REFERENCES Commande(numero)
);

-- Table Fournisseurs
CREATE TABLE Fournisseurs (
    numero INT PRIMARY KEY AUTO_INCREMENT,
    entreprise VARCHAR(255) NOT NULL,
    adresse TEXT NOT NULL
);

-- Table Approvisionnement
CREATE TABLE Approvisionnement (
    numero INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    idFournisseur INT,
    etat ENUM('Approuvé') NOT NULL,
    FOREIGN KEY (idFournisseur) REFERENCES Fournisseurs(numero)
);

-- Table ProduitApprovisionné
CREATE TABLE ProduitApprovisionné (
    idProduit VARCHAR(40),
    numeroApprovisionnement INT,
    quantite INT NOT NULL,
    prixReel DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (idProduit, numeroApprovisionnement),
    FOREIGN KEY (idProduit) REFERENCES Produits(id),
    FOREIGN KEY (numeroApprovisionnement) REFERENCES Approvisionnement(numero)
);

-- Remplissage de la table Produits
INSERT INTO Produits (id, titre, prix, description, image, quantiteEnStock, quantiteMinStock, etat) 
VALUES 
('LIV00001', 'Tintin au Congo', 22.99, 'Tintin visite le Congo!', '/images/livre1.jpg', 10, 2, 'Actif'),
('LIV00002', 'Tintin en Amérique', 22.99, 'Tintin visite l\'Amérique!', '/images/livre2.jpg', 10, 2, 'Actif'),
('LIV00003', 'Les Cigares du Pharaon', 22.99, 'Tintin visite le Moyen-Orient!', '/images/livre3.jpg', 10, 2, 'Actif'),
('LIV00004', 'Le Lotus Bleu', 22.99, 'Tintin visite l\'Extrême-Orient!', '/images/livre4.jpg', 10, 2, 'Actif'),
('LIV00005', 'L\'Oreille Cassée', 22.99, 'Tintin visite l\'Amérique du Sud!', '/images/livre5.jpg', 10, 2, 'Actif'),
('LIV00006', '1984', 18.99, 'Un classique de la dystopie', '/images/1984.jpg', 20, 5, 'Actif'),
('LIV00007', 'Cent ans de solitude', 19.99, 'Un chef-d\'œuvre de la littérature', '/images/cent_ans.jpg', 15, 4, 'Actif'),
('LIV00008', 'La fille du train', 14.99, 'Un thriller psychologique', '/images/fille_du_train.jpg', 25, 5, 'Actif'),
('LIV00009', 'Orgueil et préjugés', 12.99, 'Un roman d\'amour classique', '/images/orgueil.jpg', 30, 10, 'Actif'),
('LIV00010', 'Fahrenheit 451', 17.99, 'Une dystopie sur la censure', '/images/fahrenheit.jpg', 10, 2, 'Actif'),
('LIV00011', 'Gatsby le Magnifique', 16.99, 'L\'histoire d\'un homme mystérieux', '/images/gatsby.jpg', 8, 2, 'Actif'),
('LIV00012', 'Une place à prendre', 20.99, 'Un roman contemporain', '/images/place_a_prendre.jpg', 18, 5, 'Actif'),
('LIV00013', 'Mille soleils splendides', 15.99, 'Une histoire émouvante', '/images/mille_soleils.jpg', 22, 6, 'Actif'),
('LIV00014', 'Da Vinci Code', 18.99, 'Un thriller mystérieux', '/images/da_vinci.jpg', 15, 3, 'Actif'),
('LIV00015', 'Carrie', 16.99, 'Un roman d\'horreur', '/images/carrie.jpg', 20, 4, 'Actif'),
('LIV00016', 'La stratégie Ender', 14.99, 'Un classique de la science-fiction', '/images/ender.jpg', 18, 4, 'Actif'),
('LIV00017', 'Millénium 1 : Les hommes qui n’aimaient pas les femmes', 19.99, 'Un thriller nordique', '/images/millenium.jpg', 10, 3, 'Actif'),
('LIV00018', 'Le bizarre incident du chien pendant la nuit', 13.99, 'Un mystère contemporain', '/images/bizarre_incident.jpg', 20, 7, 'Actif'),
('LIV00019', 'Kafka sur le rivage', 21.99, 'Un voyage mystique', '/images/kafka.jpg', 17, 5, 'Actif'),
('LIV00020', 'Beloved', 16.99, 'Un roman historique poignant', '/images/beloved.jpg', 9, 2, 'Actif'),
('LIV00021', 'Catch-22', 15.99, 'Une satire de la guerre', '/images/catch22.jpg', 14, 3, 'Actif'),
('LIV00022', 'Tout s\'effondre', 14.99, 'Un regard sur l\'histoire africaine', '/images/effondre.jpg', 13, 3, 'Actif'),
('LIV00023', 'Livre de John Fowles', 19.99, 'Roman fascinant par John Fowles', '/images/livre23.jpg', 15, 3, 'Actif'),
('LIV00024', 'Livre de Donna Tartt', 22.99, 'Chef-d\'œuvre littéraire de Donna Tartt', '/images/livre24.jpg', 10, 2, 'Actif'),
('LIV00025', 'Livre de Chimamanda Ngozi Adichie', 20.99, 'Un roman captivant par Chimamanda Ngozi Adichie', '/images/livre25.jpg', 12, 3, 'Actif'),

('FIL00001', 'V pour Vendetta', 13.99, 'Le mystérieux V confronte un régime totalitaire.', '/images/film1.jpg', 20, 5, 'Actif'),
('FIL00002', 'King Kong', 11.99, 'Un primate aussi immense que furieux fait de l\'escalade à New York.', '/images/film2.jpg', 20, 5, 'Actif'),
('FIL00003', 'Petit-Pied', 8.99, 'Un dinosaure découvre le monde préhistorique.', '/images/film3.jpg', 15, 3, 'Actif'),
('FIL00004', 'Casper', 8.99, 'Un petit fantôme hante un manoir et se fait des amis!', '/images/film4.jpg', 15, 3, 'Actif'),
('FIL00005', 'Forrest Gump', 11.99, 'Quelques décennies d\'histoire américaine, des années 1940 à la fin du XXème siècle, à travers le regard et l\'étrange odyssée d\'un homme simple et pur, Forrest Gump.', '/images/film5.jpg', 50, 5, 'Actif'),
('FIL00006', 'La Ligne verte', 9.99, 'Paul Edgecomb, Gardien-chef du pénitencier de Cold Mountain en 1935, était chargé de veiller au bon déroulement des exécutions capitales.', '/images/film6.jpg', 40, 5, 'Actif'),
('FIL00007', '12 hommes en colère', 7.99, 'Lors d\'un procès, un juré émet l\'hypothèse que l\'homme qu\'il doit juger n\'est peut-être pas coupable. Il va tenter de convaincre les onze autres jurés.', '/images/film7.jpg', 55, 10, 'Actif'),
('FIL00008', 'Le Parrain', 8.99, 'En 1945, à New York, les Corleone sont une des cinq familles de la mafia. Don Vito Corleone marie sa fille à un bookmaker. Sollozzo, "parrain" de la famille Tattaglia.', '/images/film8.jpg', 45, 10, 'Actif'),
('FIL00009', 'Les Evadés', 7.99, 'Condamné à perpétuité pour le meurtre de sa femme et de son amant, un banquier s\'accroche à l\'espoir et se lie d\'amitié avec un autre détenu pour survivre en prison.', '/images/film9.jpg', 60, 15, 'Actif'),
('FIL00010', 'Le Seigneur des anneaux : le retour du roi', 5.99, 'Tandis que les ténèbres se répandent sur la Terre du Milieu, Aragorn se révèle être l\'héritier caché des rois antiques.', '/images/film10.jpg', 35, 5, 'Actif'),

('JEUX00001', 'Hitman', 29.99, 'Un tueur à gages doit éliminer ses cibles sans préjudice.', '/images/jeu1.jpg', 4, 5, 'Actif'),
('JEUX00002', 'Call of duty modern warfare 2', 69.99, 'Ce jeu est un jeu de guerre.', '/images/jeu2.jpg', 10, 5, 'Actif'),
('JEUX00003', 'Starfield', 89.99, 'Explorez les étoiles!', '/images/jeu3.jpg', 7, 5, 'Actif'),
('JEUX00004', 'Baldur\'s Gate 3', 79.99, 'Le meilleur jeu de tous les temps. No holds barred.', '/images/jeu4.jpg', 2, 5, 'Inactif'),
('JEUX00005', 'Fallout: New Vegas', 29.99, 'Vegas, an l\'an 2281. Patrouillez le désert du Mojave pendant l\'hiver nucléaire!', '/images/jeu5.jpg', 15, 10, 'Actif'),
('JEUX00006', 'F1 23', 59.99, 'Ce jeu est un jeu de course.', '/images/jeu6.jpg', 3, 5, 'Actif'),
('JEUX00007', 'Lost Eden', 3.99, 'Ce jeu paru en 1995 est la définition même de graphiques basse résolution.', '/images/jeu7.jpg', 10, 5, 'Actif'),
('JEUX00008', 'Heroes of Might and Magic III', 11.99, 'Ce jeu de stratégie est reconnu comme le meilleur de sa série.', '/images/jeu8.jpg', 1, 5, 'Actif'),
('JEUX00009', 'Stardew Valley', 14.99, 'Grand-Père vous a légué sa ferme, ce qui vous a permis de quitter votre job de bureau. Hourra!', '/images/jeu9.jpg', 8, 5, 'Actif'),
('JEUX00010', 'Plants Vs Zombies', 9.99, 'Développez un arsenal de plantes pour terrasser les vilains zombies!', '/images/jeu10.jpg', 10, 5, 'Actif');

INSERT INTO Livres (idProduit, categorie, isbn, dateParution, editeur, auteurs)
VALUES
('LIV00001', 'Littérature', '1234567890123', '1949-03-01', 'Casterman', 'Hergé'),
('LIV00002', 'Littérature', '1234567890124', '1949-04-01', 'Casterman', 'Hergé'),
('LIV00003', 'Littérature', '1234567890125', '1949-05-01', 'Casterman', 'Hergé'),
('LIV00004', 'Littérature', '1234567890126', '1949-06-01', 'Casterman', 'Hergé'),
('LIV00005', 'Littérature', '1234567890127', '1949-07-01', 'Casterman', 'Hergé'),
('LIV00006', 'Littérature', '1234567890124', '1984-03-01', 'Seuil', 'George Orwell'),
('LIV00007', 'Littérature', '1234567890125', '1967-05-10', 'Gallimard', 'Gabriel García Márquez'),
('LIV00008', 'Littérature', '1234567890126', '2015-09-15', 'HarperCollins', 'Paula Hawkins'),
('LIV00009', 'Littérature', '1234567890127', '1813-01-28', 'T. Egerton', 'Jane Austen'),
('LIV00010', 'Informatique', '1234567890128', '1953-06-08', 'Doubleday', 'Ray Bradbury'),
('LIV00011', 'Littérature', '1234567890129', '1925-04-10', 'Scribner', 'F. Scott Fitzgerald'),
('LIV00012', 'Littérature', '1234567890130', '2012-09-01', 'Little, Brown', 'J.K. Rowling'),
('LIV00013', 'Littérature', '1234567890131', '2008-08-14', 'Vintage Books', 'Khaled Hosseini'),
('LIV00014', 'Informatique', '1234567890132', '2001-09-01', 'Doubleday', 'Dan Brown'),
('LIV00015', 'Littérature', '1234567890133', '1974-10-17', 'Penguin', 'Stephen King'),
('LIV00016', 'Informatique', '1234567890134', '1985-09-01', 'Houghton Mifflin', 'Orson Scott Card'),
('LIV00017', 'Littérature', '1234567890135', '2010-06-18', 'Random House', 'Stieg Larsson'),
('LIV00018', 'Littérature', '1234567890136', '2003-07-08', 'Bloomsbury', 'Mark Haddon'),
('LIV00019', 'Littérature', '1234567890137', '1996-08-26', 'Harvill Secker', 'Haruki Murakami'),
('LIV00020', 'Littérature', '1234567890138', '1987-08-17', 'Vintage', 'Toni Morrison'),
('LIV00021', 'Littérature', '1234567890139', '1961-07-11', 'Viking Press', 'Joseph Heller'),
('LIV00022', 'Littérature', '1234567890140', '1958-10-16', 'Heinemann', 'Chinua Achebe'),
('LIV00023', 'Littérature', '1234567890141', '1977-11-12', 'Faber & Faber', 'John Fowles'),
('LIV00024', 'Littérature', '1234567890142', '1992-05-08', 'Farrar, Straus & Giroux', 'Donna Tartt'),
('LIV00025', 'Littérature', '1234567890143', '2013-08-20', 'Riverhead Books', 'Chimamanda Ngozi Adichie');


INSERT INTO Films (idProduit, categorie, acteurs, realisateur, format, videoExtrait)
VALUES
('FIL00001', 'Science Fiction', 'Hugo Weaving', 'George Lucas', 'DVD', '/videos/video1.mpg'),
('FIL00002', 'Comedy', 'Scarlett Johanson', 'John Smith', 'DVD', '/videos/video2.mpg'),
('FIL00003', 'Drama', 'John Littlefoot', 'Dino Sore', 'Blu-ray', '/videos/video3.mpg'),
('FIL00004', 'Action', 'Cass Pear', 'Phan Thom', 'Blu-ray', '/videos/video4.mpg'),
('FIL00005', 'Drama', 'Tom Hanks', 'Robert Zemeckis', 'DVD', '/videos/video5.mpg'),
('FIL00006', 'Drama', 'Tom Hanks', 'Frank Darabont', 'Blu-ray', '/videos/video6.mpg'),
('FIL00007', 'Drama', 'Henry Fonda', 'Sidney Lumet', 'DVD', '/videos/video7.mpg'),
('FIL00008', 'Action', 'Marlon Brando', 'Francis Ford Coppola', 'DVD', '/videos/video8.mpg'),
('FIL00009', 'Drama', 'Tim Robbins', 'Frank Darabont', 'Blu-ray', '/videos/video9.mpg'),
('FIL00010', 'Adventure', 'Sean Astin', 'Peter Jackson', 'DVD', '/videos/video10.mpg');

INSERT INTO Jeux (idProduit, categorie, auteurs, collection)
VALUES
('JEUX00001', 'Playstation', 'Ubisoft', 'Hitman'),
('JEUX00002', 'Playsation', 'Activision', 'Call of duty'),
('JEUX00003', 'Nintendo Wii U', 'Ubisoft', 'Starfield'),
('JEUX00004', 'Playstation', 'Larian', 'Baldur\'s Gate'),
('JEUX00005', 'Xbox', 'Obsidian', 'Fallout'),
('JEUX00006', 'Playsation', 'EA Sports', 'F1'),
('JEUX00007', 'Playstation', 'Westwood', 'Sans collection'),
('JEUX00008', 'Xbox', '3D0', 'Might and Magic'),
('JEUX00009', 'Nintendo Wii U', 'ConcernedApe', 'Sans collection'),
('JEUX00010', 'Playstation', 'PopCap!', 'Plants vs Zombies');