import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
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
        x: dates[idx] ? dates[idx].slice(5) : "",
        y: v,
      })),
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>단어별 중요도·빈도 그래프 (최근 14일)</Text>

      <ScrollView horizontal>
        <View style={styles.chartCard}>
          <VictoryChart
            width={Math.max(400, (dates?.length || 0) * 50)}
            theme={VictoryTheme.material}
            domainPadding={{ x: 20, y: 20 }}
            style={{ parent: { backgroundColor: "#ffffff" } }}
          >
            <VictoryAxis
              style={{
                tickLabels: { fill: "#555" },
                axis: { stroke: "#ccc" },
              }}
            />

            <VictoryAxis
              dependentAxis
              style={{
                tickLabels: { fill: "#555" },
                axis: { stroke: "#ccc" },
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

            {datasets.length > 0 && (
              <VictoryLegend
                x={10}
                y={10}
                orientation="horizontal"
                gutter={20}
                style={{ labels: { fill: "#555" } }}
                data={datasets.map((ds) => ({
                  name: ds.word,
                  symbol: { fill: ds.color },
                }))}
              />
            )}
          </VictoryChart>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: "#333", fontWeight: "600" }}>뒤로</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },

  title: {
    color: "#333",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },

  chartCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    marginBottom: 20,
  },

  backBtn: {
    marginTop: 20,
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 14,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
});
