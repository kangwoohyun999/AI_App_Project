import React, { useState, useContext } from 'react';
import { Alert, View, Text } from 'react-native';
import { login } from '../utils/firebase';
import { ProgressContext } from '../contexts/Progress';
import { UserContext } from '../contexts/User';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = ({ navigation }) => {
  const { spinner } = useContext(ProgressContext);
  const { dispatch } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const _handleLoginButtonPress = async () => {
    spinner.start();
    try {
      const user = await login({ email, password });
      Alert.alert('Login Success', user.email);
      dispatch({ type: 'SET_USER', payload: user });
    } catch (e) {
      Alert.alert('Login Error', e.message);
    } finally {
      spinner.stop();
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 30, textAlign: 'center' }}>Login</Text>
      <Input label="Email" value={email} onChangeText={setEmail} placeholder="Email" />
      <Input label="Password" value={password} onChangeText={setPassword} placeholder="Password" isPassword />
      <Button title="Login" onPress={_handleLoginButtonPress} />
      <Button title="Go to Signup" onPress={() => navigation.navigate('Signup')} isFilled={false} />
    </View>
  );
};

export default Login;
