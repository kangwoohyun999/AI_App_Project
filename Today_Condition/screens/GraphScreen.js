import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryLegend,
  VictoryAxis,
} from "victory";

import { computeWordTimeSeries } from "../utils/storage";
import { WORD_DICT } from "../utils/wordDictionary";

export default function GraphScreen({ navigation }) {
  const [dates, setDates] = useState([]);
  const [words, setWords] = useState([]);
  const [dataMap, setDataMap] = useState({});

  useEffect(() => {
    const load = async () => {
      const res = await computeWordTimeSeries(14);
      setDates(res.dates);
      setWords(res.words);
      setDataMap(res.data);
    };
    load();
  }, []);

  const datasets = words.map((w) => {
    const color =
      WORD_DICT[w] && WORD_DICT[w].sentiment === "positive"
        ? "#007aff"
        : "#ff3b30";

    return {
      word: w,
      color,
      data: (dataMap[w] || []).map((v, idx) => ({
        x: dates[idx]?.slice(5),
        y: v,
      })),
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>단어별 중요도·빈도 그래프 (최근 14일)</Text>

      <ScrollView horizontal>
        <VictoryChart
          width={Math.max(400, dates.length * 50)}
          theme={VictoryTheme.material}
          domainPadding={{ x: 20, y: 20 }}
          style={{
            parent: {
              backgroundColor: "#0f0b12",
            },
          }}
        >
          <VictoryAxis
            style={{
              tickLabels: { fill: "#fff" },
              axis: { stroke: "#fff" },
            }}
          />
          <VictoryAxis
            dependentAxis
            style={{
              tickLabels: { fill: "#fff" },
              axis: { stroke: "#fff" },
            }}
          />

          {datasets.map((ds, i) => (
            <VictoryLine
              key={i}
              data={ds.data}
              style={{
                data: { stroke: ds.color, strokeWidth: 3 },
              }}
            />
          ))}

          <VictoryLegend
            x={10}
            y={10}
            orientation="horizontal"
            gutter={20}
            style={{ labels: { fill: "#fff" } }}
            data={datasets.map((ds) => ({
              name: ds.word,
              symbol: { fill: ds.color },
            }))}
          />
        </VictoryChart>
      </ScrollView>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: "#fff" }}>뒤로</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0b12",
    padding: 12,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 12,
    textAlign: "center",
  },
  backBtn: {
    marginTop: 12,
    backgroundColor: "#2a2430",
    padding: 12,
    borderRadius: 8,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
  },
});
