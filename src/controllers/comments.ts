import Comment from '../models/comment';
import { Request, Response } from 'express';

async function getComments(req: Request, res: Response) {
    try {
        const { articleId } = req.params;
        const comments = await Comment.find({ articleId });
        if (!comments || comments.length === 0) {
            return res.status(204).json([]);
        }

        res.status(200).json(comments);
    } catch (error) {
        console.error('Error while getting comments', error);
        res.status(500).json({ error: 'Error while getting comments' });
    }
}

async function createComment(req: Request, res: Response) {
    try {
        const { articleId, content } = req.body;
        const { username } = req.user

        const comment = new Comment({ articleId, content, username });
        await comment.save();

        res.status(201).json({ message: 'Comment created', comment });
    } catch (error) {
        res.status(500).json({ error: 'Error while creating comment' });
    }
}

async function deleteComment(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const comment = await Comment.findByIdAndDelete(id);

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error while deleting comment' });
    }
}

export { getComments, createComment, deleteComment };