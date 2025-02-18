import express from 'express';
const router = express.Router();
import {getUsers,createUser , updateUser, deleteUser} from '../controllers/userController';

router.get("/", getUsers);
router.post("/add", createUser);
router.post("/update/:id", updateUser);
router.post("/delete/:id", deleteUser);

module.exports = router;