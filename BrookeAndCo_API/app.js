import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import produitRouter from './routes/produit.routes.js';
import livreRouter from './routes/livre.routes.js';
import filmRouter from './routes/film.routes.js';
import jeuRouter from './routes/jeu.routes.js';
import userRouter from './routes/user.routes.js';
import clientRouter from './routes/client.routes.js';
import employeRouter from './routes/employe.routes.js';
import commandeRouter from './routes/commande.routes.js';
import ligneCommandeRouter from './routes/ligneCommande.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { sequelize } from './config/config.js';
import { config } from 'dotenv';
import './scripts/associations.js';

config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

/*
Exemple d'URL pour tester l'API sur Postman:
https://apiprojetfinalios.onrender.com/api/produit
*/

// Routes à utiliser
app.use('/api', produitRouter);
app.use('/api', livreRouter);
app.use('/api', filmRouter);
app.use('/api', jeuRouter);
app.use('/api', userRouter);
app.use('/api', clientRouter);
app.use('/api', employeRouter);
app.use('/api', commandeRouter);
app.use('/api', ligneCommandeRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
});