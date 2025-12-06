// src/navigations/index.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { ProgressContext } from '../contexts/Progress';
import { UserContext } from '../contexts/User';
import Spinner from '../components/Spinner';

const Navigation = () => {
  const { inProgress } = useContext(ProgressContext);
  const { user } = useContext(UserContext);

  return (
    <NavigationContainer>
      {user?.uid && user?.email ? <MainStack /> : <AuthStack />}
      {inProgress && <Spinner />}
    </NavigationContainer>
  );
};

export default Navigation;
