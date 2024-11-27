import express from 'express'

import { addBlog, fetchAllBlogs, fetchBlogById } from '../controllers/blog.controller.js'
import { isAuthenticate } from '../middlewares/authentication.js'


const router = express.Router()

router
   .post('/' , isAuthenticate , addBlog)
   .get('/' , fetchAllBlogs )
   .get('/:blogId' , fetchBlogById)


export const blogRouter = router