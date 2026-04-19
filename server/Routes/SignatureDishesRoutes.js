import express from 'express';
import { protect, admin } from '../Middleware/auth.js';
import { 
  createSignatureDish, 
  getSignatureDishes, 
  deleteSignatureDish 
} from '../controllers/signatureDishesController.js';

import multer from 'multer';

// Multer setup (single image upload)
const storage = multer.memoryStorage(); // or diskStorage if you prefer
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

const router = express.Router();

// Routes
router.post('/', upload.single('image'), createSignatureDish);
router.get('/', getSignatureDishes);
router.delete('/:id', deleteSignatureDish);

export default router;