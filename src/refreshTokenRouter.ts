import express from 'express';
import jwt from './utils/jwt.js';

const router = express.Router();

router.post('/refresh-token', (req, res,) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token is required' });
    }

    try {
        const decoded = jwt.verifyRefreshToken(refreshToken);

        const newAccessToken = jwt.generateAccessToken(decoded);
        const newRefreshToken = jwt.generateRefreshToken(decoded);

        return res.json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });

    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired refresh token', err });
    }
});

export default router;
