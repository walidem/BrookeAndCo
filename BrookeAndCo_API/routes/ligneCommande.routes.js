import { Router } from 'express';
import {
  getAllLigneCommandes,
  getLignesCommandeByNumero,
  createLigneCommande,
  updateLigneCommande,
  deleteLigneCommande,
} from '../controllers/ligneCommande.controller.js';

const router = Router();

router.get('/ligneCommandes', getAllLigneCommandes);
router.get('/ligneCommandes/:numeroCommande', getLignesCommandeByNumero);
router.post('/ligneCommandes', createLigneCommande);
router.put('/ligneCommandes/:id', updateLigneCommande);
router.delete('/ligneCommandes/:id', deleteLigneCommande);

export default router;