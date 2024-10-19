import { Router } from 'express';
import upload from '../middleware/uploadImage';
import { uploadImage,getResults,getResultsById,deleteImages, deleteItem } from '../controllers/imageController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/upload',authenticateToken, upload.single('image'), uploadImage);
router.get('/results',authenticateToken, getResults);
router.get('/results/:id',authenticateToken,getResultsById);
router.delete('/remove',authenticateToken,deleteImages);
router.delete('/remove/:id',authenticateToken,deleteItem);
export default router;
