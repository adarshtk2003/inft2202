import express from 'express';
import animalControllers from "../controllers/animal.js";

const router = express.Router();
router.get('/:name?', animalControllers.index);
router.post('/', animalControllers.add);
router.delete('/:name?', animalControllers.delete);
router.put('/', animalControllers.update);

export default router;
