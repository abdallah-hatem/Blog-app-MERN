import { React, useState, useEffect } from 'react'
import { CardHeader, Typography, Card, CardContent, CardMedia, Avatar, IconButton, Box, useTheme, useMediaQuery } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


function Blog({ data, isUser, blogId }) {
    const navigate = useNavigate()


    function handleEdit() {
        navigate(`/myBlogs/:${blogId}`)
    }
    async function handleDelete() {
        axios.delete(`http://localhost:5000/api/blog/${blogId}`)
            .then(() => navigate('/'))
            .then(() => navigate('/myBlogs'))
        // window.location.reload(false);
    }




    const [open, setOpen] = useState(false)
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'));


    return (

        <Card
            sx={{
                width: !matches ? "40%" : "80%",
                margin: "0 auto",
                mt: "20px",
                mb: "20px",
                boxShadow: "5px 5px 10px #ccc",
                border:"1px solid gray",
                ":hover": { boxShadow: "10px 10px 20px #ccc" }
            }}
        >

            {isUser &&
                <Box display='flex'>
                    <IconButton onClick={handleEdit} sx={{ ml: "auto" }}><EditIcon /></IconButton>
                    <IconButton onClick={handleDelete} ><DeleteForeverIcon sx={{ color: "red" }} /></IconButton>
                </Box>
            }
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: "blue" }} aria-label="recipe">
                        {data.user.name}

                    </Avatar>
                }

                title={data.title}
                subheader=""
            />
            <CardMedia
                component="img"
                height="194"
                image={data.image}
                alt="image"
                sx={{ height: "40vh" }}
            />
            <br />
            <hr />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    <b>{data.user.name}</b>{":"} {data.description}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Blog