import express from 'express';
const router = express.Router();
import {
  getUsers,
  getUser,
  createUser,
  updateBook,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/add', createUser);
router.post('/update-book', updateBook);
router.get('/update/:id', updateUser);
router.get('/delete/:id', deleteUser);

export { router as userRoutes };
