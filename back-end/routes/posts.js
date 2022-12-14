import express from 'express'

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'
import auth from '../middleware/auth.js'
import postUploadImg from '../middleware/postUploadImg.js'

const router = express.Router()

router.get('/', getPosts)
router.post('/', auth, postUploadImg, createPost)
router.patch('/:id', auth, postUploadImg, updatePost)
router.delete('/:id', deletePost)
router.patch('/:id/likePost', auth, likePost)

export default router