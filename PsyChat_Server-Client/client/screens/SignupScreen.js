import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const API_BASE = 'http://localhost:4000';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const signup = async () => {
    try {
      await axios.post(`${API_BASE}/auth/register`, { email, password, name });
      Alert.alert('회원가입 완료');
      navigation.goBack();
    } catch (e) {
      Alert.alert('회원가입 실패', e.response?.data?.error || e.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} style={styles.input} />
      <Button title="회원가입" onPress={signup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, padding:20, justifyContent:'center'},
  input:{borderWidth:1, padding:10, marginVertical:8}
});
