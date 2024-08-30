import express from 'express';
import { signup, signin } from '../controllers/auth.controller.js';
import userValidator from '../validators/user.validator.js';
import { checkSchema } from 'express-validator';
import { userVerification } from '../Middleware/user.middlewares.js';
import { errorMiddleware } from '../Middleware/error.middleware.js';
import googleAuth from '../controllers/googleAuth.js';
const router = express.Router();

//create singup 

router.post('/signup', checkSchema(userValidator), userVerification, signup, errorMiddleware);
router.post('/signin', signin)

router.use('/', googleAuth);


export default router;