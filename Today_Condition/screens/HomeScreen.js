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
    backgroundColor: "#f5f5f5",
    padding: 20,
    alignItems: "center",
  },

  // 타이틀
  title: {
    color: "#333",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 10,
  },

  // 긍정/부정 비율 텍스트
  ratioText: {
    color: "#555",
    fontSize: 18,
    marginVertical: 12,
  },

  // 버튼 2개 가로 배열
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },

  // 흰색 카드 버튼
  button: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
    marginHorizontal: 6,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  buttonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },

  // 하단 채팅/캘린더 영역
  chatPrompt: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
    gap: 14,
  },

  promptText: {
    color: "#444",
    fontSize: 16,
    marginBottom: 6,
  },

  // 메인 블루 버튼
  calendarBtn: {
    width: "90%",
    backgroundColor: "#4C6EF5",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 3 },
  },

  // 채팅 버튼 (화이트 카드 느낌)
  chatInputButton: {
    width: "90%",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  chatInputText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
});
