import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { computeWordTimeSeries } from '../utils/storage';
import { WORD_DICT } from '../utils/wordDictionary';

const screenWidth = Dimensions.get('window').width;

export default function GraphScreen({ navigation }) {
  const [dates, setDates] = useState([]);
  const [words, setWords] = useState([]);
  const [dataMap, setDataMap] = useState({});

  useEffect(() => {
    (async () => {
      const res = await computeWordTimeSeries(14);
      setDates(res.dates);
      setWords(res.words);
      setDataMap(res.data);
    })();
  }, []);

  const datasets = words.map(w => {
    const color = (WORD_DICT[w] && WORD_DICT[w].sentiment === 'positive') ? () => '#ff3b30' : () => '#007aff';
    return { data: dataMap[w] || Array(dates.length).fill(0), color };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>단어별 중요도 · 빈도 그래프 (최근 14일)</Text>
      <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: 12 }}>
        <View>
          <LineChart
            data={{
              labels: dates.length ? dates.map(d => d.slice(5)) : ['-','-','-','-'],
              datasets: datasets.length ? datasets : [{ data: [0,0,0,0,0,0,0], color: () => '#ff3b30' }],
              legend: words.length ? words : ['예시단어']
            }}
            width={Math.max(screenWidth, (dates.length||7) * 60)}
            height={320}
            chartConfig={{
              backgroundGradientFrom: '#0f0b12',
              backgroundGradientTo: '#0f0b12',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
              labelColor: () => '#fff'
            }}
            bezier
            style={{ borderRadius: 12 }}
            decorator={() => null}
          />
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={{ color:'#fff' }}>뒤로</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#0f0b12', padding:12, alignItems:'center' },
  title: { color:'#fff', fontSize:18, marginBottom:12, textAlign:'center' },
  backBtn: { marginTop:12, backgroundColor:'#2a2430', padding:12, borderRadius:8, width:'90%', alignItems:'center' }
});
