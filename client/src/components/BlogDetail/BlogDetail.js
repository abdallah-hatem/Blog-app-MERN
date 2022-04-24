import { React, useEffect, useState } from 'react'
import Blog from '../Blog/Blog'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button, InputLabel, TextField, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'


function BlogDetail() {

  const [blog, setBlog] = useState()
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()

  const navigate = useNavigate()

  const id = useParams().id.replace(':', '')

  async function getDetails() {
    axios.get(`http://localhost:5000/api/blog/${id}`)
      .then(data => {
        setBlog(data.data.blog)
        setTitle(data.data.blog.title)
        setDescription(data.data.blog.description)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getDetails()

  }, [id])


  function sendRequest() {
    axios.put(`http://localhost:5000/api/blog/update/${id}`, {
      title,
      description

    }).catch(err => console.log(err))
  }


  function handleSubmit(e) {
    e.preventDefault()
    sendRequest()
    navigate("/myBlogs")
  }

  return (

    blog &&
    <form onSubmit={handleSubmit}>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        boxShadow='10px 10px 20px #ccc'
        width='70%'
        margin='0 auto'
        marginTop='60px'
        borderRadius="10px"
        border="3px solid green"
        padding={3}

      >
        <Typography variant='h3' marginBottom="20px">Update Your Blog</Typography>

        <Typography
          display='flex'
          flexDirection='column'
          width='80%'

        >
          <InputLabel sx={{ fontWeight: "Bold", fonstSize: "25px" }}>Title</InputLabel>
          <TextField value={title} onChange={(e) => setTitle(e.target.value)} sx={{ marginBottom: "30px", }} />
          <InputLabel sx={{ fontWeight: "Bold", fonstSize: "25px" }}>Description</InputLabel>
          <TextField value={description} onChange={(e) => setDescription(e.target.value)} sx={{ marginBottom: "30px" }} />

        </Typography>
        <Button
          variant='contained'
          sx={{ width: "80%" }}
          color='warning'
          type='submit'
        >
          Submit
        </Button>
      </Box>
    </form>
  )
}

export default BlogDetail