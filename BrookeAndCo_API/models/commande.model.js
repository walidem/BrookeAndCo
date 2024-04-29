import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';
import { Client } from './client.model.js';

export const Commande = sequelize.define('Commande', {
    numero: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    idClient: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Client,
            key: 'id',
        },
    },
    etat: {
        type: DataTypes.ENUM,
        values: ['Non Complété', 'Payée', 'Expédiée', 'Livrée'],
        allowNull: false,
    },
}, {
    timestamps: false,
    freezeTableName: true
});

export default Commande;