import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
export const userVerification = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const hashingPassword = (plainPassword) => {
    const saltRounds = 10;
    bcrypt.hashSync(plainPassword, saltRounds, (err, hash) => {
        if (err) throw err;
        return hash;
    });


}

