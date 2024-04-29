import { User } from './user.model.js';
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';

export const Employe = sequelize.define('Employe', {
    matricule: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'id',
        },
    },
    nom: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    prenom: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    courriel: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    timestamps: false,
    freezeTableName: true
});

export default Employe;