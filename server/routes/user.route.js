import express from 'express';
import { testUser, updateUser, deleteUser } from '../controllers/user.controller.js';
import { authTest } from '../Middleware/user.middlewares.js';
const router = express.Router();

router.get('/', testUser);
router.post("/update/:id", authTest, updateUser)
router.delete("/delete/:id", authTest, deleteUser)

export default router;