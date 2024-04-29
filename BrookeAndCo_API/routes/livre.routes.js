import { Router } from 'express';
import {
  getAllLivres,
  getLivreById,
  createLivre,
  updateLivre,
  deleteLivre,
} from '../controllers/livre.controller.js';

const router = Router();

router.get('/livre', getAllLivres);
router.get('/livre/:id', getLivreById);
router.post('/livre', createLivre);
router.put('/livre/:id', updateLivre);
router.delete('/livre/:id', deleteLivre);

export default router;
