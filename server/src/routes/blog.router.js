import express from 'express'

import { addBlog, blockABlogPost, deleteBlog, fetchAllBlogs, fetchAllBlogsOfEachUser, fetchBlogById, reactToBlog, updateBlog } from '../controllers/blog.controller.js'
import { authorizeRoles, isAuthenticate } from '../middlewares/authentication.js'


const router = express.Router()

router
   .post('/' , isAuthenticate , addBlog)
   .get('/' , fetchAllBlogs )
   .get('/:blogId' , fetchBlogById)
   .get('/myblog/all', isAuthenticate , fetchAllBlogsOfEachUser )
   .delete('/:blogId' , isAuthenticate , deleteBlog)
   .patch('/:blogId' , isAuthenticate , updateBlog)
    
   .patch('/reaction/:blogId' , isAuthenticate , reactToBlog )
   .patch('/block-post/:blogId' , isAuthenticate , authorizeRoles('admin' , 'controller') , blockABlogPost)

export const blogRouter = router