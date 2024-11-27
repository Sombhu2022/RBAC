import express from 'express'

import { addBlog, deleteBlog, fetchAllBlogs, fetchAllBlogsOfEachUser, fetchBlogById, updateBlog } from '../controllers/blog.controller.js'
import { isAuthenticate } from '../middlewares/authentication.js'


const router = express.Router()

router
   .post('/' , isAuthenticate , addBlog)
   .get('/' , fetchAllBlogs )
   .get('/:blogId' , fetchBlogById)
   .get('/myblog/all', isAuthenticate , fetchAllBlogsOfEachUser )
   .delete('/:blogId' , isAuthenticate , deleteBlog)
   .patch('/:blogId' , isAuthenticate , updateBlog)


export const blogRouter = router