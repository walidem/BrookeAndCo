import { Router } from 'express';
import {
  getAllFilms,
  getFilmById,
  createFilm,
  updateFilm,
  deleteFilm,
} from '../controllers/film.controller.js';

const router = Router();

router.get('/film', getAllFilms);
router.get('/film/:id', getFilmById);
router.post('/film', createFilm);
router.put('/film/:id', updateFilm);
router.delete('/film/:id', deleteFilm);

export default router;
