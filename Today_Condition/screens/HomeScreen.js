import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import PieChartComponent from "../components/PieChartComponent";
import { getEntries } from "../utils/storage";

export default function HomeScreen({ navigation }) {
  const [positiveRatio, setPositiveRatio] = useState(0.0);
  const [negativeRatio, setNegativeRatio] = useState(0.0);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const entries = await getEntries();
      const posScore = entries.reduce(
        (acc, e) => acc + (e.sentiment.label === "positive" ? 1 : 0),
        0
      );
      const negScore = entries.reduce(
        (acc, e) => acc + (e.sentiment.label === "negative" ? 1 : 0),
        0
      );
      const total = posScore + negScore;
      if (total === 0) {
        setPositiveRatio(0.0);
        setNegativeRatio(0.0);
      } else {
        setPositiveRatio(posScore / total);
        setNegativeRatio(negScore / total);
      }
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>누적 상태</Text>
      <PieChartComponent positive={positiveRatio} negative={negativeRatio} />
      <Text style={styles.ratioText}>
        부정 : {Math.round(negativeRatio * 100)}% , 긍정 :{" "}
        {Math.round(positiveRatio * 100)}%
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Graph")}
        >
          <Text style={styles.buttonText}>누적 상태 그래프</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("History")}
        >
          <Text style={styles.buttonText}>지난 내용 보기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chatPrompt}>
        <Text style={styles.promptText}>
          안녕하세요. 오늘은 어떤 하루였나요?
        </Text>
        <TouchableOpacity
          style={styles.calendarBtn}
          onPress={() => navigation.navigate("Calendar")}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>
            📅 감정 캘린더 보기
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.chatInputButton}
          onPress={() => navigation.navigate("Chat")}
        >
          <Text style={styles.chatInputText}>눌러서 채팅하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0b12",
    padding: 20,
    alignItems: "center",
  },
  title: { color: "#fff", fontSize: 40, marginTop: 10 },
  ratioText: { color: "#fff", fontSize: 26, marginVertical: 10 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 12,
  },
  button: {
    flex: 1,
    backgroundColor: "#2a2430",
    padding: 14,
    marginHorizontal: 6,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff" },
  chatPrompt: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  promptText: { color: "#fff", fontSize: 16, marginBottom: 10 },
  chatInputButton: {
    width: "90%",
    backgroundColor: "#2a2430",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  chatInputText: { color: "#fff", fontSize: 16 },
  calendarBtn: {
    marginTop: 20,
    backgroundColor: "#6b5bff",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
});
