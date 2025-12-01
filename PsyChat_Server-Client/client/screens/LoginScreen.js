import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_BASE = 'http://localhost:4000';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const resp = await axios.post(`${API_BASE}/auth/login`, { email, password });
      const { token } = resp.data;
      await SecureStore.setItemAsync('JWT_TOKEN', token);
      navigation.replace('PsyChat');
    } catch (e) {
      Alert.alert('로그인 실패', e.response?.data?.error || e.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} style={styles.input} />
      <Button title="로그인" onPress={login} />
      <View style={{height:12}}/>
      <Button title="회원가입" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, padding:20, justifyContent:'center'},
  input:{borderWidth:1, padding:10, marginVertical:8}
});
