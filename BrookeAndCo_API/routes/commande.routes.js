import { Router } from 'express';
import {
  getAllCommandes,
  getCommandeById,
  createCommande,
  updateCommande,
  deleteCommande,
} from '../controllers/commande.controller.js';

const router = Router();

router.get('/commande', getAllCommandes);
router.get('/commande/:id', getCommandeById);
router.post('/commande', createCommande);
router.put('/commande/:id', updateCommande);
router.delete('/commande/:id', deleteCommande);

export default router;