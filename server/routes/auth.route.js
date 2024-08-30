import express from 'express';
import { signup, signin, google, github } from '../controllers/auth.controller.js';
import userValidator from '../validators/user.validator.js';
import { checkSchema } from 'express-validator';
import { userVerification } from '../Middleware/user.middlewares.js';
import { errorMiddleware } from '../Middleware/error.middleware.js';
const router = express.Router();

//create singup 

router.post('/signup', checkSchema(userValidator), userVerification, signup, errorMiddleware);
router.post('/signin', signin)
router.post('/google', google)
router.post('/github', github)



export default router;