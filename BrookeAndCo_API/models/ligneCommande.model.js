import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';
import { Produit } from './produit.model.js';
import { Commande } from './commande.model.js';

export const LigneCommande = sequelize.define('LigneCommande', {
    idProduit: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        references: {
            model: Produit,
            key: 'id',
        },
    },
    numeroCommande: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Commande,
            key: 'numero',
        },
    },
    quantite: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    prixReel: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'LigneCommande',
});

export default LigneCommande;