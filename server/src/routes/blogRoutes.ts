import express from 'express'
import { createBlog } from '../controllers/blogControllers'
import { protect } from '../middleware/authMiddleware'
import { upload } from '../middleware/multer'

const router = express.Router()

router.route('/create').post(protect, upload.single('cover'), createBlog)

export default router