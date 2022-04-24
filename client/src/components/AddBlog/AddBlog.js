import { Button, InputLabel, TextField, Typography, Box } from '@mui/material'
// import { Box } from '@mui/system'
import { React, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddBlog() {

  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [image, setImage] = useState()

  const navigate = useNavigate()


  const id = localStorage.getItem("userId")

  async function sendRequest() {
    axios.post('http://localhost:5000/api/blog/add', {
      title,
      description,
      image,
      user: id

    }).catch(err => console.log(err))
  }


  async function handleSubmit(e) {
    e.preventDefault()
    sendRequest()
      .then(() => {
        navigate("/myBlogs")
      })
      .then(() => {
        navigate("/blogs/add")
      })
      .then(() => {
        navigate("/myBlogs")
      })
  }

  return (
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
        <Typography variant='h3' marginBottom="20px">Post Your Blog</Typography>

        <Typography
          display='flex'
          flexDirection='column'
          width='80%'

        >
          <InputLabel sx={{ fontWeight: "Bold", fonstSize: "25px" }}>Title</InputLabel>
          <TextField onChange={(e) => setTitle(e.target.value)} sx={{ marginBottom: "30px" }} />
          <InputLabel sx={{ fontWeight: "Bold", fonstSize: "25px" }}>Description</InputLabel>
          <TextField onChange={(e) => setDescription(e.target.value)} sx={{ marginBottom: "30px" }} />
          <InputLabel sx={{ fontWeight: "Bold", fonstSize: "25px" }}>Image URL</InputLabel>
          <TextField onChange={(e) => setImage(e.target.value)} sx={{ marginBottom: "30px" }} />
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

export default AddBlog