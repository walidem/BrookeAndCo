import { Router } from 'express';
import {
  getAllJeux,
  getJeuById,
  createJeu,
  updateJeu,
  deleteJeu,
} from '../controllers/jeu.controller.js';

const router = Router();

router.get('/jeu', getAllJeux);
router.get('/jeu/:id', getJeuById);
router.post('/jeu', createJeu);
router.put('/jeu/:id', updateJeu);
router.delete('/jeu/:id', deleteJeu);

export default router;