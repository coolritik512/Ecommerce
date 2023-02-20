console.log('app file s');

import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'

import React from 'react'
import './App.css'

import Layout from './component/Layout';
import { store } from './store';
import { Provider } from 'react-redux';
import AuthProvider, { userAuth } from './firebase/Auth.jsx';

import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Checkout from './pages/Checkout.jsx';
import Home from './pages/Home.jsx';
import Cart from './pages/Cart'


function ProtectedRoute() {
  const { user } = userAuth();
  console.log(user);
  if (user) {
    return <Checkout></Checkout>
  }
  else return <Navigate to={'/login'}></Navigate>
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} >
        <Route index element={<Home />}></Route>

        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/checkout' element={<ProtectedRoute></ProtectedRoute>}></Route>
      </Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
    </>
  )
)


function App() {
  console.log('app render start');

  return (<>
    <AuthProvider>
      <Provider store={store}>
        {
      console.log('hello')
      }
        <RouterProvider router={router}>
        </RouterProvider>
      </Provider>
    </AuthProvider>
    {
      console.log('app render end')
    }
  </>
  )
}

export default App
console.log('app file end');

