import { Router } from 'express';
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from '../controllers/client.controller.js';

const router = Router();

router.get('/client', getAllClients);
router.get('/client/:id', getClientById);
router.post('/client', createClient);
router.put('/client/:id', updateClient);
router.delete('/client/:id', deleteClient);

export default router;