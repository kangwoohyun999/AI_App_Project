import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function ApiKeyLoginScreen({ navigation }) {
  const [key, setKey] = useState('');
  const saveKey = async () => {
    if (!key) return Alert.alert('API Key 필요');
    await SecureStore.setItemAsync('OPENAI_API_KEY', key);
    // Optionally test key by calling server or OpenAI directly
    navigation.replace('PsyChat');
  };
  return (
    <View style={styles.container}>
      <Text>OpenAI API Key를 입력하세요</Text>
      <TextInput value={key} onChangeText={setKey} style={styles.input} placeholder="sk-..." />
      <Button title="저장하고 시작" onPress={saveKey} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, padding:20, justifyContent:'center'},
  input:{borderWidth:1, padding:10, marginVertical:12}
});
