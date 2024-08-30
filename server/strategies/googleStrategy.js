import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user';
import jwt from 'jsonwebtoken';

config();

console.log(process.env.GOOGLE_CLIENT_ID)

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log("bonjour hbb")
        let user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
            return done(null, user);
        }
        user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: profile.id
        });
        await user.save();
        done(null, user);
    } catch (err) {
        done(err, false);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});