import { Router } from 'express';
import {
  getAllProduits,
  getProduitById,
  createProduit,
  updateProduit,
  deleteProduit,
} from '../controllers/produit.controller.js';

const router = Router();

router.get('/produit', getAllProduits);
router.get('/produit/:id', getProduitById);
router.post('/produit', createProduit);
router.put('/produit/:id', updateProduit);
router.delete('/produit/:id', deleteProduit);

export default router;
