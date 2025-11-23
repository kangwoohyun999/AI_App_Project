import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import ChatBubble from '../components/ChatBubble';
import { extractKeywordsWithWeights } from '../utils/keywordExtractor';
import { estimateSentimentFromWeighted } from '../utils/sentiment';
import { saveEntry, getEntriesByDate } from '../utils/storage';

// 변경: 서버 URL (개발 시 localhost, 실제 기기에서는 ngrok 또는 서버 주소 사용)
const SERVER_URL = 'http://localhost:3000';

function formatDateISO(d) {
  return d.toISOString().slice(0,10);
}

export default function ChatScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [todayEntries, setTodayEntries] = useState([]);

  useEffect(() => {
    fetchForDate(selectedDate);
  }, [selectedDate]);

  const fetchForDate = async (d) => {
    const arr = await getEntriesByDate(formatDateISO(d));
    setTodayEntries(arr);
  };

  const changeDate = (deltaDays) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + deltaDays);
    setSelectedDate(d);
  };

  const handleSend = async () => {
    if (!text.trim()) return;
    const { keywords, counts, weighted } = extractKeywordsWithWeights(text);
    const sentiment = estimateSentimentFromWeighted(weighted);
    const entry = {
      id: Date.now().toString(),
      date: (new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds())).toISOString(),
      text: text.trim(),
      keywords,
      counts,
      weighted,
      sentiment
    };
    await saveEntry(entry);
    setMessages(prev => [...prev, { id: entry.id, text: entry.text, isUser: true, date: entry.date }]);

    // 서버에 챗봇 요청
    try {
      const resp = await fetch(`${SERVER_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: entry.text,
          metadata: { keywords: entry.keywords, sentiment: entry.sentiment }
        })
      });
      if (!resp.ok) throw new Error('server err');
      const j = await resp.json();
      const botText = j?.reply || '서버 응답 없음';
      setMessages(prev => [...prev, { id: entry.id + '_bot', text: botText, isUser: false, date: new Date().toISOString() }]);
    } catch (e) {
      console.error(e);
      // fallback rule-based reply
      const botReply = generateFeedback(entry);
      setMessages(prev => [...prev, { id: entry.id + '_bot', text: botReply, isUser: false, date: new Date().toISOString() }]);
      Alert.alert('챗봇 오류', '서버와 통신할 수 없습니다. 서버가 실행 중인지 확인하세요.');
    }

    setText('');
    fetchForDate(selectedDate);
  };

  const generateFeedback = (entry) => {
    if (!entry || !entry.sentiment) return '작성해주셔서 감사합니다.';
    if (entry.sentiment.label === 'positive') return '좋은 일이 많았나 보네요. 계속 잘 챙기세요!';
    if (entry.sentiment.label === 'negative') return '오늘 힘든 날이었군요. 괜찮으실까요? 필요하면 조금 더 적어보세요.';
    return '중립적인 하루였네요. 더 이야기해주셔도 좋아요.';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dateRow}>
        <TouchableOpacity onPress={() => changeDate(-1)} style={styles.dateBtn}><Text style={styles.dateBtnText}>{'<'}</Text></TouchableOpacity>
        <Text style={styles.dateText}>{formatDateISO(selectedDate)}</Text>
        <TouchableOpacity onPress={() => changeDate(1)} style={styles.dateBtn}><Text style={styles.dateBtnText}>{'>'}</Text></TouchableOpacity>
      </View>

      <ScrollView style={styles.chatArea}>
        {todayEntries.map(e =>
          <View key={e.id} style={styles.entryBlock}>
            <Text style={styles.entryTime}>{new Date(e.date).toLocaleTimeString()}</Text>
            <Text style={styles.entryText}>{e.text}</Text>
            <Text style={styles.entryMeta}>키워드: {e.keywords.join(', ') || '없음'} | 감정: {e.sentiment.label}</Text>
          </View>
        )}
        {messages.map(m => <ChatBubble key={m.id} text={m.text} isUser={m.isUser} date={new Date(m.date).toLocaleTimeString()} />)}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="오늘의 감정이나 일을 적어보세요."
          placeholderTextColor="#aaa"
          value={text}
          onChangeText={setText}
          multiline
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text style={{ color:'#fff' }}>저장</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={{color:'#fff'}}>뒤로</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = {
  container: { flex:1, backgroundColor:'#0f0b12', padding:12 },
  dateRow: { flexDirection:'row', justifyContent:'center', alignItems:'center', marginBottom:8 },
  dateBtn: { padding:8, backgroundColor:'#2a2430', borderRadius:8, marginHorizontal:10 },
  dateBtnText: { color:'#fff', fontSize:16 },
  dateText: { color:'#fff', fontSize:16 },
  chatArea: { flex:1, marginVertical:8 },
  entryBlock: { backgroundColor:'#1b1620', padding:10, borderRadius:8, marginBottom:8 },
  entryTime: { color:'#ddd', fontSize:12, marginBottom:6 },
  entryText: { color:'#fff', fontSize:14 },
  entryMeta: { color:'#bbb', fontSize:12, marginTop:6 },
  inputRow: { flexDirection:'row', alignItems:'center', marginTop:8 },
  input: { flex:1, backgroundColor:'#1c1720', color:'#fff', padding:10, borderRadius:8, maxHeight:120 },
  sendBtn: { marginLeft:8, paddingVertical:12, paddingHorizontal:14, backgroundColor:'#6b5bff', borderRadius:8 },
  backBtn: { marginTop:8, backgroundColor:'#2a2430', padding:10, borderRadius:8, alignItems:'center' }
};
