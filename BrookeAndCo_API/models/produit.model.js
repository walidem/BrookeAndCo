import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';

export const Produit = sequelize.define('Produit', {
    id: {
      type: DataTypes.STRING(20),
      primaryKey: true,
    },
    titre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    prix: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING(255),
    },
    quantiteEnStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    quantiteMinStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    etat: {
      type: DataTypes.ENUM,
      values: ['Actif', 'Inactif'],
      allowNull: false,
    },
}, {
    timestamps: false
});

export default Produit;
