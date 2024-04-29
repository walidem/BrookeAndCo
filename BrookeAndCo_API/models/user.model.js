import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';

export const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_type: {
        type: DataTypes.ENUM,
        values: ['Client', 'Employe'],
        allowNull: false,
    },
}, {
    timestamps: false
});

export default User;