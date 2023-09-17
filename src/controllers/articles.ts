import Article from '../models/article';
import { Request, Response } from 'express';
import { IUser } from '../types/types';

async function createArticle(req: Request, res: Response) {
    try {
        const { title, description, content } = req.body;
        const article = new Article({ title, description, content });

        await article.save();

        res.status(201).json({ message: 'Article created', article });
    } catch (error) {
        res.status(500).json({ error: 'Error while creating article' });
    }
}

async function editArticle(req: Request, res: Response) {
    try {
        const { title, description, content } = req.body;
        const { id } = req.params;

        const article = await Article.findByIdAndUpdate(id, { title, description, content }, { new: true });

        if (!article) {
            return res.status(404).json({ error: 'Статья не найдена' });
        }

        res.status(200).json({ message: 'Article edited', article });
    } catch (error) {
        res.status(500).json({ error: 'Error while editing article' });
    }
}

async function deleteArticle(req: Request, res: Response) {
    try {
        const { role } = req.user as IUser;
        if (role < 1) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const { id } = req.params;
        const article = await Article.findByIdAndDelete(id);
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }

        res.status(200).json({ message: 'Article deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error while deleting article' });
    }
}

async function getArticles(req: Request, res: Response) {
    try {
        const { page = 1, limit = 10 } = req.query as {
            page?: number;
            limit?: number;
        };

        const totalArticles = await Article.countDocuments();
        const articles = await Article.find()
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.status(200).json({ items: articles, total: totalArticles });
    } catch (error) {
        res.status(500).json({ error: 'Error getting articles' });
    }
}

async function getArticle(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const article = await Article.findById(id);

        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }

        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ error: 'Error getting article' });
    }
}

export { createArticle, editArticle, deleteArticle, getArticles, getArticle };
