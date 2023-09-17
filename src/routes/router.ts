import express from "express";
import auth from "./auth";
import articles from "./articles";
import comments from "./comments";

const router = express.Router();

// Routes
router.use('/articles', articles);
router.use('/comments', comments);
router.use('/auth', auth);

export default router