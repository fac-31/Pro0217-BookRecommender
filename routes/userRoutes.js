import express from 'express';
const router = express.Router();
import {getUsers,createUser , updateUser, deleteUser} from '../controllers/userController.js';

router.get("/", getUsers);
router.get("/add", createUser);
router.get("/update/:id", updateUser);
router.get("/delete/:id", deleteUser);

export { router as userRoutes };