import express from 'express';
import { getUserProfile, loginUser, logoutUser, registerUser } from '../controllers/userController';

const router = express.Router()

router.route('/user').get(getUserProfile)
router.route('/create').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)


export default router