import { Router } from "express";
import { register, login, getCurrentUser } from '../controllers/user.controller.js';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', getCurrentUser);

export default router;