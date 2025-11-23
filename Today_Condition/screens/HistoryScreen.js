import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, SectionList, TouchableOpacity, StyleSheet } from 'react-native';
import { getEntries, clearEntries } from '../utils/storage';

export default function HistoryScreen({ navigation }) {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const all = await getEntries();
      const map = {};
      all.forEach(e => {
        const d = e.date.slice(0,10);
        if (!map[d]) map[d] = [];
        map[d].push(e);
      });
      const secs = Object.keys(map).sort((a,b)=>b.localeCompare(a)).map(d => ({
        title: d,
        data: map[d].sort((a,b)=>new Date(b.date)-new Date(a.date))
      }));
      setSections(secs);
    };
    fetch();
    const unsub = navigation.addListener('focus', fetch);
    return unsub;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>지난 내용</Text>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({section}) => <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>{section.title}</Text></View>}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.time}>{new Date(item.date).toLocaleTimeString()}</Text>
            <Text style={styles.text}>{item.text}</Text>
            <Text style={styles.meta}>키워드: {item.keywords.join(', ') || '없음'} | 감정: {item.sentiment.label}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>기록이 없습니다.</Text>}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}><Text style={styles.btnText}>뒤로</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor:'#8b0000' }]} onPress={async () => { await clearEntries(); setSections([]); }}><Text style={styles.btnText}>전체 삭제</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#0f0b12', padding:12 },
  title: { color:'#fff', fontSize:20, textAlign:'center', marginBottom:10 },
  sectionHeader: { backgroundColor:'#121018', padding:8, borderRadius:6, marginVertical:6 },
  sectionTitle: { color:'#fff' },
  item: { backgroundColor:'#1b1620', padding:10, borderRadius:8, marginBottom:8 },
  time: { color:'#ccc', fontSize:12, marginBottom:6 },
  text: { color:'#fff' },
  meta: { color:'#bbb', fontSize:12, marginTop:6 },
  empty: { color:'#ccc', textAlign:'center', marginTop:40 },
  footer: { flexDirection:'row', justifyContent:'space-between', marginTop:10 },
  btn: { flex:1, backgroundColor:'#2a2430', padding:12, borderRadius:8, marginHorizontal:6, alignItems:'center' },
  btnText: { color:'#fff' }
});
