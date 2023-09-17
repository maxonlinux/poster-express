import express from 'express';
import { auth } from '../middleware/auth';
import { getArticles, getArticle, createArticle, editArticle, deleteArticle } from '../controllers/articles';
import { UserRole } from '../types/types';

const router = express.Router();

router.post('/', auth(UserRole.Admin), createArticle);
router.put('/:id', auth(UserRole.Admin), editArticle);
router.delete('/:id', auth(UserRole.Admin), deleteArticle);
router.get('/', getArticles);
router.get('/:id', getArticle);

export default router;