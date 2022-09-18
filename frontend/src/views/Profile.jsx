import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getNickname, setStoreNickname, setStoreEmail, setStoreToken,
} from '../store/slices/auth';

function Profile() {
  const dispatch = useDispatch();
  const nickname = useSelector(getNickname);

  const logOut = () => {
    dispatch(setStoreNickname(undefined));
    dispatch(setStoreEmail(undefined));
    dispatch(setStoreToken(undefined));
  };

  if (nickname === undefined) {
    return <h1>You have to be logged in to see profile!</h1>;
  }
  return (
    <button type="submit" onClick={logOut}>Log Out</button>
  );
}

export default Profile;
