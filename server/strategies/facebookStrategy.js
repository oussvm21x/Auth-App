import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from '../Models/user.model';

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ facebookId: profile.emails[0].value });
            if (user) {
                return done(null, user);
            }
            user = await User.create({
                facebookId: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value,
                password: profile.id
            });
            done(null, user);
        } catch (error) {
            done(error, false);
        }
    }
));


