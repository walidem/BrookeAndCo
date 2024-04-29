import { Router } from 'express';
import {
  getAllEmployes,
  getEmployeById,
  createEmploye,
  updateEmploye,
  deleteEmploye,
} from '../controllers/employe.controller.js';

const router = Router();

router.get('/employe', getAllEmployes);
router.get('/employe/:id', getEmployeById);
router.post('/employe', createEmploye);
router.put('/employe/:id', updateEmploye);
router.delete('/employe/:id', deleteEmploye);

export default router;