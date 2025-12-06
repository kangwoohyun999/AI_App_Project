import React, { useState, useContext } from 'react';
import { Alert, View, Text } from 'react-native';
import { signup } from '../utils/firebase';
import { ProgressContext } from '../contexts/Progress';
import { UserContext } from '../contexts/User';
import Input from '../components/Input';
import Button from '../components/Button';

const Signup = ({ navigation }) => {
  const { spinner } = useContext(ProgressContext);
  const { dispatch } = useContext(UserContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const _handleSignupButtonPress = async () => {
    spinner.start();
    try {
      const user = await signup({ email, password, name });
      Alert.alert('Signup Success', user.email);
      dispatch({ type: 'SET_USER', payload: user });
    } catch (e) {
      Alert.alert('Signup Error', e.message);
    } finally {
      spinner.stop();
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 28, textAlign: 'center' }}>Signup</Text>
      <Input label="Name" value={name} onChangeText={setName} placeholder="Name" />
      <Input label="Email" value={email} onChangeText={setEmail} placeholder="Email" />
      <Input label="Password" value={password} onChangeText={setPassword} placeholder="Password" isPassword />
      <Button title="Signup" onPress={_handleSignupButtonPress} />
    </View>
  );
};

export default Signup;
