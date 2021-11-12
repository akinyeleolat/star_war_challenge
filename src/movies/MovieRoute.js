import express from 'express';
import * as MovieController from './MovieController';

const router = express.Router();
router.get('/', MovieController.getAllMovies);
router.get('/characters', MovieController.getAllCharacters);
router.get('/:id', MovieController.getSingleMovies);
export default router;
