import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import Spinner from '../components/Spinner';
import { UserContext, ProgressContext } from '../contexts';

export default () => {
  const { user } = useContext(UserContext);
  const { inProgress } = useContext(ProgressContext);

  return (
    <NavigationContainer>
      {user?.uid ? <MainStack /> : <AuthStack />}
      {inProgress && <Spinner />}
    </NavigationContainer>
  );
};
