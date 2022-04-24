import { React, useState } from 'react'
import { AppBar, Toolbar, Typography, Box, Button, Tabs, Tab, Drawer, IconButton, List, ListItemButton, ListItemIcon, useTheme, useMediaQuery } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/store'



function Header() {

  const [value, setValue] = useState()

  const isLoggedIn = useSelector(state => state.isLoggedIn)

  const dispatch = useDispatch()



  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    !matches ?
      <AppBar color='warning' position='sticky'>
        <Toolbar>
          <Typography variant='h4'>The Blog.</Typography>
          <Box ml='auto' display='flex'>
            {isLoggedIn &&
              <Tabs textColor='inherit' value={value} onChange={(e, val) => setValue(val)}>
                <Tab LinkComponent={Link} to='/blogs' color='secondry' label='All Blogs' />
                <Tab LinkComponent={Link} to='/myBlogs' color='secondry' label='My Blogs' />
                <Tab LinkComponent={Link} to='/blogs/add' color='secondry' label='Add Blogs' />
              </Tabs>}
          </Box>
          <Box display='flex' ml='auto'>
            {!isLoggedIn &&
              <>
                <Button LinkComponent={Link} to='/auth' sx={{ marginRight: '10px' }} color='secondary' variant='contained'>Login In</Button>
                <Button LinkComponent={Link} to='/auth' sx={{ marginRight: '10px' }} color='secondary' variant='contained'>Sign Up</Button>
              </>
            }
            {isLoggedIn &&
              <Button
                onClick={() => dispatch(authActions.logout())}
                LinkComponent={Link}
                to='/auth'
                color='secondary'
                variant='contained'>
                Log Out
              </Button>
            }
          </Box>

        </Toolbar>
      </AppBar >

      :

      <AppBar color='warning' position='sticky'>
        <Toolbar>
          <Typography variant='h4'>The Blog.</Typography>

          <Box display='flex' ml='auto'>


          </Box>
          <>
            <Drawer PaperProps={{ sx: { backgroundColor: "#ed6c02" } }} anchor='right' open={open ? true : false} onClose={() => setOpen(false)}>
              <List>
                <IconButton sx={{}} onClick={() => setOpen(false)}><CloseIcon sx={{ color: 'white', fontSize: "30px" }} /></IconButton>
                <ListItemButton>
                  <ListItemIcon>

                    <Box sx={{ display: "flex", flexDirection: "column" }}>

                      <Tab onClick={() => setOpen(false)} sx={{ color: "white", fontSize: "16px", fontWeight: "600" }} LinkComponent={Link} to='/blogs' color='secondry' label='All Blogs' />
                      <Tab onClick={() => setOpen(false)} sx={{ color: "white", fontSize: "16px", fontWeight: "600" }} LinkComponent={Link} to='/myBlogs' color='secondry' label='My Blogs' />
                      <Tab onClick={() => setOpen(false)} sx={{ color: "white", fontSize: "16px", fontWeight: "600" }} LinkComponent={Link} to='/blogs/add' color='secondry' label='Add Blogs' />


                      {!isLoggedIn &&
                        <>
                          <Button onClick={() => setOpen(false)} LinkComponent={Link} to='/auth' sx={{ marginBottom: '15px', marginTop: '20px' }} color='secondary' variant='contained'>Login In</Button>
                          <Button onClick={() => setOpen(false)} LinkComponent={Link} to='/auth' color='secondary' variant='contained'>Sign Up</Button>
                        </>
                      }
                      {isLoggedIn &&
                        <Button
                          onClick={() => {
                            dispatch(authActions.logout())
                            setOpen(false)
                          }}
                          LinkComponent={Link}
                          to='/auth'
                          color='secondary'
                          variant='contained'
                          sx={{ marginTop: "20px" }}
                        >
                          Log Out
                        </Button>
                      }
                    </Box>
                  </ListItemIcon>
                </ListItemButton>
              </List>
            </Drawer>
            <IconButton onClick={() => setOpen(true)}><MenuIcon sx={{ color: 'white', fontSize: "30px" }} /></IconButton>
          </>
        </Toolbar>
      </AppBar >



  )
}

export default Header