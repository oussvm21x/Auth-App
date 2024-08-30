import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/facebook',
    passport.authenticate('facebook'), {
    scope: ['email']
}
);

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/login'
    }),
    (req, res) => {
        res.redirect('/');
    }
);
