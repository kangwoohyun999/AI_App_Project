import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const SERVER_BASE = 'http://localhost:4000';

export default function PsyChatScreen() {
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState('');

  const send = async () => {
    if (!text) return;
    // optimistic add
    setMsgs(prev => [...prev, { id: Date.now().toString(), role: 'user', text }]);
    try {
      // check if JWT exists
      const jwt = await SecureStore.getItemAsync('JWT_TOKEN');
      if (jwt) {
        const resp = await axios.post(`${SERVER_BASE}/chat`, { message: text }, { headers: { Authorization: `Bearer ${jwt}` } });
        setMsgs(prev => [...prev, { id: Date.now().toString(), role: 'bot', text: resp.data.reply }]);
      } else {
        // fallback: use stored OPENAI_API_KEY and call openai directly from client (not recommended)
        const key = await SecureStore.getItemAsync('OPENAI_API_KEY');
        if (!key) return Alert.alert('API Key 필요');
        // For simplicity, call serverless endpoint would be ideal. Here we call server.
        const resp = await axios.post(`${SERVER_BASE}/chat`, { message: text });
        setMsgs(prev => [...prev, { id: Date.now().toString(), role: 'bot', text: resp.data.reply }]);
      }
    } catch (e) {
      Alert.alert('오류', e.response?.data?.error || e.message);
    }
    setText('');
  };

  const renderItem = ({ item }) => (
    <View style={[styles.bubble, item.role==='user' ? styles.user : styles.bot]}>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <View style={{flex:1, padding:12}}>
      <FlatList data={msgs} renderItem={renderItem} keyExtractor={i => i.id} />
      <View style={{flexDirection:'row'}}>
        <TextInput value={text} onChangeText={setText} style={styles.input} placeholder="메시지 입력" />
        <Button title="전송" onPress={send} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: { flex:1, borderWidth:1, padding:8, marginRight:8 },
  bubble: { padding:10, borderRadius:8, marginVertical:6 },
  user: { alignSelf:'flex-end', backgroundColor:'#e6f0ff' },
  bot: { alignSelf:'flex-start', backgroundColor:'#f0f0f0' }
});
