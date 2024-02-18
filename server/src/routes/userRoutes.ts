import express from 'express';
import { getUserProfile, loginUser, logoutUser, registerUser } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router()

router.route('/profile').get(getUserProfile)
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(protect, logoutUser)


export default router