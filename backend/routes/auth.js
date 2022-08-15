import express from 'express';
import { register, login, logout, isLoggedIn } from '../controllers/auth.js';

const router = express.Router();

//Ensemble des routes de l'authentification

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/is_logged_in', isLoggedIn); // verification du token a chaque chargement ou changement de page

export default router;