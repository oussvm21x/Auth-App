import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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


export const authTest = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "no token found , Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRETE);
        req.user = decoded;
    } catch (error) {
        return res.status(401).json({ message: "authTest Unauthorized" });
    }

    next();
}