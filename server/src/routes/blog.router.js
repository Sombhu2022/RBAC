import express from 'express'
import { isAuthenticate } from '../middlewares/Authentication.js'
import { addBlog, fetchAllBlogs } from '../controllers/blog.controller.js'


const router = express.Router()

router
   .post('/' , isAuthenticate , addBlog)
   .get('/' , fetchAllBlogs )


export const blogRouter = router