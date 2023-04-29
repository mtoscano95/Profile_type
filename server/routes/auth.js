const express = require('express')
const path = require('path')
const { Product, User } = require('../db');
const jwt = require('jsonwebtoken');

const app = express.Router();

app.post('/', async(req, res, next)=> {
  try{
    res.send(await User.authenticate(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/register', async(req, res, next)=> {
  try{
    res.send(await User.register(req.body)); 
  }
  catch(ex){
    next(ex);
  }
});

app.put('/:token', async(req, res, next)=> {
  try{
    const user = await User.findByToken(req.params.token);
    await user.update(req.body);
    res.send(user);
  }
  catch(ex){
    next(ex);
  }
});

app.get('/:token', async(req, res, next)=> {
  try{
    res.send(await User.findByToken(req.params.token));
  }
  catch(ex){
    next(ex);
  }
});


module.exports = app;


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

We can copy the get token route and make our new one with the put/update
- we want to find the user with the token
- and we want to update the request body and send back the use


      const user = await User.findByToken(req.params.token)
      await user.update(req.body)
      req.send(user)

We dont see a change when we update but need to refresh - HOW DO WE FIX THIS?
- we go to front end (store)

 




*/