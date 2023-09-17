import express from 'express';
import { createComment, deleteComment, getComments } from '../controllers/comments';
import { auth } from '../middleware/auth';
import { UserRole } from '../types/types';

const router = express.Router();

router.get('/article/:articleId', getComments)
router.post('/', auth(UserRole.User), createComment);
router.delete('/:id', auth(UserRole.Admin), deleteComment);

export default router;