import Produit from './produit.model.js';
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';

export const Jeu = sequelize.define('Jeu', {
    idProduit: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        references: {
            model: Produit,
            key: 'id',
        },
    },
    auteurs: {
        type: DataTypes.STRING(100),
    },
    collection: {
        type: DataTypes.STRING(50),
    },
    categorie: {
        type: DataTypes.STRING(30),
    },
}, {
    timestamps: false,
    tableName: 'Jeux' // Nom de la table explicité, sinon SQLite lui mettait automatiquement la valeur "Jeuxes"
});

export default Jeu;