import mongoose from 'mongoose'
import Blog from '../models/Blog'
import User from '../models/User'

export async function getAllBlogs(req, res) {
    try {
        const blogs = await Blog.find().populate('user')
        if (!blogs) {
            return res.status(404).json({ message: "No blogs found" })
        }
        res.status(200).json({ blogs })


    } catch (error) {
        res.status(500).json({ msg: error })
    }
}


export async function addBlog(req, res) {
    try {
        const { title, description, image, user } = req.body

        const exisistingUser = await User.findById(user)
        if (!exisistingUser) {
            return res.status(400).json({ message: "Unable to find user by this id" })
        }

        const blog = new Blog({
            title,
            description,
            image,
            user
        })

        const session = await mongoose.startSession()
        session.startTransaction()
        await blog.save({ session })

        exisistingUser.blogs.push(blog)
        await exisistingUser.save({ session })
        await session.commitTransaction()

        res.status(200).json({ blog })


    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

export async function updateBlog(req, res) {
    try {
        const blogId = req.params.id
        const { title, description } = req.body

        const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        })

        if (!updatedBlog) {
            return res.status(500).json({ msg: "unable to update the blog" })
        }
        return res.status(200).json({ updatedBlog })



    } catch (error) {
        res.status(500).json({ msg: error })
    }
}


export async function getBlogById(req, res) {
    try {

        const blogId = req.params.id

        const blog = await Blog.findById(blogId)
        if (!blog) {
            return res.status(404).json({ message: "No blog found" })
        }


        return res.status(200).json({ blog })

    } catch (error) {
        res.status(500).json({ msg: error })
    }
}


export async function deleteBlogById(req, res) {
    try {

        const blogId = req.params.id

        const blog = await Blog.findByIdAndDelete(blogId)
            .populate('user')
        await blog.user.blogs.pull(blog)
        await blog.user.save()
        if (!blog) {
            return res.status(404).json({ message: "No blog found" })
        }


        return res.status(200).json({ blog, message: "blog deleted successfully" })

    } catch (error) {
        res.status(500).json({ msg: error })
    }
}


export async function getBlogsByUserId(req, res) {
    try {
        const userId = req.params.id
        const userBlogs = await User.findById(userId).populate('blogs')

        if (!userBlogs) {
            return res.status(404).json({ message: "No blog found" })
        }

        res.status(200).json({ blogs: userBlogs })

    } catch (error) {
        // res.status(500).json({ msg: error })
        console.log(error);
    }
}