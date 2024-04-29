import Produit from "../models/produit.model.js";
import User from "../models/user.model.js";
import Client from "../models/client.model.js";
import Employe from "../models/employe.model.js";
import Livre from "../models/livre.model.js";
import Film from "../models/film.model.js";
import Jeu from "../models/jeu.model.js";

Client.belongsTo(User, {
    foreignKey: 'id',
    as: 'user'
});

Employe.belongsTo(User, {
    foreignKey: 'matricule',
    as: 'user'
  });

Film.belongsTo(Produit, {
    foreignKey: 'idProduit',
    as: 'produit'
});

Jeu.belongsTo(Produit, {
    foreignKey: 'idProduit',
    as: 'produit'
});

Livre.belongsTo(Produit, {
    foreignKey: 'idProduit',
    as: 'produit'
});

User.hasOne(Client, {
    foreignKey: 'id',
    as: 'client'
});

User.hasOne(Employe, {
    foreignKey: 'matricule',
    as: 'employe'
  });

Produit.hasOne(Livre, {
    foreignKey: 'idProduit',
    as: 'livre'
});
  
Produit.hasOne(Film, {
    foreignKey: 'idProduit',
    as: 'film'
});
  
Produit.hasOne(Jeu, {
    foreignKey: 'idProduit',
    as: 'jeu'
});