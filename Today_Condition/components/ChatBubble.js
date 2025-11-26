import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChatBubble({ text, isUser = false, date }) {
  return (
    <View style={[styles.container, isUser ? styles.user : styles.bot]}>
      <Text style={[styles.text, isUser ? styles.userText : styles.botText]}>{text}</Text>
      // {date && <Text style={styles.date}>{date}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { maxWidth: '85%', marginVertical: 6, padding: 10, borderRadius: 10 },
  user: { backgroundColor: '#fff', alignSelf: 'flex-end' },
  bot: { backgroundColor: '#2a2430', alignSelf: 'flex-start' },
  text: { fontSize: 14 },
  userText: { color: '#000' },
  botText: { color: '#fff' },
  date: { color: '#bbb', fontSize: 10, marginTop: 6, textAlign: 'right' }
});
