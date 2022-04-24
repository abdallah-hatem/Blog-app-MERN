import { React, useEffect, useState } from 'react'
import Blog from '../Blog/Blog'
import axios from 'axios'

function UserBlogs() {


  const [blogs, setBlogs] = useState([])

  useEffect(() => {

    const id = localStorage.getItem("userId")
    axios.get(`http://localhost:5000/api/blog/user/${id}`)
      .then(data => setBlogs(data.data.blogs))
      .catch(err => console.log(err))
  }, [])

  console.log(blogs);

  return (

    blogs.blogs && blogs.blogs.map(blog =>

      <Blog
        isUser={localStorage.getItem("userId") === blogs._id}
        key={blog._id}
        data={blog}
        blogId={blog._id}
      />
    )

  )
}

export default UserBlogs