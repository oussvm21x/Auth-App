import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
export const userVerification = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}


const saltRounds = 10;
export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt)
}

export const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}
