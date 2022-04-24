import express from "express";
import { getAllBlogs, addBlog, updateBlog, getBlogById, deleteBlogById, getBlogsByUserId } from "../controllers/blog-controller";



const blogRouter = express.Router()

blogRouter.route('/')
    .get(getAllBlogs)

blogRouter.route('/add')
    .post(addBlog)

blogRouter.route('/update/:id')
    .put(updateBlog)

blogRouter.route('/:id')
    .get(getBlogById)
    .delete(deleteBlogById)

blogRouter.route('/user/:id')
    .get(getBlogsByUserId)

export default blogRouter