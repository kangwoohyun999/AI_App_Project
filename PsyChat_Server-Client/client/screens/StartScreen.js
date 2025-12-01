import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI PsyChat</Text>
      <View style={styles.btns}>
        <Button title="OpenAI API Key 로그인" onPress={() => navigation.navigate('ApiKeyLogin')} />
      </View>
      <View style={styles.btns}>
        <Button title="아이디/비번 로그인" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, alignItems:'center', justifyContent:'center', padding:20 },
  title: { fontSize:28, marginBottom:20 },
  btns: { width:'100%', marginVertical:8 }
});
