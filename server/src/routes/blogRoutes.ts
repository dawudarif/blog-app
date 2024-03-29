import express from 'express'
import { createBlog, deleteBlog, getBlogs, getSingleBlog, searchBlogs } from '../controllers/blogControllers'
import { protect } from '../middleware/authMiddleware'
import { upload } from '../middleware/multer'

const router = express.Router()

router.route('/create').post(protect, upload.single('cover'), createBlog)
router.route('/get').get(getBlogs)
router.route('/get/:id').get(getSingleBlog)
router.route('/delete/:id').get(protect, deleteBlog)
router.route('/search/:search').get(searchBlogs)



export default router