import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk'
import axios from 'axios';

const products = (state = [], action)=> {
  if(action.type === 'SET_PRODUCTS'){
    return action.products;
  }
  return state;
};

const auth = (state = {}, action)=> {
  if(action.type === 'SET_AUTH'){
    return action.auth;
  }``
  return state;
};

export const fetchProducts = ()=> {
  return async(dispatch)=> {
    return dispatch({ type: 'SET_PRODUCTS', products: (await axios.get('/api/products')).data});
  };
};

export const loginWithToken = ()=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    if(token){
      const response = await axios.get(`/api/auth/${token}`);
      dispatch({ type: 'SET_AUTH', auth: response.data });
    }
  };
};

export const logout = ()=> {
  return (dispatch)=> {
    window.localStorage.removeItem('token');
    dispatch({ type: 'SET_AUTH', auth: {} });
  };
};

export const login = (credentials)=> {
  return async(dispatch)=> {
    const response = await axios.post('/api/auth', credentials);
    const token = response.data.token;
    window.localStorage.setItem('token', token);
    dispatch(loginWithToken());
    //dispatch({ type: 'SET_AUTH', auth: response.data });
  };
};

export const updateAuth = (auth)=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    const response = await axios.put(`/api/auth/${ token}`, auth);
    dispatch({ type: 'SET_AUTH', auth: response.data });
  };
};

export const register = (credentials)=> {
  return async(dispatch)=> {
    const response = await axios.post('/api/auth/register', credentials);
    const token = response.data.token;
    window.localStorage.setItem('token', token);
    dispatch(loginWithToken());
    //dispatch({ type: 'SET_AUTH', auth: response.data });
  };
};

const reducer = combineReducers({
  products,
  auth
});

const store = createStore(reducer, applyMiddleware(thunk, logger));


export default store;

/*


3) Now we want to actually update our luckynumber on the profile

We want to make an updateAuth thunk from the store which we'll dispatch from the update function (once we click on update)
What do we want to update? We want to update the luckynumber were typing in so we'll pass that in

NOW WE GO TO THE STORE

NOW THAT WERE HERE WELL USE A LOGIN FUNCTION TO MAKE OUR UPDATE THUNK

We update it to be updateAuth, pass in an auth since thats what were updating
Since only thing were updating is luckynumber we'll have to ask where we want this resposne to go
We make the response a put (sicne we're updating)
Well want a token from the local storage and in our response we want to ensure we are going to the auth token and pass in the auth were updating

We will have to make a put route then - AUTH.JS Route


BACK FROM AUTH.JS

We dont see a change when we update but need to refresh - HOW DO WE FIX THIS?
- we go to front end (store)
- we'll then add on to the updateAuth
-we'll dispatch and send back the updated user (auth)

WE WILL GO TO THE DB.JS FILE NOW




*/