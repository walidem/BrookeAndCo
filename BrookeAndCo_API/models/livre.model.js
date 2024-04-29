import Produit from './produit.model.js';
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';

export const Livre = sequelize.define('Livre', {
    idProduit: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        references: {
            model: Produit,
            key: 'id',
        },
    },
    isbn: {
        type: DataTypes.STRING(13),
    },
    dateParution: {
        type: DataTypes.DATEONLY,
    },
    editeur: {
        type: DataTypes.STRING(50),
    },
    auteurs: {
        type: DataTypes.STRING(50),
    },
    categorie: {
        type: DataTypes.STRING(30),
    },
}, {
    timestamps: false
});

export default Livre;