import express from 'express';
import { testUser, updateUser } from '../controllers/user.controller.js';
import { authTest } from '../Middleware/user.middlewares.js';
const router = express.Router();

router.get('/', testUser);
router.post("/update/:id", authTest, updateUser)

export default router;