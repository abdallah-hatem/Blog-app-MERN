import { React, useEffect, useState } from 'react'
import axios from 'axios'
import Blog from '../Blog/Blog'


function Blogs() {

  const [blogs, setBlogs] = useState([])

  useEffect(() => {

    axios.get('http://localhost:5000/api/blog/')
      .then(res => setBlogs(res.data.blogs))
      .catch(err => console.log(err))

  }, [])

  return (

    blogs.length > 0 && blogs.map(blog =>

      <Blog
        blogId={blog._id}
        isUser={localStorage.getItem("userId") === blog.user._id}
        key={blog._id}
        data={blog}
      />
    )

  )
}

export default Blogs