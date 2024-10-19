import { Router } from 'express';
import { registerUser, loginUser, updateUser } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update',authenticateToken,updateUser);
export default router;
