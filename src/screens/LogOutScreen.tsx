import React, { useContext, useEffect } from 'react';
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
  //user
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    userContext.setUser({
      displayName: '',
      id: null,
      email: '',
      token: ''
    });
    navigate('/sign-in');
  }, []);
  return null;
}

export default LogOut;
