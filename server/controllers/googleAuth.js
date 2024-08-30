import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/google', (req, res, next) => {
    console.log('Received request for /google');
    passport.authenticate('google', { scope: ['email'] })(req, res, next);
});

router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    (req, res) => {
        // Generate JWT
        const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token }); // Send token to client
    }
);

export default router;