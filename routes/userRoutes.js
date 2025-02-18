import express from 'express';
const router = express.Router();
import {getUsers,createUser , updateUser, deleteUser} from '../controllers/userController.js';

router.get("/", getUsers);
router.post("/add", createUser);
router.post("/update/:id", updateUser);
router.post("/delete/:id", deleteUser);

export { router as userRoutes };