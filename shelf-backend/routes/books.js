import express from 'express';
import { createBook, getBooks, toggleStatus, editBook, removeBook } from '../controllers/bookController.js';
import { upload } from '../services/uploadService.js';

const router = express.Router();

router.post('/add', upload.single('cover'), createBook); // Only Owner
router.get('/', getBooks);       // Public route
router.post('/:id/toggle-status', toggleStatus);
router.put('/:id/edit', editBook);
router.delete('/:id/delete', removeBook);
export default router;
