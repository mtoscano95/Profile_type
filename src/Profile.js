import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAuth } from './store';
import { useNavigate } from 'react-router-dom';

const Profile = ()=> {
  const [luckyNumber, setLuckyNumber] = useState(7);
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=> {
    if(auth.id){
      setLuckyNumber(auth.luckyNumber);
    }
  }, [auth]);

  const _update = async(ev)=> {
    ev.preventDefault();
    dispatch(updateAuth({ luckyNumber }));
  };
  return (
    <form onSubmit={ _update }>
      <input placeholder='luckyNumber' value={ luckyNumber } onChange={ ev => setLuckyNumber(ev.target.value)}/>
      <button disabled={ luckyNumber === auth.luckyNumber }>Update</button>
    </form>
  );
};

export default Profile;


/*

2) Build out your Profile page GO TO PROFILE.JS

We'll start of by bringing in the luckynumber from our state (a slice/copy)
we'll update our onSubmit to be _update
We'll want to update the input (value and onChange)
We'll bring in useSelector and grab the auth from the store
We may not have the value yet (auth), so we'll useEffect since we're changing the auth slice of the state.
We'll check if theres an auth(logged in user) and if there is well set the luckynumber to be the auth.lucknnumber for now.

We'll go to the button and disable it if the luckynumber matches the auth.luckynumber (since we want to update it)


3) Now we want to actually update our luckynumber on the profile

We want to make an updateAuth thunk from the store which we'll dispatch from the update function (once we click on update)
What do we want to update? We want to update the luckynumber were typing in so we'll pass that in

NOW WE GO TO THE STORE

*/