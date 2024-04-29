import Produit from './produit.model.js';
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';

export const Film = sequelize.define('Film', {
    idProduit: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        references: {
            model: Produit,
            key: 'id',
        },
    },
    acteurs: {
        type: DataTypes.STRING(100),
    },
    realisateur: {
        type: DataTypes.STRING(100),
    },
    format: {
        type: DataTypes.ENUM,
        values: ['DVD', 'Blu-ray'],
        allowNull: false,
    },
    videoExtrait: {
        type: DataTypes.STRING(255),
    },
    categorie: {
        type: DataTypes.STRING(30),
    },
}, {
    timestamps: false
});

export default Film;