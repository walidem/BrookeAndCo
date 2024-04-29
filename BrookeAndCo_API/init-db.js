import {sequelize} from './config/config.js';

const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection établie avec succès.');

    await sequelize.sync({ force: true });
    console.log('Tous les modèles ont été synchronisés avec succès.');
  } catch (error) {
    console.error('Incapable de se connecter à la base de données: ', error);
  }
};

initDb();
