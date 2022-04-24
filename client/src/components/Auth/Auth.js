import { React, useState } from 'react'
import { Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/store'
import { useNavigate } from 'react-router-dom'



function Auth() {

  const [SignUp, setSignUp] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const navigate = useNavigate()

  // const isLoggedIn = useSelector(state => state.isLoggedIn)



  async function sendRequest(type = 'login') {
    const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
      name,
      email,
      password
    })
      // .then(data => {
      //   // console.log(data)
      //   return redata;
      // })
      .catch(err => console.log(err))
    const data = await res.data
    return data

  }


  function handldeSumit(e) {
    e.preventDefault()

    if (SignUp) {
      sendRequest('signup')
        .then(data => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))

    }
    else {
      sendRequest()
        .then(data => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
    }

  }




  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <form onSubmit={handldeSumit}>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        boxShadow='10px 10px 20px #ccc'
        border="1px solid gray"
        width={!matches? '40%':'80%'}
        margin='0 auto'
        marginTop='60px'
        padding={3}

      >
        <Typography variant='h2'>{!SignUp ? "Login" : "Sign Up"}</Typography>
        <Box
          width={'70%'}
          marginTop={'20px'}
          marginBottom={'20px'}
          display='flex'
          flexDirection='column'
        >
          {SignUp &&
            <TextField value={name} onChange={(e) => setName(e.target.value)} sx={{ paddingBottom: '20px' }} placeholder='Name' />
          }
          <TextField value={email} onChange={(e) => setEmail(e.target.value)} type={'email'} sx={{ paddingBottom: '20px' }} placeholder='E-Mail' />
          <TextField value={password} onChange={(e) => setPassword(e.target.value)} type={'password'} sx={{ paddingBottom: '20px' }} placeholder='Password' />
        </Box>
        <Button type='submit' variant='contained' color='warning'>Submit</Button>
        <Button onClick={() => setSignUp(!SignUp)} sx={{ marginTop: "20px" }}>{!SignUp ? "Sign Up" : "Login"}</Button>
      </Box>

    </form>
  )
}

export default Auth