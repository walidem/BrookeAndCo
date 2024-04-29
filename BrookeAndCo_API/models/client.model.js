import { User } from './user.model.js';
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';

export const Client = sequelize.define('Client', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'id',
        },
    },
    nom: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    prenom: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    courriel: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
    },
    telephone: {
        type: DataTypes.STRING(15),
    },
    adresse: {
        type: DataTypes.STRING(100),
    },
    photo: {
        type: DataTypes.STRING(255),
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    timestamps: false,
    freezeTableName: true
});

export default Client;