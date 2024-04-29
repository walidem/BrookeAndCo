import Produit from "../models/produit.model.js";
import Livre from "../models/livre.model.js";
import Film from "../models/film.model.js";
import Jeu from "../models/jeu.model.js";
import fetch from "node-fetch";

export const getAllProduits = async (req, res, next) => {
  try {
    const produits = await Produit.findAll({
      include: [
        { model: Livre, as: 'livre' },
        { model: Film, as: 'film' },
        { model: Jeu, as: 'jeu' },
      ]
    });

    if (produits) {
      res.status(200).json(produits);
    }
  } catch (error) {
    next(error);
  }
};

export const getProduitById = async (req, res, next) => {
  try {
    const produit = await Produit.findByPk(req.params.id, {
      include: [
        { model: Livre, as: 'livre' }, 
        { model: Film, as: 'film' },
        { model: Jeu, as: 'jeu' }
      ]
    });

    if (produit) {
      res.status(200).json(produit);
    }
  } catch (error) {
    next(error);
  }
};

export const createProduit = async (req, res, next) => {
  const prodToCreate = req.body;
  let productType;
  let filteredProduits;
  let newIdString;

  try {
    if (prodToCreate.livre) {
      productType = "LIV"
    } else if (prodToCreate.film) {
      productType = "FIL"
    } else {
      productType = "JEU"
    }
  } catch(err) {
    res.status(500).send("Error fetching product type");
  }

  try {
    const response = await fetch('https://apiprojetfinalios.onrender.com/api/produit/');
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const allProduits = await response.json();
    filteredProduits = allProduits.filter(produit => produit.id.startsWith(productType));
  } catch(err) {
      console.error(err); // Log the actual error
      res.status(500).json(err);
  }

  try {
    let productIdNums = [];

    filteredProduits.forEach(produit => {
      const idWithoutType = produit.id.slice(3);
      const numericId = parseInt(idWithoutType, 10);
      console.log(`typeof: ${typeof numericId}`);
      console.log(numericId);
      

      productIdNums.push(numericId);
    });

    let highestId = Math.max(...productIdNums.map(id => Number(id)));
    console.log(`highestId: ${highestId}`);
    let newId = highestId + 1;
    newIdString = newId.toString().padStart(5, 0);


  } catch (err) {
    res.status(500).send("Error converting new id");
  }

  try {
    if (productType === "LIV") {
      const produitToCreate = {
        id: `LIV${newIdString}`,
        titre: prodToCreate.titre,
        prix: prodToCreate.prix,
        description: prodToCreate.description,
        image: prodToCreate.image,
        quantiteEnStock: prodToCreate.quantiteEnStock,
        quantiteMinStock: prodToCreate.quantiteMinStock,
        etat: prodToCreate.etat
      }
      const livreToCreate = {
        idProduit: `LIV${newIdString}`,
        isbn: prodToCreate.livre.isbn,
        dateParution: prodToCreate.livre.dateParution,
        editeur: prodToCreate.livre.editeur,
        auteurs: prodToCreate.livre.auteurs,
        categorie: prodToCreate.livre.categorie,
      }

      const produit = await Produit.create(produitToCreate);
      const livre = await Livre.create(livreToCreate);
      res.status(201).json({produit, livre});
    }
  } catch (err) {
    res.status(500).json({ message: err.message, stack: err.stack });
  }

  try {
    if (productType === "FIL") {
      const produitToCreate = {
        id: `FIL${newIdString}`,
        titre: prodToCreate.titre,
        prix: prodToCreate.prix,
        description: prodToCreate.description,
        image: prodToCreate.image,
        quantiteEnStock: prodToCreate.quantiteEnStock,
        quantiteMinStock: prodToCreate.quantiteMinStock,
        etat: prodToCreate.etat
      }

      const filmToCreate = {
        idProduit: `FIL${newIdString}`,
        acteurs: prodToCreate.film.acteurs,
        realisateur: prodToCreate.film.realisateur,
        format: prodToCreate.film.format,
        videoExtrait: prodToCreate.film.videoExtrait,
        categorie: prodToCreate.film.categorie
      }

      const produit = await Produit.create(produitToCreate);
      const film = await Film.create(filmToCreate)
      res.status(201).json({produit, film});
    }
  } catch (err) {
    res.status(500).json({ message: err.message, stack: err.stack });
  }

  try {
    if (productType === "JEU") {
      const produitToCreate = {
        id: `JEU${newIdString}`,
        titre: prodToCreate.titre,
        prix: prodToCreate.prix,
        description: prodToCreate.description,
        image: prodToCreate.image,
        quantiteEnStock: prodToCreate.quantiteEnStock,
        quantiteMinStock: prodToCreate.quantiteMinStock,
        etat: prodToCreate.etat,
      };
      
      const jeuToCreate = {
        idProduit: `JEU${newIdString}`,
        auteurs: prodToCreate.jeu.auteurs,
        collection: prodToCreate.jeu.collection,
        categorie: prodToCreate.jeu.categorie
      };

      const produit = await Produit.create(produitToCreate);
      const jeu = await Jeu.create(jeuToCreate);
      res.status(201).json({produit, jeu});
    }
  } catch (err) {
    res.status(500).json({ message: err.message, stack: err.stack });
  }
};

export const updateProduit = async (req, res, next) => {
  try {
    const produit = await Produit.findByPk(req.params.id);
    if (produit) {
      // La quantité à ajouter doit s'appeler quantiteAAjouter dans le corps de la requête
      const quantiteAAjouter = parseInt(req.body.quantiteAAjouter, 10);
      
      // On met seulement à jour la quantiteEnStock. On ne touche pas au reste
      const nouvelleQuantite = produit.quantiteEnStock + quantiteAAjouter;
      await produit.update({ quantiteEnStock: nouvelleQuantite });

      res.status(200).json(produit);
    } else {
      res.status(404).json({ message: "Produit non trouvé" });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteProduit = async (req, res, next) => {
  try {
    const produit = await Produit.findByPk(req.params.id);
    if (produit) {
      await produit.destroy();
      res.status(200).json({ message: "Produit supprimé" });
    } else {
      res.status(404).json({ message: "Produit non trouvé" });
    }
  } catch (error) {
    next(error);
  }
};

// Ancienne version, pré-test de Casey
/*
export const getAllProduits = async (req, res, next) => {
  try {
    const produits = await Produit.findAll();

    if (produits) {
      const productDetails = await Promise.all(produits.map(async (produit) => {
        const productType = produit.id.substring(0, 3);
        let associatedProduct;

        switch (productType) {
          case "LIV":
            associatedProduct = await Livre.findByPk(produit.id);
            break;
          case "FIL":
            associatedProduct = await Film.findByPk(produit.id);
            break;
          case "JEU":
            associatedProduct = await Jeu.findByPk(produit.id);
            break;
          default:
            associatedProduct = null;
        }

        if (associatedProduct) {
          return {
            produit: produit,
            type: productType,
            produitAssocie: associatedProduct,
          };
        } else {
          return {};
        }
      }));

      res.status(200).json(productDetails);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    next(error);
  }
};

export const getProduitById = async (req, res, next) => {
  try {
    const produit = await Produit.findByPk(req.params.id);

    if (produit) {
      const productType = produit.id.substring(0, 3);

      let associatedProduct;

      switch (productType) {
        case "LIV":
          {
            associatedProduct = await Livre.findByPk(produit.id);
          }
          break;
        case "FIL":
          {
            associatedProduct = await Film.findByPk(produit.id);
          }
          break;
        case "JEU":
          {
            associatedProduct = await Jeu.findByPk(produit.id);
          }
          break;
      }

      if (associatedProduct) {
        const productPair = {
          "produit": produit,
          "type": productType,
          "produitAssocie": associatedProduct
        }

        res.status(200).json(productPair);
      } else {
        res.status(404).json({ message: `Produit trouvé, mais pas le ${productType} associé avec`});
      }
    } else {
      res.status(404).json({ message: "Produit non trouvé" });
    }
  } catch (error) {
    next(error);
  }
};

export const createProduit = async (req, res, next) => {
  try {
    const produit = await Produit.create(req.body);
    res.status(201).json(produit);
  } catch (error) {
    next(error);
  }
};

export const updateProduit = async (req, res, next) => {
  try {
    const produit = await Produit.findByPk(req.params.id);
    if (produit) {
      await produit.update(req.body);
      res.status(200).json(produit);
    } else {
      res.status(404).json({ message: 'Produit non trouvé' });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteProduit = async (req, res, next) => {
  try {
    const produit = await Produit.findByPk(req.params.id);
    if (produit) {
      await produit.destroy();
      res.status(200).json({ message: 'Produit supprimé' });
    } else {
      res.status(404).json({ message: 'Produit non trouvé' });
    }
  } catch (error) {
    next(error);
  }
};
*/