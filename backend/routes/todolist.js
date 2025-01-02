import express from 'express';
import { getUserProgress } from '../controllers/TodolistController.js';

const router = express.Router();

router.get('/progress/:userID', async (req, res) => {
    try {
        const userID = req.params.userID;
        const progressData = await getUserProgress(userID);
        res.status(200).json(progressData);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch progress data.' });
    }
});

export default router;