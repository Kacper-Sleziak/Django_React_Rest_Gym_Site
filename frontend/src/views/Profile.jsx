import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getNickname, setStoreNickname, setStoreEmail, setStoreToken,
} from '../store/slices/auth';

function Profile() {
  const dispatch = useDispatch();
  const nickname = useSelector(getNickname);
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(setStoreNickname(undefined));
    dispatch(setStoreEmail(undefined));
    dispatch(setStoreToken(undefined));
    navigate('/login');
  };

  if (nickname === undefined) {
    return <h1>You have to be logged in to see profile!</h1>;
  }
  return (
    <button type="submit" onClick={logOut}>Log Out</button>
  );
}

export default Profile;
