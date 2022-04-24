import { React, useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom'
import Auth from './components/Auth/Auth';
import Blogs from './components/Blogs/Blogs';
import UserBlogs from './components/UserBlogs/UserBlogs';
import BlogDetail from './components/BlogDetail/BlogDetail';
import AddBlog from './components/AddBlog/AddBlog';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/store';

function App() {

  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.isLoggedIn)

  useEffect(() => {

    localStorage.getItem("userId") && dispatch(authActions.login())

  }, [])




  return (
    <>
      <header>
        <Header />
      </header>

      <main>
        <Routes>

          {!isLoggedIn ?
            <Route path='/auth' element={<Auth />} />
            :
            <>
              <Route path='/blogs' element={<Blogs />} />
              <Route path='/blogs/add' element={<AddBlog />} />
              <Route path='/myBlogs' element={<UserBlogs />} />
              <Route path='/myBlogs/:id' element={<BlogDetail />} />
            </>
          }

        </Routes>
      </main>
    </>
  );
}

export default App;
