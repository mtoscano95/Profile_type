import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchProducts, logout } from './store';
import { Link, Routes, Route } from 'react-router-dom';
import Products from './Products';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';

const App = ()=> {
  const dispatch = useDispatch();
  const { products, auth } = useSelector(state => state);
  useEffect(()=> {
    dispatch(fetchProducts());
    dispatch(loginWithToken());
  }, []);

  return (
    <div>
      <h1><Link to='/'>Acme Product Search</Link></h1>
      <Link to='/products'>Products ({ products.length })</Link>
      {
        !auth.id ? <div>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
          </div> :
          <div>
          <button onClick={ ()=> dispatch(logout())}>Logout {auth.username } Your lucky number is { auth.luckyNumber }</button>
          <Link to='/profile'>Profile</Link>
          </div>
      }
      <Routes>
        <Route path='/products' element={ <Products /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/profile' element={ <Profile /> } />
        <Route path='/products/:filterString' element={ <Products /> } />
      </Routes>
    </div>
  );
};

export default App;


/*

HOW CAN WE MAKE A USER PROFILE AND UPDATE THE LUCKY NUMBER

1) First we will have to make routes and links for our Profile
- we want the link to be available only once we log in
- we'll then want to make a Profile.js file (we can copy Register)
- we'll then go to the index.js and make moe's lucky number to be 1 to test something out

2) Build out your Profile page GO TO PROFILE.JS








*/